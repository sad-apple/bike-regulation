package cn.net.share.control.dao;

import cn.net.share.control.domain.AliveBike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by wangbiao on 2017/7/22.
 */
public interface AliveBikeRepository extends JpaRepository<AliveBike, Long> {

    //随机获取0-10辆
    @Query(nativeQuery = true, value = "select * from alive_bike order by rand() LIMIT ?1")
    List<AliveBike> getAliveBikesRandom(int num);

    @Query(nativeQuery = true, value = "select COUNT(*),bt.name from alive_bike ab,bike b,bike_type bt where ab.bike_id = b.id and b.type_id = bt.id GROUP BY b.type_id\n")
    List countByType();
}
