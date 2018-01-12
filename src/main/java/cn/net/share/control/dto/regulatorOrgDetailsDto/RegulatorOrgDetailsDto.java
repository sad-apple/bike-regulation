package cn.net.share.control.dto.regulatorOrgDetailsDto;

import cn.net.share.control.domain.RegulatorOrgDetails;
import cn.net.share.control.domain.SysUser;
import lombok.Data;

/**
 * Created by shizhengxing on 2017/7/13.
 */
@Data
public class RegulatorOrgDetailsDto {

    private Long id;
    private String name;
    private String adminName;       //管理员账号
    private String password;
    private String organizeNum;     //机构编号
    private String represent;       //单位领导
    private String contactsName;    //机构联系人姓名
    private String phone;
    private Integer region[];       //区域，省市
    private String address;
    private String registerAddress; //注册地址
    private String remark;

    public RegulatorOrgDetailsDto(){}

    public RegulatorOrgDetailsDto(RegulatorOrgDetails regulatorOrgDetails,SysUser sysUser){
        this.id = regulatorOrgDetails.getId();
        this.name = regulatorOrgDetails.getName();
        this.adminName = sysUser.getUsername();
        this.password = sysUser.getPassword();
        this.organizeNum = regulatorOrgDetails.getOrganizeNum();
        this.represent = regulatorOrgDetails.getRepresent();
        this.contactsName = regulatorOrgDetails.getContactsName();
        this.phone = regulatorOrgDetails.getPhone();
        this.region = regulatorOrgDetails.getRegion();
        this.address = regulatorOrgDetails.getAddress();
        this.registerAddress = regulatorOrgDetails.getRegisterAddress();
        this.remark = regulatorOrgDetails.getRemark();
    }

}
