package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by wangbiao on 2017/7/22.
 * 运动的单车
 */

@Data
@Entity
public class AliveBike {

    @Id
    @GeneratedValue
    private Long id;

    private String bikeId;

    private Long routeId;

    public AliveBike() {}

    public AliveBike(String bikeId, Long routeId) {
        this.bikeId = bikeId;
        this.routeId = routeId;
    }

}
