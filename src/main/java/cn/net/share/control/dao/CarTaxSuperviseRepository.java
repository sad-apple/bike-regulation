package cn.net.share.control.dao;

import cn.net.share.control.domain.CarTaxSupervise;
import cn.net.share.control.domain.TaxSuperviseReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by lihao on 2017/8/17.
 */
public interface CarTaxSuperviseRepository extends JpaRepository<CarTaxSupervise, Long> {

    @Query(nativeQuery = true, value = "select sum(t.total_earn), t.tax_org from car_tax_supervise t  WHERE t.create_time like concat('%',?1,'%') GROUP BY t.tax_org")
    List getTotalTaxAndTaxOrg(String createTime);

    @Query(nativeQuery = true, value = "select * from car_tax_supervise order by rand() limit ?1")
    List<CarTaxSupervise> getRandom(int num);
}
