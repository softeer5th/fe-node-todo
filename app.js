import Input from "./input.js";
import Output from "./output.js";
import Todo from "./todo.js";
import todoMap from "./todoList.js";

const App = async () => {
    while(1) {
        Output.printTodos();
        const menu = await Input.readMenu();
        if(menu === 'q' || menu === 'Q') break;
        else if(menu === '1') {
            const {title, contents}= await Input.InsertTodo();
            const id = todoMap.size;
            const newTodo = new Todo(title, contents, id);
            todoMap.set(id, newTodo);
        }
        else if(menu === '2') {
            const id = await Input.showTodo();
            Output.printTodoDetail(id);
        }
        else if (menu === '3') {
            const id = await Input.showTodo();
            todoMap.delete(Number(id));
        }
        else if(menu === '4') {
            const id = await Input.showTodo();
            const todo = todoMap.get(Number(id));
            const {newTitle, newContents} = await Input.editTodo(todo.getDetail());
            todo.editDetail(newTitle, newContents);
        } 
    }
}
App();