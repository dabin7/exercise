const tbody = document.querySelector("#table tbody");
const result = document.querySelector("#result");
const row = 10; //줄
const cell = 10; //칸
const mine = 10;
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
    target.textContent = "X";
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

function drawTable() {
  data = plantMine();
  data.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      if (cell === CODE.MINE) {
        td.textContent = "X";
      }
      tr.append(td); // append 와 appendchild 의 차이 : return값 반환 and DOMstring을 받을수있냐 아니냐의 차이
    });
    tbody.append(tr);
    tbody.addEventListener("contextmenu", onRightClick); //이벤트버블링
  });
}
drawTable();
