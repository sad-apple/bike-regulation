package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by wangbiao on 2017/7/19.
 * 停放中的单车的信息
 */

@Data
@Entity
public class BikePark {

    @Id
    @GeneratedValue
    private Long id;

    private String bikeId;

    private String bikeTypeId;

    private String userName; // 停放骑行人姓名

    private String idCardNum; // 停放骑行人身份证号

    private String phoneNum; // 停放骑行人手机号

    private Double lon; // 停放点经度

    private Double lat; // 停放点纬度

    private String position; // 停放地点

    public BikePark(){}

    public BikePark(Bike bike, RiderDetails riderDetails, CityPosition cityPo) {
        this.bikeId = bike.getId();
        this.bikeTypeId = bike.getType().getId();
        this.userName = riderDetails.getName();
        this.idCardNum = riderDetails.getIdCardNumber();
        this.phoneNum = riderDetails.getPhoneNum();
        this.lon = cityPo.getLon();
        this.lat = cityPo.getLat();
    }

}