package cn.net.share.control.controller;

import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.customer.RiderDto;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.CustomerService;
import cn.net.share.control.service.RiderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Created by zhangshiping on 2017/7/15.
 */
@RestController
@RequestMapping("riders")
public class RiderController {

    @Autowired
    private RiderService riderService;

    /**
     * 分页返回骑行用户列表
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getRiderList(int page, int size, String username, String fullName){
        return riderService.getRiderList(page,size,username,fullName);
    }

    /**
     * 创建骑行用户
     * @param riderDto
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createRider(@RequestBody RiderDto riderDto){
        return riderService.createRider(riderDto);
    }

    /**
     * 修改骑行用户
     * @param riderDto
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" , method = RequestMethod.PUT)
    public ResponseEntity<Message> updateRider(@RequestBody RiderDto riderDto,@PathVariable String id){
        riderDto.setId(id);
        return riderService.updateRider(riderDto);
    }

    /**
     * 查出一个骑行用户
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public ResponseEntity<Message> getRiderById(@PathVariable String id){
        return riderService.getRiderById(id);
    }

    /**
     * 修改骑行用户密码
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}/update-password" , method = RequestMethod.PUT)
    public ResponseEntity<Message> changeRiderPW(@PathVariable String id,@RequestBody SysUser sysUser){
        return riderService.changePassword(id, sysUser);
    }

    /**
     * 删除骑行用户
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteRider(@PathVariable  String id){
        return riderService.deleteRider(id);
    }

    /**
     * 骑行用户升级
     * @param map
     * @return
     */
    @RequestMapping(value = "/upgrade",method = RequestMethod.PUT)
    public ResponseEntity<Message> upgrade(@RequestBody Map map){
        return riderService.upgrade(map.get("id").toString());
    }

}
