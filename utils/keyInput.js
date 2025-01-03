let isListenerRegistered = false; // 리스너가 등록되었는지 추적하는 변수

function getCharacter() {
    const stdin = process.stdin;

    return new Promise((resolve) => {
        if (!isListenerRegistered) {
            stdin.setRawMode(true); // 키 입력을 문자로 받도록 설정
            stdin.resume(); // 입력을 계속 받도록 설정
            stdin.setEncoding('utf8'); // 문자 인코딩 설정

            const onData = (key) => {
                resolve(key); // 키를 입력받으면 값을 반환
                stdin.removeListener('data', onData); // 데이터 이벤트 리스너 제거
                stdin.pause(); // 입력을 받으면 종료
                isListenerRegistered = false; // 리스너 해제
            };

            stdin.on('data', onData); // 이벤트 리스너 등록
            isListenerRegistered = true; // 리스너가 등록되었음을 표시
        } else {
            // 리스너가 이미 등록되어 있다면, 새로운 입력을 기다리도록 함
            stdin.resume();
        }
    });
}

module.exports = async function keyInput() {
    return await getCharacter(); // getCharacter 호출하여 값을 반환
}
