const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

const todoList = []

const addTodo = () => {
    const todoItem = {}

    rl.question('이름 : ', 
        answer => {
            todoItem["name"] = answer
            rl.question('기한 : ',
                answer => {
                    todoItem["dueDate"] = answer
                    todoList.push(todoItem);
                    todo();
                }
            )
        }
    )
}

const editTodo = () => {
    printTodo()
    rl.question("수정할 TODO를 선택해 주세요.", itemIndex => {
        const todoItem = {}
        rl.question('이름 : ',
            answer => {
                todoItem["name"] = answer
                rl.question('기한 : ',
                    answer => {
                        todoItem["dueDate"] = answer
                        todoList[Number(itemIndex)] = todoItem
                        todo()
                    }
                )
            }
        )
    })
}

 const printTodo = () => {
    todoList.forEach((v, i) => {
        console.log(`${i} - 이름 : ${v["name"]}, 기한 : ${v["dueDate"]}`)
    })
}

const checkTodo = () => {
    printTodo()
    rl.question("수정할 TODO를 선택해 주세요.", itemIndex => {
        todoList.splice(Number(itemIndex), 1)
        todo()
    })
}

function todo() {
    rl.question(`명령어를 입력해 주세요.
    1. TODO 추가
    2. TODO 목록 출력
    3. TODO 수정
    4. TODO 체크
    5. 프로그램 종료
    `, (answer) => {
        console.log(answer);

        switch (answer) {
            case '1':
                addTodo();
                break;
            case '2':
                printTodo();
                break;
            case '3':
                editTodo();
                break;
            case '4':
                checkTodo();
                break;
            case '5':
                rl.close();
                return;
        }
        todo();
    });
}

todo();