package cn.net.share.control.dao;

import cn.net.share.control.domain.CityPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by wangbiao on 2017/7/14.
 */
public interface CityPositionRepository extends JpaRepository<CityPosition, Long> {

    //获取城市地点名称
    @Query(nativeQuery = true, value = "select position_name from city_position")
    List<String> getCityPosition();

    //根据城市名获取
    @Query(nativeQuery = true, value = "select * from city_position where position_name like %?1%")
    CityPosition findPositionName(String positionName);

    //随机获取城市点--初始10个
    @Query(nativeQuery = true, value = "select * from city_position order by rand() LIMIT 10")
    List<CityPosition> getPointsRandomStart();

    CityPosition findByPositionName(String name);

    //随机获取城市点
    @Query(nativeQuery = true, value = "select * from city_position order by rand() LIMIT ?1")
    List<CityPosition> getPointsRandom(int num);

    //获取路线数
    @Query(nativeQuery = true, value = "select count(*) from route")
    int getCount();

    //
    CityPosition findByLatAndLon(Double lat, Double lon);

}
