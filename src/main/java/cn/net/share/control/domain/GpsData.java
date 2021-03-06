package cn.net.share.control.domain;

import lombok.Data;
import org.springframework.beans.BeanUtils;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
public class GpsData implements Serializable{
    private static final long serialVersionUID = -2070098849919749089L;

    @Id
    @GeneratedValue
    private Long id;

    private String simCardNum; // sim卡号

    private int status; // 状态

    private Double lat; // 纬度

    private Double lon; // 经度

    private Float speed; // 速度

    private Short direction; // 方向

    private Date time; // 时间

    private Integer distance; // 行驶里程(KM)

    private Date receiveTime; // GPS数据接收时间

    public GpsData() {}

    public GpsData(RouteFullLocations points) {
        this.lat = points.getLat();
        this.lon = points.getLon();
        this.direction = (short)(points.getDirection() + 90);
    }

}
