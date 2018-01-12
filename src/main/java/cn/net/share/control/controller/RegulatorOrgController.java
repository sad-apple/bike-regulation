package cn.net.share.control.controller;

import cn.net.share.control.domain.RegulatorOrgDetails;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.regulatorOrgDetailsDto.RegulatorOrgDetailsDto;
import cn.net.share.control.service.RegulatorOrgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by shuzhengxing on 2017/7/13.
 */
@RestController
@RequestMapping("regulator-orgs")
public class RegulatorOrgController {

    @Autowired
    private RegulatorOrgService regulatorOrgService;

    /**
     *分页返回监管机构列表
     * @param regulatorOrgDetails
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getRegulatorOrgList(RegulatorOrgDetails regulatorOrgDetails, int page, int size){
        return regulatorOrgService.findByRegulatorOrgDetailsPage(regulatorOrgDetails,page,size);
    }

    /**
     * 返回一个监管机构
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> getRegulatorOrgDetails(@PathVariable Long id){
        return regulatorOrgService.getRegulatorOrgDetails(id);
    }

    /**
     * 检查账号是否已存在
     * @param adminName
     * @return
     */
    @RequestMapping(value = "/{adminName}")
    public ResponseEntity<Message> check(@PathVariable String adminName){
        return regulatorOrgService.checkSysUserIsNull(adminName);
    }

    /**
     * 创建监管机构
     * @param regulatorOrgDetailsDto
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createRegulatorOrg(@RequestBody RegulatorOrgDetailsDto regulatorOrgDetailsDto){
        return regulatorOrgService.createRegulatorOrgDetails(regulatorOrgDetailsDto);
    }

    /**
     * 更新监管机构
     * @param regulatorOrgDetailsDto
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Message> updateRegulatorOrg(@PathVariable String id,@RequestBody RegulatorOrgDetailsDto regulatorOrgDetailsDto){
        return regulatorOrgService.updateRegulatorOrgDetails(regulatorOrgDetailsDto);
    }

    /**
     * 删除监管机构
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteRegulatorOrgDetails(@PathVariable Long id){
        return regulatorOrgService.deleteRegulatorOrgDetails(id);
    }

    /**
     * 返回全部监管机构
     * @return
     */
    @RequestMapping(value = "collection", method = RequestMethod.GET)
    public ResponseEntity<Message> getAllRegulatorOrgs(){
        return regulatorOrgService.getAll();
    }

}
