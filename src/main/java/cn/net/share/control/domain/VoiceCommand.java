package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by wangbiao on 2017/8/26.
 * 语音指令表
 */

@Data
@Entity
public class VoiceCommand {

    @Id
    @GeneratedValue
    private Long id;

    private String word; // 指令

    private Integer executed; // 指令是否已执行：0-否，1-是

    private Double minConfidence; // 语音识别度

    public VoiceCommand() {}

}