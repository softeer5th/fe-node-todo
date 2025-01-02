import {todoMap} from "./todoList.js";

const Output = {
    printWelcome() {
        console.log("소프티어 부트캠프 5기 투두리스트입니다!");
    },

    printTodos() {
        todoMap.values().forEach((todo)=> {
            const { id, title } = todo.getTodo();
            console.log(id, title)
        });
    },

    printMenu() {
        console.log("-".repeat(10));
        console.log("1. 추가");
        console.log("2. 조회");
        console.log("3. 수정");
        console.log("4. 삭제");
        console.log("q. 종료");
    },

    printTodoDetail(id) {
        const todo = todoMap.get(Number(id));
        const {title, contents} = todo.getDetail();
        console.log(title, contents);
    },
}



export default Output;