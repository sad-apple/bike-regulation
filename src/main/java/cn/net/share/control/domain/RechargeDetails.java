package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by shuzhengxing on 2017/8/18.
 */
@Data
@Entity

public class RechargeDetails {
    @Id
    @GeneratedValue
    private Long id;

    private String billNumber;

    private String name;

    private String accountNumber;

    private String payType;

    private Date dateTime;

    private String bankName;

    private String cardNumber;

    private String cardType;

    private String state;
}
