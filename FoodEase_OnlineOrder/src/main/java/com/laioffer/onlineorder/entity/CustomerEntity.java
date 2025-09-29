package com.laioffer.onlineorder.entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

//Maps this Java class (CustomerEntity) to the customers table in your database.
// annotation: 告诉Spring Data JDBC这个Entity是和customers连接的
//Effect: Tells Spring Data JDBC:
//"This record represents rows in the customers table."
//Without it, Spring would assume the table name is the same as the class name (e.g., customer_entity), which could cause issues if your actual table is named customers.
@Table("customers")
public record CustomerEntity(
//        Purpose: Marks the primary key field of the entity (in this case, id) so Spring knows which field to use as the unique identifier.
//        Effect: Spring will:
//        Use id as the primary key when inserting/updating/deleting.
//        Automatically generate or assign a value for id if configured (e.g., SERIAL in PostgreSQL).
        @Id Long id,
        String email,
        String password,
        boolean enabled,
        String firstName,
        String lastName
) {
}