package cn.net.share.control.domain;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by zhaochuanzhi on 2017/8/3.
 */
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class DepositStatement implements Serializable {

    private static final long serialVersionUID = 6317260525358649251L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 100000)
    private String content; // 内容


}
