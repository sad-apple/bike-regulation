package cn.net.share.control.dao;

import cn.net.share.control.domain.SlowTrafficSystem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by lihao on 2017/8/17.
 */
public interface SlowTrafficSystemRepository extends JpaRepository<SlowTrafficSystem,Long> {

    @Query(nativeQuery = true, value = "SELECT * from slow_traffic_system s ORDER BY s.bike_amount DESC")
    List<SlowTrafficSystem> findAllSortAmount();

}
