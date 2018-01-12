package cn.net.share.control.service;

import cn.net.share.control.domain.SysResource;
import cn.net.share.control.domain.SysRole;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.user.UserDto;
import cn.net.share.control.dao.RedisRepository;
import cn.net.share.control.dao.SysResourceRepository;
import cn.net.share.control.dao.SysUserRepository;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.state.UserStatus;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SystemService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SysUserRepository sysUserRepository;

    @Autowired
    private RedisRepository redisRepository;

    @Autowired
    private SysResourceRepository sysResourceRepository;

    /**
     * 登录接口
     * @return
     */
    public ResponseEntity<Message> user(SysUser sysUser){
        if(UserStatus.DISABLE.value().toString().equals(sysUser.getUserStatus())){
            return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR,"您的账户已被禁用,请联系管理员"), HttpStatus.OK);
        }
        List<SysResource> sysResources = getUserResources(sysUser.getRoles());
        UserDto userDto = new UserDto(sysUser, sysResources);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, userDto), HttpStatus.OK);
    }

    /**
     * 获取用户所有权限并去重
     * @param sysRoles
     * @return
     */
    private List<SysResource> getUserResources(List<SysRole> sysRoles){
        List<SysResource> sysResources = Lists.newArrayList();
        sysResources.addAll(sysResourceRepository.findDistinctBySysRolesInAndTypeOrderBySortAsc(sysRoles, 0));
        return sysResources;
    }

    /**
     * 用户注册接口
     * @param sysUser
     * @return
     */
    public ResponseEntity<Message> register(SysUser sysUser){
        SysUser isExist = sysUserRepository.findByUsername(sysUser.getUsername());
        if(isExist != null){
            return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR, "用户名已存在"), HttpStatus.OK);
        }
        sysUser.setPassword(passwordEncoder.encode(sysUser.getPassword()));
        sysUserRepository.save(sysUser);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 通过时间戳获取随机验证码
     * @param timeStamp
     * @return
     */
    public ResponseEntity<Message> getRandomCodeByTimeStamp(String timeStamp){
        String code = "" + (int)(Math.random()*9000+1000);
        redisRepository.save(timeStamp, code, 300);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS,(Object)code), HttpStatus.OK);
    }

}
