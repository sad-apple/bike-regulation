package cn.net.share.control.dao;

import cn.net.share.control.domain.OperationRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by lihao on 2017/8/5.
 */
public interface OperationRuleRepository extends JpaRepository<OperationRule, Long> {

    @Query(nativeQuery = true, value = "select t1.* from operation_rule t1, operation_org_details t2 where t1.operation_org_details_id = t2.id and t1.region like CONCAT('%',?3,'%') and t1.create_time like CONCAT('%',?4,'%') and t2.name like CONCAT('%',?5,'%') order by t1.id asc limit ?1, ?2")
    List<OperationRule> findOperationRules(int page, int size, String region, String createTime, String operationOrg);

    @Query(nativeQuery = true, value = "SELECT * FROM operation_rule  WHERE operation_org_details_id = ?1")
    OperationRule findByOperationOrgDetailsId(Long operationDetailsId); // 由运营组织查找运营规则
}
