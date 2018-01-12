package cn.net.share.control.dao;

import cn.net.share.control.domain.Bike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface BikeRepository extends JpaRepository<Bike, String> {

    //随机获取单车--初始为10辆
    @Query(nativeQuery = true, value = "select * from bike order by rand() LIMIT 10")
    List<Bike> getBikesRandomStart();

    @Query("select t1 from Bike t1,BikeType t2 where t1.type = t2.id and t2.name like CONCAT('%',?1,'%') and t1.plateNumber like CONCAT('%',?2,'%')")
    Page<Bike> findConditon(String name,String plateNumber,Pageable pageable);

    //随机获取单车
    @Query(nativeQuery = true, value = "select * from bike order by rand() LIMIT ?1")
    List<Bike> getBikesRandom(int num);

    //单车统计
    @Query(nativeQuery = true, value = "select date_format(create_time, ?1) as date, count(*) as NUMBER from bike " +
            "where type_id = ?4 and date_format(create_time, ?1) >= ?2 and date_format(create_time, ?1) <= ?3 " +
            "group by date_format(create_time, ?1) order by date_format(create_time, ?1) asc")
    String[] stats(String queryType, String startDate, String endDate, String bikeTypeId);

    //单车统计总量
    @Query(nativeQuery = true, value = "select bt.name as name, count(*) as number from bike b,bike_type bt where b.type_id = bt.id group by b.type_id ")
    List totalNum();

    //一定时间内的单车统计量
    @Query(nativeQuery = true, value = "select bt.name as name, count(*) as number from bike b,bike_type bt " +
            "where b.type_id = bt.id and date_format(b.create_time, ?1) >= ?2 group by b.type_id ")
    List statsOfBike(String queryType, String startDate);

    //获取非活跃单车id
    @Query(nativeQuery = true, value = "select id from bike where id not in (select bike_id from alive_bike)")
    List<String> getInactiveBike();

}
