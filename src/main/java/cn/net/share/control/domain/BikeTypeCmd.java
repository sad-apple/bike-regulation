package cn.net.share.control.domain;


import cn.net.share.control.dto.bike.BikeTypeCmdDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@EntityListeners(AuditingEntityListener.class)
public class BikeTypeCmd {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid",strategy = "uuid")
    private String id;

    private String code;  //命令代码

    private String name;  //命令名称

    @JsonIgnore
    @ManyToOne
    private BikeType bikeType; //所属单车类型

    private String remark; //备注

    @CreatedDate
    private Date createTime;

    @CreatedBy
    private String createUser;

    @LastModifiedDate
    private Date updateTime;

    @LastModifiedBy
    private String updateUser;

    public BikeTypeCmd(){}

    public BikeTypeCmd(BikeTypeCmdDto bikeTypeCmdDto) {
        this.code = bikeTypeCmdDto.getCode();
        this.name = bikeTypeCmdDto.getName();
        this.remark = bikeTypeCmdDto.getRemark();
    }

}
