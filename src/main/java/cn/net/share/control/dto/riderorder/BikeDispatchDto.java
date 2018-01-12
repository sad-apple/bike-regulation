package cn.net.share.control.dto.riderorder;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by zhangshiping on 2017/8/29.
 */
@Data
public class BikeDispatchDto implements Serializable {
    private String bikeId;//单车编号

    private String area;//投放区域

    private String operationOrg;//运营方

    private Date productionTime;//出厂时间

    private String dispatcher;//调度员

    private int dispatchNum;//调度次数

    private int noDispatchNum;//未调度次数

    private String parkingTime;//停车时长

    private String startAddress;//始发地

    private String endAddress;//目的地

    private String dispatchStatus;//调度情况

    public BikeDispatchDto() {
    }

    public BikeDispatchDto(String bikeId, String area, String operationOrg, Date productionTime, String dispatcher, int dispatchNum, int noDispatchNum, String parkingTime, String startAddress, String endAddress, String dispatchStatus) {
        this.bikeId = bikeId;
        this.area = area;
        this.operationOrg = operationOrg;
        this.productionTime = productionTime;
        this.dispatcher = dispatcher;
        this.dispatchNum = dispatchNum;
        this.noDispatchNum = noDispatchNum;
        this.parkingTime = parkingTime;
        this.startAddress = startAddress;
        this.endAddress = endAddress;
        this.dispatchStatus = dispatchStatus;
    }
}
