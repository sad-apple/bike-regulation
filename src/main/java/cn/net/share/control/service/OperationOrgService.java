package cn.net.share.control.service;

import cn.net.share.control.controller.FineBillController;
import cn.net.share.control.dao.*;
import cn.net.share.control.domain.*;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageInfo;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.dto.operationOrgDetails.OperationOrgDetailsDto;
import cn.net.share.control.utils.LogUtil;
import cn.net.share.control.utils.state.UserType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
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

import static org.apache.coyote.http11.Constants.a;

/**
 * Created by ${zhaochuanzhi} on 2017/7/15.
 */
@Service
public class OperationOrgService {

    private static final Logger logger = LoggerFactory.getLogger(OperationOrgService.class);
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private SysUserRepository sysUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private OperationOrgDetailsRepository operationOrgDetailsRepository;
    @Autowired
    private SysRoleRepository sysRoleRepository;


    /**
     * 分页返回运营组织列表
     *
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findOperationOrgs(OperationOrgDetails operationOrgDetails, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page operationOrgDetailses = operationOrgDetailsRepository.findAll(Example.of(operationOrgDetails, exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, operationOrgDetailses);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 创建运营组织
     *
     * @param dto
     * @return
     */
    @Transactional
    public ResponseEntity<Message> createOperationOrg(OperationOrgDetailsDto dto) {
        SysUser user = sysUserRepository.findByUsername(dto.getAdminUsername());
        if (user != null) {
            LogUtil.error(logger, "This user can not register, username = :" + dto.getAdminUsername());
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.USERNAME_ALREADY_EXIST), HttpStatus.OK);
        }
        OperationOrgDetails operationOrgDetails = new OperationOrgDetails();
        BeanUtils.copyProperties(dto, operationOrgDetails);
        operationOrgDetailsRepository.save(operationOrgDetails);
        SysRole role = sysRoleRepository.findOne(UserType.OPERATION_ORG_USER.value());
        List<SysRole> roles = new ArrayList<SysRole>();
        roles.add(role);
        SysUser sysUser = new SysUser(dto.getAdminUsername(), passwordEncoder.encode(dto.getAdminPassword()), dto.getName(), UserType.OPERATION_ORG_USER.value(), dto.getPhone(),roles);
        sysUserRepository.save(sysUser);
        Customer customer = new Customer(UserType.OPERATION_ORG_USER.value(), sysUser,dto.getRemark(), operationOrgDetails.getId());
        SysUser sysUserTemp = sysUserRepository.findOne(customer.getAdminId());
        sysUserTemp.setCustomer(customer);
        customerRepository.save(customer);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 修改运营组织信息
     *
     * @param dto
     * @return
     */
    public ResponseEntity<Message> updateOperationOrg(OperationOrgDetailsDto dto) {
        OperationOrgDetails operationOrgDetails = new OperationOrgDetails();
        BeanUtils.copyProperties(dto, operationOrgDetails);
        operationOrgDetailsRepository.save(operationOrgDetails);
        Long adminId = customerRepository.findOperationOrgAdminId(dto.getId());
        SysUser sysUser = sysUserRepository.findOne(adminId);
        sysUser.setUsername(dto.getAdminUsername());
        sysUserRepository.save(sysUser);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 获得一个运营组织
     * @param operationOrgId
     * @return
     */
    public ResponseEntity<Message> getOperationOrg(Long operationOrgId) {
        OperationOrgDetails operationOrgDetails = operationOrgDetailsRepository.findOne(operationOrgId);
        Long adminId = customerRepository.findOperationOrgAdminId(operationOrgId);
        SysUser sysUser = sysUserRepository.findOne(adminId);
        OperationOrgDetailsDto operationOrgDetailsDto = new OperationOrgDetailsDto(operationOrgDetails,sysUser);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, operationOrgDetailsDto), HttpStatus.OK);
    }


    /**
     * 获得所有运营组织
     * @return
     */
    public ResponseEntity<Message> getAll(){
        List<OperationOrgDetails> operationOrgDetailses = operationOrgDetailsRepository.findAll();
        for (int i = 0; i < operationOrgDetailses.size(); i++){
            if ("0".equals(operationOrgDetailses.get(i).getStatus())) {
                operationOrgDetailses.remove(i);
            }
        }
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS,operationOrgDetailses), HttpStatus.OK);
    }

    /**
     * 启用运营组织账户
     * @param id
     * @return
     */
    public ResponseEntity<Message> setEnableStatus(Long id){
        OperationOrgDetails operationOrgDetails = operationOrgDetailsRepository.findOne(id);
        operationOrgDetails.setStatus("1");
        operationOrgDetailsRepository.save(operationOrgDetails);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 禁用运营组织账户
     * @param id
     * @return
     */
    public ResponseEntity<Message> setDisableStatus(Long id){
        OperationOrgDetails operationOrgDetails = operationOrgDetailsRepository.findOne(id);
        operationOrgDetails.setStatus("0");
        operationOrgDetailsRepository.save(operationOrgDetails);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

}
