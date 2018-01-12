package cn.net.share.control.domain;

import cn.net.share.control.dto.regulatorOrgDetailsDto.RegulatorOrgDetailsDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Administrator on 2017/7/13.
 */
@Data
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@EntityListeners(AuditingEntityListener.class)
public class RegulatorOrgDetails {

    @Id
    @GeneratedValue
    private Long id;                    //id

    private String name;                //机构名称

    private String organizeNum;         //监管机构编号

    private String represent;           //单位领导

    private String contactsName;        //机构联系人

    private String phone;               //机构联系电话

    private Integer region[];           //区域，省市

    private String address;             //办公地址

    private String registerAddress;     //注册地址

    private String remark;              //备注

    public RegulatorOrgDetails(){}

    public RegulatorOrgDetails(RegulatorOrgDetailsDto regulatorOrgDetailsDto) {
        this.id = regulatorOrgDetailsDto.getId();
        this.name = regulatorOrgDetailsDto.getName();
        this.organizeNum = regulatorOrgDetailsDto.getOrganizeNum();
        this.represent = regulatorOrgDetailsDto.getRepresent();
        this.contactsName = regulatorOrgDetailsDto.getContactsName();
        this.phone = regulatorOrgDetailsDto.getPhone();
        this.region = regulatorOrgDetailsDto.getRegion();
        this.address = regulatorOrgDetailsDto.getAddress();
        this.registerAddress = regulatorOrgDetailsDto.getRegisterAddress();
        this.remark = regulatorOrgDetailsDto.getRemark();
    }

}
