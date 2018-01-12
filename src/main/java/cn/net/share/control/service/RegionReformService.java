package cn.net.share.control.service;

import cn.net.share.control.dao.RegionReformRepository;
import cn.net.share.control.domain.RegionReform;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhaochuanzhi on 2017/8/18.
 */

@Service
public class RegionReformService {

    @Autowired
    private RegionReformRepository regionReformRepository;

    /**
     * 随机从数据库中取出十条数据
     * @param num
     * @return
     */
    public ResponseEntity<Message> getMajorAreaReformList(int num) {
        List<RegionReform> randomRegionData = regionReformRepository.getRandomRegionData(num);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, randomRegionData);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

}
