package cn.net.share.control.domain;

import lombok.Data;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by shuzhengxing on 2017/8/26.
 */
@Data
@Entity
public class IllegalMovingDetails {

    @Id
    @GeneratedValue
    private Long Id;

    private String plantNumber;

    private String operationName;

    private String carOperationName;

    private String areaName;

    private String startPoint;

    private String endPoint;

    private String lastUser;

    private Date date;

    private String result;

}
