package cn.net.share.control.controller;

import cn.net.share.control.domain.VehicleTypeCmd;
import cn.net.share.control.dto.bike.VehicleTypeCmdDto;
import cn.net.share.control.dto.message.Message;

import cn.net.share.control.service.BikeTypeCmdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vehicletypecmds")
public class BikeTypeCmdController {

    @Autowired
    private BikeTypeCmdService bikeTypeCmdService;

    /**
     * 分页返回单车命令列表
     * @param vehicleTypeCmd
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getVehicleTypeCmdList(VehicleTypeCmd vehicleTypeCmd, int page, int size){
        return bikeTypeCmdService.findByVehicleTypeCmdPage(vehicleTypeCmd,page,size);
    }

    /**
     * 返回一个单车命令
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}" , method = RequestMethod.GET)
    public ResponseEntity<Message> getVehicleTypeCmd(@PathVariable String id){
        return bikeTypeCmdService.getVehicleTypeCmd(id);
    }

    /**
     * 创建一个单车命令
     * @param vehicleTypeCmdDto
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createVehicleTypeCmd(@RequestBody VehicleTypeCmdDto vehicleTypeCmdDto){
        return bikeTypeCmdService.createVehicleTypeCmd(vehicleTypeCmdDto);
    }

    /**
     * 更新一个单车命令
     * @param vehicleTypeCmdDto
     * @return
     */
    @RequestMapping(value = "{id}" ,method = RequestMethod.PUT)
    public ResponseEntity<Message> updateVehicleTypeCmd(@PathVariable String id, @RequestBody VehicleTypeCmdDto vehicleTypeCmdDto){
        return bikeTypeCmdService.updateVehicleTypeCmd(id, vehicleTypeCmdDto);
    }

    /**
     * 删除一个单车命令
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteVehicleTypeCmd(@PathVariable String id){
        return bikeTypeCmdService.deleteVehicleTypeCmd(id);
    }
}
