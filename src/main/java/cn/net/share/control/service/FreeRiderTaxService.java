package cn.net.share.control.service;

import cn.net.share.control.dao.CarDepositSuperviseRepository;
import cn.net.share.control.dao.CarTaxSuperviseRepository;
import cn.net.share.control.dao.FreeRiderTaxRepository;
import cn.net.share.control.dao.TaxSuperviseReportRepository;
import cn.net.share.control.domain.CarTaxSupervise;
import cn.net.share.control.domain.FreeRiderTax;
import cn.net.share.control.domain.TaxSuperviseReport;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by lihao on 2017/8/17.
 */
@Service
public class FreeRiderTaxService {

    @Autowired
    private FreeRiderTaxRepository freeRiderTaxRepository;

    /**
     * 顺风车税收明细
     * @return
     */
    public ResponseEntity<Message> taxSuperviseDetails() {
        List<FreeRiderTax> freeRiderTaxes = freeRiderTaxRepository.getRandom(10);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, freeRiderTaxes), HttpStatus.OK);
    }


    /**
     * 返回一条数据
     * @return
     */
    public ResponseEntity<Message> getRecord() {
        List<FreeRiderTax> oneRecord = freeRiderTaxRepository.getRandom(1);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, oneRecord), HttpStatus.OK);
    }

}
