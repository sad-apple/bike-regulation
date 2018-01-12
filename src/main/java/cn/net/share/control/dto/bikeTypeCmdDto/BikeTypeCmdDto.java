package cn.net.share.control.dto.bikeTypeCmdDto;

import cn.net.share.control.domain.BikeType;
import cn.net.share.control.domain.BikeTypeCmd;
import lombok.Data;

/**
 * Created by wangbiao on 2017/7/12.
 */

@Data
public class BikeTypeCmdDto {

    private String code;  //命令代码
    private String name;  //命令名称
    private String bikeTypeId; //所属单车类型id
    private String bikeTypeName; //所属单车类型名称
    private String remark; //备注

    public BikeTypeCmdDto(){}

    public BikeTypeCmdDto(BikeTypeCmd bikeTypeCmd, BikeType bikeType) {
        this.code = bikeTypeCmd.getCode();
        this.name = bikeTypeCmd.getName();
        this.remark = bikeTypeCmd.getRemark();
        this.bikeTypeId = bikeType.getId();
        this.bikeTypeName = bikeType.getName();
    }

}

