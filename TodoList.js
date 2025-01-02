const Todo = require("./Todo.js");

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

module.exports = TodoList;