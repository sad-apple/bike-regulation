package cn.net.share.control.service;

import cn.net.share.control.dao.RiderDetailsRepository;
import cn.net.share.control.dao.SysRoleRepository;
import cn.net.share.control.domain.RiderDetails;
import cn.net.share.control.domain.SysRole;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.customer.RiderDto;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dao.CustomerRepository;
import cn.net.share.control.dao.SysUserRepository;
import cn.net.share.control.domain.Customer;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.state.CustomerType;
import cn.net.share.control.utils.state.RiderDetailSex;
import cn.net.share.control.utils.state.UserStatus;
import cn.net.share.control.utils.state.UserType;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private SysUserRepository sysUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private SysRoleService sysRoleService;
    @Autowired
    private RiderDetailsRepository riderDetailsRepository;
    @Autowired
    private SysRoleRepository sysRoleRepository;

    /**
     * 分页返回客户列表
     * @param customer
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findByCustomerPage(Customer customer, int page, int size){
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page customers = customerRepository.findAll(Example.of(customer, exampleMatcher), new PageRequest(page - 1, size,new Sort(Sort.Direction.DESC,"createTime")));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, customers);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }


    /**
     * 创建一个客户 并保存客户的管理员账号以及设置一个默认的一级管理员角色
     * @param customer
     * @return
     */
    public ResponseEntity<Message> createCustomer(Customer customer){
        SysUser teamUser = sysUserRepository.findByUsername(customer.getAdmin().getUsername());
        if(teamUser!=null){
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR,"用户名已经存在"), HttpStatus.OK);
        }
        customer.getAdmin().setUserType(UserType.FIRST_ADMIN.value());
        customer.getAdmin().setPassword(passwordEncoder.encode(customer.getAdmin().getPassword()));
        customer.getAdmin().setCustomer(customer);
        customer.getAdmin().setRoles(sysRoleService.getOneAdminRole());
        customerRepository.save(customer);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 返回一个客户
     * @param customerId
     * @return
     */
    public ResponseEntity<Message> getCustomer(String customerId){
        Customer customer = customerRepository.findOne(customerId);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS,customer), HttpStatus.OK);
    }

    /**
     * 更新客户
     * @param customer
     * @return
     */
    public ResponseEntity<Message> updateCustomer(Customer customer){
        customerRepository.save(customer);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 删除客户，双向关联原因 先置空管理员中的客户 再进行删除
     * @param id
     * @return
     */
    @Transactional
    public ResponseEntity<Message> deleteCustomer(String id){
        Customer customer = customerRepository.findOne(id);
        customer.getAdmin().setCustomer(null);
        sysUserRepository.delete(customer.getAdmin());
        customerRepository.delete(customer);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }


    /**
     * 分页返回骑行用户列表
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> getRiderList(int page, int size) {
        Pageable pageable = new PageRequest(page - 1, size,new Sort(Sort.Direction.DESC,"createTime"));
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page<Customer> customers = customerRepository.findByTypeBetween(1,2,pageable);

        Page<RiderDto> dtoPage = customers.map(new Converter<Customer, RiderDto>() {
            @Override
            public RiderDto convert(Customer customer) {
                Long customerDetailsId = customer.getCustomerDetailsId();
                RiderDetails riderDetails = riderDetailsRepository.findOne(customerDetailsId);
                RiderDto riderDto = new RiderDto(customer,riderDetails);
                if (riderDetails.getIdCardNumber()!=null){
                    String sIDNum = riderDetails.getIdCardNumber().substring(6,14);
                    try {
                        Date date = new SimpleDateFormat("yyyyMMdd").parse(sIDNum);
                        riderDto.setBirthday(new SimpleDateFormat("yyyy-MM-dd").format(date));
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                    String sCardNum = riderDetails.getIdCardNumber().substring(16, 17);
                    if (Integer.parseInt(sCardNum) % 2 != 0) {
                        riderDto.setSex("男");
                    } else {
                        riderDto.setSex("女");
                    }
                }
                return riderDto;
            }
        });
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, dtoPage);
        return new ResponseEntity<Message>(message, HttpStatus.OK);

    }

    /**
     * 创建骑行用户
     * @param riderDto
     * @return
     */
    @Transactional
    public ResponseEntity<Message> createSysUser(RiderDto riderDto) {
        if(sysUserRepository.findByUsername(riderDto.getUsername())!=null){
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR,"用户名已经存在"), HttpStatus.OK);
        }else{
            RiderDetails riderDetails = new RiderDetails();
            riderDetails.setIdCardNumber(riderDto.getIdCardNumber());
            riderDetailsRepository.save(riderDetails);

            SysRole role = sysRoleRepository.findOne(3l);
            List<SysRole> roles = new ArrayList<SysRole>();
            roles.add(role);
            SysUser sysUser = new SysUser();
            BeanUtils.copyProperties(riderDto, sysUser);
            Customer customer = new Customer();
            if(UserStatus.DISABLE.toString().equals(riderDto.getUserStatus())){
                customer.getAdmin().setDisableTime(new Date());
            }else{
                customer.getAdmin().setEnableTime(new Date());
            }
            customer.setType(CustomerType.RIDER.value());
            customer.setCustomerDetailsId(riderDetails.getId());
            customer.setAdmin(sysUser);
            customer.getAdmin().setPassword(passwordEncoder.encode(riderDto.getPassword()));
            customer.getAdmin().setCustomer(customer);
            customer.getAdmin().setUserType(UserType.ORDINARY_USER.value());
            customer.getAdmin().setRoles(roles);
            customerRepository.save(customer);
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
        }
    }

    /**
     * 修改骑行用户
     * @param riderDto
     * @return
     */
    @Transactional
    public ResponseEntity<Message> updateRider(RiderDto riderDto) {
        Customer customer = customerRepository.findOne(riderDto.getId());

        if(!customer.getAdmin().getUsername().equals(riderDto.getUsername()) && sysUserRepository.findByUsername(riderDto.getUsername())!=null){
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR,"用户名已经存在"), HttpStatus.OK);
        }else{
            RiderDetails riderDetails = riderDetailsRepository.findOne(customer.getCustomerDetailsId());
            riderDetails.setIdCardNumber(riderDto.getIdCardNumber());
            riderDetailsRepository.save(riderDetails);

            if(!customer.getAdmin().getUserStatus().equals(riderDto.getUserStatus())){
                if(UserStatus.DISABLE.toString().equals(riderDto.getUserStatus())){
                    customer.getAdmin().setEnableTime(new Date());
                }else{
                    customer.getAdmin().setEnableTime(new Date());
                }
            }
            customer.setType(CustomerType.RIDER.value());
            customer.setCustomerDetailsId(riderDetails.getId());
            customer.getAdmin().setUsername(riderDto.getUsername());
            customer.getAdmin().setFullName(riderDto.getFullName());
            customer.getAdmin().setPhone(riderDto.getPhone());
            customer.getAdmin().setEmail(riderDto.getEmail());
            customer.getAdmin().setUserStatus(riderDto.getUserStatus());
            customer.getAdmin().setCustomer(customer);
            customerRepository.save(customer);
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
        }

    }

    /**
     * 查出一个骑行用户
     * @param id
     * @return
     */
    public ResponseEntity<Message> getRiderById(String id) {
        Customer customer = customerRepository.findOne(id);
        RiderDetails riderDetails = riderDetailsRepository.findOne(customer.getCustomerDetailsId());
        RiderDto riderDto = new RiderDto(customer,riderDetails);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS,riderDto), HttpStatus.OK);
    }

    /**
     *  修改骑行用户的密码
     * @param id
     * @param oldPwd
     * @param newPwd
     * @return
     */
    public ResponseEntity<Message> changePassword(String id, String oldPwd, String newPwd) {
        Customer customer = customerRepository.findOne(id);
        if (!passwordEncoder.matches(oldPwd,customer.getAdmin().getPassword())){
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR,"原密码输入错误！"), HttpStatus.OK);
        }
        customer.getAdmin().setPassword(new BCryptPasswordEncoder().encode(newPwd));
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
        Customer customer = customerRepository.findOne(id);
        RiderDetails riderDetails = riderDetailsRepository.findOne(customer.getCustomerDetailsId());
        riderDetailsRepository.delete(riderDetails);
        customer.getAdmin().setCustomer(null);
        sysUserRepository.delete(customer.getAdmin());
        customerRepository.delete(customer);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 骑行用户升级
     * @param id
     * @return
     */
    public ResponseEntity<Message> upgrade(String id) {
        Customer customer = customerRepository.findOne(id);
        if(customer.getType()==2){
            return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR,"您已是车主，无需升级！"), HttpStatus.OK);
        }
        customer.setType(2);
        SysRole role = sysRoleRepository.findOne(4l);
        List<SysRole> roles = new ArrayList<SysRole>();
        roles.add(role);
        customer.getAdmin().setRoles(roles);
        customerRepository.save(customer);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }
}
