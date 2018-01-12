package cn.net.share.control.controller;

import cn.net.share.control.domain.GpsData;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.GpsDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(value = "gps-datas")
public class GpsDataController {
    @Autowired
    private GpsDataService gpsDataService;

    /**
     * 获取单车最新GPS位置
     * @param simCardNum
     * @return
     */
    @RequestMapping(value = "/new-position/{simCardNum}", method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeNewPosition(@PathVariable String simCardNum){
        return gpsDataService.getBikeNewPosition(simCardNum);
    }

    /**
     * 根据sim卡号获取单车历史轨迹
     * @param simCardNum
     * @param beginTime
     * @param endTime
     * @return
     */
    @RequestMapping(value = "/{simCardNum}", method = RequestMethod.GET)
    public ResponseEntity<Message> getVhicleHistoryOrbit(@PathVariable String simCardNum,
                                                         @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss") Date beginTime,
                                                         @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss") Date endTime){
        return gpsDataService.getVhicleHistoryOrbit(simCardNum, beginTime, endTime);
    }

    /**
     * 手动更新单车最新位置
     * @param simCardNum
     */
    @RequestMapping(value = "/redis", method = RequestMethod.POST)
    public void insertRedis(String simCardNum){
        gpsDataService.findInDB(simCardNum);
    }

    /**
     * 手动删除单车最新位置
     * @param simCardNum
     */
    @RequestMapping(value = "/redis", method = RequestMethod.DELETE)
    public void deleteRedis(String simCardNum){
        gpsDataService.deleteRedis(simCardNum);
    }

    //临时代码：保存gps演示点
    @RequestMapping(method = RequestMethod.POST)
    public void saveData() {
        gpsDataService.saveData();
    }

}
