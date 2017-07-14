package cn.net.share.control.controller;

import cn.net.share.control.service.MapInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/maps")
public class MapController {

    @Autowired
    private MapInterface mapInterface;

    @RequestMapping(value = "/revert", method = RequestMethod.GET)
    public String revertToBaiduMap(String coords){
        return mapInterface.convertCoords(coords, "edjdQVlzNGsIMfbAxC645sIVFicrujMM", "1", "5");
    }
}
