package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by wangbiao on 2017/7/18.
 */

@Data
@Entity
public class Route {

    @Id
    @GeneratedValue
    private Long id;

    private String startPoint; //路线起点名 --从CityPosition中获取

    private String endPoint; //路线终点名 --从CityPosition中获取

    public Route() {}

}
