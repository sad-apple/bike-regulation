package cn.net.share.control.service;

import cn.net.share.control.dao.CustomerRepository;
import cn.net.share.control.dao.SysUserRepository;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageInfo;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.state.UserStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SysUserService {

    @Autowired
    private SysUserRepository sysUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerRepository customerRepository;

    /**
     * 分页返回用户列表
     * @param sysUser
     * @param page
     * @param size
     * @param loginUser
     * @return
     */
    public ResponseEntity<Message> getSysUserList(SysUser sysUser, int page, int size, SysUser loginUser){
        /*if(loginUser.getUserType() != UserType.SUPER_ADMIN.value()){
            Customer customer = new Customer();
            customer.setId(loginUser.getCustomer().getId());
            sysUser.setCustomer(customer);
        }*/
        if (null != sysUser.getUserType() && 0 == sysUser.getUserType()) { //查找全部角色类型
            sysUser.setUserType(null);
        }
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page customers = sysUserRepository.findAll(Example.of(sysUser, exampleMatcher), new PageRequest(page - 1, size,new Sort(Sort.Direction.DESC,"createTime")));
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, customers), HttpStatus.OK);
    }

    /**
     * 更新用户
     * @param sysUser
     * @return
     */
    public ResponseEntity<Message> updateSysUser(SysUser sysUser){
        SysUser temSysUser = sysUserRepository.findOne(sysUser.getId());
        if(!temSysUser.getUserStatus().equals(sysUser.getUserStatus())){
            if(UserStatus.DISABLE.toString().equals(sysUser.getUserStatus())){
                sysUser.setDisableTime(new Date());
            }else{
                sysUser.setEnableTime(new Date());
            }
        }
        sysUser.setUserType(Long.valueOf(sysUser.getRoles().get(0).getId().toString()));
        sysUserRepository.save(sysUser);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 更新用户密码
     * @param id
     * @param sysUser
     * @return
     */
    public ResponseEntity<Message> updateSysUserPassword(Long id, SysUser sysUser){
        SysUser tempSysUser = sysUserRepository.findOne(id);
        tempSysUser.setPassword(passwordEncoder.encode(sysUser.getPassword()));
        sysUserRepository.save(tempSysUser);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 创建用户
     * @param sysUser
     * @return
     */
    public ResponseEntity<Message> createSysUser(SysUser sysUser,SysUser sysLoginUser){
        if(sysUserRepository.findByUsername(sysUser.getUsername())!=null){
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.ROLE_ALREADY_EXIST), HttpStatus.OK);
        }else{
            sysUser.setCustomer(sysLoginUser.getCustomer());
            sysUser.setPassword(passwordEncoder.encode(sysUser.getPassword()));
            Long type = Long.valueOf(sysUser.getRoles().get(0).getId().toString());
            sysUser.setUserType(type);
            sysUserRepository.save(sysUser);
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
        }
    }

    /**
     * 删除用户
     * @param id
     * @return
     */
    public ResponseEntity<Message> deleteSysUser(Long id){
        SysUser sysUser = sysUserRepository.findOne(id);
        if(customerRepository.findByAdminId(sysUser.getId()) != null)
            return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR,MessageInfo.CANNOT_REMOVE_ADMIN),HttpStatus.OK);

        sysUserRepository.delete(id);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 根据id返回用户
     * @param id
     * @return
     */
    public ResponseEntity<Message> getSysUserById(Long id){
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS,sysUserRepository.findOne(id)), HttpStatus.OK);
    }

    /**
     * 修改用户密码
     * @param id
     * @param oldPassword
     * @param newPassword
     * @return
     */
    public ResponseEntity<Message> changePassword(Long id, String oldPassword, String newPassword){
        SysUser sysUser = sysUserRepository.findOne(id);
        Message message;
        if(!passwordEncoder.matches(oldPassword, sysUser.getPassword())){
            message = new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.WRONG_OLD_PASSWORD);
            return new ResponseEntity<Message>(message, HttpStatus.OK);
        }
        sysUser.setPassword(new BCryptPasswordEncoder().encode(newPassword));
        sysUserRepository.save(sysUser);
        message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
