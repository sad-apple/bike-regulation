package cn.net.share.control.dto.customer;

import cn.net.share.control.domain.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * Created by lihao on 2017/7/12.
 */

@Data
public class BikeOwnerDto {

    private String id;
    private Long customerDetailsId; // 客户详细信息字段id
    private List<BikeGroup> bikeGroups;//单车分组列表
    private Long type;// 3.骑行用户 4.单车车主 5.运营组织 6.监管机构
    private List<Bike> bikes; //客户拥有的车辆
    private String remark ;//备注
    private List<SysRole> roles;
    private String idCardNum; //身份证号
    private String birthday;  //生日
    private String username;//登录账号
    private String password;//密码
    private String fullName;//用户姓名
    private String phone;//手机号
    private String email;//邮箱
    private Date enableTime;//启用日期
    private Date disableTime;//停用日期
    private String userStatus;//用户状态 0.停用 1.启用

    public BikeOwnerDto() {}

    public BikeOwnerDto(Customer customer, RiderDetails riderDetails) {
        this.id = customer.getId();
        this.type = customer.getType();
        this.bikeGroups = customer.getBikeGroups();
        this.customerDetailsId = customer.getCustomerDetailsId();
        this.remark = customer.getRemark();
        this.username = customer.getSysUsers().get(0).getUsername();
        this.password = customer.getSysUsers().get(0).getPassword();
        this.fullName = customer.getSysUsers().get(0).getFullName();
        this.email = customer.getSysUsers().get(0).getEmail();
        this.phone = customer.getSysUsers().get(0).getPhone();
        this.userStatus = customer.getSysUsers().get(0).getUserStatus();
        this.idCardNum = riderDetails.getIdCardNumber();
        this.bikes = riderDetails.getBikes();
        this.roles = customer.getSysUsers().get(0).getRoles();
        this.enableTime = customer.getSysUsers().get(0).getEnableTime();
        this.disableTime = customer.getSysUsers().get(0).getDisableTime();

    }

}