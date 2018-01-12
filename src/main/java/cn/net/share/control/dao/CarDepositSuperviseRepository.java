package cn.net.share.control.dao;

import cn.net.share.control.domain.CarDepositSupervise;
import cn.net.share.control.domain.DepositSuperviseReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by lihao on 2017/8/24.
 */
public interface CarDepositSuperviseRepository extends JpaRepository<CarDepositSupervise, Long> {

    @Query(nativeQuery = true, value = "select * from car_deposit_supervise order by rand() LIMIT ?1")
    List<CarDepositSupervise> getRandomData(int num);
}
