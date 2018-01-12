package cn.net.share.control.controller;

import cn.net.share.control.domain.OperationOrgDetails;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.operationOrgDetails.OperationOrgDetailsDto;
import cn.net.share.control.service.OperationOrgService;
import cn.net.share.control.utils.LogUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.apache.coyote.http11.Constants.a;

/**
 * Created by zhaochuanzhi on 2017/7/15.
 */
@RestController
@RequestMapping("operation-orgs")
public class OperationOrgController {

    @Autowired
    private OperationOrgService operationOrgService;

    /**
     * 分页返回运营组织列表
     * @param
     * @param page
     * @param size
     * @return
     **/
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getOperationOrgList(int page, int size, OperationOrgDetails operationOrgDetails){
        return operationOrgService.findOperationOrgs(operationOrgDetails,page,size);
    }

    /**
     * 创建一个运营组织
     * @param operationOrgDetailsDto
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createOperationOrg(@RequestBody OperationOrgDetailsDto operationOrgDetailsDto){
        return operationOrgService.createOperationOrg(operationOrgDetailsDto);
    }

    /**
     * 修改运营组织
     * @param operationOrgDetailsDto
     * @return
     */
    @RequestMapping(value = "/{id}",method = RequestMethod.PUT)
    public ResponseEntity<Message> updateOperationOrg(@RequestBody OperationOrgDetailsDto operationOrgDetailsDto,@PathVariable Long id){
//        operationOrgDetailsDto.setId(id);
        return operationOrgService.updateOperationOrg(operationOrgDetailsDto);
    }

    /**
     * 获得一个运营组织
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public ResponseEntity<Message> getOperationOrg(@PathVariable Long id){
        return operationOrgService.getOperationOrg(id);
    }

    /**
     * 获得所有的运营组织
     * @return
     */
    @RequestMapping(value = "/collection", method = RequestMethod.GET)
    public ResponseEntity<Message> getAllOperationOrgs(){
        return operationOrgService.getAll();
    }

    /**
     * 启用运营组织账户
     * @param id
     * @return
     */
    @RequestMapping(value = "/enable/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> setEnableStatus (@PathVariable Long id){
        return operationOrgService.setEnableStatus(id);
    }

    /**
     * 禁用运营组织账户
     * @param id
     * @return
     */
    @RequestMapping(value = "/disable/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> setDisableStatus (@PathVariable Long id){
        return operationOrgService.setDisableStatus(id);
    }

}


