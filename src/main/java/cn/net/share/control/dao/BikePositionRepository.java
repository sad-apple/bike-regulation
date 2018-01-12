package cn.net.share.control.dao;

import cn.net.share.control.domain.BikePosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by wangbiao on 2017/7/20.
 */
public interface BikePositionRepository extends JpaRepository<BikePosition, Long> {

    //根据车辆id和路线id获取最新坐标点
    @Query(nativeQuery = true, value = "select * from bike_position where bike_id = ?1 and route_id = ?2 order by update_time desc limit 1")
    BikePosition getByBikeIdAndRouteId(String bikeId, Long routeId);

}
