import todoMap from "./todoList.js";

const Output = {
    printTodos() {
        todoMap.values().forEach((todo)=> {
            const { id, title } = todo.getTodo();
            console.log(id, title)
        });
    },

    printTodoDetail(id) {
        const todo = todoMap.get(Number(id));
        const {title, contents} = todo.getDetail();
        console.log(title, contents);
    }
}



export default Output;