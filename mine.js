const tbody = document.querySelector("#table tbody");
const result = document.querySelector("#result");
const timer = document.querySelector("#timer");
const form = document.querySelector("#form");
let row; //줄
let cell; //칸
let mine;
const CODE = {
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0, //0이상 다 열린칸
};
let data;
let openCount;
let startTime;
let interval;
const dev = false; //변수로 개발자모드 구별

function onSubmit(event) {
  event.preventDefault();
  row = parseInt(event.target.row.value);
  cell = parseInt(event.target.cell.value);
  mine = parseInt(event.target.mine.value);
  openCount = 0;
  tbody.innerHTML = "";
  clearInterval(interval);
  drawTable(); // ????
  startTime = new Date();
  interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    timer.textContent = `${time}초`;
  }, 1000);
}
form.addEventListener("submit", onSubmit);

function plantMine() {
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0]; // splice() 반환값을 배열로 받아서 [0]
    shuffle.push(chosen);
  }
  const data = [];

  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell); // 몇번째 줄인지 숫자앞자리
    const hor = shuffle[k] % cell; // 몇번째 칸인지 숫자뒷자리
    data[ver][hor] = CODE.MINE;
  }
  return data;
}

function onRightClick(event) {
  event.preventDefault();
  const target = event.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];
  if (cellData === CODE.MINE) {
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE;
    target.className = "question";
    target.textContent = "?";
  } else if (cellData === CODE.QUESTION_MINE) {
    data[rowIndex][cellIndex] = CODE.FLAG_MINE;
    target.className = "flag";
    target.textContent = "!";
  } else if (cellData === CODE.FLAG_MINE) {
    data[rowIndex][cellIndex] = CODE.MINE;
    target.className = "";
    //target.textContent = "X";//
  } else if (cellData === CODE.NORMAL) {
    data[rowIndex][cellIndex] = CODE.QUESTION;
    target.className = "question";
    target.textContent = "?";
  } else if (cellData === CODE.QUESTION) {
    data[rowIndex][cellIndex] = CODE.FLAG;
    target.className = "flag";
    target.textContent = "!";
  } else if (cellData === CODE.FLAG) {
    data[rowIndex][cellIndex] = CODE.NORMAL;
    target.className = "";
    target.textContent = "";
  }
}

// 1 2 3
// 4 5 6    click이 5번 주변 폭탄여부 카운트함
// 7 8 9

function countMine(rowIndex, cellIndex) {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let i = 0;
  mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++; // && 1이 맞으면 2를 실행 if문대신 사용
  mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++; // ?.연산자 - 없어도 에러가 안남 보호연산
  mines.includes(data[rowIndex][cellIndex - 1]) && i++;
  mines.includes(data[rowIndex][cellIndex + 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
  return i;
}

function open(rowIndex, cellIndex) {
  if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return; //한번 연거는 안연다
  const target = tbody.children[rowIndex]?.children[cellIndex];
  if (!target) {
    return;
  }
  const count = countMine(rowIndex, cellIndex);
  target.textContent = count || ""; // 만약 null,undifine 즉 0 을 true값을 받고싶다면 ??를 쓴다.
  target.className = "opened";
  data[rowIndex][cellIndex] = count;
  openCount++;
  if (openCount === row * cell - mine) {
    const time = (new Date() - startTime) / 1000;
    clearInterval(interval);
    tbody.removeEventListener("contextmenu", onRightClick);
    tbody.removeEventListener("click", onLeftClick);
    setTimeout(() => {
      alert(`승리했습니다! ${time}초가 걸렸습니다.`);
    }, 300);
  }
  return count;
}

function openAround(rI, cI) {
  setTimeout(() => {
    const count = open(rI, cI);
    if (count === 0) {
      openAround(rI - 1, cI - 1); //재귀??
      openAround(rI - 1, cI);
      openAround(rI - 1, cI + 1);
      openAround(rI, cI - 1);
      openAround(rI, cI + 1);
      openAround(rI + 1, cI - 1);
      openAround(rI + 1, cI);
      openAround(rI + 1, cI + 1);
    }
  }, 0);
}

let normalCellFound = false;
let searched;
let firstClick = true;
function transferMine(rI, cI) {
  if (normalCellFound) return;
  if (rI < 0 || rI >= row || cI < 0 || cI >= cell) return;
  if (searched[rI][cI]) return;
  if (data[rI]?.[cI] === CODE.NORMAL) {
    normalCellFound = true;
    data[rI][cI] = CODE.MINE;
  } else {
    searched[rI][cI] = true;
    transferMine(rI - 1, cI - 1);
    transferMine(rI - 1, cI);
    transferMine(rI - 1, cI + 1);
    transferMine(rI, cI - 1);
    transferMine(rI, cI + 1);
    transferMine(rI + 1, cI - 1);
    transferMine(rI + 1, cI);
    transferMine(rI + 1, cI + 1);
  }
}

function showMines() {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (mines.includes(cell)) {
        tbody.children[rowIndex].children[cellIndex].textContent = "X";
      }
    });
  });
}

function onLeftClick(event) {
  const target = event.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  let cellData = data[rowIndex][cellIndex]; /// 참조관계 x 복사관계이기때문에
  if (firstClick) {
    firstClick = false;
    searched = Array(row)
      .fill()
      .map(() => []);
    if (cellData === CODE.MINE) {
      transferMine(rowIndex, cellIndex);
      data[rowIndex][cellIndex] = CODE.NORMAL; // 복사관계일때는 따로 써줌
      cellData = CODE.NORMAL;
    }
  }
  if (cellData === CODE.NORMAL) {
    openAround(rowIndex, cellIndex);
  } else if (cellData === CODE.MINE) {
    showMines();
    target.textContent = "뢰";
    target.className = "opened";
    clearInterval(interval);
    tbody.removeEventListener("contextmenu", onRightClick);
    tbody.removeEventListener("click", onLeftClick);
  }
}

function drawTable() {
  data = plantMine();
  data.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      if (cell === CODE.MINE) {
        // td.textContent = "X";//
      }
      tr.append(td); // append 와 appendchild 의 차이 : return값 반환 and DOMstring을 받을수있냐 아니냐의 차이
    });
    tbody.append(tr);
    tbody.addEventListener("contextmenu", onRightClick);
    tbody.addEventListener("click", onLeftClick); //이벤트버블링
  });
}
