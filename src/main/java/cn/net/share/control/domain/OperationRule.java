package cn.net.share.control.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by lihao on 2017/8/5.
 */
@Data
@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@JsonIgnoreProperties(ignoreUnknown = true)
@EntityListeners(AuditingEntityListener.class)
public class OperationRule {

    @Id
    @GeneratedValue
    private Long id;

    private String region; //所属区域

    @ManyToOne
    private OperationOrgDetails operationOrgDetails; //所属运营组织

    private String bikeType; //车辆类型

    private Double price; //认购单价

    private Double proportion; //分成比例

    private Long accountPattern; //计费方式

    private Double rideCost; //骑行费用

    private Double riderFreeTime; //骑行用户免费时间

    private Double bikeOwnerFreeTime; //认购用户免费时间

    @CreatedDate
    private Date createTime;

    @LastModifiedDate
    private Date updateTime;

}
