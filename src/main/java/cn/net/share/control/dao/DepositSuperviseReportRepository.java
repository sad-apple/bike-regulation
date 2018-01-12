package cn.net.share.control.dao;

import cn.net.share.control.domain.DepositSuperviseReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by lihao on 2017/8/17.
 */
public interface DepositSuperviseReportRepository extends JpaRepository<DepositSuperviseReport, Long> {

    @Query(nativeQuery = true, value = "select * from deposit_supervise_report order by rand() LIMIT ?1")
    List<DepositSuperviseReport> getRandomData(int num);
}
