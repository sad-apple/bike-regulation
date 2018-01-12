package cn.net.share.control.service;

import org.springframework.stereotype.Service;

@Service
public class CustomerService {

//    private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);
//
//    @Autowired
//    private RiderDetailsRepository riderDetailsRepository;
//
//    @Autowired
//    private CustomerRepository customerRepository;
//
//    @Autowired
//    private SysUserRepository sysUserRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private SysRoleRepository sysRoleRepository;
//
//    @Autowired
//    private SysRoleService sysRoleService;

//    /**
//     * 分页返回客户列表
//     * @param customer
//     * @param page
//     * @param size
//     * @return
//     */
//    public ResponseEntity<Message> findByCustomerPage(Customer customer, int page, int size){
//        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
//        Page customers = customerRepository.findAll(Example.of(customer, exampleMatcher), new PageRequest(page - 1, size,new Sort(Sort.Direction.DESC,"createTime")));
//        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, customers);
//        return new ResponseEntity<Message>(message, HttpStatus.OK);
//    }
//
//    /**
//     * 创建一个客户 并保存客户的管理员账号以及设置一个默认的一级管理员角色
//     * @param customer
//     * @return
//     */
//    public ResponseEntity<Message> createCustomer(Customer customer){
//        SysUser teamUser = sysUserRepository.findByUsername(customer.getAdmin().getUsername());
//        if(teamUser!=null){
//            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR,"用户名已经存在"), HttpStatus.OK);
//        }
//        customer.getAdmin().setUserType(UserType.FIRST_ADMIN.value());
//        customer.getAdmin().setPassword(passwordEncoder.encode(customer.getAdmin().getPassword()));
//        customer.getAdmin().setCustomer(customer);
//        customer.getAdmin().setRoles(sysRoleService.getOneAdminRole());
//        customerRepository.save(customer);
//        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
//    }
//
//    /**
//     * 返回一个客户
//     * @param customerId
//     * @return
//     */
//    public ResponseEntity<Message> getCustomer(String customerId){
//        Customer customer = customerRepository.findOne(customerId);
//        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS,customer), HttpStatus.OK);
//    }
//
//    /**
//     * 更新客户
//     * @param customer
//     * @return
//     */
//    public ResponseEntity<Message> updateCustomer(Customer customer){
//        customerRepository.save(customer);
//        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
//    }
//
//    /**
//     * 删除客户，双向关联原因 先置空管理员中的客户 再进行删除
//     * @param id
//     * @return
//     */
//    @Transactional
//    public ResponseEntity<Message> deleteCustomer(String id){
//        Customer customer = customerRepository.findOne(id);
//        customer.getAdmin().setCustomer(null);
//        sysUserRepository.delete(customer.getAdmin());
//        customerRepository.delete(customer);
//        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
//    }
//
//

}
