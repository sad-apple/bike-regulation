package cn.net.share.control.dao;

import cn.net.share.control.domain.CarRechargeSupervise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by lihao on 2017/8/25.
 */
public interface CarRechargeSuperviseRepository extends JpaRepository<CarRechargeSupervise, Long> {
    @Query(nativeQuery = true, value = "select * from car_recharge_supervise order by rand() limit ?1")
    List<CarRechargeSupervise> getRandom(int num);
}
