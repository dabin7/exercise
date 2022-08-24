const table = document.getElementById("table");
const score = document.getElementById("score");
let data = [];

// table -> fragment -> tr -> td   성능우수
function startGame() {
  const fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function () {
    const rowData = [];
    data.push(rowData);
    const tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0);
      const td = document.createElement("td");
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  table.appendChild(fragment);
  put2ToRandomCell();
  draw();
}

function put2ToRandomCell() {
  const emptyCells = [];
  data.forEach(function (rowData, i) {
    //i랑 j는 index값//
    rowData.forEach(function (cellData, j) {
      if (!cellData) {
        emptyCells.push([i, j]);
      }
    });
  });
  // randomCell === [i,j]
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  data[randomCell[0]][randomCell[1]] = 2;
}

function draw() {
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      const target = table.children[i].children[j];
      if (cellData > 0) {
        target.textContent = cellData;
        target.className = "color-" + cellData;
      } else {
        target.textContent = "";
        target.className = "";
      }
    });
  });
}
startGame();

// data = [
//   [0, 2, 4, 2],
//   [0, 0, 8, 0],
//   [2, 1024, 1024, 2],
//   [0, 16, 0, 4],
// ];
// draw();

function moveCells(direction) {
  switch (direction) {
    case "left": {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            const currentRow = newData[i];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === cellData) {
              const score2 = parseInt(score.textContent);
              score.textContent =
                score2 + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[i].push(cellData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][j] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }

    case "right": {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (rowData[3 - j]) {
            const currentRow = newData[i];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === rowData[3 - j]) {
              const score2 = parseInt(score.textContent);
              score.textContent =
                score2 + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[i].push(rowData[3 - j]);
            }
            //cellData => rowData[3 - j]
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][3 - j] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }

    case "up": {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            const currentRow = newData[j];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === cellData) {
              const score2 = parseInt(score.textContent);
              score.textContent =
                score2 + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[j].push(cellData);
            }
          } // i => j
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[j][i] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }

    case "down": {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (data[3 - i][j]) {
            const currentRow = newData[j];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === data[3 - i][j]) {
              const score2 = parseInt(score.textContent);
              score.textContent =
                score2 + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[j].push(data[3 - i][j]);
            }
          }
          // cellData => data[3 - i][j]   i=> j
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[3 - j][i] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
  }

  if (data.flat().includes(2048)) {
    draw();
    setTimeout(() => {
      alert("축하합니다. 2048을 만들었습니다!");
    }, 0);
  } else if (!data.flat().includes(0)) {
    //빈칸이 없으면
    alert(`패배했습니다... ${score.textContent}점`);
  } else {
    put2ToRandomCell();
    draw();
  }
}

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") {
    moveCells("up");
  } else if (event.key === "ArrowDown") {
    moveCells("down");
  } else if (event.key === "ArrowLeft") {
    moveCells("left");
  } else if (event.key === "ArrowRight") {
    moveCells("right");
  }
});

let startCoord;
window.addEventListener("mousedown", (event) => {
  startCoord = [event.clientX, event.clientY];
});
window.addEventListener("mouseup", (event) => {
  const endCoord = [event.clientX, event.clientY];
  const diffX = endCoord[0] - startCoord[0];
  const diffY = endCoord[1] - startCoord[1];
  if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells("left");
  } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells("right");
  } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells("down");
  } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells("up");
  }
});
