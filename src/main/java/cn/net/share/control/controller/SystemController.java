package cn.net.share.control.controller;

import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
public class SystemController {
    @Autowired
    private SystemService systemService;

    /**
     * 登录接口
     * @return
     */
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResponseEntity<Message> user(@AuthenticationPrincipal SysUser sysUser){
        return systemService.user(sysUser);
    }

    /**
     * 用户注册接口
     * @param sysUser
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Message> register(@RequestBody SysUser sysUser){
        return systemService.register(sysUser);
    }

    /**
     * 通过时间戳获取验证码
     * @param timeStamp
     * @return
     */
    @RequestMapping(value = "/random-code", method = RequestMethod.GET)
    public ResponseEntity<Message> getRandomCodeByTimeStamp(String timeStamp){
        return  systemService.getRandomCodeByTimeStamp(timeStamp);
    }

}
