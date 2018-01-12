package cn.net.share.control.service;

import cn.net.share.control.dao.UserServiceProtocolRepository;
import cn.net.share.control.domain.UserServiceProtocol;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.LogUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 * Created by lihao on 2017/8/3.
 */
@Service
public class UserServiceProcotolService {

    @Autowired
    private UserServiceProtocolRepository userServiceProtocolRepository;

    private static final Logger logger = LoggerFactory.getLogger(OperationOrgService.class);

    /**
     * 返回用户服务协议
     * @param id
     * @return
     */
    public ResponseEntity<Message> getUserServiceProcotol(Long id) {
        LogUtil.info(logger, "UserServiceProcotolService:getUserServiceProcotol, id = " + id);
        UserServiceProtocol userServiceProtocol = userServiceProtocolRepository.findOne(id);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, userServiceProtocol), HttpStatus.OK);
    }

    /**
     * 修改用户服务协议
     * @param userServiceProtocol
     * @return
     */
    public ResponseEntity<Message> modifyUserServiceProcotol( UserServiceProtocol userServiceProtocol) {
        LogUtil.info(logger, "UserServiceProcotolService:getUserServiceProcotol, userServiceProtocol = " + userServiceProtocol);
        userServiceProtocolRepository.save(userServiceProtocol);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

}
