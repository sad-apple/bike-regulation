package cn.net.share.control.dao;

import cn.net.share.control.domain.CarNumberSupervise;
import cn.net.share.control.domain.CarPriceSupervise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by zhaochuanzhi on 2017/8/25.
 */
public interface CarNumberSuperviseRepository extends JpaRepository<CarNumberSupervise, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM car_number_supervise")
    List<CarNumberSupervise> getCarNumberSuperviseList();
}
