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

    const username = localStorage.getItem("username");

    Toastify({
        text: "Arrivederci " + username + "! Logout effettuato.",
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
        stopOnFocus: true,
        style: {
            background: "linear-gradient(135deg, #dc3545, #ff6b6b)",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            fontSize: "16px",
            fontWeight: "500"
        }
    }).showToast();


    localStorage.removeItem("token");
    localStorage.removeItem("ruolo");
    localStorage.removeItem("username");
    localStorage.removeItem("id");


    setTimeout(() => {

        window.location.href = "home.html";

    }, 1500);

}