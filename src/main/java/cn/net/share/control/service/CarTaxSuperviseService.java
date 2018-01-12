package cn.net.share.control.service;

import cn.net.share.control.dao.CarDepositSuperviseRepository;
import cn.net.share.control.dao.CarTaxSuperviseRepository;
import cn.net.share.control.dao.TaxSuperviseReportRepository;
import cn.net.share.control.domain.CarTaxSupervise;
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
public class CarTaxSuperviseService {

    @Autowired
    private CarTaxSuperviseRepository carTaxSuperviseRepository;

    /**
     * 汽车税收明细列表
     * @return
     */
    public ResponseEntity<Message> taxSuperviseDetails() {
        List<CarTaxSupervise> taxSuperviseReportRepositoryAll = carTaxSuperviseRepository.getRandom(10);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, taxSuperviseReportRepositoryAll), HttpStatus.OK);
    }

    /**
     * 返回汽车各区域税收总额
     * @param createTime
     * @return
     */
    public ResponseEntity<Message> totalTaxAndTaxOrg(String createTime) {
        if (createTime == null || "1970-01-01".equals(createTime)) createTime = "";
        List totalTax = carTaxSuperviseRepository.getTotalTaxAndTaxOrg(createTime);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, totalTax), HttpStatus.OK);
    }

    /**
     * 返回一条数据
     * @return
     */
    public ResponseEntity<Message> getRecord() {
        List<CarTaxSupervise> oneRecord = carTaxSuperviseRepository.getRandom(1);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, oneRecord), HttpStatus.OK);
    }
}
