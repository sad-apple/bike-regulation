package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by zhaochuanzhi on 2017/8/28.
 */

 // 顺风车的物价及收费监管报表
@Data
@Entity
public class CarPriceSupervise {

    @Id
    @GeneratedValue
    private Long id;

    private String driver; //司机

    private String plateNumber; //车牌号码

    private String phoneNumber; // 手机号码

    private Date startTime; // 开始时间

    private String tripTime; // 行程时长

    private String tripDistance; // 行程距离

    private String receiveAmount; // 应收款

    private String actualAmount; // 实际收款

    private String ranges; // 幅度

    private String isFine; // 是否罚款

    private String fineAmount; // 罚款金额

    private String standards;  // 标准

}
