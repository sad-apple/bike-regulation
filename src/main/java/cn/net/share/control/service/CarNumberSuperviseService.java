package cn.net.share.control.service;

import cn.net.share.control.dao.CarNumberSuperviseRepository;
import cn.net.share.control.domain.BikeAdvertisement;
import cn.net.share.control.domain.CarNumberSupervise;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.apache.coyote.http11.Constants.a;

/**
 * Created by zhaochuanzhi on 2017/8/25.
 */
@Service
public class CarNumberSuperviseService {

    @Autowired
    private CarNumberSuperviseRepository carNumberSuperviseRepository;


    /**
     * 从数据库中随机获得数据
     * @return
     */
    public ResponseEntity<Message> getCarNumberList() {
        List<CarNumberSupervise> getRandomData = carNumberSuperviseRepository.getCarNumberSuperviseList();
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, getRandomData);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

}
