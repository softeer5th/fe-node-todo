
import readlineSync  from 'readline-sync'

const todoList = [];
let todoId = 1;

const showList = () => {
    console.log("-".repeat(25));
    if (todoList.length <= 0) {
        console.log("할 일 목록이 비었습니다.");
        console.log("-".repeat(25)+"\n");
    
        return;
    }
    for (const {id, todo, done} of todoList) {
        console.log(`${id} ${todo} ${done ? "O" : "X"}`);
    }
    console.log("-".repeat(25)+"\n");
    
}

const addToDo = (todo) => {
    todoList.push({id: todoId++, todo: todo, done: false});
}

const checkToDo = (checkId) => {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === checkId) {
            todoList[i].done = !todoList[i].done;
        }
    }
}

const editToDo = (changeId, changeTodo) => {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === changeId) {
            todoList[i].todo = changeTodo;
        }
    }
}

const deleteToDo = (deleteId) => {
    const deleteIdx = todoList.findIndex(({id}) => id === deleteId);
    todoList.splice(deleteIdx, 1);
}


const validateId = (inputId)=>{
    if(isNaN(inputId)) return false;// id 입력 값이 문자인지 확인.

    for(const {id} of todoList){// 없는 id 인지 확인.
        if(id === Number(inputId)) return true;
    }
    return false;

}

const inputCommand = ()=>{
    const command = readlineSync.question("명령어를 입력하세요 (add or edit or delete or check or exit)\n");
    if (command === "exit") {
        process.exit();
    } else if (command === "add") {
        const todo = readlineSync.question("\n할 일을 입력하세요.\n")
        addToDo(todo)
    } else if (command === "edit") {
        let editId
        while(true){
            editId = readlineSync.question("\n변경할 id를 입력하세요\n")
            const isValidate = validateId(editId)
            if (isValidate) break
            console.log("유효한 아이디가 아닙니다.")
        }
        const editContent = readlineSync.question("\n변경할 내용을 입력하세요\n")
        editToDo(Number(editId),editContent)

    } else if (command === "delete") {

        if(todoList.length <= 0){
            console.log("삭제할 할 일이 없습니다 😖\n")
            return
        }

        let deleteId;
        while(true){
            deleteId = readlineSync.question("삭제할 id를 입력하세요\n")
            const isValidate = validateId(deleteId)
            if (isValidate) break
            console.log("유효한 아이디가 아닙니다.")
        }
        
        deleteToDo(Number(deleteId))
    } else if (command === "check") {
        let checkId
        while(true){
            checkId = readlineSync.question("완료한 id를 입력하세요\n")
            const isValidate = validateId(checkId)
            if (isValidate) break
            console.log("유효한 아이디가 아닙니다.")
        }
        
        checkToDo(Number(checkId))
    } else {
        console.log("올바른 명령어를 입력해주세요.\n");
    }
}


while (true) {
    // 리스트 보여주기
    showList();
    inputCommand(); // 명령어 입력처리
}