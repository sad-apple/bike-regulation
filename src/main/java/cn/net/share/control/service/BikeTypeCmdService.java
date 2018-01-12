package cn.net.share.control.service;

import cn.net.share.control.dao.BikeTypeCmdRepository;
import cn.net.share.control.dao.BikeTypeRepository;
import cn.net.share.control.domain.BikeType;
import cn.net.share.control.domain.BikeTypeCmd;
import cn.net.share.control.dto.bike.BikeTypeCmdDto;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;

import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class BikeTypeCmdService {

    @Autowired
    private BikeTypeCmdRepository bikeTypeCmdRepository;

    @Autowired
    private BikeTypeRepository bikeTypeRepository;

    /**
     * 分页返回单车类型命令列表
     * @param bikeTypeCmd
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findByBikeTypeCmdPage(BikeTypeCmd bikeTypeCmd, int page, int size){
        Integer offsetNum = (page - 1) * size;
        String[] bikeTypeCmds = bikeTypeCmdRepository.bikeTypeCmds(offsetNum, size, bikeTypeCmd.getName(), bikeTypeCmd.getCode());
        Map map = Maps.newHashMap();
        map.put("content", bikeTypeCmds);
        map.put("totalElements", bikeTypeCmdRepository.bikeTypeCmdsCounts(bikeTypeCmd.getName(), bikeTypeCmd.getCode()));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, map);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 返回单车类型命令
     * @param id
     * @return
     */
    public ResponseEntity<Message> getBikeTypeCmd(String id){
        BikeTypeCmd bikeTypeCmd = bikeTypeCmdRepository.findOne(id);
        BikeType bikeType = bikeTypeRepository.findOne(bikeTypeCmd.getBikeType().getId());
        BikeTypeCmdDto bikeTypeCmdDto = new BikeTypeCmdDto(bikeTypeCmd, bikeType);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bikeTypeCmdDto);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 创建单车类型命令
     * @param bikeTypeCmdDto
     * @return
     */
    public ResponseEntity<Message> createBikeTypeCmd(BikeTypeCmdDto bikeTypeCmdDto){
        BikeType bikeType = bikeTypeRepository.findOne(bikeTypeCmdDto.getBikeTypeId());
        BikeTypeCmd bikeTypeCmd = new BikeTypeCmd(bikeTypeCmdDto);
        bikeTypeCmd.setBikeType(bikeType);
        bikeTypeCmdRepository.save(bikeTypeCmd);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 更新单车类型命令
     * @param id
     * @param bikeTypeCmdDto
     * @return
     */
    public ResponseEntity<Message> updateBikeTypeCmd(String id, BikeTypeCmdDto bikeTypeCmdDto){
        BikeTypeCmd bikeTypeCmd = bikeTypeCmdRepository.findOne(id);
        bikeTypeCmd.setName(bikeTypeCmdDto.getName());
        bikeTypeCmd.setCode(bikeTypeCmdDto.getCode());
        bikeTypeCmd.setRemark(bikeTypeCmdDto.getRemark());
        BikeType bikeType = bikeTypeRepository.findOne(bikeTypeCmdDto.getBikeTypeId());
        bikeTypeCmd.setBikeType(bikeType);
        bikeTypeCmdRepository.save(bikeTypeCmd);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 删除单车类型命令
     * @param id
     * @return ResponseEntity<Message>
     */
    public ResponseEntity<Message> deleteBikeTypeCmd(String id){
        bikeTypeCmdRepository.delete(id);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

}
