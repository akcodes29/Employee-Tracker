const inquirer = require('inquirer');
const connection = require('./db/connection.js');
require('console.table');




connection.connect(
    (error) => {
        if (error) {
            console.log(error)
        } else {
            askUser();
        }
    }
)

const askUser = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: ["Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit", "View All Employees"]
            }
        ])
        .then((answers) => {
            console.log(answers)
            if (answers.choice === 'Add Department') {
                createDepartment()
            }
            else if (answers.choice === 'View All Departments') {
                showAllDepartments()
            }
            else if (answers.choice === 'Add Role') {
                addRole()
            }
            else if (answers.choice === 'View All Roles') {
                showAllRoles()
            }
            else if (answers.choice === 'Add Employee') {
                addEmployee()
            }
            else if (answers.choice === 'View All Employees') {
                showAllEmployees()
            }
            else if (answers.choice === 'Update Employee Role') {
                updateEmployeeRole()
            }
            else {
                process.exit()
            }


            //   switch (answers.choices) {
            //     case 'Add Role':

            //         break;
            //     case 'Add Employee':

            //         break;
            //     default:
            //         break;
            //   }
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });

}

const createDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "Enter the name of the department."
        }
    ])
        .then((answers) => {
            console.log(answers)
            connection.query(
                `INSERT INTO department(name) VALUES('${answers.departmentName}')`,
                function (err, results) {
                    console.log(err);
                    console.table(results); // results contains rows returned by server
                    askUser()

                }
            )
        })
}

const showAllDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results) {
            console.log(err);
            console.table(results); // results contains rows returned by server
            askUser()
        }
    );
}

const addRole = () => {

    connection.query('select * from department', function (err, res) {
        const departmentList = res.map(({ id, name }) => ({
            name: name,
            value: id
        }))

        inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "Enter the name of the role."
            },
            {
                type: "number",
                name: "salaryNum",
                message: "What is the salary?"
            },
            {
                type: "list",
                name: "departmentId",
                message: "Choose the department",
                choices: departmentList
            }
        ])
            .then((answers) => {
                console.log(answers)
                connection.query(
                    `INSERT INTO role (title, salary, department_id) VALUES('${answers.roleName}', '${answers.salaryNum}', '${answers.departmentId}')`,
                    function (err, results) {
                        console.log(err);
                        console.log('new role has been added!'); // results contains rows returned by server
                        askUser()
                    }
                )
            })
    })
}

const showAllRoles = () => {
    connection.query(
        `SELECT role.id, role.title, role.salary, department.name AS departmentName FROM role JOIN department ON role.department_id = department.id`,
        function (err, results) {
            console.log(err);
            console.table(results); // results contains rows returned by server
            askUser()
        }
    );
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service']
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager",
            choices: ['None', 'Drake', 'Taylor Swift', 'Kenny Chesney', 'Morgan Wallen', 'Jesus']
        }
    ])
        .then((answers) => {
            console.log(answers)
            connection.query(
                `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${answers.first_name}', '${answers.last_name}', '${answers.role_id}', '${answers.manager_id}')`,
                function (err, results) {
                    console.log(err);
                    console.table(results); // results contains rows returned by server

                }
            )
        })
}

const showAllEmployees = () => {
    //  employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, manager.first_name AS managerFirstName, manager.last_name AS managerLastName FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON  role.department_id = department.id LEFT JOIN employee AS manager ON manager.id = employee.manager_id`,
        function (err, results) {
            console.log(err);
            console.table(results); // results contains rows returned by server
            askUser()
        }
    );
}

const updateEmployeeRole = () => {

    connection.query('select * from employee', function (err, res) {
        const employeeList = res.map(({id, first_name, last_name}) => ({
            name: first_name + ' ' + last_name,
            value: id, 
        }))

     connection.query('select * from role', function (err, res) {
            const roleList = res.map(({ id, title }) => ({
                name: title ,
                value: id
            }))
  
     inquirer.prompt([
        {
            type: "list",
            name: "updateER",
            message: "Which employee's role do you want to update?",
            choices: employeeList
        },
        {
            type: "list",
            name: "updateRoleTitle",
            message: "Which role do you want to assign the selected employee?",
            choices: roleList
        }
    ])
    .then((answers) => {
        console.log(answers)
        connection.query(
            `UPDATE employee SET role_id = ('${answers.updateRoleTitle}') WHERE employee.id = employee.role_id `,
            function (err, results) {
                console.log(err);
                console.log('new role has been added!'); // results contains rows returned by server
                askUser()
            }
        )
    })
   })
 })
}



