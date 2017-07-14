package cn.net.share.control.dto.bike;

import cn.net.share.control.domain.VehicleType;
import cn.net.share.control.domain.VehicleTypeCmd;
import lombok.Data;

/**
 * Created by wangbiao on 2017/7/12.
 */

@Data
public class VehicleTypeCmdDto {
    private String code;  //命令代码
    private String name;  //命令名称
    private String vehicleTypeId; //所属单车类型id
    private String vehicleTypeName; //所属单车类型名称
    private String remark; //备注

    public VehicleTypeCmdDto(){}

    public VehicleTypeCmdDto(VehicleTypeCmd vehicleTypeCmd, VehicleType vehicleType) {
        this.code = vehicleTypeCmd.getCode();
        this.name = vehicleTypeCmd.getName();
        this.remark = vehicleTypeCmd.getRemark();
        this.vehicleTypeId = vehicleType.getId();
        this.vehicleTypeName = vehicleType.getName();
    }

}
