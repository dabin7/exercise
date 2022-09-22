const loginForm = document.querySelector(".login-form")
const loginInput = loginForm.querySelector("input")
const greeting = document.querySelector(".greeting")

const HIDDEN_CLASSNAME = "hidden";
const NICKNAME_KEY = "nickname";

function loginNameSubmit(event) {
    event.preventDefault();
    const nickname = loginInput.value;
    loginForm.classList.add(HIDDEN_CLASSNAME);
    localStorage.setItem(NICKNAME_KEY, nickname);
    painGreetings(nickname)
}

function painGreetings(nickname){
    greeting.innerText = `${nickname},`
    greeting.classList.remove(HIDDEN_CLASSNAME); 

}

const saveUsername = localStorage.getItem(NICKNAME_KEY)

if(saveUsername === null ) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit" , loginNameSubmit);
} else {
    painGreetings(saveUsername);
}