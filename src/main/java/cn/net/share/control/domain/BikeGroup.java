package cn.net.share.control.domain;

import cn.net.share.control.dto.bike.BikeGroupDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@EntityListeners(AuditingEntityListener.class)
public class BikeGroup implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid",strategy = "uuid")
    private String id;

    private String name;//分组名称

    private String remark;//备注

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "bike_group_bike", joinColumns = @JoinColumn(name = "bike_group_id"), inverseJoinColumns = @JoinColumn(name = "bike_id"))
    private List<Bike> bikes;//车辆列表

    @ManyToOne
    private Customer customer; //分组所属客户

    @CreatedDate
    private Date createTime;

    @CreatedBy
    private String createUser;

    @LastModifiedDate
    private Date updateTime;

    @LastModifiedBy
    private String updateUser;

    public BikeGroup() {
    }

    public BikeGroup(BikeGroupDto bikeGroupDto) {
        this.name = bikeGroupDto.getName();
        this.remark = bikeGroupDto.getRemark();
    }
}
