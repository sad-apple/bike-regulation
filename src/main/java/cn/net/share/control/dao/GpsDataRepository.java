package cn.net.share.control.dao;

import cn.net.share.control.domain.GpsData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface GpsDataRepository extends JpaRepository<GpsData, Long> {
    List<GpsData> findBySimCardNum(String simCardNum);
    List<GpsData> findBySimCardNumAndTimeBetween(String simCardNum, Date beginTime, Date endTime);
    GpsData findTop1BySimCardNumOrderByTimeDesc(String simCardNum);
}
