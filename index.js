const readline = require("readline");

let count = 1;
let todo = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function commandLine(){
    let isClose = false;
    while(!isClose){
        isClose = await askCommand();
    }
  
}

commandLine();

function askCommand(){
    return new Promise( (resolve) => {
        rl.question("명령어를 입력해주세요 : ", (line) => {
            const inputs = line.split(" ");
            const content = line.slice(inputs[0].length + 1).trim();

            if (inputs[0] == "add") {
                if (!isValidContent(content)) {
                    console.error("유효하지 않은 할일입니다.");
                    return;
                }
    
                addTodo(parseContent(content));

                resolve(false);
            } else if (inputs[0] == "get") {
    
                if (!isValidEmpty(content)) {
                    console.error("유효하지 않은 명령어입니다.");
                    return;
                }
                getTodo();
    
                resolve(false);
            } else if (inputs[0] == "delete") {
    
                if (!isValidNumber(content)) {
                    console.error("유효하지 않은 명령어입니다.");
                    return;
                }
    
                deleteTodo(content);
    
                resolve(false);
            } else if (inputs[0] == "update") {
    
                const updateNumber = content.split(" ", 1);
    
                if (!isValidNumber(updateNumber)) {
                    console.error("유효하지 않은 명령어입니다.");
                    return;
                }
    
                const newContent = content.slice(updateNumber.length + 1);
    
                if (!isValidContent(newContent)) {
                    console.error("유효하지 않은 명령어입니다.");
                    return;
                }
    
                updateTodo(Number(updateNumber), newContent);
    
                resolve(false);
            } else if (inputs[0] == "clear") {
                count = 1;
                todo = [];
                console.log("할 일을 전부 삭제하였습니다.");
                resolve(false);
            } else if (line == "close") {
                rl.close();

                resolve(true);
            } else {
                console.log("유효하지 않은 명령어입니다.");

                resolve(false);
            }
        });
    
    })
}

rl.on("close", () => {
    process.exit();
});

function addTodo(content) {
    if (content.length == 0) {
        console.log("빈 문자열은 추가할 수 없습니다.");
        return;
    }

    todo.push({
        num: Number(count),
        content: content
    });
    count++;

    console.log(`[${content}]가 추가되었습니다.`);
}

function getTodo() {
    if (todo.length === 0) {
        console.log("할 일이 없습니다.");
        return;
    }

    todo.map(t => {
        console.log(t.num, t.content);
    })
}

function deleteTodo(number) {
    if (todoExists(Number(number))) {
        todo = todo.filter(to => {
            return to.num !== Number(number);
        });
        console.log(`${number}번 할 일이 삭제되었습니다.`);
    }
}

function updateTodo(number, newContent) {
    if (todoExists(Number(number))) {
        todo = todo.map(to => {
            if (to.num === Number(number)) {
                return {
                    num: Number(number),
                    content: parseContent(newContent)
                }
            }
            return to;
        })
        console.log(`${number}번 할 일이 업데이트 되었습니다.`);
    }
}

function parseContent(content) {
    return content.slice(1, content.length - 1);
}

function todoExists(number) {
    const foundTodo = todo.find((to) => { 
        return to.num === 1 
    });

    if (foundTodo === undefined) {
        console.error("존재하지 않는 할 일입니다.");
        return false;
    }
    return true;
}

function isValidContent(content) {

    if(!content.startsWith("\"")){
        return false;
    }

    if(content[content.length -1] !== "\""){
        return false;
    }

    return true;

}

function isValidEmpty(content) {
    return content.length == 0;
}

function isValidNumber(content) {
    return Number.isInteger(Number(content));
}