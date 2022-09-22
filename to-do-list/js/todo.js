const toDoForm = document.querySelector(".todo-form")
const toDoList = document.querySelector(".todo-list")
const toDoInput = toDoForm.querySelector("input")

const TODOS_KEY = "todos";
let toDos = [];

function toDoSubmit(event){
    event.preventDefault()
    const newToDo = toDoInput.value
    toDoInput.value = "";
    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    };
    toDos.push(newToDoObj)
    writeToDo(newToDoObj)
    saveToDo()
}

toDoForm.addEventListener("submit", toDoSubmit);

function writeToDo(newToDo){
    const li = document.createElement("li")
    li.id = newToDo.id;
    const span = document.createElement("span")
    const button = document.createElement("button")
    span.innerText = newToDo.text;
    button.innerText = "x"
    button.addEventListener("click", deleteToDo)
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function saveToDo() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

function deleteToDo(event) {
    const xLi = event.target.parentElement;
    xLi.remove();
    toDos = toDos.filter((toDo)=>toDo.id !== parseInt(xLi.id))
    saveToDo()
}

const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos !== null ){
    const paresedToDos = JSON.parse(savedToDos);
    paresedToDos.forEach(writeToDo);
    toDos = paresedToDos;
}