package cn.net.share.control.dto.file;

import cn.net.share.control.domain.File;
import cn.net.share.control.domain.FileType;
import cn.net.share.control.domain.FileUpload;
import lombok.Data;

import java.util.Date;

/**
 * Created by zhangshiping on 2017/7/17.
 */
@Data
public class FileDto {
    private Long id;
    private String name;
    private String businessName;
    private String remark;
    private Integer version;
    private FileType fileType;
    private Date createTime;

    private String fileUrl;

    public FileDto() {
        super();
    }

    public FileDto(File file, FileUpload fileUpload){

        this.id = file.getId();
        this.name = file.getName();
        this.businessName = file.getBusinessName();
        this.remark = file.getRemark();
        this.version = file.getVersion();
        this.fileType = file.getFileType();
        this.createTime = file.getCreateTime();

        this.fileUrl = fileUpload.getFilePath()+this.name;
    }
}
