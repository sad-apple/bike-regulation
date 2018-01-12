package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by zhaochuanzhi on 2017/8/16.
 */
@Data
@Entity
public class BikeAdvertisement {

    @Id
    @GeneratedValue
    private Long id;

    private Date deliveryDate; // 投放日期

    private String adType; // 广告类型

    private String adOwner; // 投放商；

    private String adContent; // 广告内容

    private String isComplaint; // 是否收到投诉

    private  String isHandel; // 是否处理

    private String plateNumber ;//车牌号

    private String region; // 所属区域

    private String operationOrgName; // 运营组织名称


}
