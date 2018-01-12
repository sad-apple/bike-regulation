package cn.net.share.control.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by zhangshiping on 2017/7/17.
 */
@Data
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class FileType implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private Long id;        //1：单车图片    2：违停图片  3：故障图片

    private String name;

    private String value;

    @CreatedBy
    private String createUser;

    @CreatedDate
    private Date createTime;

    @LastModifiedBy
    private String updateUser;

    @LastModifiedDate
    private Date updateTime;

    public FileType() {}

    public FileType(String type) {
        this.name = type;
    }
}
