package cn.net.share.control.domain;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by lihao on 2017/8/17.
 */
@Data
@Entity
@DynamicInsert(true)
public class TaxSuperviseReport {

    @Id
    @GeneratedValue
    private Long id;

    private Long bikeId;  // 单车编号

    private String region;  // 区域

    private String operationOrg; // 运营方

    private String distance;  // 行驶距离

    private String currentEarn; // 本次收益

    private String payment; // 支付方式

    private String taxOrg; // 税收机构

    private String totalEarn; // 收益总额

    private String taxRate; // 税率

    private String payTax; // 应交税费

    @CreatedDate
    private Date createTime; // 时间

}
