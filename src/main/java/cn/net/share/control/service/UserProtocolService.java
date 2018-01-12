package cn.net.share.control.service;

import cn.net.share.control.dao.UserProtocolRepository;
import cn.net.share.control.domain.Problem;
import cn.net.share.control.domain.UserProtocol;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 * Created by zhaochuanzhi on 2017/8/2.
 */
@Service
public class UserProtocolService {

    @Autowired
    private UserProtocolRepository userProtocolRepository;

    private static final Logger logger = LoggerFactory.getLogger(OperationOrgService.class);

    /**
     * 返回用户协议
     * @param id
     * @return
     */
    public ResponseEntity<Message> getUserProtocol(Long id) {
        UserProtocol userProtocol = userProtocolRepository.findOne(id);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, userProtocol), HttpStatus.OK);
    }

    /**
     * 修改用户协议
     * @param userProtocol
     * @return
     */
    public ResponseEntity<Message> modifyUserProtocol(UserProtocol userProtocol) {
       userProtocolRepository.save(userProtocol);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }
}
