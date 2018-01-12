package cn.net.share.control.dao;

import cn.net.share.control.domain.DepositRule;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by lihao on 2017/8/1.
 */
public interface DepositRuleRepository extends JpaRepository<DepositRule, Long> {

//    @Query(nativeQuery = true, value = "select d from DepositRule d where d.region like concat('%',?1,'%') ")
//    Page findByRegion(Integer[] region);
}
