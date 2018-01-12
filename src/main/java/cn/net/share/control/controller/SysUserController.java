package cn.net.share.control.controller;

import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("sysusers")
public class SysUserController {

    @Autowired
    private SysUserService sysUserService;

    /**
     * 分页获得用户列表
     * @return`
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getSysUserList(SysUser sysUser, int page, int size, @AuthenticationPrincipal SysUser loginUser){
        return sysUserService.getSysUserList(sysUser,page,size,loginUser);
    }

    /**
     * 返回当前登录的用户
     * @param sysUser
     * @return
     */
    @RequestMapping(value = "login-sysuser" ,method = RequestMethod.GET)
    public ResponseEntity<Message> getLoginSysUser(@AuthenticationPrincipal SysUser sysUser){
        return sysUserService.getSysUserById(sysUser.getId());
    }

    /**
     * 修改用户
     * @param id
     * @param sysUser
     * @return
     */
    @RequestMapping(value = "/{id}",method = RequestMethod.PUT)
    public ResponseEntity<Message> updateSysUser(@PathVariable Long id, @RequestBody SysUser sysUser){
        sysUser.setId(id);
        return sysUserService.updateSysUser(sysUser);
    }

    /**
     * 修改用户密码
     * @param id
     * @param sysUser
     * @return
     */
    @RequestMapping(value = "/{id}/sysuser-password",method = RequestMethod.PUT)
    public ResponseEntity<Message> updateSysUserPassword(@PathVariable Long id, @RequestBody SysUser sysUser){
        return sysUserService.updateSysUserPassword(id, sysUser);
    }

    /**
     * 创建用户
     * @param sysUser
     * @param loginSysUser
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createSysUser(@RequestBody SysUser sysUser,@AuthenticationPrincipal SysUser loginSysUser){
        return sysUserService.createSysUser(sysUser,loginSysUser);
    }

    /**
     * 删除用户
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" , method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteSysUser(@PathVariable Long id){
        return sysUserService.deleteSysUser(id);
    }

    /**
     * 返回一个用户
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public ResponseEntity<Message> getSysUserById(@PathVariable Long id){
        return sysUserService.getSysUserById(id);
    }

    /**
     * 修改密码
     * @param id
     * @param map
     * @return
     */
    @RequestMapping(value = "/{id}/password", method = RequestMethod.PUT)
    public ResponseEntity<Message> changePassword(@PathVariable Long id, @RequestBody Map map){
        return sysUserService.changePassword(id, map.get("oldPwd").toString(), map.get("newPwd").toString());
    }

}
