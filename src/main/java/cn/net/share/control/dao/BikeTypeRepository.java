package cn.net.share.control.dao;

import cn.net.share.control.domain.BikeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BikeTypeRepository extends JpaRepository<BikeType,String> {
    List<BikeType> findByOrderByCreateTimeDesc();

    @Query(nativeQuery = true, value = "select * from bike_type where name like CONCAT('%',?1,'%')")
    BikeType findBikeTypeByName(String name);
}
