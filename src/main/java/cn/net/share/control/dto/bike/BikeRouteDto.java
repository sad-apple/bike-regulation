package cn.net.share.control.dto.bike;

import cn.net.share.control.domain.Bike;
import cn.net.share.control.domain.CityPosition;
import lombok.Data;

import java.io.Serializable;

/**
 * Created by wangbiao on 2017/7/22.
 */

@Data
public class BikeRouteDto implements Serializable {

    private String bikeId;

    private String startPosiName; //起点地点名
    private Double startLon; //起点经度
    private Double startLat; //起点纬度

    private String endPosiName; //终点地点名
    private Double endLon; //终点经度
    private Double endLat; //终点纬度

    public BikeRouteDto() {}

    public BikeRouteDto(String bikeId, CityPosition startPosi, CityPosition endPosi) {
        this.bikeId = bikeId;
        this.startPosiName = startPosi.getPositionName();
        this.startLon = startPosi.getLon();
        this.startLat = startPosi.getLat();
        this.endPosiName = endPosi.getPositionName();
        this.endLon = endPosi.getLon();
        this.endLat = endPosi.getLat();
    }

}
