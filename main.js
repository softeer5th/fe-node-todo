import readline from 'readline';
import { ToDo } from './todo.js';
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let toDoList;

// 로컬에 저장되어있는 투두 불러오기
function loadToDoList() {
    try {
        const data = fs.readFileSync('todo.json', 'utf8');
        toDoList = JSON.parse(data);
    } catch (err) {
        console.error('Error reading todo.json:', err);
        toDoList = [];
    }
}

// 입력 함수
async function myInput(text) {
    return new Promise((resolve) => rl.question(text, (answer) => {
        resolve(answer.trim());
    }));
}

// 현재 투두를 로컬에 저장
function saveToDo() {
    const data = JSON.stringify(toDoList);

    fs.writeFileSync('todo.json', data, 'utf8');
}

// 현재 투두 정보 조회
async function showInformation() {
    console.log("\n-----TODO LIST에 온 걸 환영해요-----\n");
    showToDo();
    console.log("------------------------------------");
    console.log("1. 투두 추가(명령어: 추가)");
    console.log("2. 투두 삭제(명령어: 삭제)");
    console.log("3. 투두 상태 바꾸기(명령어: 바꾸기)");
    console.log("4. 나가기(명령어: 나가기)");
    console.log("------------------------------------");

    return await myInput("원하는 명령어를 입력해주세요: ");
}

// 투두 추가
async function addToDo() {
    const title = await myInput('투두의 제목을 입력해주세요: ');
    const content = await myInput('투두의 내용을 입력해주세요: ');
    toDoList = [...toDoList, (new ToDo(toDoList.length + 1, title, content))]
}

// 투두 조회
function showToDo() {
    if (toDoList.length === 0) {
        console.log("현재 투두가 존재하지 않아요!");
    }
    else {
        toDoList.map((toDo) => {
            console.log(`${toDo.id} ${toDo.checked ? '✅' : '❌'}`);
            console.log('제목:', toDo.title);
            console.log('내용:', toDo.content);
            console.log('생성 일자:', toDo.createdAt, "\n");
        })
    }

}

// 투두 삭제
async function deleteToDo() {
    const input = await myInput("삭제할 투두의 번호를 입력해주세요: ");

    toDoList = toDoList.filter((todo) =>
        todo.id !== Number(input)
    ).map((todo, index) => {
        return new ToDo(
            index + 1,
            todo.title,
            todo.content,
            todo.checked,
            todo.createdAt,
        );
    });
}

// 투두 상태 변경
async function convertToDo() {
    const input = await myInput("상태를 바꿀 투두의 번호를 입력해주세요: ");

    toDoList = toDoList.map((todo) => {
        if (todo.id !== Number(input)) return todo;

        return new ToDo(
            todo.id,
            todo.title,
            todo.content,
            !todo.checked,
            todo.createdAt,
        );
    });
};

async function main() {
    loadToDoList();

    while (true) {
        const value = await showInformation();

        switch (value) {
            case '나가기':
                rl.close();
                process.exit();
            case '추가':
                await addToDo();
                break;
            case '삭제':
                await deleteToDo();
                break;
            case '바꾸기':
                await convertToDo();
                break;
            default:
                console.log('유효한 명령어를 입력해주세요.');
        }

        saveToDo();
    }
}

main();