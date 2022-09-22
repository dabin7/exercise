const wrapper = document.getElementById("wrapper");

const total = 12;
const colors = ["red", "orange", "yellow", "green", "white", "pink"];
let colorCopy = colors.concat(colors);
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false; //버그 고치는 용도

function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

function createCard(i) {
  const card = document.createElement("div");
  card.className = "card";
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";
  const cardFront = document.createElement("div");
  cardFront.className = "card-front";
  const cardBack = document.createElement("div");
  cardBack.className = "card-back";

  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}
function onClickCard() {
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }
  this.classList.toggle("flipped");
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }
  const firstBackColor =
    clicked[0].querySelector(".card-back").style.backgroundColor;
  const secondBackColor =
    clicked[1].querySelector(".card-back").style.backgroundColor;
  if (firstBackColor === secondBackColor) {
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    // completed = completed.concat(clicked); 이걸로 하면 왜 안되는거지?
    if (completed.length !== total) {
      return;
    }
    setTimeout(() => {
      alert("축하합니다!");
      resetGame();
    }, 1000);

    return;
  }
  clickable = false; // 이벤트 루프,호출 스택 원리 버그 : 3,4번째 카드가 clicked[2], clicked[3]이 으로 들어가버린다 []에 4개가 들어감
  setTimeout(() => {
    clicked[0].classList.remove("flipped");
    clicked[1].classList.remove("flipped");
    clicked = [];
    clickable = true;
  }, 500);
}

function startGame() {
  clickable = false;
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener("click", onClickCard); //왜 여기다 넣지?  --- card라는 변수선언을 여기서 했기때문에
    wrapper.appendChild(card);
  }

  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("flipped");
    }, 1000 + 100 * index);
  });

  document.querySelectorAll(".card").forEach((card) => {
    setTimeout(() => {
      card.classList.remove("flipped");
      clickable = true;
    }, 5000);
  });
}

function resetGame() {
  wrapper.innerHTML = "";
  colorCopy = colors.concat(colors);
  //원본 바뀌는애들 쓰면안됨 ex) push , pop , unshift , shift ,splice, sort
  //안바뀌는애들 ex) slice, concat, Array.from, filter, indexOf, includes, every, map, forEach, find, findindex
  shuffled = [];
  completed = [];
  startGame();
}

startGame();
