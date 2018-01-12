package cn.net.share.control.service;

import cn.net.share.control.dao.*;
import cn.net.share.control.domain.*;
import cn.net.share.control.dto.bike.BikePositionDto;
import cn.net.share.control.dto.bike.BikeRouteDto;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.dto.riderorder.RiderOrderDto;
import cn.net.share.control.utils.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by wangbiao on 2017/7/20.
 */

@Service
public class BikePositionService {

    @Autowired
    private RouteService routeService;

    @Autowired
    private BikeTrailService bikeTrailService;

    @Autowired
    private AliveBikeRepository aliveBikeRepository;

    @Autowired
    private RedisRepository redisRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private RouteFullLocationsRepository routeFullLocationsRepository;

    @Autowired
    private BikeTrailRepository bikeTrailRepository;

    @Autowired
    private BikeRepository bikeRepository;

    @Autowired
    private CityPositionRepository cityPositionRepository;

    @Autowired
    private SysUserRepository sysUserRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BikeParkRepository bikeParkRepository;

    //定时保存车辆轨迹数据
//    @Scheduled(fixedDelay = 2*1000)  //定时为20s
//    @Async
    public void saveBikeTrail() {
        List<AliveBike> aliveBikeList = aliveBikeRepository.findAll();
        for (int i = 0; i < aliveBikeList.size(); i ++) {
            String bikeId = aliveBikeList.get(i).getBikeId();
            List<Long> oldTrailIds = bikeTrailRepository.getByBikeIdAndRouteId(bikeId, aliveBikeList.get(i).getRouteId());
            if (null == oldTrailIds || 0 == oldTrailIds.size()) {
                BikeRouteDto bikeRouteDto = (BikeRouteDto)redisRepository.get(bikeId);
                if (null != bikeRouteDto) {
                    Route route = routeRepository.findByStartPointAndEndPoint(bikeRouteDto.getStartPosiName(), bikeRouteDto.getEndPosiName());
                    if (null != route) {
                        List<RouteFullLocations> locations = routeFullLocationsRepository.findByRouteId(route.getId());
                        Date date  = new Date();
                        List<BikeTrail> bikeTrails = new ArrayList<>();
                        for (int j = 0; j < locations.size(); j ++) {
                            date = new Date(date.getTime() + 10000);
                            BikeTrail bikeTrail = new BikeTrail(bikeId, locations.get(j), date, aliveBikeList.get(i).getRouteId());
                            bikeTrails.add(bikeTrail);
                        }
                        bikeTrailRepository.save(bikeTrails);
                    }
                }
            }
        }

        //
        updatePosition();
    }

    //页面初始化获取全部点数据
    public ResponseEntity<Message> getAllPosition() {
        List<BikeRouteDto> bikeRouteDtoList = new ArrayList<>();
        List<AliveBike> aliveBikes = aliveBikeRepository.findAll();
        for (int i = 0; i < aliveBikes.size(); i ++) {
            BikeRouteDto bikeRouteDto = (BikeRouteDto)redisRepository.get(aliveBikes.get(i).getBikeId());
            if (null != bikeRouteDto) {
                bikeRouteDtoList.add(bikeRouteDto);
            }
        }
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, bikeRouteDtoList), HttpStatus.OK);
    }

    //更新
    public void updatePosition() {
        int num = CommonUtils.generateRandom(1);
        //随机删除一批活跃的车
        List<AliveBike> aliveBikeList = aliveBikeRepository.getAliveBikesRandom(num);
        for (int i = 0; i < aliveBikeList.size(); i ++) {
            String bikeId = aliveBikeList.get(i).getBikeId();
            redisRepository.delete(bikeId);
            aliveBikeRepository.delete(aliveBikeList.get(i));
        }
        //随机添加一批车
        int num2 = CommonUtils.generateRandom(1);
        List<Bike> bikeList = bikeRepository.getBikesRandom(num2);
        List<CityPosition> cityPositionList = cityPositionRepository.getPointsRandom(num2);

        for (int i = 0; i < bikeList.size(); i ++) {
            List<Route> endRoute = routeRepository.getRouteRandom(cityPositionList.get(i).getPositionName());
            CityPosition endPosi = cityPositionRepository.findByPositionName(endRoute.get(0).getEndPoint());
            BikeRouteDto bikeRouteDto = new BikeRouteDto(bikeList.get(i).getId(), cityPositionList.get(i), endPosi);
            AliveBike aliveBike = new AliveBike(bikeList.get(i).getId(), endRoute.get(0).getId());
            aliveBikeRepository.save(aliveBike);

            redisRepository.save(bikeList.get(i).getId(), bikeRouteDto);
        }
    }

    //删除redis里数据
    public ResponseEntity<Message> deleteRedisData() {
        List<AliveBike> aliveBikes = aliveBikeRepository.findAll();
        for (int i = 0; i < aliveBikes.size(); i ++) {
            redisRepository.delete(aliveBikes.get(i).getBikeId());
        }
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    //获取redis数据
    public ResponseEntity<Message> getRedisData(Object key) {
        BikePositionDto bikePositionDto = (BikePositionDto)redisRepository.get(key);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, bikePositionDto), HttpStatus.OK);
    }

    //点聚合--历史单车轨迹位置
    public ResponseEntity<Message> getBikePosition() {
        List<BikeTrail> bikeTrails = bikeTrailRepository.getBikePosition();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, bikeTrails), HttpStatus.OK);
    }

    //获取非活跃单车位置
    public ResponseEntity<Message> getInactiveBikePo() {
//        List<BikePositionDto> bikePositionDtos = new ArrayList<>();
//        List<BikePark> points = bikeParkRepository.findAll();
        List<BikePositionDto> bikePositionDtos = (List<BikePositionDto>) redisRepository.get("bikePositionDtos");
//        if (trails == null){
//            return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR), HttpStatus.OK);
//        }
//        for (int i = 0; i < trails.size(); i ++) {
////            BikePositionDto bikePositionDto = new BikePositionDto(points.get(i));
//            BikePositionDto bikePositionDto = new BikePositionDto(trails.get(i));
//            bikePositionDtos.add(bikePositionDto);
//        }
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, bikePositionDtos), HttpStatus.OK);
    }


}
