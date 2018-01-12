package cn.net.share.control.dto.bikeDemoData;

import cn.net.share.control.domain.TaxSuperviseReport;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by lihao on 2017/8/26.
 */
@Data
public class taxSuperviseDto implements Serializable{
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

    private Date createTime; // 时间

    public taxSuperviseDto(TaxSuperviseReport taxSuperviseReport, String distance, String currentEarn, String totalEarn, String payTax) {
        this.id = taxSuperviseReport.getId();
        this.region = taxSuperviseReport.getRegion();
        this.operationOrg = taxSuperviseReport.getOperationOrg();
        this.bikeId = taxSuperviseReport.getBikeId();
        this.distance = distance;
        this.createTime = taxSuperviseReport.getCreateTime();
        this.currentEarn = currentEarn;
        this.totalEarn = totalEarn;
        this.payTax = payTax;
        this.payment = taxSuperviseReport.getPayment();
        this.taxOrg = taxSuperviseReport.getTaxOrg();
        this.taxRate = taxSuperviseReport.getTaxRate();
    }
}
