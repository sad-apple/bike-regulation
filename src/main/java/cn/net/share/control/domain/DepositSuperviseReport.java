package cn.net.share.control.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by lihao on 2017/8/16.
 */
@Data
@Entity
@DynamicUpdate(true)
public class DepositSuperviseReport {

    @Id
    @GeneratedValue
    private Long id;

    private String payName; // 交款人

    private String phoneNumber; // 用户手机号

    private String deposit; // 押金金额

    private String payment; // 支付方式

    private String bankName; // 银行名称

    private String cardNumber; // 银行卡卡号

    private String cardType; // 银行卡类型

    @Column(columnDefinition = "varchar(1) default '1' ")
    private String depositStatus;// 押金状态 0.已退款 1.已付款

    private String violationFine; // 违规罚款

    @CreatedDate
    private Date createTime; // 时间

    public DepositSuperviseReport() {}
}
