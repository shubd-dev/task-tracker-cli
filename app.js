import { log, table, assert } from 'console';
import readline from 'readline';
import fs from 'fs';
import { json } from 'stream/consumers';


const path = './data.json';
const dateObject = new Date();




//add function to add task to json file
function add(description){

    var dict = {
        'description':description,
        'status':'todo',
        'createdAt': dateObject.toUTCString(),
        'updatedAt': null
    }

    //checking if JSON file exist and pushing new data in it  
    if(!fs.existsSync(path)){
        fs.writeFileSync(path, JSON.stringify({}, null, 2));
    }
    const data = JSON.parse(fs.readFileSync(path));
    const nextIndex = Object.keys(data).length + 1;
    data[nextIndex] = dict;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    console.log(`Task added successfully (ID: ${nextIndex})`);
    
}

function updateDescription(id, description){
    let content = JSON.parse(fs.readFileSync('data.json','utf8'));
    content[id].description = description;
    content[id].updatedAt = dateObject.toUTCString();
    fs.writeFileSync(path, JSON.stringify(content, null, 2));
    console.log("Updated Description Successfully");
    
}

let statusValues = ['todo' , 'in-progress','done'];

function updateStatus(id, status){
    let content = JSON.parse(fs.readFileSync(path, 'utf-8'));
    if(status == 'mark-in-progress')
        status = 'in-progress';
    else if(status == 'mark-done')
        status = 'done';

    if(!statusValues.includes(status)){
        console.log('Invalid Status');
        return;
    }
    content[id].status = status;
    content[id].updatedAt = dateObject.toUTCString();
    fs.writeFileSync(path, JSON.stringify(content, null, 2));
    console.log("Updated Status Successfully");
    
}

function deleteTasks(id){
    //check if JSON file exists or not
    if(!fs.existsSync(path)){
        console.log('No Data exists to delete');
        return;
    }

    const data = JSON.parse(fs.readFileSync(path));
    if(data.hasOwnProperty(id)){
        delete data[id];
        console.log(`id ${id} deleted successfully`);
    } else {
        console.log(`id ${id} not found`);
    }

    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}


function listTasks(status) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            const tasksArray = Object.keys(jsonData).map(key => ({
                id: key,
                ...jsonData[key]
            }));

            let filteredTasks;
            if (status === 'done') {
                filteredTasks = tasksArray.filter(item => item.status === 'done');
            } else if (status === 'in-progress') {
                filteredTasks = tasksArray.filter(item => item.status === 'in-progress');
            } else if (status === 'todo') {
                filteredTasks = tasksArray.filter(item => item.status === 'todo');
            } else {
                filteredTasks = tasksArray;
            }

            console.table(filteredTasks);
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
        }
    });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function main() {
    console.log("Task Tracker CLI\n");
    console.log(`help - 
        1. task-cli add <task>
        2. task-cli update <id> "description" (quotes included)
        3. task-cli delete <id>
        4. task-cli mark-<status : in-progress, done> <id>
        5. task-cli list (to list all)
        6. task-cli list <status : in-progress, done>
        7. task-cli exit
    `);

    // Function to handle user input
    const handleCommand = (command) => {
        if (command.split(" ")[0] === "add") {
            add(command.slice(5, -1));
        } else if (command.split(" ")[0] === "update") {
            updateDescription(command.split(" ")[1], command.slice(10));
        } else if (command.slice(0, 4) === 'mark') {
            updateStatus(command.split("-")[1], command.split(" ")[1]);
        } else if (command.split(" ")[0] === 'delete') {
            deleteTasks(command.split(" ")[1]);
        } else if (command === 'list') {
            listTasks();
        } else if (command.startsWith('list ')) {
            const status = command.split(" ")[1];
            listTasks(status);
        } else if (command === "exit") {
            rl.close();
            return; // Exit the loop
        } 

        // Prompt for the next command
        rl.question("task-cli ", handleCommand);
    };

    // Start prompting for commands
    rl.question("task-cli ", handleCommand);
}


main();

// add('do homework', 'not started');
// updateDescription(1, 'is to eat and sleep');
// updateStatus(1, 'mark-done');
// deleteTasks(11);
// listTasks('done');





