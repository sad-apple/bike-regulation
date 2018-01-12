package cn.net.share.control.domain;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by zhangshiping on 2017/7/17.
 */
@Entity
@Data
public class File implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String businessName;
    private String remark;
    private Integer version;
    private Long source = 0L;

    @ManyToOne
    private FileType fileType;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createTime = new Date();

    public File(){}

    public File(FileType fileType){
        this.fileType = fileType;
    }

}
