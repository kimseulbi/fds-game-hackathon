// 게임 상태
let boardState = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

// 상태로 부터 그림을 그리는 함수
function drawBoard() {
  document.querySelectorAll(".row").forEach((rowEl, rowIndex) => {
    // 요소에서도 querySelectorAll 만들수 있음
    rowEl.querySelectorAll(".col").forEach((colEl, colIndex) => {
      if (boardState[rowIndex][colIndex] === 1) {
        colEl.classList.add("checked");
      } else {
        // 아닐때 checked 제거
        colEl.classList.remove("checked");
      }
    });
  });
  if (bingo(boardState)) {
    document.querySelector(".result").textContent = "빙고!";
    document.querySelector(".play-again").classList.add("open");
  } else {
    document.querySelector(".result").textContent = "";
    document.querySelector(".play-again").classList.remove("open");
  }
}

function bingo(arr) {
  // 가로줄 확인 (루프)
  for (let i = 0; i < 5; i++) {
    // '이제까지 본 것이 전부 x표시가 되어있다'
    let checked = true;
    for (let j = 0; j < 5; j++) {
      if (arr[i][j] === 0) {
        checked = false;
      }
    }
    if (checked) {
      return true;
    }
  }

  // 세로줄 확인 (루프)
  for (let i = 0; i < 5; i++) {
    // '이제까지 본 것이 전부 x표시가 되어있다'
    let checked = true;
    for (let j = 0; j < 5; j++) {
      if (arr[j][i] === 0) {
        checked = false;
      }
    }
    if (checked) {
      return true;
    }
  }

  {
    // 대각선 확인 (루프)
    let checked = true;
    for (let j = 0; j < 5; j++) {
      if (arr[j][j] === 0) {
        checked = false;
      }
    }
    if (checked) {
      return true;
    }
  }

  {
    // 반대쪽 대각선 확인 (루프)
    let checked = true;
    for (let j = 0; j < 5; j++) {
      if (arr[j][4 - j] === 0) {
        checked = false;
      }
    }
    if (checked) {
      return true;
    }
  }

  return false;
}

// 빙고가 되면 체크 못하게 하는 코드
document.querySelectorAll(".row").forEach((rowEl, rowIndex) => {
  rowEl.querySelectorAll(".col").forEach((colEl, colIndex) => {
    colEl.addEventListener("click", e => {
      if (!bingo(boardState)) {
        boardState[rowIndex][colIndex] = 1;
        drawBoard();
      }
    });
  });
});

document.querySelector(".play-again").addEventListener("click", e => {
  // alert("error");
  boardState = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];
  drawBoard();
});

drawBoard();
