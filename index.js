const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Todo {
  #id;
  #content;
  #isFinished;

  constructor({id, content, isFinished}){
    this.#id = id;
    this.#content = content;
    this.#isFinished = isFinished;
  }

  get id() {
    return this.#id;
  }

  get content() {
    return this.#content;
  }

  get isFinished() {
    return this.#isFinished;
  }
  
  mine(){
    return {id: this.#id, content: this.#content, isFinished: this.#isFinished }
  }
}

class TodoList {
  #todoList = [];
  #nextId = 1;

  add(content){
    const todo = new Todo({ id:this.#nextId++, content, isFinished: false });
    this.#todoList.push(todo);
  }
  print(){
    console.log('id | content')
    console.log('------------')
    console.log('print todoList:', this.#todoList);
    this.#todoList.forEach(todo => {
        console.log(` ${todo.id} | ${todo.content} ${todo.isFinished ? '(finished)' : ''}`);
    });
  }
  delete(todoId){
    this.#todoList = this.#todoList.filter(todo => todo.id !== Number(todoId));
  }
  edit(todoId, content){
    this.#todoList = this.#todoList.map(todo => todo.id === Number(todoId) ? new Todo({...todo.mine(), content}) : todo);
  }
  finish(todoId){
    this.#todoList = this.#todoList.map(todo => todo.id === Number(todoId) ? new Todo({...todo.mine(), isFinished: true}) : todo);
  }
  sort(){
    this.#todoList.sort((a, b) => {
      if(a.isFinished > b.isFinished) return 1;
      else if(a.isFinished < b.isFinished) return -1;
      return 0;
    })
  }
}

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