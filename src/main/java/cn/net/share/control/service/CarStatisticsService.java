package cn.net.share.control.service;

import cn.net.share.control.dao.CarStatisticsRepository;
import cn.net.share.control.domain.CarStatisticsDetails;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 * Created by shuzhengxing on 2017/9/1.
 */
@Service
public class CarStatisticsService {

    @Autowired
    private CarStatisticsRepository carStatisticsRepository;

    public ResponseEntity<Message> findAllCarStatistics(CarStatisticsDetails carStatisticsDetails, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page carStatisticss = carStatisticsRepository.findAll(Example.of(carStatisticsDetails, exampleMatcher), new PageRequest(page - 1, size));
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, carStatisticss), HttpStatus.OK);
    }
}
