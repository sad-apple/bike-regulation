package cn.net.share.control.dto.customer;

import cn.net.share.control.domain.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.OneToOne;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Data
public class RiderDto {
    private String id;
    private Integer type;// 1.骑行用户 2.单车车主 3.运营组织 4.监管机构

    private List<VehicleGroup>  vehicleGroups;//单车分组列表

    private Long customerDetailsId; // 客户详细信息字段id

    private String remark ;//备注

    private String idCardNumber;//身份证号

    private String birthday;//生日

    private String sex;//性别

    private String username;//登录账号

    private String password;//密码

    private String fullName;//用户姓名

    private String phone;//手机号

    private String email;//邮箱

    private String userStatus;//用户状态 0.停用 1.启用

    private List<SysRole> roles;

    private Date enableTime;//启用日期

    private Date disableTime;//停用日期

    public RiderDto(){
        super();
    }
    public RiderDto(Customer customer, RiderDetails riderDetails) {

        this.id = customer.getId();

        this.type = customer.getType();

        this.vehicleGroups = customer.getVehicleGroups();

        this.customerDetailsId = customer.getCustomerDetailsId();

        this.remark = customer.getRemark();

        //导入sysuser里面的参数
        this.username = customer.getAdmin().getUsername();

        this.password = customer.getAdmin().getPassword();

        this.fullName = customer.getAdmin().getFullName();

        this.phone = customer.getAdmin().getPhone();

        this.email = customer.getAdmin().getEmail();

        this.userStatus = customer.getAdmin().getUserStatus();

        this.roles = customer.getAdmin().getRoles();

        this.enableTime = customer.getAdmin().getEnableTime();

        this.disableTime = customer.getAdmin().getDisableTime();

        //导入riderdetails里面的参数
        this.idCardNumber = riderDetails.getIdCardNumber();

    }
}
