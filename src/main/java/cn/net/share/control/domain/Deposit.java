package cn.net.share.control.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.Date;

/**
 * Created by ${zhaochuanzhi} on 2017/7/28.
 */
@Data
@Entity
public class Deposit {

    @Id
    @GeneratedValue
    private Long id ;

    private String name; // 姓名

    private String userName ; // 用户名

    private Integer depositAmount ; //押金金额

    private Date createTime; // 注册为骑行用户的时间


}
