package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by wangbiao on 2017/8/29.
 * 违停单车信息
 */

@Data
@Entity
public class BikeIllegalPark {

    @Id
    @GeneratedValue
    private Long id;

    private String bikeId; // 单车编号

    private String operator; // 运营方

    // 违停人
    private String userName; // 违停人

    private String idCardNum; // 违停人身份证

    private String userPhoneNum; // 违停人手机号

    private Date time; // 违停时间

    private Integer userRespond; // 违停人响应情况：0-未响应  1-已响应

    private Integer userFine; // 违停人罚款

    // 运营方
    private String opName; // 运营方摆渡人

    private String opPhoneNum; // 运营方手机号

    private Integer opRespond; // 运营方响应情况：0-未响应  1-已响应

    private Integer opFine; // 运营方罚款

    //
    private Integer policeRespond; // 警力处理响应情况：0-未响应  1-已响应

    private Integer dealResult; // 处理结果：0-未处理  1-已处理

    public BikeIllegalPark() {}

}