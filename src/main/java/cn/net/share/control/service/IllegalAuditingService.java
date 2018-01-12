package cn.net.share.control.service;

import cn.net.share.control.dao.FaultStatusRepository;
import cn.net.share.control.dao.IllegalAuditingRepository;
import cn.net.share.control.domain.FaultStatus;
import cn.net.share.control.domain.Verify;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageInfo;
import cn.net.share.control.dto.message.MessageType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by shuzhengxing on 2017/8/5.
 */
@Service
public class IllegalAuditingService {

    private static final Logger logger = LoggerFactory.getLogger(RegulatorOrgService.class);

    @Autowired
    private IllegalAuditingRepository illegalAuditingRepository;

    @Autowired
    FaultStatusRepository faultStatusRepository;

    /**
     * 分页返回违停车辆审核列表
     * @param page
     * @param size
     * @param faultStatus
     * @param plateNumber
     * @param bikeType
     * @return
     */
    public ResponseEntity<Message> findByIllegallyParkedPage(int page, int size, String faultStatus, String plateNumber, String time, String bikeType){
        Pageable pageable = new PageRequest(page - 1, size, new Sort(Sort.Direction.ASC, "id"));
        faultStatus = (faultStatus == null || faultStatus.equals("全部")) ? "" : faultStatus;
        plateNumber = plateNumber == null ? "" : plateNumber;
        time = time == null ? "" : time;
        bikeType = bikeType == null ? "" : bikeType;

        Page<Verify> illegallyParkeds = illegalAuditingRepository.findConditon(faultStatus, plateNumber, time, bikeType, pageable);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, illegallyParkeds), HttpStatus.OK);
    }

    /**
     * 得到所有违停审核状态
     * @return
     */
    public ResponseEntity<Message> getAllFaultStatus(){
        List<FaultStatus> faultStatuses = faultStatusRepository.findAll();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS,faultStatuses), HttpStatus.OK);
    }

    /**
     * 违停审核车辆状态改为确定
     * @param verify
     * @return
     */
    public ResponseEntity<Message> determineIllegally(Verify verify) {
        verify.setFaultStatus(null);
        FaultStatus faultStatus = new FaultStatus("2", MessageInfo.DETERMINE);
        verify.setFaultStatus(faultStatus);
        illegalAuditingRepository.save(verify);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 违停审核车辆状态改为取消
     * @param verify
     * @return
     */
    public ResponseEntity<Message> cancelIllegally(Verify verify) {
        verify.setFaultStatus(null);
        FaultStatus faultStatus = new FaultStatus("3", MessageInfo.CANCLE);
        verify.setFaultStatus(faultStatus);
        illegalAuditingRepository.save(verify);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }
}
