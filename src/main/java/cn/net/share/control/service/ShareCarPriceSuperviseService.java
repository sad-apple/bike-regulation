package cn.net.share.control.service;

import cn.net.share.control.dao.ShareCarPriceSuperviseRepository;
import cn.net.share.control.domain.CarPriceSupervise;
import cn.net.share.control.domain.ShareCarPriceSupervise;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zhaochuanzhi on 2017/8/29.
 */
@Service
public class ShareCarPriceSuperviseService {

    @Autowired
    private ShareCarPriceSuperviseRepository shareCarPriceSuperviseRepository;

    /**
     * 随机从数据库中取出数据
     * @param num
     * @return
     */
    public ResponseEntity<Message> getShareCarPriceList(int num) {
        List<ShareCarPriceSupervise> shareCarPriceSupervises = shareCarPriceSuperviseRepository.getShareCarPriceSuperviseList(num);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, shareCarPriceSupervises);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
