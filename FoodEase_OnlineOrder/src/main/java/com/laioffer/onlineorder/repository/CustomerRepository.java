package com.laioffer.onlineorder.repository;


import com.laioffer.onlineorder.entity.CustomerEntity;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;


import java.util.List;
//这个interface没有实现是Java帮你实现
//这个interface是针对CustomerEntity这个table
public interface CustomerRepository extends ListCrudRepository<CustomerEntity, Long> {


//    自定义函数，base interface不够
//    SELECT * FROM customers where first_Name = :firstName
//    查看spring repository query keyword学习函数命名方法
//    通过你的函数名猜出query
    List<CustomerEntity> findByFirstName(String firstName);


    List<CustomerEntity> findByLastName(String lastName);


    CustomerEntity findByEmail(String email);


    @Modifying
    @Query("UPDATE customers SET first_name = :firstName, last_name = :lastName WHERE email = :email")
    void updateNameByEmail(String email, String firstName, String lastName);
}
