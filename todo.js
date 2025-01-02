const fs = require("fs");
const readline = require('readline');
const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout 
});


let inputOption = 1;
let todoList = Array();
let savingData = "";

// 파일 불러오기
const data = fs.readFileSync("todo.txt", "utf8", (err, data) => {
    if (err) {
      console.error("파일을 불러오는데 실패했습니다. 종료합니다..", err);
      return;
    }
    return data;
});
var todoOrigin = data.split("\n");
for (var i=0, todo; todo = todoOrigin[i]; i+=1) {
    todoList.push(todo);
}

// while (inputOption>0 && inputOption<3) {
//   console.log("수행할 메뉴를 o를 붙여 선택해주세요. [예시입력: o1]:");

//   const input = await new Promise((resolve) => {
//     rl.question("입력하세요 (종료하려면 'exit' 입력): ", resolve);
//   });

//   rl.on('line', function(line) {
//     if (line.startsWith("o")) {
//       inputOption = parseInt(line.trimStart("o"));
//       console.log(inputOption);
//     }
//     rl.close();
//   }).on("close", function(){
//       process.exit();
//   });
// }


for (var i=0, todo; todo = todoList[i]; i+=1) {
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

console.log("종료합니다..")
process.exit();