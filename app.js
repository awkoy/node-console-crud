const fs = require('fs');

const filename = `${process.argv[2]}.json`;
const action = process.argv[3];
const title = process.argv[4];
const content = process.argv[5];
const fileExist = fs.existsSync(`${__dirname}\\${filename}`);

switch (action) {
    case 'init':
        createFile();
        break;
    case 'delete':
        deleteFile();
        break;
    case 'add':
        addNote();
        break;
    case 'view':
        viewNote();
        break;
    case 'remove':
        removeNote();
        break
    case 'list':
        listNote();
        break;
    default:
        console.log('Неизвестное действие! "add" "view" "delete" "list"');
}

function removeNote() {
    fs.readFile(filename,'utf-8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);
        notes = notes.filter(el => {!el.title === title});
        const json = JSON.stringify(notes);
        fs.writeFile(filename, json, err => {
            if (err) throw err;

            console.log(`Note remove in ${filename}`);
        })
    });
}

function addNote() {
    fs.readFile(filename,'utf-8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);
        notes.push({ title, content });
        const json = JSON.stringify(notes);
        fs.writeFile(filename, json, err => {
            if (err) throw err;

            console.log(`Note added in ${filename}`);
        })
    });
}

function viewNote() {
    fs.readFile(filename,'utf-8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);
        notes.filter(el => {
            (el.title === title) && console.log(`title: "${el.title}" \r\n----\r\ncontent: "${el.content}"` )
        });
    });
}

function listNote() {
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);
        if (notes.length === 0) return console.log('This file empty!');
        notes.forEach((el,i) => {
            console.log(`${i+1}. ${el.title}\n`)
        });
    });
}

function createFile() {
    if (!fileExist) {
        fs.writeFile(filename, '[]', err => {
            if (err) throw err;

            console.log('File created!');
        })
    } else {
        console.log(`A file with the name "${filename}" already exists!`)
    }
}

function deleteFile() {
    if (fileExist) {
        fs.unlink(filename, err => {
            if (err) throw err;

            console.log('File deleted!');
        })
    } else {
        console.log(`A file with the name "${filename}" not found!`)
    }
}