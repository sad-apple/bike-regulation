package cn.net.share.control.domain;

import cn.net.share.control.dto.customer.BikeOwnerDto;
import cn.net.share.control.dto.customer.RiderDto;
import cn.net.share.control.dto.regulatorOrgDetailsDto.RegulatorOrgDetailsDto;
import cn.net.share.control.utils.state.UserType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SysUser implements UserDetails {

    @Id
    @GeneratedValue
    private Long id;

    private String username;//登录账号

    private String password;//密码

    private String fullName;//用户姓名

    private Long userType; //0-超级管理员 1-一级管理员 2-普通用户 3-骑行用户 4-单车车主 5-运营企业 6-监管机构

    private String phone;//手机号

    private String email;//邮箱

    private Date enableTime;//启用日期

    private Date disableTime;//停用日期

    @JsonIgnore
    @ManyToOne
    private Customer customer;//所属客户

    @Column(columnDefinition = "varchar(1) default '1' ")
    private String userStatus;//用户状态 0.停用 1.启用

    @CreatedBy
    private String createUser;

    @CreatedDate
    private Date createTime;

    @LastModifiedBy
    private String updateUser;

    @LastModifiedDate
    private Date updateTime;

    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinTable(name = "sys_user_sys_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<SysRole> roles;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Long getUserType() {
        return userType;
    }

    public void setUserType(Long userType) {
        this.userType = userType;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getEnableTime() {
        return enableTime;
    }

    public void setEnableTime(Date enableTime) {
        this.enableTime = enableTime;
    }

    public Date getDisableTime() {
        return disableTime;
    }

    public void setDisableTime(Date disableTime) {
        this.disableTime = disableTime;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(String userStatus) {
        this.userStatus = userStatus;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public List<SysRole> getRoles() {
        return roles;
    }

    public void setRoles(List<SysRole> roles) {
        this.roles = roles;
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> auths = new ArrayList<GrantedAuthority>();
        return auths;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public SysUser(){
        super();
    }

    /**
     * 骑行用户构造方法
     * @param riderDto
     */
    public SysUser(RiderDto riderDto){
        this.userType = UserType.RIDER_USER.value();
        this.username = riderDto.getUsername();
        this.fullName = riderDto.getFullName();
        this.phone = riderDto.getPhone();
        this.email = riderDto.getEmail();
        this.userStatus = riderDto.getUserStatus();
        this.roles = riderDto.getRoles();
        this.enableTime = riderDto.getEnableTime();
        this.disableTime = riderDto.getDisableTime();
    }

    public SysUser(String username, String password, String fullName, Long userType, String phone, List<SysRole> roles) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.userType = userType;
        this.phone = phone;
        this.roles = roles;
    }

    public SysUser(BikeOwnerDto bikeOwnerDto){
        this.userType = UserType.BIKE_OWNER.value();
        this.username = bikeOwnerDto.getUsername();
        if (bikeOwnerDto.getFullName() == null) {
            this.fullName = "";
        } else {
            this.fullName = bikeOwnerDto.getFullName();
        }
        this.phone = bikeOwnerDto.getPhone();
        this.email = bikeOwnerDto.getEmail();
        this.userStatus = bikeOwnerDto.getUserStatus();
        this.roles = bikeOwnerDto.getRoles();
        this.enableTime = bikeOwnerDto.getEnableTime();
        this.disableTime = bikeOwnerDto.getDisableTime();
    }

    public SysUser(RegulatorOrgDetailsDto dto){
        this.username = dto.getAdminName();
        this.userType = UserType.REGULATOR_ORG_USER.value();
        this.fullName = dto.getName();
        this.phone = dto.getPhone();
    }
}
