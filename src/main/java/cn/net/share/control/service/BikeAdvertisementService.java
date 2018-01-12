package cn.net.share.control.service;

import cn.net.share.control.dao.BikeAdvertisementRepository;
import cn.net.share.control.domain.BikeAdvertisement;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhaochuanzhi on 2017/8/16.
 */
@Service
public class BikeAdvertisementService {

    @Autowired
    private BikeAdvertisementRepository bikeAdvertisementRepository;

    /**
     * 分页返回车身广告列表
     * @param bikeAdvertisement
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findBikeAdList(BikeAdvertisement bikeAdvertisement, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page bikeAdvertisements = bikeAdvertisementRepository.findAll(Example.of(bikeAdvertisement, exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bikeAdvertisements);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 返回投放广告的不同类型单车的数量及名称
     * @param foundTime
     * @return
     */
    public ResponseEntity<Message> getTotalBikeNumber(String foundTime) {
        if (foundTime == null) foundTime = "";
        List totalBikeNumber = bikeAdvertisementRepository.totalBikeAdvertisement(foundTime);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, totalBikeNumber);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 从数据库中获得投诉报表的数据
     * @param complaintTime
     * @return
     */
    public  ResponseEntity<Message> getComplaintChart(String complaintTime){
        if (complaintTime == null) complaintTime = "";
        List list = new ArrayList();
        List complaintList = bikeAdvertisementRepository.getComplaintNumber(complaintTime); // 各单车收到投诉的数量
        List handleList = bikeAdvertisementRepository.getHandelNumber(complaintTime); // 各单车收到投诉已处理的数量
        List unHandleList = bikeAdvertisementRepository.getUnhandleNumber(complaintTime); // 各单车收到投诉已处理的数量
        list.add(complaintList);
        list.add(handleList);
        list.add(unHandleList);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, list);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }



}
