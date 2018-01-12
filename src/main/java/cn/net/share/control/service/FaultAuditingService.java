package cn.net.share.control.service;

import cn.net.share.control.dao.FaultAuditingRepository;
import cn.net.share.control.dao.FaultStatusRepository;
import cn.net.share.control.domain.FaultStatus;
import cn.net.share.control.domain.Verify;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
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
 * Created by shuzhengxing on 2017/8/8.
 */
@Service
public class FaultAuditingService {

    @Autowired
    private FaultAuditingRepository faultAuditingRepository;

    @Autowired
    private FaultStatusRepository faultStatusRepository;

    /**
     * 分页返回故障审核列表
     * @param page
     * @param size
     * @param faultStatus
     * @param plateNumber
     * @param bikeType
     * @return
     */
    public ResponseEntity<Message> findByFaultAuditingPage(int page, int size, String faultStatus, String plateNumber, String time, String bikeType) {
        Pageable pageable = new PageRequest(page - 1, size, new Sort(Sort.Direction.ASC, "id"));

        faultStatus = (faultStatus == null || faultStatus.equals("全部")) ? "" : faultStatus;
        plateNumber = plateNumber == null ? "" : plateNumber;
        time = time == null ? "" : time;
        bikeType = bikeType == null ? "" : bikeType;

        Page<Verify> illegallyParkeds = faultAuditingRepository.findConditon(faultStatus, plateNumber, time, bikeType, pageable);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, illegallyParkeds), HttpStatus.OK);
    }

    /**
     * 得到所有审核状态
     * @return
     */
    public ResponseEntity<Message> getAllFaultStatus(){
        List<FaultStatus> faultStatuses = faultStatusRepository.findAll();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS,faultStatuses), HttpStatus.OK);
    }

    /**
     * 故障审核车辆这状态改为确定
     * @param verify
     * @return
     */
    public ResponseEntity<Message> determineIllegal(Verify verify) {
        verify.setFaultStatus(null);
        FaultStatus faultStatuses = new FaultStatus("2","已确定");
        verify.setFaultStatus(faultStatuses);
        faultAuditingRepository.save(verify);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 故障审核车辆状态改为取消
     * @param verify
     * @return
     */
    public ResponseEntity<Message> cancelIllegal(Verify verify) {
        verify.setFaultStatus(null);
        FaultStatus faultStatus = new FaultStatus("3", "已取消");
        verify.setFaultStatus(faultStatus);
        faultAuditingRepository.save(verify);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }
}
