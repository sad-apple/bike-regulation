package cn.net.share.control.controller;

import cn.net.share.control.domain.ParkingArea;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.ParkingAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by shuzhengxing on 2017/7/24.
 */
@RestController
@RequestMapping(value = "parking-area")
public class ParkingAreaController {
    @Autowired
    private ParkingAreaService parkingAreaService;

    /***
     * 展示所有区域
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> showOverlay(){
        return parkingAreaService.findAllOverlay();
    }

    /***
     * 保存所选区域
     * @param parkingArea
     * @return
     */
    @RequestMapping( method = RequestMethod.POST)
    public ResponseEntity<Message> saveArea(@RequestBody ParkingArea parkingArea){
        return parkingAreaService.saveParkingArea(parkingArea);
    }

    /**
     * 编辑修改区域
     * @param parkingArea
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Message> editSave(@PathVariable Long id, @RequestBody ParkingArea parkingArea){
        return parkingAreaService.editParkingArea(parkingArea);
    }

    /**
     * 删除区域
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteArea(@PathVariable Long id){
        return parkingAreaService.deleteParkingArea(id);
    }
}
