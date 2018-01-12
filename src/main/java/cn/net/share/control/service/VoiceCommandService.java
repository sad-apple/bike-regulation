package cn.net.share.control.service;

import cn.net.share.control.dao.VoiceCommandRepository;
import cn.net.share.control.domain.VoiceCommand;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 * Created by wangbiao on 2017/8/26.
 * 语音指令 Service
 */

@Service
public class VoiceCommandService {

    @Autowired
    VoiceCommandRepository voiceCommandRepository;

    // 获取最新一条语音指令
    public ResponseEntity<Message> getLastData() {
        VoiceCommand voiceCommand = voiceCommandRepository.getLastData();
        if (voiceCommand != null) {
            voiceCommand.setExecuted(1);
            voiceCommandRepository.save(voiceCommand);
        }
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, voiceCommand), HttpStatus.OK);
    }

}