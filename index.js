const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let todoId = 1;
let todoList = [];

// 입력된 명령어
let command = null;

const commands = ['add', 'print','delete','edit','finish'];

const sortTodoList = () => {
  todoList.sort((a, b) => {
    if(a.isFinished > b.isFinished) return 1;
    else if(a.isFinished < b.isFinished) return -1;
    return 0;
  })
}

const printTodoList = () => {
  console.log('id | content')
  console.log('------------')
  todoList.forEach(todo => {
      console.log(` ${todo.id} | ${todo.content} ${todo.isFinished ? '(finished)' : ''}`);
  });
}

// 명령어 입력 -> 명령어가 어떤 역할인지 판단 -> 함수 실행
// add, print, delete, edit, finish
rl.on("line", (line) => {
  if(command === null && line !== 'print'){
    command = line;
    return;
  }
  if(command === null && line === 'print'){
      sortTodoList();
      printTodoList();
      return;
  }

  if (command === 'add'){
    //add
    todoList.push({id:todoId++,content: line, isFinished: false});
  } else if (command === 'delete'){
    //delete
    todoList = todoList.filter(todo => todo.id !== Number(line));
  } else if (command === 'finish'){
    //finish
    todoList = todoList.map(todo => todo.id === Number(line) ? {...todo, isFinished: true} : todo);
  } else if (command === 'edit'){
    //edit
    const [todoId, editContent] = line.split(' ');
    todoList = todoList.map(todo => todo.id === Number(todoId) ? {...todo, content: editContent} : todo);
  }

  command = null;
});
rl.on("close", () => {
  process.exit();
});