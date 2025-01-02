import {todoMap} from "./todoList.js";

const Output = {
    printWelcome() {
        console.log("소프티어 부트캠프 5기 투두리스트입니다!");
    },

    printTodos() {
        const size = todoMap.size;
        if(size === 0) {
            console.log('투두가 존재하지 않습니다.');
            return;
        }
        Output.printLine();
        console.log('투두리스트');
        console.log('id | title');
        todoMap.values().forEach((todo)=> {
            const { id, title } = todo.getTodo();
            console.log(id, '|', title)
        });
    },

    printMenu() {
        Output.printLine();
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

    printLine() {
        console.log("-".repeat(10));
    }
}



export default Output;