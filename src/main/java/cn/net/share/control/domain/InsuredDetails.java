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
public class InsuredDetails {
    @Id
    @GeneratedValue
    private Long id;

    private String plateNumber;

    private String operationName;

    private Date dateTime;

    private String insuredStatus;

    private String insuredType;

    private String insuredAmount;

}
