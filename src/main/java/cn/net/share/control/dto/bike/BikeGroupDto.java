package cn.net.share.control.dto.bike;

import cn.net.share.control.domain.Bike;
import cn.net.share.control.domain.BikeGroup;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * Created by lihao on 2017/7/21.
 */
@Data
public class BikeGroupDto {
    private String id;
    private String username;//客户账号
    private String password;//密码
    private String fullName;//客户姓名
    private String name;//分组名称
    private Long type; // 3.骑行用户 4.单车车主 5.运营组织 6.监管机构
    private String remark;//分组备注
    private List<Bike> bikes;//车辆列表
    private Date createTime;
    private String createUser;
    private Date updateTime;
    private String updateUser;

    public BikeGroupDto() {
    }

    public BikeGroupDto(BikeGroup bikeGroup) {
        this.id = bikeGroup.getId();
        this.name = bikeGroup.getName();
        this.remark = bikeGroup.getRemark();
        this.createTime = bikeGroup.getCreateTime();
        this.createUser = bikeGroup.getCreateUser();
        this.updateTime = bikeGroup.getUpdateTime();
        this.updateUser = bikeGroup.getUpdateUser();
    }

}
