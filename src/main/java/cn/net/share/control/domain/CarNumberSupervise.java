package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigInteger;
import java.util.Date;

/**
 * Created by zhaochuanzhi on 2017/8/25.
 */
@Data
@Entity
public class CarNumberSupervise {

    @Id
    @GeneratedValue
    private Long id;

    private String area; // 所属区域

    private String tradingArea; // 商圈

    private Double lon;

    private Double lat;

    private Date foundTime; // 日期

    private BigInteger emptyCarNum; // 空车数量

    private BigInteger passengerNum; // 载客数量

    private BigInteger freeCarNum; // 顺风车数量

    private BigInteger fastCarNUm; // 快车运营数量

    private BigInteger carTotalNum; // 车辆总数

}
