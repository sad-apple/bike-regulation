package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by shuzhengxing on 2017/9/1.
 */
@Data
@Entity
public class CarStatisticsDetails {

    @Id
    @GeneratedValue
    private Long id;

    private String billNumber;

    private String carNumber;

    private String carOwner;

    private String telephoneNumber;

    private String orgType;

    private Date date;

    private String type;

    private String content;

    private String result;
}
