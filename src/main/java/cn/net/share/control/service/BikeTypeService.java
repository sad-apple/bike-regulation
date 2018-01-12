package cn.net.share.control.service;

import cn.net.share.control.dao.BikeTypeRepository;
import cn.net.share.control.domain.BikeType;
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

import java.util.List;

@Service
public class BikeTypeService {

    @Autowired
    private BikeTypeRepository bikeTypeRepository;

    /**
     * 分页获得单车类型列表
     * @param bikeType
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findByBikeTypePage(BikeType bikeType, int page, int size){
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page bikeTypes = bikeTypeRepository.findAll(Example.of(bikeType,exampleMatcher),new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bikeTypes);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 获得单车类型列表
     * @return
     */
    public ResponseEntity<Message> getBikeTypeAllList(){
        List<BikeType> bikeTypes = bikeTypeRepository.findByOrderByCreateTimeDesc();
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bikeTypes);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 获得单车类型
     * @param id
     * @return
     */
    public ResponseEntity<Message> getBikeType(String id){
        BikeType bikeType = bikeTypeRepository.findOne(id);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bikeType);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 创建单车类型
     * @param bikeType
     * @return
     */
    public ResponseEntity<Message> createBikeType(BikeType bikeType){
        bikeTypeRepository.save(bikeType);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 更新单车类型
     * @param bikeType
     * @return
     */
    public ResponseEntity<Message> updateBikeType(BikeType bikeType){
        bikeTypeRepository.save(bikeType);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 删除单车类型
     * @param id
     * @return
     */
    public ResponseEntity<Message> deleteBikeType(String id){
        bikeTypeRepository.delete(id);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

}
