package cn.net.share.control.dao;

import cn.net.share.control.domain.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,String> {
    Page findByType(Integer l, Pageable pageable);

    Page<Customer> findByTypeBetween(int i, int i1, Pageable pageable);
}
