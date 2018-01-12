package cn.net.share.control.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
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
public class Bike implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    private String plateNumber ;//车牌号

    @OneToOne   // todo @ManyToOne
    private BikeType type;//类型

    private String simCode;//SIM卡号

    private String status;//状态

    @ManyToOne
    private RiderDetails riderDetails; //所属车主

    @JsonIgnore
    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany()
    private List<BikeGroup> bikeGroups;//所属单车分组

    private Date factoryDate; //车辆出厂日期

    private String remark;//备注

    @CreatedDate
    private Date createTime;

    @CreatedBy
    private String createUser;

    @LastModifiedDate
    private Date updateTime;

    @LastModifiedBy
    private String updateUser;

    public Bike(){}

    public Bike(String plateNumber, BikeType bikeType, String simCode, Date date, String remark){
        this.plateNumber = plateNumber;
        this.type = bikeType;
        this.simCode = simCode;
        this.factoryDate = date;
        this.remark = remark;
    }

}
