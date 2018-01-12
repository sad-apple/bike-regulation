package cn.net.share.control.dao;

import cn.net.share.control.domain.BikeGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BikeGroupRepository extends JpaRepository<BikeGroup,String> {
    List<BikeGroup> findByOrderByCreateTimeDesc();
    //分页查询车辆分组
    @Query("select b from BikeGroup b where b.name like concat('%',?1,'%')")
    Page<BikeGroup> getByName(String name, Pageable pageable);

}
