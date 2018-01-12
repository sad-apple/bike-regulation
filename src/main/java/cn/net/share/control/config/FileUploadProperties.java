package cn.net.share.control.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "file")
@Data
public class FileUploadProperties {
    private String filePath;

    private String newsFilePath; // 活动图片地址
    private String requestNewsFilePath;
    private String newsTypeJson;
    private String excelFilePath;   // Excel文件保存地址
}
