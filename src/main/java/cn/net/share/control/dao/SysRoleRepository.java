package cn.net.share.control.dao;

import cn.net.share.control.domain.SysRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SysRoleRepository extends JpaRepository<SysRole,Long> {
    List<SysRole> findByNameLike(String name);
}
