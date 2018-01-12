package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

/**
 * Created by zhaochuanzhi on 2017/8/18.
 * 车辆调度
 */
@Data
@Entity
public class BikeDispatcher {

    @Id
    @GeneratedValue
    private Long id;

    private String plateNumber; // 单车编号

    private String region; // 区域

    private Date date; // 日期

    private String parkStartTime; // 停车开始时间

    private String operationOrgName; // 运营方

    private String dispatchers; // 调度员

    private BigInteger dispatcherTimes; // 调度次数

    private BigInteger unDispatcherTimes; // 未调度次数

    private BigDecimal parkTimeLength; // 停车时长

    private String startPoint; // 始发点

    private String endPoint; // 目的地

    private String dispatcherStatus; // 调度情况


}
