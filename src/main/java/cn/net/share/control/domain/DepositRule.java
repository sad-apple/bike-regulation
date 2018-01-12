package cn.net.share.control.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by lihao on 2017/8/1.
 */
@Data
@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DepositRule {

    @Id
    @GeneratedValue
    private Long id;

    private String region;//所属区域

    @Column(columnDefinition = "varchar(2) default '0' ")
    private String depositStatus; //是否需要押金 0.需要 1.不需要

    private Integer depositAmount ; //押金金额

    private String payeeName; //收款人姓名

    private String payeeAccount; //收款人账户

    private String idCardNumber; //收款人身份证号码

    private String bankName; //银行名称

    private String province; //开户行省

    private String address; //开户行地址

    @Column(columnDefinition = "varchar(2) default '2' ")
    private String payStatus; //是否对公付款 2.是 3.否

    @Column(columnDefinition = "varchar(2) default '4' ")
    private String representStatus; //是否法人 4.是 5.否

    @CreatedBy
    private String createUser;

    @CreatedDate
    private Date createTime;

    @LastModifiedBy
    private String updateUser;

    @LastModifiedDate
    private Date updateTime;

    public DepositRule() {}

}
