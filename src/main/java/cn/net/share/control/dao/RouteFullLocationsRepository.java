package cn.net.share.control.dao;

import cn.net.share.control.domain.RouteFullLocations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

/**
 * Created by wangbiao on 2017/7/19.
 */

public interface RouteFullLocationsRepository extends JpaRepository<RouteFullLocations, Long> {

    List<RouteFullLocations> findByRouteId(Long routeId);

    //随机获取点
    @Query(nativeQuery = true, value = "select * from route_full_locations order by rand() LIMIT ?1")
    List<RouteFullLocations> getPointRandom(int num);

    //获取所有id
    @Query(nativeQuery = true, value = "select route_id from route_full_locations group by route_id")
    List<BigInteger> findRouteIds();

    //获取所有点
    @Query(nativeQuery = true, value = "select lon, lat from route_full_locations")
    List findPoints();

    @Query(nativeQuery = true, value = "select * from route_full_locations where route_id = 1?")
    List findPointsByRouteId(long id);
}
