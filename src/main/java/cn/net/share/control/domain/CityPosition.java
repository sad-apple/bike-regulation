package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by wangbiao on 2017/7/14.
 */

@Data
@Entity
public class CityPosition {

    @Id
    @GeneratedValue
    private Long id;

    private String cityName; //城市名

    private String positionName; //城市地点名

    private Double lon; //城市地点经度

    private Double lat; //城市地点纬度

}
