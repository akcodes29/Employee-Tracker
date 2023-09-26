DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;


create table department (
id int primary key auto_increment,
name varchar(30) not null
);


create table role (
id int primary key auto_increment,
title varchar(30),
salary decimal,
department_id int,
 FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE CASCADE
);


create table employee (
id int primary key auto_increment,
first_name varchar(30),
last_name varchar(30),
role_id int,
manager_id int ,
 FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE CASCADE,
   FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);