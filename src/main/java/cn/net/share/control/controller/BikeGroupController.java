package cn.net.share.control.controller;

import cn.net.share.control.domain.BikeGroup;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.bike.BikeGroupDto;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.BikeGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("bike-groups")
public class BikeGroupController {

    @Autowired
    private BikeGroupService bikeGroupService;

    /**
     * 分页返回当前用户的单车分组
     * @param name
     * @param page
     * @param size
     * @param loginUser
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeGroupList(String name, int page, int size, @AuthenticationPrincipal SysUser loginUser){
        return bikeGroupService.findByBikeGroupPage(name,page,size,loginUser);
    }

    /**
     * 返回当前用户的单车分组
     * @param bikeGroup
     * @param loginUser
     * @return
     */
    @RequestMapping(value ="/collection" , method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeGroupAll(BikeGroup bikeGroup, @AuthenticationPrincipal SysUser loginUser){
        return bikeGroupService.getBikeGroupAll(bikeGroup,loginUser);
    }

    /**
     * 返回一个单车分组
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeGroup(@PathVariable String id){
        return bikeGroupService.getBikeGroup(id);
    }

    /**
     * 创建单车分组
     * @param bikeGroupDto
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createBikeGroup(@RequestBody BikeGroupDto bikeGroupDto){
        return bikeGroupService.createBikeGroup(bikeGroupDto);
    }

    /**
     * 修改单车分组
     * @param bikeGroupDto
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" , method = RequestMethod.PUT)
    public ResponseEntity<Message> updateBikeGroup(@RequestBody BikeGroupDto bikeGroupDto, @PathVariable String id){
        return bikeGroupService.updateBikeGroup(bikeGroupDto);
    }

    /**
     * 删除单车分组
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteBikeGroup(@PathVariable String id){
        return bikeGroupService.deleteBikeGroup(id);
    }
}
