package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by wangbiao on 2017/7/19.
 * 路线沿途所有点
 */

@Data
@Entity
public class RouteFullLocations {

    @Id
    @GeneratedValue
    private Long id;

    private Long routeId; //路线Id

    private Double lat; // 纬度

    private Double lon; // 经度

    private Float speed; // 速度

    private Short direction; // 方向

    public RouteFullLocations() {}

    public RouteFullLocations(RouteFullLocations data) {
        this.lon = data.getLon();
        this.lat = data.getLat();
    }

}
