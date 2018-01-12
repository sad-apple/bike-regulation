package cn.net.share.control.dao;

import cn.net.share.control.domain.OperationBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by zhaochuanzhi on 2017/8/4.
 */
public interface OperationBillRepository extends JpaRepository<OperationBill, Long> {
}
