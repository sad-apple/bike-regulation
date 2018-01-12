package cn.net.share.control.dto.bike;

import cn.net.share.control.domain.*;
import lombok.Data;

import java.io.Serializable;

/**
 * Created by wangbiao on 2017/7/21.
 */

@Data
public class BikePositionDto implements Serializable {

    private String bikeId;
    private Double lon;
    private Double lat;

    public BikePositionDto() {}

    public BikePositionDto(Bike bike, CityPosition cityPosition) {
        this.bikeId = bike.getId();
        this.lon = cityPosition.getLon();
        this.lat = cityPosition.getLat();
    }

    public BikePositionDto(String bikeId, RouteFullLocations routeFullLocations) {
        this.bikeId = bikeId;
        this.lon = routeFullLocations.getLon();
        this.lat = routeFullLocations.getLat();
    }

    public BikePositionDto(String bikeId, BikePark bikePark) {
        this.bikeId = bikeId;
        this.lon = bikePark.getLon();
        this.lat = bikePark.getLat();
    }

    public BikePositionDto(BikePark bikePark) {
        this.lon = bikePark.getLon();
        this.lat = bikePark.getLat();
    }

    public BikePositionDto(BikeTrail bikeTrail) {
        this.lon = bikeTrail.getLon();
        this.lat = bikeTrail.getLat();
    }
}
