package cn.net.share.control.service;

import cn.net.share.control.dao.FenceAreaRepository;
import cn.net.share.control.domain.FenceArea;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Created by shuzhengxing on 2017/8/18.
 */
@Service
public class FenceAreaService {
    @Autowired
    private FenceAreaRepository fenceAreaRepository;

    public ResponseEntity<Message> findAllFenceArea(){
        List<FenceArea> fenceAreas = fenceAreaRepository.findAll();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, fenceAreas), HttpStatus.OK);
    }
}
