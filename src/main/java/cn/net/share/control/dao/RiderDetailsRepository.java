package cn.net.share.control.dao;

import cn.net.share.control.domain.Bike;
import cn.net.share.control.domain.RiderDetails;
import cn.net.share.control.domain.SysUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by Administrator on 2017/7/11.
 */
public interface RiderDetailsRepository extends JpaRepository<RiderDetails, Long> {
    RiderDetails findByIdCardNumber(String idCardNumber);

    @Query(nativeQuery = true, value = "select * from rider_details where id = ?1")
    RiderDetails getRider(Long id);

    //随机获取骑行用户
    @Query(nativeQuery = true, value = "select * from rider_details order by rand() LIMIT ?1")
    List<RiderDetails> getRiderRandom(int num);

}
