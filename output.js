import todoMap from "./todoList.js";

const Output = {
    printTodos() {
        todoMap.values().forEach((todo)=> {
            const { id, title } = todo.getTodo();
            console.log(id, title)
        });
    },
}



export default Output;