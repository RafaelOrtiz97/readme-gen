// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "Enter project title: ",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter project title!');
                return false;
            }
        }
    },
    {
        type: "input",
        name: "description",
        message: "Enter description of the functionality of this project: ",
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log('Please enter description!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'link',
        message: 'Enter link to your deployed application: ',
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Please enter a link!');
                return false;
            }
        }
    },
    {
        type: "input",
        name: "screenshot",
        message: "Enter path to screenshot: ",
        validate: screenInput => {
            if (screenInput) {
                return true;
            } else {
                console.log('Please enter screenshot!');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'contents',
        message: 'Any additional sections you would like to include in your README?',
        choices: [
            {
                name: 'Installation',
                checked: false
            },
            {
                name: 'License',
                checked: false
            },
            {
                name: 'Usage',
                checked: true
            },
            {
                name: 'Contributing',
                checked: false
            },
            {
                name: 'Tests',
                checked: false
            },
            {
                name: 'Questions',
                checked: true
            },
        ]
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter required packages for installation of your application: ',
        when: ({ contents }) => {
            if (contents.indexOf('Installation') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please enter installation instructions!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Select license information.',
        choices: ['MIT', 'GNU', 'Apache', 'ISC'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('License') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Please select license information!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter how to use application: ',
        when: ({ contents }) => {
            if (contents.indexOf('Usage') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please enter how to use application!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Enter contributers: ',
        when: ({ contents }) => {
            if (contents.indexOf('Contributing') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log('Please enter contributers!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter packages that are required to run tests for application: ',
        when: ({ contents }) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Please enter packages that are required to run tests for application!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email address: ',
        when: ({ contents }) => {
            if (contents.indexOf('Questions') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log('Please enter email address!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'username',
        message: 'Enter username: ',
        when: ({ contents }) => {
            if (contents.indexOf('Questions') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log('Please enter username!');
                return false;
            }
        }
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
};

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then((responses) => {
        console.log("Creating README.md File...");
        writeToFile("./dist/README.md", generateMarkdown({ ...responses }));
      });
};

// Function call to initialize app
init();
