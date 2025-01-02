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
  
  switch(command) {
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
      const [todoId, editContent] = line.split(' ');
      todoList.edit(todoId, editContent);
      break;
  }

  command = null;
});
rl.on("close", () => {
  process.exit();
});