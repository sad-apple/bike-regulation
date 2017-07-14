package cn.net.share.control.dao;

import cn.net.share.control.domain.SysResource;
import cn.net.share.control.domain.SysRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SysResourceRepository extends JpaRepository<SysResource,Long> {
    List<SysResource> findDistinctBySysRolesInAndTypeOrderBySortAsc(List<SysRole> sysRoles, Integer integer);
    List<SysResource> findByOrderByCreateTimeDesc();
    List<SysResource> findBySysRolesId(Long id);
    List<SysResource> findByParentIdIsNull();
}
