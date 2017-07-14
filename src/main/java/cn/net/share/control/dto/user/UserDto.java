package cn.net.share.control.dto.user;

import cn.net.share.control.domain.SysResource;
import cn.net.share.control.domain.SysRole;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.domain.Customer;
import lombok.Data;

import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String username;
    private List<SysRole> roles;
    private List<SysResource> sysResources;
    private Customer customer;

    public UserDto(){}

    public UserDto(SysUser sysUser, List<SysResource> sysResources){
        this.id = sysUser.getId();
        this.username = sysUser.getUsername();
        this.sysResources = sysResources;
        this.customer = sysUser.getCustomer();
    }

    public UserDto(SysUser sysUser){
        this.id = sysUser.getId();
        this.username = sysUser.getUsername();
        this.roles = sysUser.getRoles();
        this.customer = sysUser.getCustomer();
    }
}
