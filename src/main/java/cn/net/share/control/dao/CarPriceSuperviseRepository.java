package cn.net.share.control.dao;

import cn.net.share.control.domain.CarPriceSupervise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by zhaochuanzhi on 2017/8/28.
 */
public interface CarPriceSuperviseRepository extends JpaRepository<CarPriceSupervise, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM car_price_supervise ORDER BY rand() LIMIT ?1")
    List<CarPriceSupervise> getCarPriceSuperviseList(int num);
}
