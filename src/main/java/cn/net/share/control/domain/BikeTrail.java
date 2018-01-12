package cn.net.share.control.domain;

import cn.net.share.control.dto.bike.BikePositionDto;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by wangbiao on 2017/7/21.
 * 车辆轨迹表
 */

@Data
@Entity
public class BikeTrail {

    @Id
    @GeneratedValue
    private Long id;

    private String bikeId;

    private Double lon;

    private Double lat;

    private Long routeId;

    private Date updateTime;

    public BikeTrail() {}

    public BikeTrail(BikePositionDto bikePositionDto) {
        BeanUtils.copyProperties(bikePositionDto, this);
        this.updateTime = new Date();
    }

    public BikeTrail(String bikeId, RouteFullLocations locations, Date date, Long routeId) {
        this.bikeId = bikeId;
        this.lon = locations.getLon();
        this.lat = locations.getLat();
        this.updateTime = date;
        this.routeId = routeId;
    }

}
