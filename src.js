const menu = {
    ADD: "1",
    PRINT: "2",
    EDIT: "3",
    COMPLETE: "4",
    QUIT: "5",
}

const fs = require('fs')

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

let todoList;

if (fs.existsSync('./data.json')) {
    todoList = JSON.parse(fs.readFileSync('./data.json'))["data"];
} else {
    todoList = [];
}

const checkDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
        return false;
    }

    const dateArr = date.split("-")
    const year = parseInt(dateArr[0])
    const month = parseInt(dateArr[1])
    const day = parseInt(dateArr[2])

    if (year < 0 || year > 9999) {
        return false
    }
    if (month < 1 || month > 12) {
        return false
    }
    if (day < 1 || day > 31) {
        return false
    }

    if ([4, 6, 9, 11].includes(month)) {
        if (day > 30) {
            return false
        }
    }

    if (month === 2) {
        if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
            if (day > 29) {
                return false
            }
        } else {
            if (day > 28) {
                return false
            }
        }
    }

    return true;
}


const addTodo = () => {
    const todoItem = {}
    rl.question('이름: ', 
        answer => {
            todoItem["name"] = answer
            rl.question('기한(YYYY-MM-DD): ',
                answer => {
                    if (!checkDate(answer)) {
                        console.log("잘못된 입력입니다. 다시 입력해 주세요.")
                    } else {
                        todoItem["dueDate"] = answer
                        todoList.push(todoItem);
                    }
                    todo();
                }
            )
        }
    )
}

const editTodo = () => {
    printTodo()
    rl.question("수정할 TODO를 선택해 주세요.", itemIndex => {
        if (itemIndex >= todoList.length) {
            console.log("존재하지 않는 TODO입니다.")
            todo();
        } else {
            const todoItem = {}
            rl.question('이름: ',
                answer => {
                    todoItem["name"] = answer
                    rl.question('기한(YYYY-MM-DD): ',
                        answer => {
                            if (!checkDate(answer)) {
                                console.log("잘못된 입력입니다. 다시 입력해 주세요.")
                            } else {
                                todoItem["dueDate"] = answer
                                todoList[Number(itemIndex)] = todoItem
                            }
                            todo();
                        }
                    )
                }
            )
        }
    })
}


const printTodo = () => {
    todoList.forEach((v, i) => {
        console.log(`${i} - 이름: ${v["name"]}, 기한: ${v["dueDate"]}`)
    })
}

const completeTodo = () => {
    printTodo();
    rl.question("완료할 TODO를 선택해 주세요.", itemIndex => {
        if (itemIndex >= todoList.length) {
            console.log("존재하지 않는 TODO입니다.")
            todo();
        } else {
            todoList.splice(Number(itemIndex), 1);
            todo();
        }
    })
}

const saveTodo = () => {
    const data = {
        "data": todoList
    }

    fs.writeFileSync('./data.json', JSON.stringify(data))
}

rl.on('close', () => {
    saveTodo();
})

function todo() {
    rl.question("\n명령어를 입력해 주세요.\n1. TODO 추가\n2. TODO 목록 출력\n3. TODO 수정\n4. TODO 완료\n5. 프로그램 종료\n", (answer) => {
        switch (answer) {
            case menu.ADD:
                addTodo();
                break;
            case menu.PRINT:
                printTodo();
                todo();
                break;
            case menu.EDIT:
                editTodo();
                break;
            case menu.COMPLETE:
                completeTodo();
                break;
            case menu.QUIT:
                rl.close();
                return;
            default:
                console.log("잘못된 입력입니다. 다시 입력해 주세요.")
                todo();
        }
    });
}

todo();