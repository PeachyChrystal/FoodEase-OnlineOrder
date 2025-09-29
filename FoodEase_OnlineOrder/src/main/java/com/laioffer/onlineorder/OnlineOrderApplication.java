package com.laioffer.onlineorder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication //表示从下面开始都是SpringBootApplication的一部分
public class OnlineOrderApplication {

    public static void main(String[] args) {
//        main的
        SpringApplication.run(OnlineOrderApplication.class, args);//表示吧Spring Application跑起来
    }
//任何Java程序必须有一个主入口，主入口必须有一个main函数public static void main（String[] args) {...}
}
