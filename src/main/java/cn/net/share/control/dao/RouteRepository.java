package cn.net.share.control.dao;

import cn.net.share.control.domain.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by wangbiao on 2017/7/19.
 */
public interface RouteRepository extends JpaRepository<Route, Long> {

    //根据起点随机获取路线
    @Query(nativeQuery = true, value = "select * from route where start_point = ?1 order by rand() LIMIT 1")
    List<Route> getRouteRandom(String startPoint);

    //
    @Query(nativeQuery = true, value = "select * from route where start_point = ?1 and end_point = ?2")
    Route findByStartPointAndEndPoint(String startPoint, String endPoint);

}
