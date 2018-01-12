package cn.net.share.control.service;

import cn.net.share.control.dao.CustomerRepository;
import cn.net.share.control.dao.RiderDetailsRepository;
import cn.net.share.control.dao.SysRoleRepository;
import cn.net.share.control.dao.SysUserRepository;
import cn.net.share.control.domain.Customer;
import cn.net.share.control.domain.RiderDetails;
import cn.net.share.control.domain.SysRole;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.customer.RiderDto;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageInfo;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.LogUtil;
import cn.net.share.control.utils.state.UserStatus;
import cn.net.share.control.utils.state.UserType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by zhangshiping on 2017/7/15.
 */
@Service
public class RiderService {

    private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private SysUserRepository sysUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RiderDetailsRepository riderDetailsRepository;

    @Autowired
    private SysRoleRepository sysRoleRepository;

    /**
     * 分页返回骑行用户列表
     * @param page
     * @param size
     * @param username
     * @param fullName
     * @return
     */
    public ResponseEntity<Message> getRiderList(int page, int size, String username, String fullName) {
        LogUtil.info(logger, "RiderService:getRiderList, username = " + username);
        Pageable pageable = new PageRequest(page - 1, size, new Sort(Sort.Direction.DESC, "id"));
        Page<SysUser> sysUsers = sysUserRepository.findByUsernameAndFullName(username, fullName, pageable);
        Page<RiderDto> dtoPage = sysUsers.map(new Converter<SysUser, RiderDto>() {
            @Override
            public RiderDto convert(SysUser sysUser) {
                String customerId = sysUser.getCustomer().getId();
                Customer customer = customerRepository.findOne(customerId);
                RiderDetails riderDetails = riderDetailsRepository.findOne(customer.getCustomerDetailsId());
                RiderDto riderDto = new RiderDto(customer, riderDetails);
                if (riderDetails.getIdCardNumber() != null){
                    splitIdCard(riderDto, riderDetails);
                }
                return riderDto;
            }
        });

        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, dtoPage);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 身份证号解析
     * @param riderDto
     * @param riderDetails
     */
    private void splitIdCard(RiderDto riderDto, RiderDetails riderDetails){
        StringBuffer birthNum = new StringBuffer();
        StringBuffer sexNum = new StringBuffer();
        if (riderDetails.getIdCardNumber().length() == 15){
            birthNum.append("19").append(riderDetails.getIdCardNumber().substring(6,12));
            sexNum.append(riderDetails.getIdCardNumber().substring(14, 15));
            riderDto.setSex((Integer.parseInt(sexNum.toString()) % 2 == 0) ? MessageInfo.SEX_WOMEN : MessageInfo.SEX_MEN);
        }else if (riderDetails.getIdCardNumber().length() == 18){
            birthNum.append(riderDetails.getIdCardNumber().substring(6, 14));
            sexNum.append(riderDetails.getIdCardNumber().substring(16, 17));
            riderDto.setSex((Integer.parseInt(sexNum.toString()) % 2 == 0) ? MessageInfo.SEX_WOMEN : MessageInfo.SEX_MEN);
        }
        try {
            Date date = new SimpleDateFormat("yyyyMMdd").parse(birthNum.toString());
            riderDto.setBirthday(new SimpleDateFormat("yyyy-MM-dd").format(date));
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    /**
     * 创建骑行用户
     * @param riderDto
     * @return
     */
    @Transactional
    public ResponseEntity<Message> createRider(RiderDto riderDto) {
        LogUtil.info(logger, "RiderService:createRider, riderDto = " + riderDto.toString());
        //用户名重复验证
        if (sysUserRepository.findByUsername(riderDto.getUsername()) != null){
            LogUtil.error(logger, "This rider can not update, username already exist");
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.USERNAME_ALREADY_EXIST), HttpStatus.OK);
        }
        //用户身份证重复验证
        if (riderDto.getIdCardNumber() != null && riderDto.getIdCardNumber() != "" && riderDetailsRepository.findByIdCardNumber(riderDto.getIdCardNumber()) != null){
            LogUtil.error(logger, "This rider can not update, idCardNumber already exist");
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.IDCARDNUMBER_ALREADY_EXIST), HttpStatus.OK);
        }
        RiderDetails riderDetails = new RiderDetails();
        riderDetails.setIdCardNumber(riderDto.getIdCardNumber());
        riderDetailsRepository.save(riderDetails);

        SysRole role = sysRoleRepository.findOne(UserType.RIDER_USER.value()); //使用枚举
        List<SysRole> roles = new ArrayList<SysRole>();
        roles.add(role);
        riderDto.setRoles(roles);

        SysUser sysUser = new SysUser(riderDto);
        if (UserStatus.DISABLE.toString().equals(riderDto.getUserStatus())) {
            sysUser.setDisableTime(new Date());
        } else {
            sysUser.setEnableTime(new Date());
        }
        sysUser.setPassword(passwordEncoder.encode(riderDto.getPassword()));
        List<SysUser> sysUsers = new ArrayList<SysUser>();
        sysUsers.add(sysUser);
        Customer customer = new Customer(sysUsers, riderDetails);
        sysUsers.get(0).setCustomer(customer);

        customerRepository.save(customer);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 修改骑行用户
     * @param riderDto
     * @return
     */
    @Transactional
    public ResponseEntity<Message> updateRider(RiderDto riderDto) {
        LogUtil.info(logger, "RiderService:updateRider, riderDto = " + riderDto.toString());

        Customer customer = customerRepository.findOne(riderDto.getId());
        //用户名重复验证
        if (!customer.getSysUsers().get(0).getUsername().equals(riderDto.getUsername()) && sysUserRepository.findByUsername(riderDto.getUsername()) != null){
            LogUtil.error(logger, "This rider can not update, username already exist");
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.USERNAME_ALREADY_EXIST), HttpStatus.OK);
        }

        RiderDetails riderDetails = riderDetailsRepository.findOne(customer.getCustomerDetailsId());
        //用户身份证重复验证
        if (riderDto.getIdCardNumber() != null &&
            riderDto.getIdCardNumber() != "" &&
            !riderDetails.getIdCardNumber().equals(riderDto.getIdCardNumber()) &&
            riderDetailsRepository.findByIdCardNumber(riderDto.getIdCardNumber()) != null){

            LogUtil.error(logger, "This rider can not update, idCardNumber already exist");
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.IDCARDNUMBER_ALREADY_EXIST), HttpStatus.OK);
        }

        riderDetails.setIdCardNumber(riderDto.getIdCardNumber());
        riderDetailsRepository.save(riderDetails);

        if (!customer.getSysUsers().get(0).getUserStatus().equals(riderDto.getUserStatus())) {
            if (UserStatus.DISABLE.toString().equals(riderDto.getUserStatus())) {
                customer.getSysUsers().get(0).setDisableTime(new Date());
            } else {
                customer.getSysUsers().get(0).setEnableTime(new Date());
            }
        }
        customer.setType(UserType.RIDER_USER.value());
        customer.setCustomerDetailsId(riderDetails.getId());
        customer.getSysUsers().get(0).setUsername(riderDto.getUsername());
        customer.getSysUsers().get(0).setFullName(riderDto.getFullName());
        customer.getSysUsers().get(0).setPhone(riderDto.getPhone());
        customer.getSysUsers().get(0).setEmail(riderDto.getEmail());
        customer.getSysUsers().get(0).setUserStatus(riderDto.getUserStatus());
        customer.getSysUsers().get(0).setCustomer(customer);
        customerRepository.save(customer);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 查出一个骑行用户
     * @param id
     * @return
     */
    public ResponseEntity<Message> getRiderById(String id) {
        LogUtil.info(logger, "RiderService:getRiderById, id = " + id);
        Customer customer = customerRepository.findOne(id);
        RiderDetails riderDetails = riderDetailsRepository.findOne(customer.getCustomerDetailsId());
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, new RiderDto(customer, riderDetails)), HttpStatus.OK);
    }

    /**
     *  修改骑行用户的密码
     * @param id
     * @param sysUser
     * @return
     */
    public ResponseEntity<Message> changePassword(String id, SysUser sysUser) {
        LogUtil.info(logger, "RiderService:changePassword, id = " + id);
        Customer customer = customerRepository.findOne(id);
        customer.getSysUsers().get(0).setPassword(passwordEncoder.encode(sysUser.getPassword()));
        customerRepository.save(customer);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 删除骑行用户
     * @param id
     * @return
     */
    @Transactional
    public ResponseEntity<Message> deleteRider(String id) {
        LogUtil.info(logger, "RiderService:deleteRider, id = " + id);
        Customer customer = customerRepository.findOne(id);
        RiderDetails riderDetails = riderDetailsRepository.findOne(customer.getCustomerDetailsId());

        sysUserRepository.delete(customer.getSysUsers().get(0).getId());
        riderDetailsRepository.delete(riderDetails);
        customerRepository.delete(customer);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 骑行用户升级
     * @param id
     * @return
     */
    public ResponseEntity<Message> upgrade(String id) {
        LogUtil.info(logger, "RiderService:upgrade, id = " + id);
        Customer customer = customerRepository.findOne(id);
        if (customer.getType() != UserType.RIDER_USER.value()){
            LogUtil.error(logger, "This customer can not upgrade, type = :" + customer.getType());

            return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.ONLY_RIDER_CAN_UPGRADE), HttpStatus.OK);
        }
        customer.setType(UserType.BIKE_OWNER.value());
        SysRole role = sysRoleRepository.findOne(UserType.BIKE_OWNER.value());
        customer.getSysUsers().get(0).getRoles().add(role);
        customer.getSysUsers().get(0).setUserType(UserType.BIKE_OWNER.value());
        customerRepository.save(customer);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

}
