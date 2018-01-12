package cn.net.share.control.controller;

import cn.net.share.control.domain.BikeType;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.BikeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("bike-types")
public class BikeTypeController {

    @Autowired
    private BikeTypeService bikeTypeService;

    /**
     * 分页返回单车类型列表
     * @param bikeType
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeTypeList(BikeType bikeType, int page, int size){
        return bikeTypeService.findByBikeTypePage(bikeType,page,size);
    }

    /**
     * 返回所有单车类型
     * @return
     */
    @RequestMapping(value = "/collection" , method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeTypeAllList(){
        return bikeTypeService.getBikeTypeAllList();
    }

    /**
     * 返回一个单车类型
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeType(@PathVariable String id){
        return bikeTypeService.getBikeType(id);
    }

    /**
     * 创建一个单车类型
     * @param bikeType
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createBikeType(@RequestBody BikeType bikeType){
        return bikeTypeService.createBikeType(bikeType);
    }

    /**
     * 更新一个单车类型
     * @param bikeType
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public ResponseEntity<Message> updateBikeType(@RequestBody BikeType bikeType, @PathVariable String id){
        return bikeTypeService.updateBikeType(bikeType);
    }

    /**
     * 删除一个单车类型
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" ,method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteBikeType(@PathVariable String id){
        return bikeTypeService.deleteBikeType(id);
    }

}
