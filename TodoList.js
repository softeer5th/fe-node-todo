const Todo = require('./Todo.js');
const { ERROR_MESSAGE } = require('./constant.js');

class TodoList {
  #todoList = [];
  #nextId = 1;

  add(content) {
    if (content.length === 0) {
      throw new Error(ERROR_MESSAGE.blank);
    }

    const todo = new Todo({ id: this.#nextId++, content, isFinished: false });
    this.#todoList.push(todo);
  }
  print() {
    console.log('id | content');
    console.log('------------');
    this.#todoList.forEach((todo) => {
      console.log(` ${todo.id} | ${todo.content} ${todo.isFinished ? '(finished)' : ''}`);
    });
  }
  delete(todoId) {
    if (!this.#todoList.find((todo) => todo.id === Number(todoId))) {
      throw new Error(ERROR_MESSAGE.notFound);
    }

    this.#todoList = this.#todoList.filter((todo) => todo.id !== Number(todoId));
  }
  edit(line) {
    const data = line.split(' ');
    const [todoId, content] = data;

    if (data.length !== 2) {
      throw new Error(ERROR_MESSAGE.format);
    }

    if (!this.#todoList.find((todo) => todo.id === Number(todoId))) {
      throw new Error(ERROR_MESSAGE.notFound);
    }

    this.#todoList = this.#todoList.map((todo) =>
      todo.id === Number(todoId) ? new Todo({ ...todo.mine(), content }) : todo,
    );
  }
  finish(todoId) {
    const targetTodo = this.#todoList.find((todo) => todo.id === Number(todoId));

    if (!targetTodo) {
      throw new Error(ERROR_MESSAGE.notFound);
    }

    if (targetTodo && targetTodo.isFinished) {
      throw new Error(ERROR_MESSAGE.isFinished);
    }

    this.#todoList = this.#todoList.map((todo) =>
      todo.id === Number(todoId) ? new Todo({ ...todo.mine(), isFinished: true }) : todo,
    );
  }
  sort() {
    this.#todoList.sort((a, b) => {
      if (a.isFinished > b.isFinished) return 1;
      else if (a.isFinished < b.isFinished) return -1;
      return 0;
    });
  }
}

module.exports = TodoList;
