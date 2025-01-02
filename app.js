import Input from "./input.js";
import Output from "./output.js";
import {todoMap,  setTodoMap } from "./todoList.js";

const App = async () => {
    Output.printWelcome();

    while(1) {
        Output.printTodos();
        Output.printMenu();

        const menu = await Input.readMenu();
        if(menu === 'q' || menu === 'Q') break;
        else if(menu === '1') {
            const {title, contents}= await Input.insertTodo();
            setTodoMap({title, contents});
        }
        else if(menu === '2') {
            const id = await Input.getTodoId();
            Output.printTodoDetail(id);
        }
        else if(menu === '3') {
            const id = await Input.getTodoId();
            const todo = todoMap.get(Number(id));
            const {newTitle, newContents} = await Input.editTodo(todo.getDetail());
            todo.editDetail(newTitle, newContents);
        } 
        else if (menu === '4') {
            const id = await Input.getTodoId();
            todoMap.delete(Number(id));
        }
    }
}
App();