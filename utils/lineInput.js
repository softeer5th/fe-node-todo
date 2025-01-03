const readline = require('readline');


// 한 줄 입력 받기
function getLineInput() {
    // readline 인터페이스 생성
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question('제목: ', (answer) => {
            resolve(answer); // 입력을 받은 후 반환
             rl.close()
        });
    });
}

// 종료를 위한 함수
function closeReadline() {
    rl.close(); // 모든 입력이 끝난 후에 인터페이스 종료
}

module.exports = { getLineInput, closeReadline }; // 함수 내보내기
