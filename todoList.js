import Todo from "./todo.js";

let index = 1;

export const todoMap = new Map();

export const setTodoMap = (todo) => {
    const {title, contents} = todo;
    const newTodo = new Todo(title, contents, index);
    todoMap.set(index, newTodo);
    index++;
};

export const isInTodoMap = (id) => {
    if (todoMap.has(Number(id))) return true;
    return false;
}