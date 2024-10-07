const { log, table, assert } = require('console');
const readline = require('readline');
const fs = require('fs');
const { json } = require('stream/consumers');


console.log('Welcome to Task Tracker');
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
}

function updateDescription(id, description){
    let content = JSON.parse(fs.readFileSync('data.json','utf8'));
    content[id].description = description;
    content[id].updatedAt = dateObject.toUTCString();
    fs.writeFileSync(path, JSON.stringify(content, null, 2));
}

statusValues = ['todo' , 'in-progress','done'];

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
// add('do homework', 'not started');
// updateDescription(1, 'is to eat and sleep');
// updateStatus(1, 'mark-done');
// deleteTasks(11);
listTasks('todo');



