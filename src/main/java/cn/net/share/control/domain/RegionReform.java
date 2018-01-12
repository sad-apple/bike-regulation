package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigInteger;
import java.util.Date;

/**
 * Created by zhaochuanzhi on 2017/8/18.
 */
@Data
@Entity
public class RegionReform {

    @Id
    @GeneratedValue
    private Long id;

    private String region; // 所属区域

    private String majorRegion; // 重点区域

    private String place; // 地点

    private Date date; // 日期

    private BigInteger bikeNumber; // 区域车辆数量

    private BigInteger existParkFlag; // 已有停车标志

    private BigInteger existParkRail; // 已有停车围栏

    private BigInteger newParkFlag; // 新建停车标志

    private BigInteger newParkRail; // 新建停车栏

    private String isReform; // 是否需要改造

}
