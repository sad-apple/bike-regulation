package cn.net.share.control.dao;

import cn.net.share.control.domain.VehicleGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleGroupRepository extends JpaRepository<VehicleGroup,String> {
    List<VehicleGroup> findByOrderByCreateTimeDesc();
}
