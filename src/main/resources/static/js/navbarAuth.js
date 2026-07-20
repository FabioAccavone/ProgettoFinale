fetch("navbarAuth.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("navbarAuthenticated")
            .innerHTML = data;


        // Dopo aver inserito la navbar controllo il ruolo
        mostraMenuAdmin();

    });


function mostraMenuAdmin() {

    const ruolo = localStorage.getItem("ruolo");

    const navAdmin = document.getElementById("navAdmin");


    if (ruolo === "ADMIN") {

        navAdmin.style.display = "inline";

    }
}

function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("ruolo");
    localStorage.removeItem("username");
    localStorage.removeItem("id");

    window.location.href = "login.html";

}