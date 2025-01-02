const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let todoId = 1;
const todoList = [];

// 입력된 명령어
let command = null;

const commands = ['add', 'print','delete','edit','finish'];

// 명령어 입력 -> 명령어가 어떤 역할인지 판단 -> 함수 실행
// add, print, delete, edit, finish
rl.on("line", (line) => {
  if(command === null){
    if(line === 'print'){
        todoList.forEach(todo => {
            console.log(todo);
        });
    } else {
        command = line;
    }
  } else if (command === 'add'){
    //add
    todoList.push({id:todoId++,content: line, isFinished: false});
    command = null;
  }
});
rl.on("close", () => {
  process.exit();
});