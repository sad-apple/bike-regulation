package cn.net.share.control.controller;

import cn.net.share.control.domain.Problem;
import cn.net.share.control.domain.UserProtocol;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.service.UserProtocolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by zhaochuanzhi on 2017/8/2.
 */
@RestController
@RequestMapping("user-protocol")
public class UserProtocolController {

    @Autowired
    private UserProtocolService userProtocolService;

    /**
     * 获得用户协议
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> getUserProtocol(@PathVariable Long id){
        return userProtocolService.getUserProtocol(id);
    }


    /**
     * 修改用户协议
     * @param userProtocol
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Message> updateUserProtocol(@RequestBody UserProtocol userProtocol){
        return userProtocolService.modifyUserProtocol(userProtocol);
    }
}
