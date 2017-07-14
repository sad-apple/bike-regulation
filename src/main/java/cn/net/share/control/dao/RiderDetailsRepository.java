package cn.net.share.control.dao;

import cn.net.share.control.domain.RiderDetails;
import cn.net.share.control.dto.customer.RiderDto;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Administrator on 2017/7/11.
 */
public interface RiderDetailsRepository extends JpaRepository<RiderDetails, Long> {
}
