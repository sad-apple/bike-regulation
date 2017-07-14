package cn.net.share.control.dao;

import cn.net.share.control.domain.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleTypeRepository extends JpaRepository<VehicleType,String> {
    List<VehicleType> findByOrderByCreateTimeDesc();
}
