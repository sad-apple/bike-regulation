package cn.net.share.control.dao;

import cn.net.share.control.domain.Bike;
import cn.net.share.control.domain.BikeAdvertisement;
import cn.net.share.control.domain.TaxSuperviseReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by zhaochuanzhi on 2017/8/16.
 */
public interface BikeAdvertisementRepository extends JpaRepository<BikeAdvertisement, Long> {

    /**
     * 查询出投放车身广告的不同类型单车的数量
     * @param time
     * @return
     */
    @Query(nativeQuery = true, value = "SELECT ba.operation_org_name as name,COUNT(*) AS number FROM bike_advertisement ba WHERE ba.delivery_date like CONCAT('%',?1,'%') GROUP BY ba.operation_org_name")
    List totalBikeAdvertisement(String time);

    /**
     * 各单车收到投诉的数量
     * @param time
     * @return
     */
    @Query(nativeQuery = true, value = "SELECT COUNT(*) AS number FROM bike_advertisement ba WHERE ba.delivery_date LIKE CONCAT('%', ?1, '%') AND ba.is_complaint = '是' GROUP BY ba.operation_org_name")
    List getComplaintNumber(String time);

    /**
     * 各单车收到投诉已处理的数量
     * @param time
     * @return
     */
    @Query(nativeQuery = true, value = "SELECT COUNT(*) AS number FROM bike_advertisement ba WHERE ba.`delivery_date` LIKE CONCAT('%', ?1, '%') AND ba.is_handel = '是' GROUP BY ba.operation_org_name;")
    List getHandelNumber(String time);


    /**
     * 各单车收到投诉未进行处理的数量
     * @param time
     * @return
     */
    @Query(nativeQuery = true, value = "SELECT COUNT(*) AS number FROM bike_advertisement ba WHERE ba.`delivery_date` LIKE CONCAT('%', ?1, '%') AND ba.is_handel = '否' AND ba.is_complaint = '是' GROUP BY ba.operation_org_name")
    List getUnhandleNumber(String time);

    @Query(nativeQuery = true, value = "SELECT * FROM bike_advertisement ORDER BY RAND() LIMIT ?1")
    List<BikeAdvertisement> getRandomData(int num);
}
