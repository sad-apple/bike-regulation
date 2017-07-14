package cn.net.share.control.service;

import cn.net.share.control.dao.GpsDataRepository;
import cn.net.share.control.domain.GpsData;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageInfo;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.LogUtil;
import cn.net.share.control.utils.consts.BaiduMap;
import cn.net.share.control.dao.RedisRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class GpsDataService {
    private static final Logger logger = LoggerFactory.getLogger(GpsDataService.class);

    @Autowired
    private RedisRepository redisRepository;

    @Autowired
    private GpsDataRepository gpsDataRepository;

    @Autowired
    private MapInterface mapInterface;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * 根据sim卡号获取最新单车位置信息
     * @param simCardNum
     * @return
     */
    public ResponseEntity<Message> getVehicleNewPosition(String simCardNum){
        GpsData gpsData = null;
        try {
            gpsData = (GpsData) redisRepository.get(simCardNum);
            if (gpsData == null)
                gpsData = findInDB(simCardNum);
        }catch (Exception e){
            gpsData = findInDB(simCardNum);
        } finally {
        }

        String coor = gpsData.getLon()+","+gpsData.getLat();
        String baiduCoor = mapInterface.convertCoords(coor, BaiduMap.AK.value(), BaiduMap.GPS_COORD.value(), BaiduMap.BAIDU_COORD.value());
        try {
            Map map = objectMapper.readValue(baiduCoor, Map.class);
            Map baiduTranceCoor = (Map) ((List) map.get("result")).get(0);
            gpsData.setLon(Float.parseFloat( baiduTranceCoor.get("x")+""));
            gpsData.setLat(Float.parseFloat( baiduTranceCoor.get("y")+""));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, gpsData), HttpStatus.OK);
    }

    /**
     * 根据sim卡号获取单车的历史轨迹
     * @param simCardNum
     * @param beginTime
     * @param endTime
     * @return
     */
    public ResponseEntity<Message> getVhicleHistoryOrbit(String simCardNum, Date beginTime, Date endTime){
        List<GpsData> gpsDataList = gpsDataRepository.findBySimCardNumAndTimeBetween(simCardNum, beginTime, endTime);
        for(int j = 0; j < gpsDataList.size(); j = j + 90) {
            List<GpsData> tempGpsDataList = null;
            tempGpsDataList = gpsDataList.subList(j, Math.min(j + 90,  gpsDataList.size()));
            String formatCoors = makeCoors(tempGpsDataList);
            String baiduCoors = formatCoors(formatCoors);
            LogUtil.info(logger, "getVhicleHistoryOrbit, baiduCoors = " + baiduCoors);

            try {
                Map map = objectMapper.readValue(baiduCoors, Map.class);
                List list = (List) map.get("result");
                for (int i = 0; i < list.size(); i++) {
                    Map coor = (Map) list.get(i);
                    gpsDataList.get(j+i).setLat(Float.parseFloat(coor.get("y").toString()));
                    gpsDataList.get(j+i).setLon(Float.parseFloat(coor.get("x").toString()));
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, gpsDataList), HttpStatus.OK);
    }

    private String makeCoors(List<GpsData> gpsDataList){
        String coors = "";
        for(GpsData gpsData : gpsDataList){
            coors += gpsData.getLon()+","+ gpsData.getLat()+";";
        }

        if(coors.length() > 0){
            coors = coors.substring(0, coors.length() - 1);
        }
        return coors;
    }

    private String formatCoors(String coors){
        return mapInterface.convertCoords(coors, BaiduMap.AK.value(), BaiduMap.GPS_COORD.value(), BaiduMap.BAIDU_COORD.value());
    }

    public GpsData findInDB(String simCardNum){
        GpsData gpsData = gpsDataRepository.findTop1BySimCardNumOrderByTimeDesc(simCardNum);
        try {
            if (gpsData != null)
                redisRepository.save(simCardNum, gpsData);
        } catch (Exception e){
            LogUtil.info(logger, "findInDB: exception = " + MessageInfo.exceptionInfo(e));
        }

        return gpsData;
    }

    public void deleteRedis(String simCardNum){
        redisRepository.delete(simCardNum);
    }
}
