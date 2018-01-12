package cn.net.share.control.service;

import cn.net.share.control.dao.CarDepositSuperviseRepository;
import cn.net.share.control.dao.DepositSuperviseReportRepository;
import cn.net.share.control.domain.CarDepositSupervise;
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
 * Created by lihao on 2017/8/24.
 */
@Service
public class CarDepositSuperviseService {

    @Autowired
    private CarDepositSuperviseRepository carDepositSuperviseRepository;

    /**
     * 返回汽车押金明细列表
     * @return
     */
    public ResponseEntity<Message> depositDetails() {
        List<CarDepositSupervise> depositSuperviseReportRepositoryAll = carDepositSuperviseRepository.getRandomData(10);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, depositSuperviseReportRepositoryAll), HttpStatus.OK);
    }

    /**
     * 返回一条数据
     * @return
     */
    public ResponseEntity<Message> random() {
        List<CarDepositSupervise> oneRecord = carDepositSuperviseRepository.getRandomData(1);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, oneRecord), HttpStatus.OK);
    }

}

