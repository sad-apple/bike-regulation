package cn.net.share.control.service;

import cn.net.share.control.dao.CustomerRepository;
import cn.net.share.control.dao.OperationOrgDetailsRepository;
import cn.net.share.control.dao.RegulatorOrgDetailsRepository;
import cn.net.share.control.domain.Customer;
import cn.net.share.control.domain.OperationOrgDetails;
import cn.net.share.control.domain.RegulatorOrgDetails;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.utils.LogUtil;
import cn.net.share.control.utils.position.Position;
import cn.net.share.control.utils.state.UserType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by lihao on 2017/7/25.
 */
@Service
public class MapService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OperationOrgDetailsRepository operationOrgDetailsRepository;

    @Autowired
    private RegulatorOrgDetailsRepository regulatorOrgDetailsRepository;

    private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);

    /**
     * 获取当前登录的客户的区域
     * @param loginUser
     * @return
     */
    public Integer[] getRegion(SysUser loginUser){
        LogUtil.info(logger, "MapService:getRegion, loginUser = " + loginUser);
        Integer[] intArr = new Integer[2];
        if (loginUser.getUserType() == UserType.OPERATION_ORG_USER.value()) {
            Customer customer = customerRepository.findByAdminId(loginUser.getId());
            OperationOrgDetails operationOrgDetails = operationOrgDetailsRepository.findOne(customer.getCustomerDetailsId());
            intArr = operationOrgDetails.getRegion();
        }
        if (loginUser.getUserType() == UserType.REGULATOR_ORG_USER.value()) {
            Customer customer = customerRepository.findByAdminId(loginUser.getId());
            RegulatorOrgDetails regulatorOrgDetails = regulatorOrgDetailsRepository.findOne((customer.getCustomerDetailsId()));
            intArr = regulatorOrgDetails.getRegion();
        }
        if (intArr[1] == null) {   //默认地图中心是合肥市(非运营组织监管机构登录)
            intArr[0] = Position.AN_HUI.value();
            intArr[1] = Position.HE_FEI.value();
        }
        return intArr;
    }

}
