package cn.net.share.control.service;

import cn.net.share.control.dao.BikeDispatcherRepository;
import cn.net.share.control.domain.BikeDispatcher;
import cn.net.share.control.domain.RegionReform;
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
 * Created by zhaochuanzhi on 2017/8/18.
 */
@Service
public class BikeDispatcherService {

    @Autowired
    private BikeDispatcherRepository bikeDispatcherRepository;

    /**
     * 返回车辆调度明细
     * @param bikeDispatcher
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> getBikeDispatcherList(BikeDispatcher bikeDispatcher, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page bikeDispatchers = bikeDispatcherRepository.findAll(Example.of(bikeDispatcher, exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bikeDispatchers);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
