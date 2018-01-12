package cn.net.share.control.dto.riderorder;

import cn.net.share.control.domain.Bike;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by zhangshiping on 2017/8/18.
 */
@Data
public class BikeQualityDto implements Serializable {
    private Bike bike;

    //车辆质量明细
    private String qualityStandard;//质量标准(欧盟标准，国家标准)

    private String manufacturer;//制造商（A，B，C单车制造商）

    private String certificate;//入网资格证

    private Date accessTime;//入网时间

    private int failureNumber;//故障次数

    private int rideNumber;//骑行次数

    private String rideAllTime;//骑行时间

    private double distance;//路程(公里)

    private int isRecall;//是否召回（0；不用，1：需要）

    public BikeQualityDto() {
    }

    public BikeQualityDto(Bike bike, String qualityStandard, String manufacturer, String certificate, Date accessTime, int failureNumber, int rideNumber, String rideAllTime, double distance, int isRecall) {
        this.bike = bike;
        this.qualityStandard = qualityStandard;
        this.manufacturer = manufacturer;
        this.certificate = certificate;
        this.accessTime = accessTime;
        this.failureNumber = failureNumber;
        this.rideNumber = rideNumber;
        this.rideAllTime = rideAllTime;
        this.distance = distance;
        this.isRecall = isRecall;
    }
}
