package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import java.util.Date;

import static org.bouncycastle.asn1.x500.style.RFC4519Style.name;

/**
 * Created by ${zhaochuanzhi} on 2017/7/28.
 */
@Data
@Entity
public class Fare {

    @Id
    @GeneratedValue
    private Long id;

    private String name; //姓名

    private String userName; // 用户名

    private String plateNumber; //车牌号

    private Date time ;// 付款的时间

    private Double rideAmount; //骑行金额

    private String userType; //用户类型 单车车主或骑行用户

}
