package cn.net.share.control.dao;

import cn.net.share.control.domain.Bike;
import cn.net.share.control.domain.BikeIllegalPark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by wangbiao on 2017/8/29.
 * 单车违停 Repository
 */

public interface BikeIllegalParkRepository extends JpaRepository<BikeIllegalPark, Long>{

    // 随机获取n条数据
    @Query(nativeQuery = true, value = "select * from bike_illegal_park order by rand() LIMIT ?1")
    List<BikeIllegalPark> getDatas(int num);

}