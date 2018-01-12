package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by shuzhengxing on 2017/7/24.
 */
@Data
@Entity
public class ParkingArea {
    @Id
    @GeneratedValue
    private Long id;

    private Double radius;          //半径

    private String point_string;   //坐标

    private int type;               //0：圆  1：多边形

    private int isAllowed;           //0: 禁止    1：
}
