package cn.net.share.control.dao;

import cn.net.share.control.domain.BikePark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BikeParkRepository extends JpaRepository<BikePark, Long> {
    //随机获取1个点
    @Query(nativeQuery = true, value = "select * from bike_park order by rand() LIMIT ?1")
    List<BikePark> getPointRandom(int num);

}