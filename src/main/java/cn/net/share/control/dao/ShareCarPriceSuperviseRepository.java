package cn.net.share.control.dao;

import cn.net.share.control.domain.CarPriceSupervise;
import cn.net.share.control.domain.ShareCarPriceSupervise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by zhaochuanzhi on 2017/8/29.
 */
public interface ShareCarPriceSuperviseRepository extends JpaRepository<ShareCarPriceSupervise, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM share_car_price_supervise ORDER BY rand() LIMIT ?1")
    List<ShareCarPriceSupervise> getShareCarPriceSuperviseList(int num);
}
