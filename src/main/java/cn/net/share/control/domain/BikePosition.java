package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by wangbiao on 2017/7/19.
 */

@Data
@Entity
public class BikePosition implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    private String bikeId;

    private Long routeId;

    private Double lon;

    private Double lat;

    private Date updateTime;

    public BikePosition() {}

    public BikePosition(Bike bike, CityPosition cityPosition, Route route) {
        this.bikeId = bike.getId();
        this.routeId = route.getId();
        this.lon = cityPosition.getLon();
        this.lat = cityPosition.getLat();
    }

    public BikePosition(String bikeId, RouteFullLocations routeFullLocations) {
        this.bikeId = bikeId;
        this.lon = routeFullLocations.getLon();
        this.lat = routeFullLocations.getLat();
    }

}
