package cn.net.share.control.service;

import cn.net.share.control.dao.CarPriceSuperviseRepository;
import cn.net.share.control.domain.CarPriceSupervise;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zhaochuanzhi on 2017/8/28.
 */
@Service
public class CarPriceSuperviseService {

    @Autowired
    private CarPriceSuperviseRepository carPriceSuperviseRepository;

    /**
     * 返回随机从数据库中取出的数据
     * @param num
     * @return
     */
    public ResponseEntity<Message> getCarPriceList(int num) {
        List<CarPriceSupervise> carPriceSupervises = carPriceSuperviseRepository.getCarPriceSuperviseList(num);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, carPriceSupervises);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
