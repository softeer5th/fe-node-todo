const fs = require("fs");
const readlineSync = require("readline-sync");

let todoArray = Array();
let width = 52;

loadData();

while (true) {
  console.log("\n┌" + "─".repeat((width - 2)/2-5) +"TO DO LIST"+ "─".repeat((width - 2)/2-5)  + "┐");
  for (let i = 0; i < todoArray.length; i++) {
    let isChecked = checkIsChecked(todoArray[i]);
    let todoContent = todoArray[i].substring(1);
    let spaces = countSpaces(todoContent);
    console.log("│ " + "[" +isChecked+ "] "+todoContent.padEnd(width-todoContent.length+spaces-7) + "│");
  }
  console.log("└" + "─".repeat(width - 2) + "┘");

  let input = readlineSync.question("1: 등록   |   2: 수정   |   3: 삭제    |    q: 종료\n수행할 메뉴를 알파벳 o를 붙여서 입력해주세요.\n(o를 붙이지 않을 시 해당 순번의 투두가 체크/언체크 됩니다.)\n");
  let optionSelected = false;

  if (input.startsWith("o")) {
    optionSelected = true;
    input = input.substring(1);
  }
  
  try {
    if (!isNaN(Number(input))) {
      let inputOption = parseInt(input);
      if (optionSelected){
        operateOption(inputOption);
      } else {
        toggleTodo(inputOption);
      }
    } else if (input == "q") {
      break;
    }
  } catch (err) {
    console.log(err.message);
  }
}

saveData();

console.log("종료합니다..")
process.exit();


function countSpaces(str) {
  return str.split(" ").length - 1;
}


function toggleTodo(inputOption) {
  if (inputOption > 0 && inputOption < todoArray.length + 1) {
    let isChecked = checkIsChecked(todoArray[inputOption - 1]);
    let changedTodo = todoArray[inputOption - 1].substring(1);
    if (isChecked == "O") {
      changedTodo = "X" + changedTodo;
    } else {
      changedTodo = "O" + changedTodo;
    }
    todoArray[inputOption - 1] = changedTodo;
  } else {
    console.log(`${inputOption}번째 투두는 존재하지 않습니다`);
  }
}

function operateOption(inputOption) {
  if (inputOption == 1) {
    const newTodo = readlineSync.question("추가할 내용을 입력하세요: ");
    todoArray.push("X"+newTodo);
  } else if (inputOption == 2) {
    const fixTodo = readlineSync.question("수정할 번호를 입력하세요: ");
    if (checkIsNum(fixTodo)) {
      let changingTodo = parseInt(fixTodo);
      console.log(`기존 내용: ${todoArray[changingTodo-1].substring(1)}`);
      let newTodo = readlineSync.question("수정할 내용: ");
      newTodo = checkIsChecked(todoArray[changingTodo-1]) + newTodo;
      todoArray[changingTodo-1] = newTodo;
    }
  } else if (inputOption == 3) {
    const delTodo = readlineSync.question("삭제할 번호를 입력하세요: ");
    if (checkIsNum(delTodo)) {
      let deletingTodo = parseInt(delTodo);
      todoArray.splice(deletingTodo-1,1);
    }
  }
}

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

function checkIsNum(str){
  if (!isNaN(Number(str))) {
    return true;
  } else {
    throw Error("올바른 숫자가 아닙니다!");
  }
}

function checkIsChecked(str) {
  return str[0];
}