package cn.net.share.control.dao;

import cn.net.share.control.domain.Customer;
import cn.net.share.control.domain.SysUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,String> {
    Page findByType(Integer l, Pageable pageable);

    Customer findById(String id);

    //查找运营组织管理员
    @Query(nativeQuery = true, value = "select t1.admin_id from customer t1, sys_user t2 where t1.admin_id = t2.id and t1.customer_details_id = ?1 and t2.user_type = 5")
    Long findOperationOrgAdminId(Long OperationOrgId);

    //查找监管机构管理员
    @Query(nativeQuery = true, value = "select t1.admin_id from customer t1, sys_user t2 where t1.admin_id = t2.id and t1.customer_details_id = ?1 and t2.user_type = 6")
    Long findRegulatorOrgAdminId(Long regulatorOrgId);

    @Query("select t1 from Customer t1, SysUser t2 where t1.adminId = t2.id and t1.customerDetailsId = ?1 and t2.userType = 5")
    Customer findByCustomerDetailsIdAndType(Long id); //运营组织的删除

    @Query("select t1 from Customer t1, SysUser t2 where t1.adminId = t2.id and t1.customerDetailsId = ?1 and t2.userType = 6")
    Customer findByCustomerDetailsId(Long id);//监管机构的删除

    Customer findByAdminId(Long id);

    //骑行用户的增长量统计
    @Query(nativeQuery = true, value = "select date_format(create_time, ?1) as date, count(*) as NUMBER from customer where type in (3,4) and date_format(create_time, ?1) >= ?2 and date_format(create_time, ?1) <= ?3 group by date_format(create_time, ?1) order by date_format(create_time, ?1) asc")
    String[] stats(String type, String startDate, String endDate);
    //骑行用户的总量统计
    @Query(nativeQuery = true, value = "select count(*) from customer where type in (3,4) and create_time < str_to_date(?2, ?1)")
    Long totalNum(String type, String startDate);

    //其他用户增长量统计
    @Query(nativeQuery = true, value = "select date_format(create_time, ?1) as date, count(*) as NUMBER from customer " +
            "where type = ?4 and date_format(create_time, ?1) >= ?2 and date_format(create_time, ?1) <= ?3 " +
            "group by date_format(create_time, ?1) order by date_format(create_time, ?1) asc")
    String[] stats(String queryType, String startDate, String endDate, Long id);

    //其他用户总量统计
    @Query(nativeQuery = true, value = "select count(*) from customer where type = ?3 and create_time < str_to_date(?2, ?1)")
    Long totalNum(String queryType, String startDate, Long id);

    //一周骑行用户统计
    @Query(nativeQuery = true, value = "select date_format(create_time, ?1) as date, count(*) as NUMBER from customer " +
            "where type in (3,4) and date_format(create_time, ?1) >= ?2 " +
            "group by date_format(create_time, ?1) order by date_format(create_time, ?1) asc")
    List statsOfRider(String queryType, String startDate);

    //随机获取骑行用户--初始10个
    @Query(nativeQuery = true, value = "select * from customer where type = 3 or type = 4 order by rand() LIMIT 10")
    List<Customer> getCustomerRandomStart();

    //随机
    @Query(nativeQuery = true, value = "select * from customer where type = 3 or type = 4 order by rand() LIMIT ?1")
    List<Customer> getCustomerRandom(int num);
}


