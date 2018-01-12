package cn.net.share.control.dao;

import cn.net.share.control.domain.DepositStatement;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by zhaochuanzhi on 2017/8/3.
 */
public interface DepositStatementRepository extends JpaRepository<DepositStatement, Long> {
}
