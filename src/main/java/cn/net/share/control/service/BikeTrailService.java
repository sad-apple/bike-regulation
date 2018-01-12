package cn.net.share.control.service;

import cn.net.share.control.dao.BikeTrailRepository;
import cn.net.share.control.domain.BikeTrail;
import cn.net.share.control.dto.bike.BikePositionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Created by wangbiao on 2017/7/21.
 */

@Service
public class BikeTrailService {

    @Autowired
    private BikeTrailRepository bikeTrailRepository;

    //保存车辆历史轨迹
    @Async
    @Transactional
    public void saveBikeTrail(BikePositionDto bikePositionDto) {
        BikeTrail bikeTrail = new BikeTrail(bikePositionDto);
        bikeTrailRepository.save(bikeTrail);
    }

}
