package cn.net.share.control.service;

import cn.net.share.control.dao.BikeGroupRepository;
import cn.net.share.control.dao.CustomerRepository;
import cn.net.share.control.dao.SysUserRepository;
import cn.net.share.control.domain.BikeGroup;
import cn.net.share.control.domain.Customer;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.bike.BikeGroupDto;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageInfo;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.LogUtil;
import cn.net.share.control.utils.state.UserType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BikeGroupService {

    private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);

    @Autowired
    private BikeGroupRepository bikeGroupRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private SysUserRepository sysUserRepository;

    /**
     * 分页获得分组列表
     * @param name
     * @param page
     * @param size
     * @param loginUser
     * @return
     */
    public ResponseEntity<Message> findByBikeGroupPage(String name, int page, int size, SysUser loginUser){
        LogUtil.info(logger, "BikeGroupService:findByBikeGroupPage, name = " + name + ", page = " + page + ", size = " + size);
        Pageable pageable = new PageRequest(page - 1, size, new Sort(Sort.Direction.DESC, "createTime"));

        if (name == null)
            name = "";

        Page<BikeGroup> bikeGroups = bikeGroupRepository.getByName(name, pageable);
        Page<BikeGroupDto> bikeGroupDtos = bikeGroups.map(new Converter<BikeGroup, BikeGroupDto>() {
            @Override
            public BikeGroupDto convert(BikeGroup bikeGroup) {
                BikeGroupDto bikeGroupDto = new BikeGroupDto(bikeGroup);
                if (bikeGroup.getCustomer() != null) {
                    Customer customer = bikeGroup.getCustomer();
                    if (customer.getAdminId() == null) {
                        bikeGroupDto.setUsername(customer.getSysUsers().get(0).getUsername());
                        bikeGroupDto.setFullName(customer.getSysUsers().get(0).getFullName());
                        bikeGroupDto.setType(customer.getSysUsers().get(0).getUserType());
                    } else {
                        SysUser sysUser = sysUserRepository.findOne(customer.getAdminId());
                        bikeGroupDto.setUsername(sysUser.getUsername());
                        bikeGroupDto.setFullName(sysUser.getFullName());
                        bikeGroupDto.setType(sysUser.getUserType());
                    }
                }
                return bikeGroupDto;
            }
        });

        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bikeGroupDtos);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 获得所有分组
     * @param bikeGroup
     * @param loginUser
     * @return
     */
    public ResponseEntity<Message> getBikeGroupAll(BikeGroup bikeGroup, SysUser loginUser){
        LogUtil.info(logger, "BikeGroupService:getBikeGroupAll, bikeGroup = " + bikeGroup);
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        if(loginUser.getCustomer() != null) {
            Customer customer = new Customer();
            customer.setId(loginUser.getCustomer().getId());
            bikeGroup.setCustomer(customer);
        }
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bikeGroupRepository.findAll(Example.of(bikeGroup,exampleMatcher)));
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 创建单车分组
     * @param bikeGroupDto
     * @return
     */
    public ResponseEntity<Message> createBikeGroup(BikeGroupDto bikeGroupDto){
        BikeGroup bikeGroup = null;
        if (bikeGroupDto.getUsername() != null && bikeGroupDto.getUsername() != "") {
            if (sysUserRepository.findByUsername(bikeGroupDto.getUsername()) == null) {
                LogUtil.error(logger, "This username doesn't exist, username = :" + bikeGroupDto.getUsername());
                return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.CUSTOMER_NOT_EXIST), HttpStatus.OK);
            }

            if ((sysUserRepository.findByUsername(bikeGroupDto.getUsername()).getCustomer() == null) && (customerRepository.findByAdminId(sysUserRepository.findByUsername(bikeGroupDto.getUsername()).getId()) == null)) {
                return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.USER_ISNOT_CUSTOMER), HttpStatus.OK);
            }

            if (sysUserRepository.findByUsername(bikeGroupDto.getUsername()).getUserType() == UserType.RIDER_USER.value()) {
                LogUtil.error(logger, "The rider can not be a group owner! rider username = :" + bikeGroupDto.getUsername());
                return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.ERROR_PERMISSION_DENIED), HttpStatus.OK);
            }
            SysUser sysUser = sysUserRepository.findByUsername(bikeGroupDto.getUsername());
            Customer customer = null;
            if (sysUser.getUserType() == UserType.BIKE_OWNER.value()) {
                String customerId = sysUser.getCustomer().getId();
                customer = customerRepository.findById(customerId);
            } else {
                customer = customerRepository.findByAdminId(sysUser.getId());
            }
            bikeGroup = new BikeGroup(bikeGroupDto);
            bikeGroup.setCustomer(customer);

        } else {
            bikeGroup = new BikeGroup(bikeGroupDto);
        }
        bikeGroupRepository.save(bikeGroup);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 更新单车分组
     * @param bikeGroupDto
     * @return
     */
    public ResponseEntity<Message> updateBikeGroup(BikeGroupDto bikeGroupDto){
        LogUtil.info(logger, "BikeGroupService:updateBikeGroup, bikeGroupDto = " + bikeGroupDto);
        BikeGroup bikeGroup = bikeGroupRepository.findOne(bikeGroupDto.getId());
        bikeGroup.setName(bikeGroupDto.getName());
        bikeGroup.setRemark(bikeGroupDto.getRemark());

        bikeGroupRepository.save(bikeGroup);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 返回单车分组
     * @param id
     * @return
     */
    public ResponseEntity<Message> getBikeGroup(String id){
        LogUtil.info(logger, "BikeGroupService:getBikeGroup, id = " + id);
        BikeGroup bikeGroup = bikeGroupRepository.findOne(id);
        BikeGroupDto bikeGroupDto = null;
        if (bikeGroup.getCustomer() != null) {
            Customer customer = bikeGroup.getCustomer();
            bikeGroupDto = new BikeGroupDto(bikeGroup);
            if (customer.getAdminId() == null) {
                bikeGroupDto.setUsername(customer.getSysUsers().get(0).getUsername());
                bikeGroupDto.setFullName(customer.getSysUsers().get(0).getFullName());
                bikeGroupDto.setType(customer.getSysUsers().get(0).getUserType());
            } else {
                SysUser sysUser = sysUserRepository.findOne(customer.getAdminId());
                bikeGroupDto.setUsername(sysUser.getUsername());
                bikeGroupDto.setFullName(sysUser.getFullName());
                bikeGroupDto.setType(sysUser.getUserType());
            }
        } else {
            bikeGroupDto = new BikeGroupDto(bikeGroup);
        }
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bikeGroupDto);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 删除单车分组
     * @param id
     * @return
     */
    public ResponseEntity<Message> deleteBikeGroup(String id){
        LogUtil.info(logger, "BikeGroupService:deleteBikeGroup, id = " + id);
        bikeGroupRepository.delete(id);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
