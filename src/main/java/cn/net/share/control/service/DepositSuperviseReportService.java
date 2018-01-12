package cn.net.share.control.service;

import cn.net.share.control.dao.DepositSuperviseReportRepository;
import cn.net.share.control.domain.DepositRule;
import cn.net.share.control.domain.DepositSuperviseReport;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.LogUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lihao on 2017/8/17.
 */
@Service
public class DepositSuperviseReportService {

    @Autowired
    private DepositSuperviseReportRepository depositSuperviseReportRepository;

    /**
     * 返回押金明细列表
     * @return
     */
    public ResponseEntity<Message> depositDetails() {
        List<DepositSuperviseReport> depositSuperviseReportRepositoryAll = depositSuperviseReportRepository.getRandomData(10);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, depositSuperviseReportRepositoryAll), HttpStatus.OK);
    }


    /**
     * 返回一条数据
     * @return
     */
    public ResponseEntity<Message> random() {
        List<DepositSuperviseReport> oneRecord = depositSuperviseReportRepository.getRandomData(1);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, oneRecord), HttpStatus.OK);
    }

}

