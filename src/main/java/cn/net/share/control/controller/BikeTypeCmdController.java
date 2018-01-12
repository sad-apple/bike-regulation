package cn.net.share.control.controller;

import cn.net.share.control.domain.BikeTypeCmd;
import cn.net.share.control.dto.bike.BikeTypeCmdDto;
import cn.net.share.control.dto.message.Message;

import cn.net.share.control.service.BikeTypeCmdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("biketypecmds")
public class BikeTypeCmdController {

    @Autowired
    private BikeTypeCmdService bikeTypeCmdService;

    /**
     * 分页返回单车命令列表
     * @param bikeTypeCmd
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeTypeCmdList(BikeTypeCmd bikeTypeCmd, int page, int size){
        return bikeTypeCmdService.findByBikeTypeCmdPage(bikeTypeCmd,page,size);
    }

    /**
     * 返回一个单车命令
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}" , method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeTypeCmd(@PathVariable String id){
        return bikeTypeCmdService.getBikeTypeCmd(id);
    }

    /**
     * 创建一个单车命令
     * @param bikeTypeCmdDto
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createBikeTypeCmd(@RequestBody BikeTypeCmdDto bikeTypeCmdDto){
        return bikeTypeCmdService.createBikeTypeCmd(bikeTypeCmdDto);
    }

    /**
     * 更新一个单车命令
     * @param bikeTypeCmdDto
     * @return
     */
    @RequestMapping(value = "{id}" ,method = RequestMethod.PUT)
    public ResponseEntity<Message> updateBikeTypeCmd(@PathVariable String id, @RequestBody BikeTypeCmdDto bikeTypeCmdDto){
        return bikeTypeCmdService.updateBikeTypeCmd(id, bikeTypeCmdDto);
    }

    /**
     * 删除一个单车命令
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteBikeTypeCmd(@PathVariable String id){
        return bikeTypeCmdService.deleteBikeTypeCmd(id);
    }
}
