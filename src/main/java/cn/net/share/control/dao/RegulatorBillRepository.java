package cn.net.share.control.dao;

import cn.net.share.control.domain.OperationBill;
import cn.net.share.control.domain.RegulatorBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by zhaochuanzhi on 2017/8/5.
 */
public interface RegulatorBillRepository extends JpaRepository<RegulatorBill, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM regulator_bill  WHERE regulator_org_details_id = ?1")
    RegulatorBill findByOperationOrgDetailsId(Long operationDetailsId);
}
