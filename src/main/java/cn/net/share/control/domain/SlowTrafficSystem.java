package cn.net.share.control.domain;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by lihao on 2017/8/17.
 */
@Data
@Entity
@DynamicInsert(true)
public class SlowTrafficSystem {

    @Id
    @GeneratedValue
    private Long id;

    private String region; //所属区域

    private String place; //地点

    private Integer bikeAmount; //路口过车

    private Integer dockPoint; //周边停放点

    private Integer slowChannel; //慢性通道

    private Integer slowFacility; //慢性过车设施

    @Column(columnDefinition = "varchar(1) default '0' ")
    private String newFacilityStatus;//是否新建设施 0.否 1.是

    private Double lon; //地点经度

    private Double lat; //地点纬度

    @CreatedDate
    private Date createTime; //时间

}
