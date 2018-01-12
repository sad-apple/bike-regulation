package cn.net.share.control.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

/**
 * Created by zhaochuanzhi on 2017/8/5.
 */
@Data
@Entity
public class RegulatorBill {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private RegulatorOrgDetails regulatorOrgDetails; // 运营组织

    private Double settlementAmoun;//结算金额

    private String settlementMethod; // 结算方式

    private String billStatus; // 账单状态

    @CreatedDate
    private Date foundTime; //账单时间
}
