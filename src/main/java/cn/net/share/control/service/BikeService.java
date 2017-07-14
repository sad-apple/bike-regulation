package cn.net.share.control.service;

import cn.net.share.control.dao.BikeRepository;
import cn.net.share.control.domain.Bike;
import cn.net.share.control.domain.Customer;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BikeService {

    @Autowired
    private BikeRepository bikeRepository;

    /**
     * 分页返回单车列表
     * @param bike
     * @param page
     * @param size
     * @param loginUser
     * @return
     */
    public ResponseEntity<Message> findByBikePage(Bike bike, int page, int size, SysUser loginUser){
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        if(loginUser.getCustomer()!=null) {
            Customer customer = new Customer();
            customer.setId(loginUser.getCustomer().getId());
            //bike.setCustomer(customer);
        }
        Page bikes = bikeRepository.findAll(Example.of(bike,exampleMatcher),new PageRequest(page - 1, size,new Sort(Sort.Direction.DESC,"createTime")));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bikes);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 返回一个单车
     * @param id
     * @return
     */
    public ResponseEntity<Message> getBike(String id){
        Bike bike = bikeRepository.findOne(id);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bike);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 创建单车
     * @param bike
     * @param sysUser
     * @return
     */
    public ResponseEntity<Message> createBike(Bike bike, SysUser sysUser){
        bikeRepository.save(bike);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 更新单车
     * @param bike
     * @return
     */
    public ResponseEntity<Message> updateBike(Bike bike){
        bikeRepository.save(bike);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 删除单车
     * @param id
     * @return
     */
    public ResponseEntity<Message> deleteBike(String id){
        bikeRepository.delete(id);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
