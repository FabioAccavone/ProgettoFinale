const BASE_URL = "http://localhost:8080"

let token = localStorage.getItem("token");
let ruolo = localStorage.getItem("ruolo");

function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("ruolo")
    window.location.href = "login.html"
}
