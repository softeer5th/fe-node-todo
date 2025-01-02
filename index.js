const TodoList = require('./TodoList.js');
const readline = require('readline');
const { INFO_MESSAGE, COMMAND } = require('./constant.js');

let command = null; // 이전에 입력된 명령어(add, print, delete, edit, finish)
const todoList = new TodoList();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printInfoMessage = (command) => {
  switch (command) {
    case COMMAND.add:
      console.log(INFO_MESSAGE.add);
      break;
    case COMMAND.delete:
      console.log(INFO_MESSAGE.delete);
      break;
    case COMMAND.finish:
      console.log(INFO_MESSAGE.finish);
      break;
    case COMMAND.edit:
      console.log(INFO_MESSAGE.edit);
      break;
  }
};

console.log(INFO_MESSAGE.start);

rl.on('line', (line) => {
  if (command === null && !Object.values(COMMAND).includes(line)) {
    console.log(INFO_MESSAGE.error);
    return;
  }

  if (command === null && line !== COMMAND.print) {
    command = line;
    printInfoMessage(command);
    return;
  }

  if (command === null && line === COMMAND.print) {
    todoList.sort();
    todoList.print();
    console.log(INFO_MESSAGE.next);
    return;
  }

  try {
    switch (command) {
      case COMMAND.add:
        todoList.add(line);
        break;
      case COMMAND.delete:
        todoList.delete(line);
        break;
      case COMMAND.finish:
        todoList.finish(line);
        break;
      case COMMAND.edit:
        todoList.edit(line);
        break;
    }

    command = null;
    console.log(INFO_MESSAGE.next);
  } catch (error) {
    console.log(error.message);
  }
});
rl.on('close', () => {
  process.exit();
});
