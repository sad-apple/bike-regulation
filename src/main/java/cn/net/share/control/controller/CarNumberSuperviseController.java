package cn.net.share.control.controller;

import cn.net.share.control.domain.CarNumberSupervise;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.CarNumberSuperviseService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/8/25.
 */
@RestController
@RequestMapping("car-number-supervises")
public class CarNumberSuperviseController {

    @Autowired
    private CarNumberSuperviseService carNumberSuperviseService;


    /**
     * 从数据库中获取数据
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getCarNumberSuperviseList(){
        return carNumberSuperviseService.getCarNumberList();
    }
}
