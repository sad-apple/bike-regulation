package cn.net.share.control.dto.riderorder;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by zhangshiping on 2017/8/19.
 */
@Data
public class BikeQuantityDto implements Serializable {
    private String bikeId;//单车编号

    private String area;//投放区域

    private String operationOrg;//运营方

    private String manufacturer;//制造商（A，B，C单车制造商）

    private Date accessTime;//投放时间

    private String certificate;//入网资格证

    private Long bikeNum;//区域实投车辆

    private Long bikeNumStandard;//区域应投车辆

    private Long bikeNumDeviation;//投放数量差

    public BikeQuantityDto(String bikeId, String area, String operationOrg, String manufacturer, Date accessTime, String certificate, Long bikeNum, Long bikeNumStandard, Long bikeNumDeviation) {
        this.bikeId = bikeId;
        this.area = area;
        this.operationOrg = operationOrg;
        this.manufacturer = manufacturer;
        this.accessTime = accessTime;
        this.certificate = certificate;
        this.bikeNum = bikeNum;
        this.bikeNumStandard = bikeNumStandard;
        this.bikeNumDeviation = bikeNumDeviation;
    }
}
