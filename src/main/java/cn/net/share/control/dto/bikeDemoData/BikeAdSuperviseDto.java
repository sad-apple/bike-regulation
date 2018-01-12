package cn.net.share.control.dto.bikeDemoData;

import cn.net.share.control.domain.BikeAdvertisement;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

import static org.apache.coyote.http11.Constants.a;

/**
 * Created by zhaochuanzhi on 2017/8/28.
 */

@Data
public class BikeAdSuperviseDto implements Serializable {

    private static final long serialVersionUID = 1L;

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

    public BikeAdSuperviseDto(BikeAdvertisement bikeAdvertisement){
        this.deliveryDate = bikeAdvertisement.getDeliveryDate();
        this.adType = bikeAdvertisement.getAdType();
        this.adOwner = bikeAdvertisement.getAdOwner();
        this.adContent = bikeAdvertisement.getAdContent();
        this.isComplaint = bikeAdvertisement.getIsComplaint();
        this.isHandel = bikeAdvertisement.getIsHandel();
        this.plateNumber = bikeAdvertisement.getPlateNumber();
        this.region = bikeAdvertisement.getRegion();
        this.operationOrgName = bikeAdvertisement.getOperationOrgName();
    }
    public BikeAdSuperviseDto(BikeAdvertisement bikeAdvertisement, String adContent, String adOwner, String operationOrgName, String region){
        this.deliveryDate = bikeAdvertisement.getDeliveryDate();
        this.adType = bikeAdvertisement.getAdType();
        this.adOwner = adOwner;
        this.adContent = adContent;
        this.isComplaint = bikeAdvertisement.getIsComplaint();
        this.isHandel = bikeAdvertisement.getIsHandel();
        this.plateNumber = bikeAdvertisement.getPlateNumber();
        this.region = region;
        this.operationOrgName = operationOrgName;
    }
}
