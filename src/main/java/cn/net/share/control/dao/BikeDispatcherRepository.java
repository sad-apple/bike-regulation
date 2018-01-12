package cn.net.share.control.dao;

import cn.net.share.control.domain.BikeDispatcher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by zhaochuanzhi on 2017/8/18.
 */
public interface BikeDispatcherRepository extends JpaRepository<BikeDispatcher, Long> {

    /**
     * 从数据库中随机获取数据
     * @param num 获取数据的数量
     * @return List<BikeDispatcher>
     */
    @Query(nativeQuery = true, value = "select * from bike_dispatcher order by rand() limit ?1")
    List<BikeDispatcher> getRandomNumber(int num);
}
