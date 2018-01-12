package cn.net.share.control.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by Fonda on 2017/7/10.
 */
@Data
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class OperationOrgDetails {

    @Id
    @GeneratedValue
    private Long id;

    private String name ; //企业名称 必填

    private String organizeNum ;//组织机构编号

    private Date foundTime;//注册成立日期

    private String represent ;//法人代表

    private String contacts  ;//企业联系人

    private String phone  ;//企业联系电话

    private String dutyPhone ;//24小时值班电话

    private Long staffNum ;//员工数量

    private Integer region[];//区域，省市

    private String address ;//办公地址

    private String registerAddress ;//注册地址

    private String remark;//备注

    @Column(columnDefinition = "varchar(1) default '1' ")
    private String status;//用户状态 0.停用 1.启用

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "operationOrgDetails")
    @JsonIgnore
    private List<OperationRule> operationRules; //运营规则

    public OperationOrgDetails() {}

}
