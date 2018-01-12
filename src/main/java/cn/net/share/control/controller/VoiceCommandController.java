package cn.net.share.control.controller;

import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.VoiceCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by wangbiao on 2017/8/26.
 * 语音指令 Controller
 */

@RestController
@RequestMapping("voice-command")
public class VoiceCommandController {

    @Autowired
    VoiceCommandService voiceCommandService; // 语音指令 Service

    /**
     * 获取最新一条语音指令
     */
    @RequestMapping(value = "/lastdata", method = RequestMethod.GET)
    public ResponseEntity<Message> getLastData() {
        return voiceCommandService.getLastData();
    }


}