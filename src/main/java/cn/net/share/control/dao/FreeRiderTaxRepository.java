package cn.net.share.control.dao;

import cn.net.share.control.domain.FreeRiderTax;
import cn.net.share.control.domain.TaxSuperviseReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by lihao on 2017/8/17.
 */
public interface FreeRiderTaxRepository extends JpaRepository<FreeRiderTax, Long> {

    @Query(nativeQuery = true, value = "select * from free_rider_tax order by rand() limit ?1")
    List<FreeRiderTax> getRandom(int num);
}
