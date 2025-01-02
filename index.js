const TodoList = require('./TodoList.js');
const readline = require('readline');

let command = null; // 이전에 입력된 명령어(add, print, delete, edit, finish)
const todoList = new TodoList();

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
};

const INFO_MESSAGE = {
  start: '[START] 명령어를 입력해주세요: add, print, delete, edit, finish',
  next: '\n명령어를 입력해주세요: add, print, delete, edit, finish',
  add: '추가할 내용을 입력해주세요:',
  delete: '삭제할 todo id를 입력해주세요:',
  finish: '완료한 todo id를 입력해주세요:',
  edit: '수정할 todo id와 수정할 내용을 공백을 두고 입력해주세요:',
  error: '잘못된 명령어입니다. 다시 입력해주세요!',
};

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
      const [todoId, editContent] = line.split(' ');
      todoList.edit(todoId, editContent);
      break;
  }

  command = null;
  console.log(INFO_MESSAGE.next);
});
rl.on('close', () => {
  process.exit();
});
