package cn.net.share.control.controller;

import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.customer.BikeOwnerDto;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.BikeownerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by lihao on 2017/7/17.
 */
@RestController
@RequestMapping("bike-owners")
public class BikeOwnerController {

    @Autowired
    private BikeownerService bikeownerService;

    /**
     * 分页返回车主列表
     *
     * @param page
     * @param size
     * @return
     */

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeOwnerList(int page, int size, String username, String fullName) {
        return bikeownerService.getBikeOwnerList(page, size, username, fullName);
    }

    /**
     * 查出一个车主
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeOwnerById(@PathVariable String id) {
        return bikeownerService.getBikeOwnerById(id);
    }

    /**
     * 修改车主信息
     *
     * @param bikeOwnerDto
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Message> updateBikeOwner(@RequestBody BikeOwnerDto bikeOwnerDto, @PathVariable String id) {
        bikeOwnerDto.setId(id);
        return bikeownerService.updateBikeOwner(bikeOwnerDto);
    }

    /**
     * 创建单车车主
     *
     * @param bikeOwnerDto
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createBikeOwner(@RequestBody BikeOwnerDto bikeOwnerDto) {
        return bikeownerService.createBikeOwner(bikeOwnerDto);
    }


    /**
     * 修改单车车主密码
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}/password", method = RequestMethod.PUT)
    public ResponseEntity<Message> changeBikeOwnerPassword(@PathVariable String id,@RequestBody SysUser sysUser){
        return bikeownerService.changeBikeOwnerPassword(id, sysUser);
    }

    /**
     * 删除单车车主
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteBikeOwner(@PathVariable String id) {
        return bikeownerService.deleteBikeOwner(id);
    }
}
