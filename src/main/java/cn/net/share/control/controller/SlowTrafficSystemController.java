package cn.net.share.control.controller;

import cn.net.share.control.domain.SlowTrafficSystem;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.SlowTrafficSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by lihao on 2017/8/18.
 */
@RestController
@RequestMapping("slow-traffic-system")
public class SlowTrafficSystemController {
    @Autowired
    private SlowTrafficSystemService slowTrafficSystemService;

    /**
     *分页返回慢性交通规则明细
     * @param page
     * @param size
     * @param slowTrafficSystem
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> slowTrafficSystemDetails(int page, int size, SlowTrafficSystem slowTrafficSystem) {
        return slowTrafficSystemService.slowTrafficSystemDetails(page, size, slowTrafficSystem);
    }

    /**
     *返回地点和车辆数
     * @return
     */
    @RequestMapping(value = "/points",method = RequestMethod.GET)
    public ResponseEntity<Message> pointAndAmount() {
        return slowTrafficSystemService.pointAndAmount();
    }
}
