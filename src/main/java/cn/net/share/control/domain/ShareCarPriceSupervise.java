package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by zhaochuanzhi on 2017/8/29.
 */

@Data
@Entity
public class ShareCarPriceSupervise {

    @Id
    @GeneratedValue
    private Long id;

    private String name; //姓名

    private String idCardNum; // 身份证

    private String phoneNum; // 手机号码

    private String operationOrg; // 运营方

    private String carNum; // 车辆编号

    private Date startTime; //行驶时间

    private String runningTime; // 行驶时长

    private String standardPrice; // 标准收费

    private String receiveAmount; // 应收款

    private String actualAmount; // 实际收款

    private String ranges; // 幅度

    private String isFine; // 是否罚款

    private String fineAmount; // 罚款金额
}
