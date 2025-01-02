const TodoList = require("./TodoList.js");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const COMMAND = {
  print: 'print',
  add: 'add',
  delete: 'delete',
  finish: 'finish',
  edit: 'edit',
}

// 입력된 명령어
let command = null;
const todoList = new TodoList();

rl.on("line", (line) => {
  if(command === null && line !== COMMAND.print){
    command = line;
    return;
  }
  if(command === null && line === COMMAND.print){
      todoList.sort();
      todoList.print();
      return;
  }

  if (command === COMMAND.add){
    todoList.add(line);
  } else if (command === COMMAND.delete){
    todoList.delete(line);
  } else if (command === COMMAND.finish){
    todoList.finish(line);
  } else if (command === COMMAND.edit){
    const [todoId, editContent] = line.split(' ');
    todoList.edit(todoId, editContent);
  }

  command = null;
});
rl.on("close", () => {
  process.exit();
});