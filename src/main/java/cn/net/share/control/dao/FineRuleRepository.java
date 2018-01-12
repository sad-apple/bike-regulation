package cn.net.share.control.dao;

import cn.net.share.control.domain.FineRule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by lihao on 2017/8/4.
 */
public interface FineRuleRepository extends JpaRepository<FineRule, Long> {

    @Query(nativeQuery = true, value = "select * from fine_rule where region like CONCAT('%',?3,'%') and create_time like CONCAT('%',?4,'%') order by id asc limit ?1, ?2")
    List<FineRule> findFineRuleList(int firstRecord, int size, String region, String createTime);
}
