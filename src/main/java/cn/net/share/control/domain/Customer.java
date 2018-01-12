package cn.net.share.control.domain;

import cn.net.share.control.dto.customer.BikeOwnerDto;
import cn.net.share.control.dto.regulatorOrgDetailsDto.RegulatorOrgDetailsDto;
import cn.net.share.control.utils.state.UserStatus;
import cn.net.share.control.utils.state.UserType;
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

@Entity
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@EntityListeners(AuditingEntityListener.class)
public class Customer implements Serializable {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid",strategy = "uuid")
    private String id;

    private Long type; // 3.骑行用户 4.单车车主 5.运营组织 6.监管机构

    private Long adminId; //管理员

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    @JsonIgnore
    private List<SysUser> sysUsers;//属于客户的用户账号

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    @JsonIgnore
    private List<BikeGroup> bikeGroups;//单车分组列表

    private Long customerDetailsId; // 客户详细信息字段id

    private String remark ;//备注

    @CreatedBy
    private String createUser;

    @CreatedDate
    private Date createTime;

    @LastModifiedBy
    private String updateUser;

    @LastModifiedDate
    private Date updateTime;

    public Customer(){}

    public Customer(RegulatorOrgDetailsDto regulatorOrgDetailsDto){
        this.customerDetailsId = regulatorOrgDetailsDto.getId();
    }

    /**
     * 骑行用户创建的构造方法
     * @param sysUsers
     * @param riderDetails
     */
    public Customer(List<SysUser> sysUsers,RiderDetails riderDetails){
        this.type = UserType.RIDER_USER.value();
        this.customerDetailsId = riderDetails.getId();
        this.sysUsers = sysUsers;
    }

    public Customer(Long type, SysUser sysUser, String remark, Long customerDetailsId) {
        this.type = type;
        this.adminId = sysUser.getId();
        this.remark = remark;
        this.customerDetailsId = customerDetailsId;

    }

    public Customer(BikeOwnerDto bikeOwnerDto, RiderDetails riderDetails){
        SysUser sysUser = new SysUser(bikeOwnerDto);
        if (UserStatus.DISABLE.toString().equals(bikeOwnerDto.getUserStatus())) {
            sysUser.setDisableTime(new Date());
        } else {
            sysUser.setEnableTime(new Date());
        }
        this.type = UserType.BIKE_OWNER.value();
        this.customerDetailsId = riderDetails.getId();
        this.adminId = sysUser.getId();
    }
}
