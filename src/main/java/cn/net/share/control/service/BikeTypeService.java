package cn.net.share.control.service;

import cn.net.share.control.dao.VehicleTypeRepository;
import cn.net.share.control.domain.VehicleType;
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
    private VehicleTypeRepository vehicleTypeRepository;

    /**
     * 分页获得单车类型列表
     * @param vehicleType
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findByVehicleTypePage(VehicleType vehicleType,int page,int size){
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page vehicleTypes = vehicleTypeRepository.findAll(Example.of(vehicleType,exampleMatcher),new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, vehicleTypes);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 获得单车类型列表
     * @return
     */
    public ResponseEntity<Message> getVehicleTypeAllList(){
        List<VehicleType> vehicleTypes = vehicleTypeRepository.findByOrderByCreateTimeDesc();
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, vehicleTypes);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 获得单车类型
     * @param id
     * @return
     */
    public ResponseEntity<Message> getVehicleType(String id){
        VehicleType vehicleType = vehicleTypeRepository.findOne(id);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, vehicleType);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 创建单车类型
     * @param vehicleType
     * @return
     */
    public ResponseEntity<Message> createVehicleType(VehicleType vehicleType){
        vehicleTypeRepository.save(vehicleType);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 更新单车类型
     * @param vehicleType
     * @return
     */
    public ResponseEntity<Message> updateVehicleType(VehicleType vehicleType){
        vehicleTypeRepository.save(vehicleType);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 删除单车类型
     * @param id
     * @return
     */
    public ResponseEntity<Message> deleteVehicleType(String id){
        vehicleTypeRepository.delete(id);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }
}
