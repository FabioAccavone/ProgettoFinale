function login(){
    //recupero i dati
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    //costruisco l'oggetto da inviare
    const credenziali = {
        username: username,
        password: password
    }

    fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(credenziali)
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => { throw new Error(err.message || "Errore durante il login") });
        }
        return res.json();
    })
    .then(data=>{
            localStorage.setItem("token", data.jwt)
            localStorage.setItem("ruolo", data.ruolo) 
            localStorage.setItem("username", data.username)
            localStorage.setItem("id", data.id)
            
            //controllo il ruolo
            if(data.ruolo === "ADMIN"){
                window.location.href = "admin.html";
            }else{
                window.location.href = "ricercaViaggi.html";
            }
        })
    .catch(errore => {

        Toastify({
            text: errore.message,
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

    })
}