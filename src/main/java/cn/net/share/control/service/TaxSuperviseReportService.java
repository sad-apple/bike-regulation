package cn.net.share.control.service;

import cn.net.share.control.dao.TaxSuperviseReportRepository;
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
public class TaxSuperviseReportService {

    @Autowired
    private TaxSuperviseReportRepository taxSuperviseReportRepository;

    /**
     * 分页返回税收明细列表
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> taxSuperviseDetails(int page, int size, TaxSuperviseReport taxSuperviseReport) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page taxSuperviseReportRepositoryAll = taxSuperviseReportRepository.findAll(Example.of(taxSuperviseReport, exampleMatcher), new PageRequest(page - 1, size,new Sort(Sort.Direction.ASC,"id")));
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, taxSuperviseReportRepositoryAll), HttpStatus.OK);
    }

    /**
     * 返回各区域税收总额
     * @param createTime
     * @return
     */
    public ResponseEntity<Message> totalTaxAndTaxOrg(String createTime) {
        if (createTime == null || "1970-01-01".equals(createTime)) createTime = "";
        List totalTax = taxSuperviseReportRepository.getTotalTaxAndTaxOrg(createTime);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, totalTax), HttpStatus.OK);
    }
}
