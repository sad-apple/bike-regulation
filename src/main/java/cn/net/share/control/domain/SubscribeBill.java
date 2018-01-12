package cn.net.share.control.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by zhaochuanzhi on 2017/8/7.
 */
@Data
@Entity
public class SubscribeBill {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Bike bike; // 单车牌号以及单车类型

    private BigDecimal subscribePrice; // 认购单价

    @ManyToOne
    private OperationOrgDetails operationOrgDetails; // 所属区域

    private String bikeOwnerNumber; // 所属车主手机号码

    private BigDecimal companyAmount; // 公司内部应收款

    private BigDecimal regulatorOrgAmount; // 政府机构应收款

    private BigDecimal operationOrgAmount; // 运营组织应收款

    private String billStatus; // 账单状态

    @CreatedDate
    private Date createTime;


}
