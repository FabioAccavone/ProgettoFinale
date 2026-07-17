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
            alert("Login effettuato!")
            localStorage.setItem("token", data.token)
            localStorage.setItem("ruolo", data.ruolo) 
            
            //controllo il ruolo
            if(data.ruolo === "ADMIN"){
                window.location.href = "admin";
            }else{
                window.location.href = "viaggi.html";
            }
        })
    .catch(error=>alert(error.message))
}