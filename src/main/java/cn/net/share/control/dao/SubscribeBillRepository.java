package cn.net.share.control.dao;


import cn.net.share.control.domain.SubscribeBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by zhaochuanzhi on 2017/8/7.
 */
public interface SubscribeBillRepository extends JpaRepository<SubscribeBill, Long > {

    @Query(nativeQuery = true, value = "SELECT * FROM subscribe_bill  WHERE operation_org_details_id = ?1")
    SubscribeBill findByOperationOrgDetailsId(Long operationDetailsId);
}
