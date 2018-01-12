
package cn.net.share.control.service;

import cn.net.share.control.dao.*;
import cn.net.share.control.domain.*;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageInfo;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.dto.regulatorOrgDetailsDto.RegulatorOrgDetailsDto;
import cn.net.share.control.utils.LogUtil;
import cn.net.share.control.utils.state.UserType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by shuzhengxing on 2017/7/13.
 */
@Service
public class RegulatorOrgService {

    private static final Logger logger = LoggerFactory.getLogger(RegulatorOrgService.class);

    @Autowired
    private RegulatorOrgRepository regulatorOrgRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private SysUserRepository sysUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SysRoleRepository sysRoleRepository;

    @Autowired
    private RegulatorBillRepository regulatorBillRepository;

    /**
     * 分页获得监管机构列表
     * @param regulatorOrgDetails
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findByRegulatorOrgDetailsPage(RegulatorOrgDetails regulatorOrgDetails, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page regulatorOrgDetailss = regulatorOrgRepository.findAll(Example.of(regulatorOrgDetails, exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, regulatorOrgDetailss);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 返回一个监管机构
     * @param regulatorOrgId
     * @return
     */
    public ResponseEntity<Message> getRegulatorOrgDetails(Long regulatorOrgId) {
        RegulatorOrgDetails regulatorOrgDetails = regulatorOrgRepository.findOne(regulatorOrgId);
        Long adminId = customerRepository.findRegulatorOrgAdminId(regulatorOrgId);
        SysUser sysUser = sysUserRepository.findOne(adminId);
        RegulatorOrgDetailsDto dto = new RegulatorOrgDetailsDto(regulatorOrgDetails, sysUser);
       return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, dto), HttpStatus.OK);
    }

    /**
     * 检查账号是否已存在
     * @param adminName
     * @return
     */
    public ResponseEntity<Message> checkSysUserIsNull(String adminName) {
        if (sysUserRepository.findByUsername(adminName) != null)
            return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.USERNAME_ALREADY_EXIST), HttpStatus.OK);
        LogUtil.error(logger,"This SysUser already exists, SysUser = :" + adminName);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 创建一个监管机构
     * @param dto
     * @return
     */
    public ResponseEntity<Message> createRegulatorOrgDetails(RegulatorOrgDetailsDto dto) {
        String userName = dto.getAdminName();
        if (sysUserRepository.findByUsername(userName) != null) {
            LogUtil.error(logger, "This SysUser already exists, SysUser = :" + userName);
            return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.USERNAME_ALREADY_EXIST), HttpStatus.OK);
        }
        SysUser sysUser = new SysUser(dto);
        sysUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        SysRole role = sysRoleRepository.findOne(UserType.REGULATOR_ORG_USER.value());
        List<SysRole> roles = new ArrayList<SysRole>();
        roles.add(role);
        sysUser.setRoles(roles);
        sysUserRepository.save(sysUser);

        RegulatorOrgDetails regulatorOrgDetails = new RegulatorOrgDetails(dto);
        regulatorOrgRepository.save(regulatorOrgDetails);

        Customer customer = new Customer();
        customer.setCustomerDetailsId(regulatorOrgDetails.getId());
        customer.setType(UserType.REGULATOR_ORG_USER.value());
        customer.setAdminId(sysUser.getId());
        customerRepository.save(customer);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 更新监管机构
     * @param dto
     * @return
     */
    public ResponseEntity<Message> updateRegulatorOrgDetails(RegulatorOrgDetailsDto dto) {
        RegulatorOrgDetails regulatorOrgDetails = new RegulatorOrgDetails(dto);
        regulatorOrgRepository.save(regulatorOrgDetails);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 删除监管机构
     * @param id
     * @return
     */
    @Transactional
    public ResponseEntity<Message> deleteRegulatorOrgDetails(Long id) {
        Customer customer = customerRepository.findByCustomerDetailsId(id);
        RegulatorBill regulatorBill = regulatorBillRepository.findByOperationOrgDetailsId(id);

        if (regulatorBill != null){
            regulatorBill.setRegulatorOrgDetails(null);
            regulatorBillRepository.delete(regulatorBill);
        }
        regulatorOrgRepository.delete(id);
        Long adminId = customerRepository.findRegulatorOrgAdminId(id);
        customer.getSysUsers().clear();
        customerRepository.delete(customer.getId());
        sysUserRepository.delete(adminId);
        LogUtil.error(logger, "customer of findByCustomerDetailsId = :" + customer);

        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 返回全部监管机构
     * @return
     */
    public ResponseEntity<Message> getAll(){
        List<RegulatorOrgDetails> regulatorOrgDetailses = regulatorOrgRepository.findAll();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS,regulatorOrgDetailses), HttpStatus.OK);
    }

}
