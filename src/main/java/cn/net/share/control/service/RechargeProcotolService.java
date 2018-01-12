package cn.net.share.control.service;

import cn.net.share.control.dao.RechargeProtocolRepository;
import cn.net.share.control.domain.RechargeProtocol;
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
public class RechargeProcotolService {

    @Autowired
    private RechargeProtocolRepository rechargeProtocolRepository;

    private static final Logger logger = LoggerFactory.getLogger(OperationOrgService.class);

    /**
     * 返回充值协议
     * @param id
     * @return
     */
    public ResponseEntity<Message> getRechargeProcotol(Long id) {
        LogUtil.info(logger, "RechargeProcotolService:getRechargeProcotol, id = " + id);
        RechargeProtocol rechargeProtocol = rechargeProtocolRepository.findOne(id);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, rechargeProtocol), HttpStatus.OK);
    }

    /**
     * 修改充值协议
     * @param rechargeProtocol
     * @return
     */
    public ResponseEntity<Message> modifyRechargeProcotol( RechargeProtocol rechargeProtocol) {
        LogUtil.info(logger, "RechargeProcotolService:modifyRechargeProcotol, rechargeProtocol = " + rechargeProtocol);
        rechargeProtocolRepository.save(rechargeProtocol);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

}
