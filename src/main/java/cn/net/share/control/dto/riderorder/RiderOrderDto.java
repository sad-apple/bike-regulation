package cn.net.share.control.dto.riderorder;

import cn.net.share.control.domain.Bike;
import cn.net.share.control.domain.SysUser;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by zhangshiping on 2017/8/16.
 */
@Data
public class RiderOrderDto implements Serializable {
    private Long id;

//    private SysUser sysUser;//骑行用户信息
    private String name;

    private String phone;

    private String idCardNumber;

    private Bike bike;//车辆信息

    private String city;//城市

    private String operationOrg;

    private Date rideTime;//骑行时间

    private String runTime;//骑行时长

    private Long price;//标准价格1元

    private double expectIncome;//标准收费

    private double actualityIncome;//实际收费 1.5/h

    private Long margin;//幅度（（实际收费-标准收费）/实际收费）

    private int isFined;//是否罚款 0不罚款，1罚款

    private Long fineNum;//罚款金额

    public RiderOrderDto() {
    }

    public RiderOrderDto(Bike bike, String name, String phone, String operationOrg, Long price, double expectIncome,
                         double actualityIncome, Long margin, String idCardNumber, Date rideTime, String runTime, int isFined, Long fineNum) {
        this.bike = bike;
        this.name = name;
        this.phone = phone;
        this.idCardNumber = idCardNumber;
        this.city = "合肥";
        this.operationOrg = operationOrg;
        this.rideTime = rideTime;
        this.runTime = runTime;
        this.price = price;
        this.expectIncome = expectIncome;
        this.actualityIncome = actualityIncome;
        this.margin = margin;
        this.isFined = isFined;
        this.fineNum = fineNum;
    }
}
