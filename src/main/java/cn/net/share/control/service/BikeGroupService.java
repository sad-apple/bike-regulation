package cn.net.share.control.service;

import cn.net.share.control.dao.VehicleGroupRepository;
import cn.net.share.control.domain.Customer;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.domain.VehicleGroup;
import cn.net.share.control.dto.message.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BikeGroupService {

    @Autowired
    private VehicleGroupRepository vehicleGroupRepository;

    /**
     * 分页获得分组列表
     * @param vehicleGroup
     * @param page
     * @param size
     * @param loginUser
     * @return
     */
    public ResponseEntity<Message> findByVehicleGroupPage(VehicleGroup vehicleGroup, int page, int size, SysUser loginUser){
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        if(loginUser.getCustomer()!=null) {
            Customer customer = new Customer();
            customer.setId(loginUser.getCustomer().getId());
            vehicleGroup.setCustomer(customer);
        }
        Page viewGroups = vehicleGroupRepository.findAll(Example.of(vehicleGroup,exampleMatcher),new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, viewGroups);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 获得所有分组
     * @param vehicleGroup
     * @param loginUser
     * @return
     */
    public ResponseEntity<Message> getVehicleGroupAll(VehicleGroup vehicleGroup,SysUser loginUser){
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        if(loginUser.getCustomer()!=null) {
            Customer customer = new Customer();
            customer.setId(loginUser.getCustomer().getId());
            vehicleGroup.setCustomer(customer);
        }
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, vehicleGroupRepository.findAll(Example.of(vehicleGroup,exampleMatcher)));
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 创建单车分组
     * @param vehicleGroup
     * @param sysUser
     * @return
     */
    public ResponseEntity<Message> createVehicleGroup(VehicleGroup vehicleGroup, SysUser sysUser){
        vehicleGroup.setCustomer(sysUser.getCustomer());
        vehicleGroupRepository.save(vehicleGroup);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 更新单车分组
     * @param vehicleGroup
     * @return
     */
    public ResponseEntity<Message> updateVehicleGroup(VehicleGroup vehicleGroup){
        vehicleGroupRepository.save(vehicleGroup);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 返回单车分组
     * @param id
     * @return
     */
    public ResponseEntity<Message> getVehicleGroup(String id){
        VehicleGroup vehicleGroup = vehicleGroupRepository.findOne(id);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS,vehicleGroup);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 删除单车分组
     * @param id
     * @return
     */
    public ResponseEntity<Message> deleteVehicleGroup(String id){
        vehicleGroupRepository.delete(id);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
