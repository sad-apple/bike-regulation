package cn.net.share.control.dao;

import cn.net.share.control.domain.VehicleTypeCmd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VehicleTypeCmdRepository extends JpaRepository<VehicleTypeCmd,String> {

    //分页返回单车类型命令列表
    @Query(nativeQuery = true, value = "select t1.id, t1.name, t1.code, t2.name as vehicleTypeName, t1.remark from vehicle_type_cmd as t1, vehicle_type as t2 where t1.vehicle_type_id = t2.id and t1.name like %?3% and t1.code like %?4% limit ?2 offset ?1")
    String[] vehicleTypeCmds(Integer offsetNum, Integer size, String cmdName, String cmdCode);

    @Query(nativeQuery = true, value = "select count(*) from vehicle_type_cmd where name like %?1% and code like %?2%")
    Long vehicleTypeCmdsCounts(String cmdName, String cmdCode);

}
