package com.laioffer.onlineorder.repository;


import com.laioffer.onlineorder.entity.OrderItemEntity;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;


import java.util.List;


public interface OrderItemRepository extends ListCrudRepository<OrderItemEntity, Long> {

//这个All可以不写，写就是让读的人更清楚返回的是多个
    List<OrderItemEntity> getAllByCartId(Long cartId);

// select * from order_items where cartId = :cartId and menuItemId = :menuItemId;
    OrderItemEntity findByCartIdAndMenuItemId(Long cartId, Long menuItemId);


    @Modifying
    @Query("DELETE FROM order_items WHERE cart_id = :cartId")
    void deleteByCartId(Long cartId);
}
