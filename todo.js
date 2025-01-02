const fs = require("fs");
const readlineSync = require("readline-sync");

let todoArray = Array();
let width = 52;

loadData();

while (true) {
  console.log("\n┌" + "─".repeat((width - 2)/2-5) +"TO DO LIST"+ "─".repeat((width - 2)/2-5)  + "┐");
  for (let i = 0; i < todoArray.length; i++) {
    let isChecked = todoArray[i][todoArray[i].length-1];
    let todoContent = todoArray[i].substring(0,todoArray[i].length-1);
    console.log("│ " + "[" +isChecked+ "] "+todoContent.padEnd(width-todoContent.length-7) + "│");
  }
  console.log("└" + "─".repeat(width - 2) + "┘");

  let input = readlineSync.question("1: 등록 | 2: 수정 | 3: 삭제 | exit: 종료\n수행할 메뉴를 알파벳 o를 붙여서 입력해주세요.\n[o를 붙이지 않을 시 해당 순번의 투두가 체크/언체크 됩니다.]\n");
  let optionSelected = false;

  if (input.startsWith("o")) {
    optionSelected = true;
    input = input.substring(1);
    console.log(input);
  }
  
  if (!isNaN(Number(input))) {
    let inputOption = parseInt(input);
    if (optionSelected){
      if (inputOption==1) {
        const newTodo = readlineSync.question("추가할 내용을 입력하세요: ");
        todoArray.push(newTodo+"X");
      } else if (inputOption==2) {
        const fixTodo = readlineSync.question("수정할 번호를 입력하세요: ");
      } else if (inputOption==3) {
        const delTodo = readlineSync.question("삭제할 번호를 입력하세요: ");
      }
    } else {
      if (inputOption>0 && inputOption<todoArray.length+1) {
        let isChecked = todoArray[inputOption-1][todoArray[inputOption-1].length-1];
        let changedTodo = todoArray[inputOption-1].substring(0,todoArray[inputOption-1].length-1);
        if (isChecked == "O") {
          changedTodo += "X";
        } else {
          changedTodo += "O";
        }
        todoArray[inputOption-1] = changedTodo;
      } else {
        console.log(`!!${inputOption-1}번째 투두는 존재하지 않습니다!!`);
      }
    }
  } else if (input == "exit") {
    break;
  } else {
    console.log("잘못된 입력입니다.");
  }

}

saveData();

console.log("종료합니다..")
process.exit();



function loadData() {
  // 파일 불러오기
  const data = fs.readFileSync("todo.txt", "utf8", (err, data) => {
    if (err) {
      console.error("파일을 불러오는데 실패했습니다. 종료합니다..", err);
      return;
    }
    return data;
  });
  let todoOrigin = data.split("\n");
  for (var i=0, todo; todo = todoOrigin[i]; i+=1) {
    todoArray.push(todo);
  }
}


function saveData() {
  let savingData = "";
  for (var i=0, todo; todo = todoArray[i]; i+=1) {
    savingData += todo;
    savingData += "\n";
  }
  // 파일 저장
  fs.writeFileSync("todo.txt", savingData, (err) => {
    if (err) {
      console.error("파일 저장에 실패했습니다.", err);
      return;
    }
  });
}