const $timer = document.querySelector("#timer");
const $score = document.querySelector("#score");
const $game = document.querySelector("#game");
const $start = document.querySelector("#start");
const $$cells = document.querySelectorAll(".cell");

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;
let time = 60;

$start.addEventListener("click", () => {
  if (started) return;
  started = true;
  const tickId = setInterval(tick, 1000);
  const timerId = setInterval(() => {
    time = (time * 10 - 1) / 10; // 소수점 계산시 오류발생 time -= 0.1
    $timer.textContent = time;
    if (time === 0) {
      setTimeout(() => {
        clearInterval(timerId);
        clearInterval(tickId);
        alert(`게임 오버! 점수는 ${score}점`);
      }, 50);
    }
  }, 100);
  tick();
});

let gopherPercent = 0.3;
let bombPercent = 0.5; // 누적 확률 case

function tick() {
  holes.forEach((hole, index) => {
    if (hole) return; // 무언가 일어나고 있으면 return
    const randomValue = Math.random();
    if (randomValue < gopherPercent) {
      const $gopher = $$cells[index].querySelector(".gopher");
      holes[index] = setTimeout(() => {
        $gopher.classList.add("hidden");
        holes[index] = 0;
      }, 1000);
      $gopher.classList.remove("hidden"); //비동기이므로 이게 먼저 실행
    } else if (randomValue < bombPercent) {
      const $bomb = $$cells[index].querySelector(".bomb");
      holes[index] = setTimeout(() => {
        $bomb.classList.add("hidden");
        holes[index] = 0;
      }, 1000);
      $bomb.classList.remove("hidden"); //비동기이므로 이게 먼저 실행
    }
  });
}

$$cells.forEach(($cell, index) => {
  $cell.querySelector(".gopher").addEventListener("click", (event) => {
    if (!event.target.classList.contains("dead")) {
      score += 1;
      $score.textContent = score;
    }
    //비동기 이므로 순서 주의
    event.target.classList.add("dead");
    event.target.classList.add("hidden");
    clearTimeout(holes[index]); //기존 타이머 제거
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove("dead");
    }, 1000);
  });
});

$$cells.forEach(($cell, index) => {
  $cell.querySelector(".bomb").addEventListener("click", (event) => {
    event.target.classList.add("boom");
    event.target.classList.add("hidden");
    clearTimeout(holes[index]); //기존 타이머 제거
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove("boom");
    }, 1000);
    score -= 1;
    $score.textContent = score;
  });
});
