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
function renderHTML(teamMembers) {
    const html = render(teamMembers);
    return html;
}
function saveHTMLToFile(html) {
    fs.writeFile(outputPath, html, (err) => {
        if (err) {
            throw err;
        }
        console.log("HTML file has been successfully created: " + outputPath);
    });
}

// Teamm members array 
const teamMembers = [];
let lastManagerPromptAnswered = false;

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
            console.log(manager)
            lastManagerPromptAnswered = true;

            // Check if the flag is true before calling the menu
            if (lastManagerPromptAnswered) {
                menu();
            }
        });
        };
        



function menu() {
    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: "Choose your next team member",
        choices: [
            "Intern",
            "Engineer",
            "Done", 

        ]
    })

    .then((choicesInput) => {
        if (choicesInput.choice === "Engineer") {
            promptEngineer();
        } else if (choicesInput.choice === "Intern") {
            promptIntern();
        } else if (choicesInput.choice === "Exit") {
            console.log("Your team is now complete!");
        } else {
            
            console.log("Invalid choice. Please try again.");
            menu();
        }
    });

}

promptManager();

// Engineer prompts
function promptEngineer() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter the engineer's name:",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the engineer's id:",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log("Please enter the engineer's ID!")
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter the engineer's email:",
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
            name: 'github',
            message: "Enter the GitHub username:",
        },
    ])
        .then((engineerInput) => {
            const { name, id, email, github } = engineerInput;
            const engineer = new Engineer(name, id, email, github);

            teamMembers.push(engineer);
            console.log(engineer);

        });
}

// intern prompts
function promptIntern() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter the intern's name:",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the intern's id:",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log("Please enter the intern's ID!")
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter the intern's email:",
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
            name: 'school',
            message: "Enter the school:",
        },
    ])
        .then((internInput) => {
            const { name, id, email, school } = internInput;
            const intern = new Intern(name, id, email, school);

            teamMembers.push(intern);
            console.log(intern);

        });
}
