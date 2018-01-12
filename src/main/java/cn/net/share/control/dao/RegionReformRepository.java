package cn.net.share.control.dao;

import cn.net.share.control.domain.RegionReform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by zhaochuanzhi on 2017/8/18.
 */
public interface RegionReformRepository extends JpaRepository<RegionReform, Long> {

    /**
     * 随机从数据库中取出十条数据
     * @param num
     * @return
     */
    @Query(nativeQuery = true, value = "SELECT * FROM region_reform ORDER BY RAND() LIMIT ?1")
    List<RegionReform> getRandomRegionData(int num);
}
