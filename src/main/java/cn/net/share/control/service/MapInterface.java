package cn.net.share.control.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@FeignClient(name = "mapInterface", url = "http://api.map.baidu.com")
public interface MapInterface {
    @RequestMapping(value = "/geoconv/v1/", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    String convertCoords(@RequestParam("coords") String coords,
                         @RequestParam("ak")String ak,
                         @RequestParam("from")String from,
                         @RequestParam("to")String to);
}
