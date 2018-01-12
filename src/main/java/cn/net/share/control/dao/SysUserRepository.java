package cn.net.share.control.dao;

import cn.net.share.control.domain.SysUser;
import jdk.nashorn.internal.runtime.linker.NashornBeansLinker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SysUserRepository extends JpaRepository<SysUser, Long> {

    @Query(nativeQuery = true, value = "select id, create_time, create_user, disable_time, email, enable_time, full_name, password, phone, update_time, update_user, user_status, user_type, username, customer_id, is_modify_pass_word, is_moreover_login, is_phone_login, is_wechat_login from sys_user where username = ?1")
    SysUser getByUsername(String username);

    SysUser findByUsername(String username);

    @Query("select s from SysUser s where s.userType in (3L,4L) and s.username like CONCAT('%',?1,'%') and s.fullName like CONCAT('%',?2,'%')")
    Page findByUsernameAndFullName(String username, String fullName, Pageable pageable);

    @Query("select s from SysUser s where s.userType = 4L and s.username like CONCAT('%',?1,'%') and s.fullName like CONCAT('%',?2,'%')")
    Page findOwner(String username, String fullName, Pageable pageable);

    @Query(nativeQuery = true, value = "select * from sys_user where id = ?1")
    SysUser getSysUserByCustomer(Long id);

    @Query(nativeQuery = true, value = "select * from sys_user where user_type = 3 or user_type = 4 order by rand() LIMIT ?1")
    List<SysUser> getSysUserRandom(int num);

    @Query(nativeQuery = true, value = "select * from sys_user where user_type = 3 or user_type = 4 order by rand() LIMIT 10")
    List<SysUser> getSysUserRandomStart();
}
