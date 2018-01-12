package cn.net.share.control.dto.customer;

import cn.net.share.control.domain.BikeGroup;
import cn.net.share.control.domain.Customer;
import cn.net.share.control.domain.RiderDetails;
import cn.net.share.control.domain.SysRole;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class RiderDto {

    private String id;
    private Long type;
    private List<BikeGroup> bikeGroups;//单车分组列表
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
        this.bikeGroups = customer.getBikeGroups();
        this.customerDetailsId = customer.getCustomerDetailsId();
        this.remark = customer.getRemark();
        //导入sysuser里面的参数
        this.username = customer.getSysUsers().get(0).getUsername();
        this.password = customer.getSysUsers().get(0).getPassword();
        this.fullName = customer.getSysUsers().get(0).getFullName();
        this.phone = customer.getSysUsers().get(0).getPhone();
        this.email = customer.getSysUsers().get(0).getEmail();
        this.userStatus = customer.getSysUsers().get(0).getUserStatus();
        this.roles = customer.getSysUsers().get(0).getRoles();
        this.enableTime = customer.getSysUsers().get(0).getEnableTime();
        this.disableTime = customer.getSysUsers().get(0).getDisableTime();
        //导入riderdetails里面的参数
        this.idCardNumber = riderDetails.getIdCardNumber();
    }

}
