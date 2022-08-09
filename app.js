const fileInput = document.getElementById("file")
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
const textInput = document.getElementById("text")
const saveBtn = document.getElementById("save")

const CANVAS_SIZE = 800;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round"

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

function onFileChange(event) {
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_SIZE,CANVAS_SIZE)
        fileInput.value = null;
    }
}

function onDoubleClick(event){
    const text = textInput.value;
    if (text !== ""){
        ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "46px serif"
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
    }
}

function onSaveClick(){
    const url= canvas.toDataURL();
    const a = document.createElement("a")
    a.href = url
    a.download = "my.png"
    a.click()
}

canvas.addEventListener("dblclick", onDoubleClick)
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
fileInput.addEventListener("change", onFileChange)
saveBtn.addEventListener("click", onSaveClick)