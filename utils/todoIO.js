const fs = require('fs');

function fileRead() {
    const todolist = fs.readFileSync('./todolist.txt', 'utf8')

    if (todolist.trim().length === 0) {
        return []
    }
    else {
        return todolist.split('\n')
            .map(line => line.split('-'))
    }
}

function fileWrite(data) {
    fs.writeFile('./todolist.txt', data, () => null)
}

module.exports = {
    fileRead,
    fileWrite
};