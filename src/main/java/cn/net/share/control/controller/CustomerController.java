package cn.net.share.control.controller;

import cn.net.share.control.domain.Customer;
import cn.net.share.control.domain.RiderDetails;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.customer.RiderDto;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    /**
     * 分页返回客户列表
     * @param customer
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getCustomerList(Customer customer, int page, int size){
        return customerService.findByCustomerPage(customer, page, size);
    }

    /**
     * 新建客户
     * @param customer
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createCustomer(@RequestBody Customer customer){
        return customerService.createCustomer(customer);
    }

    /**
     * 返回一个客户
     * @param customerId
     * @return
     */
    @RequestMapping(value = "{customerId}",method = RequestMethod.GET)
    public ResponseEntity<Message> getCustomer(@PathVariable String customerId){
        return customerService.getCustomer(customerId);
    }

    /**
     * 修改客户
     * @param customer
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}" , method = RequestMethod.PUT)
    public ResponseEntity<Message> updateCustomer(@RequestBody Customer customer,@PathVariable String id){
        return customerService.updateCustomer(customer);
    }

    /**
     * 删除客户
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteCustomer(@PathVariable  String id){
        return customerService.deleteCustomer(id);
    }

    /**
     * 分页返回骑行用户列表
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(value = "/rider",method = RequestMethod.GET)
    public ResponseEntity<Message> getRiderList(int page, int size){
        return customerService.getRiderList(page,size);
    }

    /**
     * 创建骑行用户
     * @param riderDto
     * @return
     */
    @RequestMapping(value = "/createRider",method = RequestMethod.POST)
    public ResponseEntity<Message> createRider(@RequestBody RiderDto riderDto){
        return customerService.createSysUser(riderDto);
    }

    /**
     * 修改骑行用户
     * @param riderDto
     * @param id
     * @return
     */
    @RequestMapping(value = "/rider/{id}" , method = RequestMethod.PUT)
    public ResponseEntity<Message> updateRider(@RequestBody RiderDto riderDto,@PathVariable String id){
        riderDto.setId(id);
        return customerService.updateRider(riderDto);
    }

    /**
     * 查出一个骑行用户
     * @param id
     * @return
     */
    @RequestMapping(value = "/rider/{id}" , method = RequestMethod.GET)
    public ResponseEntity<Message> getRiderById(@PathVariable String id){
        return customerService.getRiderById(id);
    }

    /**
     * 修改骑行用户密码
     * @param id
     * @return
     */
    @RequestMapping(value = "/rider/{id}/updateRiderPassword" , method = RequestMethod.PUT)
    public ResponseEntity<Message> changeRiderPW(@PathVariable String id,@RequestBody Map map){
        return customerService.changePassword(id, map.get("oldPwd").toString(), map.get("newPwd").toString());
    }

    /**
     * 删除骑行用户
     * @param id
     * @return
     */
    @RequestMapping(value = "/riderRemove/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteRider(@PathVariable  String id){
        return customerService.deleteRider(id);
    }

    /**
     * 骑行用户升级
     * @param map
     * @return
     */
    @RequestMapping(value = "/upgrade",method = RequestMethod.PUT)
    public ResponseEntity<Message> upgrade(@RequestBody Map map){
        return customerService.upgrade(map.get("id").toString());
    }
}
