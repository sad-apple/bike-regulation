package cn.net.share.control.dao;

import cn.net.share.control.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by zhaochuanzhi on 2017/8/7.
 */
public interface RiderBillRepository extends JpaRepository<RiderBill, Long> {
}
