package cn.net.share.control.service;

import cn.net.share.control.dao.AliveBikeRepository;
import cn.net.share.control.dao.BikeRepository;
import cn.net.share.control.dao.CustomerRepository;
import cn.net.share.control.dao.SysRoleRepository;
import cn.net.share.control.domain.SysRole;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.state.UserType;
import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangshiping on 2017/7/20.
 */
@Service
public class ReportService {
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    SysRoleRepository sysRoleRepository;
    @Autowired
    BikeRepository bikeRepository;
    @Autowired
    AliveBikeRepository aliveBikeRepository;

    /**
     * 用户统计
     * @param type
     * @param startDate
     * @param endDate
     * @param sysRoleId
     * @return
     */
    public ResponseEntity<Message> statsOfCustomer(Integer type, String startDate, String endDate, Long sysRoleId) {
        String[] result;
        Long total = 0L;
        Map map = Maps.newHashMap();
        if (UserType.RIDER_USER.value() == sysRoleId){
            if(type.equals(0)){
                String queryType = "%Y-%m-%d";
                result = customerRepository.stats(queryType, startDate, endDate);
                total = customerRepository.totalNum(queryType, startDate);
            }else if(type.equals(1)){
                String queryType = "%Y-%m";
                result = customerRepository.stats(queryType, startDate, endDate);
                total = customerRepository.totalNum(queryType, startDate);
            }else{
                String queryType = "%Y";
                result = customerRepository.stats(queryType, startDate, endDate);
                total = customerRepository.totalNum(queryType, startDate);
            }
        }else {
            if(type.equals(0)){
                String queryType = "%Y-%m-%d";
                result = customerRepository.stats(queryType, startDate, endDate, sysRoleId);
                total = customerRepository.totalNum(queryType, startDate, sysRoleId);
            }else if(type.equals(1)){
                String queryType = "%Y-%m";
                result = customerRepository.stats(queryType, startDate, endDate, sysRoleId);
                total = customerRepository.totalNum(queryType, startDate, sysRoleId);
            }else{
                String queryType = "%Y";
                result = customerRepository.stats(queryType, startDate, endDate, sysRoleId);
                total = customerRepository.totalNum(queryType, startDate, sysRoleId);
            }
        }
        map.put("increment", result);
        map.put("total", total);

        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, map);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 查询统计的所有用户类型
     * @return
     */
    public ResponseEntity<Message> getAllRoles() {
        List<SysRole> sysRoles = sysRoleRepository.findByIdBetween(UserType.RIDER_USER.value(),UserType.REGULATOR_ORG_USER.value());
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, sysRoles);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 单车统计
     * @param type
     * @param startDate
     * @param endDate
     * @param bikeTypeId
     * @return
     */
    public ResponseEntity<Message> statsOfBike(Integer type, String startDate, String endDate, String bikeTypeId) {
        String[] result;
        List totals;
        Map map = Maps.newHashMap();

        if(type.equals(0)){
            String queryType = "%Y-%m-%d";
            result = bikeRepository.stats(queryType, startDate, endDate, bikeTypeId);
        }else if(type.equals(1)){
            String queryType = "%Y-%m";
            result = bikeRepository.stats(queryType, startDate, endDate, bikeTypeId);
        }else{
            String queryType = "%Y";
            result = bikeRepository.stats(queryType, startDate, endDate, bikeTypeId);
        }
        totals = bikeRepository.totalNum();
        map.put("increment", result);
        map.put("totals", totals);

        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, map);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 活跃用户统计
     * @return
     */
    public ResponseEntity<Message> statsOfAliveBike() {
        Map map = Maps.newHashMap();
        List total = aliveBikeRepository.countByType();
        map.put("total",total);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, map);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * dashboard页面统计数据
     * @return
     */
    public ResponseEntity<Message> statsOfAlldata() {
        List riderResult;
        List bikeResult;
        List bikeTotals;
        Map map = Maps.newHashMap();
        String queryType = "%Y-%m-%d";
        Calendar c=Calendar.getInstance();
        DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
        c.add(Calendar.DAY_OF_WEEK,(-1)*c.get(Calendar.DAY_OF_WEEK)+1);
        String startDate = df.format(c.getTime());
        bikeResult = bikeRepository.statsOfBike(queryType, startDate);
        bikeTotals = bikeRepository.totalNum();
        riderResult = customerRepository.statsOfRider(queryType, startDate);
        Long riderTotal = customerRepository.totalNum(queryType, startDate);
        map.put("bikeResult",bikeResult);
        map.put("bikeTotals",bikeTotals);
        map.put("riderResult",riderResult);
        map.put("riderTotal",riderTotal);

        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, map);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

}
