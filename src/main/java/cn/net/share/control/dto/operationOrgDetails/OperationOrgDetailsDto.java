package cn.net.share.control.dto.operationOrgDetails;

import cn.net.share.control.domain.Customer;
import cn.net.share.control.domain.OperationOrgDetails;
import cn.net.share.control.domain.RegulatorOrgDetails;
import cn.net.share.control.domain.SysUser;
import lombok.Data;
import java.util.Date;

/**
 * Created by Administrator on 2017/7/12.
 */
@Data
public class OperationOrgDetailsDto {

    private Long id;

    private String name ; //企业名称 必填

    private String adminUsername; //管理员账号

    private String adminPassword; //管理员密码

    private String organizeNum ;//组织机构编号

    private Date foundTime;//注册成立日期

    private String represent ;//法人代表

    private String contacts  ;//企业联系人

    private String phone  ;//企业联系电话

    private String dutyPhone ;//24小时值班电话

    private Integer region[];//区域，省市

    private Long staffNum ;//员工数量

    private String address ;//办公地址

    private String registerAddress ;//注册地址

    private String remark ;//备注

    public OperationOrgDetailsDto() {super();}

    public OperationOrgDetailsDto(OperationOrgDetails operationOrgDetails, SysUser sysUser){
        this.id = operationOrgDetails.getId();

        this.name = operationOrgDetails.getName();

        this.adminUsername = sysUser.getUsername();

        this.adminPassword = sysUser.getPassword();

        this.organizeNum = operationOrgDetails.getOrganizeNum();

        this.represent = operationOrgDetails.getRepresent();

        this.contacts = operationOrgDetails.getContacts();

        this.phone = operationOrgDetails.getPhone();

        this.address = operationOrgDetails.getAddress();

        this.registerAddress = operationOrgDetails.getRegisterAddress();

        this.remark = operationOrgDetails.getRemark();

        this.staffNum = operationOrgDetails.getStaffNum();

        this.dutyPhone = operationOrgDetails.getDutyPhone();

        this.foundTime = operationOrgDetails.getFoundTime();

        this.region = operationOrgDetails.getRegion();
    }

}
