package cn.net.share.control.service;

import cn.net.share.control.dao.VehicleTypeCmdRepository;
import cn.net.share.control.dao.VehicleTypeRepository;
import cn.net.share.control.domain.VehicleType;
import cn.net.share.control.domain.VehicleTypeCmd;
import cn.net.share.control.dto.bike.VehicleTypeCmdDto;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;

import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class BikeTypeCmdService {

    @Autowired
    private VehicleTypeCmdRepository vehicleTypeCmdRepository;

    @Autowired
    private VehicleTypeRepository vehicleTypeRepository;

    /**
     * 分页返回单车类型命令列表
     * @param vehicleTypeCmd
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findByVehicleTypeCmdPage(VehicleTypeCmd vehicleTypeCmd, int page, int size){
        Integer offsetNum = (page - 1) * size;
        String[] vehicleTypeCmds = vehicleTypeCmdRepository.vehicleTypeCmds(offsetNum, size, vehicleTypeCmd.getName(), vehicleTypeCmd.getCode());
        Map map = Maps.newHashMap();
        map.put("content", vehicleTypeCmds);
        map.put("totalElements", vehicleTypeCmdRepository.vehicleTypeCmdsCounts(vehicleTypeCmd.getName(), vehicleTypeCmd.getCode()));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, map);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 返回单车类型命令
     * @param id
     * @return
     */
    public ResponseEntity<Message> getVehicleTypeCmd(String id){
        VehicleTypeCmd vehicleTypeCmd = vehicleTypeCmdRepository.findOne(id);
        VehicleType vehicleType = vehicleTypeRepository.findOne(vehicleTypeCmd.getVehicleType().getId());
        VehicleTypeCmdDto vehicleTypeCmdDto = new VehicleTypeCmdDto(vehicleTypeCmd, vehicleType);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, vehicleTypeCmdDto);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 创建单车类型命令
     * @param vehicleTypeCmdDto
     * @return
     */
    public ResponseEntity<Message> createVehicleTypeCmd(VehicleTypeCmdDto vehicleTypeCmdDto){
        VehicleType vehicleType = vehicleTypeRepository.findOne(vehicleTypeCmdDto.getVehicleTypeId());
        VehicleTypeCmd vehicleTypeCmd = new VehicleTypeCmd(vehicleTypeCmdDto);
        vehicleTypeCmd.setVehicleType(vehicleType);
        vehicleTypeCmdRepository.save(vehicleTypeCmd);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 更新单车类型命令
     * @param id
     * @param vehicleTypeCmdDto
     * @return
     */
    public ResponseEntity<Message> updateVehicleTypeCmd(String id, VehicleTypeCmdDto vehicleTypeCmdDto){
        VehicleTypeCmd vehicleTypeCmd = vehicleTypeCmdRepository.findOne(id);
        vehicleTypeCmd.setName(vehicleTypeCmdDto.getName());
        vehicleTypeCmd.setCode(vehicleTypeCmdDto.getCode());
        vehicleTypeCmd.setRemark(vehicleTypeCmdDto.getRemark());
        VehicleType vehicleType = vehicleTypeRepository.findOne(vehicleTypeCmdDto.getVehicleTypeId());
        vehicleTypeCmd.setVehicleType(vehicleType);
        vehicleTypeCmdRepository.save(vehicleTypeCmd);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 删除单车类型命令
     * @param id
     * @return ResponseEntity<Message>
     */
    public ResponseEntity<Message> deleteVehicleTypeCmd(String id){
        vehicleTypeCmdRepository.delete(id);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
