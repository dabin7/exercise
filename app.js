const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")
const lineWidth = document.querySelector("#line-width")
const color = document.querySelector("#color")
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const modeBtn = document.getElementById("mode-btn")
const destroyBtn = document.getElementById("destroy-btn")
const eraserBtn = document.getElementById("eraser-btn")

const CANVAS_SIZE = 800;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.lineWidth = lineWidth.value;

const colors = [
    "#5f10f5",
    "#89c4f4",
    "#9f5afd",
    "#ffe4e4",
    "#e76d89",
    "#f9b42d",
    "#fff000",
    "#f62459",
    "#6c7a89"
]

let isPainting = false;
let isFilling = false;

function onMove(event) {
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY)
}

function onMouseDown(event) {
    isPainting = true;
}
function onMouseUp(event) {
    isPainting = false;
    ctx.beginPath()
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(event){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    }else{
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCavasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}

function onEraserClick() {
    ctx.strokeStyle = "white"
    isFilling = false;
    modeBtn.innerText = "Fill"
}

canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("mousedown", onMouseDown)
canvas.addEventListener("mouseup", onMouseUp)
canvas.addEventListener("mouseleave", onMouseUp)
canvas.addEventListener("click", onCavasClick)

lineWidth.addEventListener("change", onLineWidthChange)

color.addEventListener("change", onColorChange)

colorOptions.forEach(color => color.addEventListener("click",onColorClick))

modeBtn.addEventListener("click", onModeClick)
destroyBtn.addEventListener("click", onDestroyClick)
eraserBtn.addEventListener("click", onEraserClick)