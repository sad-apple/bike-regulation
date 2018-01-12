package cn.net.share.control.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by shuzhengxing on 2017/8/5.
 */
@Data
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@EntityListeners(AuditingEntityListener.class)
public class Verify {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private Long id;

    @ManyToOne
    private BikeType bikeType;

    private String plateNumber ;    //车牌编号

    private String faultType;       //故障类型

    @ManyToOne
    private File file;

    private String remark;

    @ManyToOne
    private FaultStatus faultStatus;

    private Date time;              //举报时间

    @ManyToOne
    private FileType fileType;            // 2 : 违停   3 ： 故障
}
