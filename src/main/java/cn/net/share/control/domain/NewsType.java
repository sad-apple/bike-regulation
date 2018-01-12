package cn.net.share.control.domain;

import lombok.Data;

import java.io.Serializable;

/**
 * Created by zhangshiping on 2017/7/31.
 */
@Data
public class NewsType implements Serializable {
    private static final long serialVersionUID = 6317260524358639251L;

    private Long id;//1：优惠；2：公告

    private String name;

    private Long typeSort;

    private String typeRemark;
}
