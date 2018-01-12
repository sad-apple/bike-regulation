package cn.net.share.control.dao;

import cn.net.share.control.domain.FaultStatus;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by shuzhengxing on 2017/8/5.
 */
public interface FaultStatusRepository extends JpaRepository<FaultStatus, Long> {
}
