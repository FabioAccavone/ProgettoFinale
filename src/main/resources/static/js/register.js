function registrati(){
    //recupero i dati
    const nome = document.getElementById("nome").value
    const cognome = document.getElementById("cognome").value
    const indirizzo = document.getElementById("indirizzo").value
    const cf = document.getElementById("cf").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    //costruisco l'oggetto da inviare
    const nuovoUtente = {
        nome: nome,
        cognome:cognome,
        indirizzo:indirizzo,
        cf:cf,
        username: username,
        password: password
    }

    //fetch
    fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(nuovoUtente)
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => { throw new Error(err.message || "Errore durante la registrazione") });
        }
        return res.json();
    })
    .then(utente=>{
        alert("Registrazione avvenuta con successo!")
        window.location.href = "login.html"
    })
    .catch(errore=>alert(errore.message))
}