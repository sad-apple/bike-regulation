package cn.net.share.control.dao;

import cn.net.share.control.domain.CarAccidentInsured;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by lihao on 2017/8/26.
 */
public interface CarAccidentInsuredRepository extends JpaRepository<CarAccidentInsured, Long> {

    @Query(nativeQuery = true, value = "select * from car_accident_insured order by rand() LIMIT ?1")
    List<CarAccidentInsured> getRandomData(int num);
}
