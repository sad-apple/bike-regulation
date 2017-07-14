package cn.net.share.control.controller;

import cn.net.share.control.domain.VehicleType;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.BikeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vehicletypes")
public class BikeTypeController {

    @Autowired
    private BikeTypeService bikeTypeService;

    /**
     * 分页返回单车类型列表
     * @param vehicleType
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getVehicleTypeList(VehicleType vehicleType, int page, int size){
        return bikeTypeService.findByVehicleTypePage(vehicleType,page,size);
    }

    /**
     * 返回所有单车类型
     * @return
     */
    @RequestMapping(value = "getAll" , method = RequestMethod.GET)
    public ResponseEntity<Message> getVehicleTypeAllList(){
        return bikeTypeService.getVehicleTypeAllList();
    }

    /**
     * 返回一个单车类型
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}" , method = RequestMethod.GET)
    public ResponseEntity<Message> getVehicleType(@PathVariable String id){
        return bikeTypeService.getVehicleType(id);
    }

    /**
     * 创建一个单车类型
     * @param vehicleType
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createVehicleType(@RequestBody VehicleType vehicleType){
        return bikeTypeService.createVehicleType(vehicleType);
    }

    /**
     * 更新一个单车类型
     * @param vehicleType
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}" ,method = RequestMethod.PUT)
    public ResponseEntity<Message> updateVehicleType(@RequestBody VehicleType vehicleType,@PathVariable String id){
        return bikeTypeService.updateVehicleType(vehicleType);
    }

    /**
     * 删除一个单车类型
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}" ,method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteVehicleType(@PathVariable String id){
        return bikeTypeService.deleteVehicleType(id);
    }
}
