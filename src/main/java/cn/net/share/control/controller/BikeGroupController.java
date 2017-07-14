package cn.net.share.control.controller;

import cn.net.share.control.domain.SysUser;
import cn.net.share.control.domain.VehicleGroup;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.BikeGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vehiclegroups")
public class BikeGroupController {

    @Autowired
    private BikeGroupService bikeGroupService;

    /**
     * 分页返回当前用户的单车分组
     * @param vehicleGroup
     * @param page
     * @param size
     * @param loginUser
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message>  getVehicleGroupList(VehicleGroup vehicleGroup, int page, int size, @AuthenticationPrincipal SysUser loginUser){
        return bikeGroupService.findByVehicleGroupPage(vehicleGroup,page,size,loginUser);
    }

    /**
     * 返回当前用户的单车分组
     * @param vehicleGroup
     * @param loginUser
     * @return
     */
    @RequestMapping(value ="getAll" , method = RequestMethod.GET)
    public ResponseEntity<Message> getVehicleGroupAll(VehicleGroup vehicleGroup,@AuthenticationPrincipal SysUser loginUser){
        return bikeGroupService.getVehicleGroupAll(vehicleGroup,loginUser);
    }

    /**
     * 返回一个单车分组
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}" , method = RequestMethod.GET)
    public ResponseEntity<Message> getVehicleGroup(@PathVariable String id){
        return bikeGroupService.getVehicleGroup(id);
    }

    /**
     * 创建单车分组
     * @param vehicleGroup
     * @param sysUser
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createVehicleGroup(@RequestBody VehicleGroup vehicleGroup, @AuthenticationPrincipal SysUser sysUser){
        return bikeGroupService.createVehicleGroup(vehicleGroup,sysUser);
    }

    /**
     * 修改单车分组
     * @param vehicleGroup
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}" , method = RequestMethod.PUT)
    public ResponseEntity<Message> updateVehicleGroup(@RequestBody VehicleGroup vehicleGroup,@PathVariable String id){
        return bikeGroupService.updateVehicleGroup(vehicleGroup);
    }

    /**
     * 删除单车分组
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteVehicleGroup(@PathVariable String id){
        return bikeGroupService.deleteVehicleGroup(id);
    }
}
