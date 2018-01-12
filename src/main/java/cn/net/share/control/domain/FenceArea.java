package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by shuzhengxing on 2017/8/18.
 */
@Data
@Entity
public class FenceArea {
    @Id
    @GeneratedValue
    private Long id;

    private String areaName;

    private Date date;

    private String hotTimeBikeNum;

    private String lowTimeBikeNum;

    private String forbiddenAreaNum;

    private String forbiddenArea;

    private String parkedAreaNum;

    private String parkedArea;

    private String hotNumToAreaNum;

    private String hotNumToArea;

    private String lowNumToAreaNum;

    private String lowNumToArea;

    private String need;

}
