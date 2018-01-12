package cn.net.share.control.dao;

import cn.net.share.control.domain.CarStatisticsDetails;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by shuzhengxing on 2017/9/1.
 */
public interface CarStatisticsRepository extends JpaRepository<CarStatisticsDetails, Long> {
}
