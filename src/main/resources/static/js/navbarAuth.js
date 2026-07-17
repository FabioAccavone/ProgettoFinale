fetch("navbarAuth.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("navbarAuthenticated")
        .innerHTML=data;

    })

function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("ruolo")
    localStorage.removeItem("username")
    localStorage.removeItem("id")
    window.location.href = "login.html"
}
