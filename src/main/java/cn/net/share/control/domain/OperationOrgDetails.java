package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by Fonda on 2017/7/10.
 */
@Data
@Entity
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

    private String address ;//办公地址

    private String registerAddress ;//注册地址
}
