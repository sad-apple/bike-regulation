package cn.net.share.control.service;

import cn.net.share.control.dao.DepositStatementRepository;
import cn.net.share.control.domain.DepositStatement;
import cn.net.share.control.domain.UserProtocol;
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
 * Created by zhaochuanzhi on 2017/8/3.
 */

@Service
public class DepositStatementService {

    @Autowired
    private DepositStatementRepository depositStatementRepository;

    private static final Logger logger = LoggerFactory.getLogger(OperationOrgService.class);

    /**
     * 返回押金说明
     * @param id
     * @return
     */
    public ResponseEntity<Message> getDepositStatement(Long id) {
        DepositStatement depositStatement = depositStatementRepository.findOne(id);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, depositStatement), HttpStatus.OK);
    }

    /**
     * 修改押金说明
     * @param depositStatement
     * @return
     */
    public ResponseEntity<Message> modifyDepositStatement(DepositStatement depositStatement) {
        depositStatementRepository.save(depositStatement);
        LogUtil.info(logger,"The depositStatement has been updated");
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }
}
