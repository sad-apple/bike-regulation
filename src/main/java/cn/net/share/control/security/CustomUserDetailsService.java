package cn.net.share.control.security;

import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dao.SysUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private SysUserRepository sysUserRepository;

    @Override
    public UserDetails loadUserByUsername(String userName){
        SysUser sysUser = sysUserRepository.findByUsername(userName);
        if(sysUser == null){
            throw new UsernameNotFoundException("系统中不存在该用户。");
        }
        return sysUser;
    }
}
