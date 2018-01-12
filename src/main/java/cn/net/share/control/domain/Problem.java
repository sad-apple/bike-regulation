package cn.net.share.control.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by zhaochuanzhi on 2017/8/1.
 */

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Problem implements Serializable {

    private static final long serialVersionUID = 6317260524358639251L;

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private ProblemType problemType; // 问题类型

    private String problemName; //问题名称

    @Column(length = 100000)
    private String content; // 内容

    @CreatedDate
    private Date createDate;

    @CreatedBy
    private String author;


}
