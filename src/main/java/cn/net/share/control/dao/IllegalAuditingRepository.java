package cn.net.share.control.dao;

import cn.net.share.control.domain.Verify;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


/**
 * Created by shuzhengxing on 2017/8/5.
 */
public interface IllegalAuditingRepository extends JpaRepository<Verify, Long> {
    @Query("select t1 from Verify t1,FaultStatus t2, BikeType t3, FileType t4 where t1.faultStatus = t2.id and t1.bikeType = t3.id and t1.fileType = t4.id and t4.id = 2 and t2.status like CONCAT('%',?1,'%') and t1.plateNumber like CONCAT('%',?2,'%') and t1.time like CONCAT('%',?3,'%') and t3.name like CONCAT('%',?4,'%')")
    Page<Verify> findConditon(String faultStatus, String plateNumber, String date, String bikeType, Pageable pageable);

}
