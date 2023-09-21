const inquirer = require('inquirer');
const connection = require('./db/connection.js');
const cTable = require('console.table');

connection.connect(
    (error) => {
        if(error) {
            console.log(error)
        } else {
        askUser();
    }}
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
      if(answers.choice === 'Add Department'){
        createDepartment()
      } 
      if(answers.choice === 'View All Departments'){
        showAllDepartments()
      }
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
        function(err, results, fields) {
          console.log(err);
          console.log(results); // results contains rows returned by server
          
        }
      );
  })
}

const showAllDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        function(err, results) {
          console.log(err);
          console.log(results); // results contains rows returned by server
        }
      );
}