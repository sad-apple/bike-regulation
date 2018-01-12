package cn.net.share.control.dao;

import cn.net.share.control.domain.BikeTrail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

/**
 * Created by wangbiao on 2017/7/21.
 */
public interface BikeTrailRepository extends JpaRepository<BikeTrail, Long> {

    @Query(nativeQuery = true, value = "select id from bike_trail where bike_id = ?1 and route_id = ?2")
    List<Long> getByBikeIdAndRouteId(String bikeId, Long routeId);

    //点聚合--历史单车轨迹位置
    @Query(nativeQuery = true, value = "select max(id) as id, bike_id, max(lon) as lon, max(lat) as lat, max(update_time) as update_time, max(route_id) as route_id from bike_trail group by bike_id order by update_time desc")
    List<BikeTrail> getBikePosition();

    @Query(nativeQuery = true, value = "select * from bike_trail order by rand() LIMIT 240")
    List<BikeTrail> getBikeTrailLimit();
}
