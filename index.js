// Required packages and module exports
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { choices } = require("yargs");
const template = render(teamMembers);
fs.writeFile("index.html", template, (err) => {
if (err) {
    throw err
}
console.log( "file has been succesfully created");
}) 

// Teamm members array 
const teamMembers = [];

// Manager prompts
function promptManager() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter the manager's name:",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the manager's id:",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log("Please enter the manager's ID!")
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter the manager's email:",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log('Please enter an email!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Enter the manager's office number:",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Please enter an office number!')
                    return false;
                } else {
                    return true;
                }
            }
        },
    ])
        .then((managerInput) => {
            const { name, id, email, officeNumber } = managerInput;
            const manager = new Manager(name, id, email, officeNumber);

            teamMembers.push(manager);
            console.log(manager);

        });
}
promptManager();

function menu() {
    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: "Choose your next team member",
        choices: [
            "Intern",
            "Engineer",
        ]
    })
        .then((choicesInput) => {
            console.log(choicesInput);
        })
}

menu();

