package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by zhangshiping on 2017/7/15.
 */
@Data
@Entity
public class FileUpload {
    @Id
    @GeneratedValue
    private Long id;

    private String filePath;//上传路径

    public FileUpload() {}

}
