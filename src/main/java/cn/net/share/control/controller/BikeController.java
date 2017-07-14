package cn.net.share.control.controller;

import cn.net.share.control.domain.Bike;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("bikes")
public class BikeController {

    @Autowired
    private BikeService bikeService;

    /**
     * 分页返回当前用户的单车列表
     * @param bike
     * @param page
     * @param size
     * @param loginUser
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeList(Bike bike, int page, int size, @AuthenticationPrincipal SysUser loginUser){
        return bikeService.findByBikePage(bike,page,size,loginUser);
    }

    /**
     * 返回一个单车
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}" , method = RequestMethod.GET)
    public ResponseEntity<Message> getBike(@PathVariable String id){
        return bikeService.getBike(id);
    }

    /**
     * 创建一个单车
     * @param bike
     * @param sysUser
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createBike(@RequestBody Bike bike, @AuthenticationPrincipal SysUser sysUser){
        return bikeService.createBike(bike, sysUser);
    }

    /**
     * 更新一个单车
     * @param bike
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}" , method = RequestMethod.PUT)
    public ResponseEntity<Message> updateBike(@RequestBody Bike bike, @PathVariable String id){
        return bikeService.updateBike(bike);
    }

    /**
     * 删除一个单车
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}" , method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteBike(@PathVariable String id){
        return bikeService.deleteBike(id);
    }
}
