package cn.net.share.control.dao;

import cn.net.share.control.domain.ProblemType;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by zhaochuanzhi on 2017/8/1.
 */
public interface ProblemTypeRepository extends JpaRepository<ProblemType, Long> {
//    List<ProblemType> findByOrderByCreateTimeDesc();
}
