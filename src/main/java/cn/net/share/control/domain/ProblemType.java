package cn.net.share.control.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by zhaochuanzhi on 2017/8/1.
 */
@Data
@Entity
public class ProblemType {

    @Id
    @GeneratedValue
    private Long id;

    private String name; // 问题类型名称

    @CreatedDate
    private Date createTime; // 创建问题类型的时间
}
