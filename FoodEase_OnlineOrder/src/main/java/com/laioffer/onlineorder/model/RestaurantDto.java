package com.laioffer.onlineorder.model;


import com.laioffer.onlineorder.entity.RestaurantEntity;


import java.util.List;


public record RestaurantDto(
        Long id,
        String name,
        String address,
        String phone,
        String imageUrl,
        List<MenuItemDto> menuItems
) {


    public RestaurantDto(RestaurantEntity entity, List<MenuItemDto> menuItems) {
        this(entity.id(), entity.name(), entity.address(), entity.phone(), entity.imageUrl(), menuItems);
    }
}


// 为什么相对于RestaurantEntity去掉了restaurantId？
// “single source of truth”

//restaurantDto(
//    id: 10
//
//    menuItems: {
//        restaurant: 11
//    }, {
//        restaurantId: 11
//    }, {
//        restaurantId: 11
//    }
//)