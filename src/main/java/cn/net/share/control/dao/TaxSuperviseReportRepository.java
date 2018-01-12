package cn.net.share.control.dao;

import cn.net.share.control.domain.TaxSuperviseReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by lihao on 2017/8/17.
 */
public interface TaxSuperviseReportRepository extends JpaRepository<TaxSuperviseReport, Long> {

    @Query(nativeQuery = true, value = "select sum(t.total_earn), t.tax_org from tax_supervise_report t  WHERE t.create_time like concat('%',?1,'%') GROUP BY t.tax_org")
    List getTotalTaxAndTaxOrg (String createTime);

    @Query(nativeQuery = true, value = "select * from tax_supervise_report order by rand() LIMIT ?1")
    List<TaxSuperviseReport> getRandomData(int num);
}
