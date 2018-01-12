package cn.net.share.control.service;

import cn.net.share.control.dao.CustomerRepository;
import cn.net.share.control.dao.RiderDetailsRepository;
import cn.net.share.control.dao.SysRoleRepository;
import cn.net.share.control.dao.SysUserRepository;
import cn.net.share.control.domain.Customer;
import cn.net.share.control.domain.RiderDetails;
import cn.net.share.control.domain.SysRole;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.customer.BikeOwnerDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
 * Created by lihao on 2017/7/17.
 */
@Service
public class BikeownerService {

    private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);

    @Autowired
    private RiderDetailsRepository riderDetailsRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private SysUserRepository sysUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SysRoleRepository sysRoleRepository;

    /**
     * 分页返回车主列表
     *
     * @param page
     * @param size
     * @param username
     * @param fullName
     * @return
     */
    public ResponseEntity<Message> getBikeOwnerList(int page, int size, String username, String fullName) {
        LogUtil.info(logger, "BikeownerService:getBikeOwnerList, page = " + page + ", size = " + size + ", username = " + username + ", fullName = " + fullName);
        Pageable pageable = new PageRequest(page - 1, size, new Sort(Sort.Direction.DESC, "createTime"));
        if (username == null) username = "";
        if (fullName == null) fullName = "";
        Page<SysUser> sysUsers = sysUserRepository.findOwner(username, fullName, pageable);
        Page<BikeOwnerDto> dtoPage = sysUsers.map(new Converter<SysUser, BikeOwnerDto>() {
            @Override
            public BikeOwnerDto convert(SysUser sysUser) {
                String customerId = sysUser.getCustomer().getId();
                Customer customer = customerRepository.findOne(customerId);
                RiderDetails riderDetails = riderDetailsRepository.findOne(customer.getCustomerDetailsId());
                BikeOwnerDto bikeOwnerDto = new BikeOwnerDto(customer, riderDetails);
                if (riderDetails.getIdCardNumber() != null) {
                    StringBuffer birthNum = new StringBuffer();
                    if (riderDetails.getIdCardNumber().length() == 15) {
                        birthNum.append("19").append(riderDetails.getIdCardNumber().substring(6, 12));
                    } else if (riderDetails.getIdCardNumber().length() == 18) {
                        birthNum.append(riderDetails.getIdCardNumber().substring(6, 14));
                    }
                    try {
                        Date date = new SimpleDateFormat("yyyyMMdd").parse(birthNum.toString());
                        bikeOwnerDto.setBirthday(new SimpleDateFormat("yyyy-MM-dd").format(date));
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                }

                return bikeOwnerDto;
            }
        });
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, dtoPage);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 创建车主
     *
     * @param bikeOwnerDto
     * @return
     */
    @Transactional
    public ResponseEntity<Message> createBikeOwner(BikeOwnerDto bikeOwnerDto) {
        if (sysUserRepository.findByUsername(bikeOwnerDto.getUsername()) != null) {
            LogUtil.error(logger, "This username has already exist, username = :" + bikeOwnerDto.getUsername());
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.USERNAME_ALREADY_EXIST), HttpStatus.OK);
        }
        if(riderDetailsRepository.findByIdCardNumber(bikeOwnerDto.getIdCardNum()) != null && bikeOwnerDto.getIdCardNum() != "" && bikeOwnerDto.getIdCardNum() != null) {
            LogUtil.error(logger, "This idcardnumber has already exist, idcardnumber = :" + bikeOwnerDto.getIdCardNum());
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.IDCARDNUMBER_ALREADY_EXIST), HttpStatus.OK);
        }
        RiderDetails riderDetails = new RiderDetails();
        if (bikeOwnerDto.getIdCardNum() == null) {
            riderDetails.setIdCardNumber("");
        } else {
            riderDetails.setIdCardNumber(bikeOwnerDto.getIdCardNum());
        }
        riderDetailsRepository.save(riderDetails);

        SysRole roleOwner = sysRoleRepository.findOne(UserType.BIKE_OWNER.value()); //使用枚举
        SysRole roleRider = sysRoleRepository.findOne(UserType.RIDER_USER.value()); //使用枚举
        List<SysRole> roles = new ArrayList<SysRole>();
        roles.add(roleOwner);
        roles.add(roleRider);
        bikeOwnerDto.setRoles(roles);
        SysUser sysUser = new SysUser(bikeOwnerDto);
        if (UserStatus.DISABLE.toString().equals(bikeOwnerDto.getUserStatus())) {
            sysUser.setDisableTime(new Date());
        } else {
            sysUser.setEnableTime(new Date());
        }
        sysUser.setPassword(passwordEncoder.encode(bikeOwnerDto.getPassword()));
        List<SysUser> sysUsers = new ArrayList<SysUser>();
        sysUsers.add(sysUser);
        Customer customer = new Customer(sysUsers, riderDetails);
        customer.setType(UserType.BIKE_OWNER.value());
        sysUsers.get(0).setCustomer(customer);
        customerRepository.save(customer);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 查出一个车主
     *
     * @param id
     * @return
     */
    public ResponseEntity<Message> getBikeOwnerById(String id) {
        LogUtil.info(logger, "BikeownerService:getBikeOwnerById, id = " + id);
        Customer customer = customerRepository.findOne(id);
        RiderDetails RiderDetails = riderDetailsRepository.findOne(customer.getCustomerDetailsId());
        BikeOwnerDto bikeOwnerDto = new BikeOwnerDto(customer, RiderDetails);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, bikeOwnerDto), HttpStatus.OK);
    }

    /**
     * 修改车主
     *
     * @param bikeOwnerDto
     * @return
     */
    public ResponseEntity<Message> updateBikeOwner(BikeOwnerDto bikeOwnerDto){
        Customer customer = customerRepository.findOne(bikeOwnerDto.getId());
        if (sysUserRepository.findByUsername(bikeOwnerDto.getUsername()) != null  && !customer.getSysUsers().get(0).getUsername().equals(bikeOwnerDto.getUsername())) {
            LogUtil.error(logger, "This username has already exist, username = :" + bikeOwnerDto.getUsername());
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.USERNAME_ALREADY_EXIST), HttpStatus.OK);
        }
        RiderDetails riderDetails = riderDetailsRepository.findOne(customer.getCustomerDetailsId());
        if (bikeOwnerDto.getIdCardNum() != null && !(bikeOwnerDto.getIdCardNum() == "") && riderDetailsRepository.findByIdCardNumber(bikeOwnerDto.getIdCardNum()) != null && !riderDetails.getIdCardNumber().equals(bikeOwnerDto.getIdCardNum())) {
            LogUtil.error(logger, "This idcardnumber has already exist, idcardnumber = :" + bikeOwnerDto.getIdCardNum());
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.IDCARDNUMBER_ALREADY_EXIST), HttpStatus.OK);
        }
        riderDetails.setIdCardNumber(bikeOwnerDto.getIdCardNum());
        riderDetailsRepository.save(riderDetails);

        customer.setType(bikeOwnerDto.getType());
        customer.setCustomerDetailsId(riderDetails.getId());
        customer.getSysUsers().get(0).setUsername(bikeOwnerDto.getUsername());
        customer.getSysUsers().get(0).setFullName(bikeOwnerDto.getFullName());
        customer.getSysUsers().get(0).setPhone(bikeOwnerDto.getPhone());
        customer.getSysUsers().get(0).setEmail(bikeOwnerDto.getEmail());
        customer.getSysUsers().get(0).setUserStatus(bikeOwnerDto.getUserStatus());
        customer.getSysUsers().get(0).setEnableTime(bikeOwnerDto.getEnableTime());
        customer.getSysUsers().get(0).setDisableTime(bikeOwnerDto.getDisableTime());
        customer.getSysUsers().get(0).setCustomer(customer);
        customerRepository.save(customer);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     *  修改车主密码
     *
     * @param id
     * @param sysUser
     * @return
     */
    public ResponseEntity<Message> changeBikeOwnerPassword(String id, SysUser sysUser) {
        LogUtil.info(logger, "BikeownerService:changeBikeOwnerPassword, id = " + id + ", sysUser = " + sysUser);
        Customer customer = customerRepository.findOne(id);
        customer.getSysUsers().get(0).setPassword(passwordEncoder.encode(sysUser.getPassword()));
        customerRepository.save(customer);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }
    /**
     * 删除单车车主
     *
     * @param id
     * @return
     */
    @Transactional
    public ResponseEntity<Message> deleteBikeOwner(String id) {
        LogUtil.info(logger, "BikeownerService:deleteBikeOwner, id = " + id);
        Customer customer = customerRepository.findOne(id);
        RiderDetails riderDetails = riderDetailsRepository.findOne(customer.getCustomerDetailsId());
        riderDetailsRepository.delete(riderDetails);
        customer.getSysUsers().get(0).setCustomer(null);
        sysUserRepository.delete(customer.getSysUsers().get(0));
        customerRepository.delete(customer);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

}
