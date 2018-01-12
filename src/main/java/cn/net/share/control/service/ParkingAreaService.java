package cn.net.share.control.service;

import cn.net.share.control.dao.ParkingAreaRepository;
import cn.net.share.control.domain.ParkingArea;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageInfo;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by shuzhengxing on 2017/7/24.
 */
@Service
public class ParkingAreaService {
    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(RegulatorOrgService.class);

    @Autowired()
    private ParkingAreaRepository parkingAreaRepository;

    /***
     * 展示区域
     * @return
     */
    public ResponseEntity<Message> findAllOverlay() {
        List<ParkingArea> parkingAreas = parkingAreaRepository.findAll();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS,parkingAreas), HttpStatus.OK);
    }

    /***
     * 保存区域
     * @param parkingArea
     * @return
     */
    public ResponseEntity<Message> saveParkingArea(ParkingArea parkingArea){
        parkingAreaRepository.save(parkingArea);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /***
     * 修改区域
     * @param parkingArea
     * @return
     */
    public ResponseEntity<Message> editParkingArea(ParkingArea parkingArea) {
        parkingAreaRepository.save(parkingArea);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS),HttpStatus.OK);
    }

    /**
     * 删除区域
     * @param id
     * @return
     */
    public ResponseEntity<Message> deleteParkingArea(Long id){
        parkingAreaRepository.delete(id);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS),HttpStatus.OK);
    }
}
