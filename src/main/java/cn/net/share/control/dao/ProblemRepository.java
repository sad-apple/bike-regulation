package cn.net.share.control.dao;


import cn.net.share.control.domain.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by zhaochuanzhi on 2017/8/1.
 */
public interface ProblemRepository extends JpaRepository<Problem,Long> {

}
