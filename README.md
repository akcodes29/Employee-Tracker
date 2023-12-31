# Employee-Tracker

## Description 
Build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.


## User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria 

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Install
Inquirer 8.2.4
Mysql2 3.6.1
console.table 0.10.0

## Usage

How to use this application: In the terminal run the command "node server.js", you will be met with many prompts as to what you would like to do with the database. Follow the prompts depending on which commands you chose.

## Credits
N/A

## License
N/A
## Screenshot
![SS](image.png)

## Video Link
https://drive.google.com/file/d/1NnSzzFdxiAQx_gp0K1YibpgNxyM8BrAm/view





