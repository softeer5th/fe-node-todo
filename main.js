import readline from 'readline';
import { ToDo } from './todo.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let toDoList = [];

async function myInput(text){
    return new Promise((resolve) => rl.question(text, (answer) =>{

        resolve(answer);
    }));

}

async function showInformation(){
    console.log("-----TODO LIST에 온 걸 환영해요-----");
    console.log("1. 할 일 보기(명령어: 보기)");
    console.log("2. 할 일 추가(명령어: 추가)");
    console.log("3. 할 일 삭제(명령어: 삭제)");
    console.log("------------------------------------");
    
    return await myInput("원하는 명령어를 입력해주세요: ");
}

async function addTodo(){
    const title = await myInput('투두의 제목을 입력해주세요: ');
    const content = await myInput('투두의 내용을 입력해주세요: ');
    toDoList = [...toDoList, (new ToDo(toDoList.length + 1, title, content))]
}

function showToDo() {
    console.log(toDoList);
}

async function deleteToDo(){
    const input = await myInput("삭제할 투두의 번호를 입력해주세요: ");

    toDoList = [...toDoList.filter((todo)=>
        todo.id !== Number(input)
    ).map((todo, index) => {
        return new ToDo(
            index + 1,
            todo.title,
            todo.content,
            todo.checked,
            todo.createdAt,
        );
    })];
}

async function main() {
    while(true){
        const value = await showInformation();

        switch(value) {
            case 'q':
                process.exit();
            case '보기':
                showToDo();
                break;
            case '추가':
                await addTodo();
                break;
            case '삭제':
                await deleteToDo();
                break;
            default:
                // console.log(value);
        }
    }
    rl.close();
}

main();