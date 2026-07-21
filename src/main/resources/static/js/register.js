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
    fetch("http://localhost:8080/auth/registrazione", {
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
        
        Toastify({
        text: "Registrazione avventuta con successo",
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
        stopOnFocus: true,
        style: {
            background: "linear-gradient(135deg, #28a745, #20c997)",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            fontSize: "16px",
            fontWeight: "500"
        }
    }).showToast();

    setTimeout(() => {

        window.location.href = "login.html";

    }, 1500);

    })
    .catch(errore=>alert(errore.message))
}


// Funzione per controllare il campo nome
function checkNome(input) {
    // Rimuove eventuale messaggio di errore precedente
    let errorMsg = document.getElementById('nome-error');
    
    const regex = /^[A-Z][a-zA-Z]*$/; // Prima lettera maiuscola, solo lettere

    if (!regex.test(input.value)) {
        input.style.borderColor = "red";

        if (!errorMsg) {
            errorMsg = document.createElement('p');
            errorMsg.id = 'nome-error';
            errorMsg.style.color = 'red';
            errorMsg.textContent = 'Il nome deve essere composto solo da lettere e iniziare con la maiuscola';
            input.insertAdjacentElement('afterend', errorMsg);
        }
    } else {
        input.style.borderColor = "";
        if (errorMsg) {
            errorMsg.remove();
        }
    }
}

// Funzione per controllare il campo cognome
function checkCognome(input) {
    let errorMsg = document.getElementById('cognome-error');

    const regex = /^[A-Z][a-zA-Z]*$/; // Prima lettera maiuscola, solo lettere

    if (!regex.test(input.value)) {
        input.style.borderColor = "red";

        if (!errorMsg) {
            errorMsg = document.createElement('p');
            errorMsg.id = 'cognome-error';
            errorMsg.style.color = 'red';
            errorMsg.textContent = 'Il cognome deve essere composto solo da lettere e iniziare con la maiuscola';
            input.insertAdjacentElement('afterend', errorMsg);
        }
    } else {
        input.style.borderColor = "";
        if (errorMsg) {
            errorMsg.remove();
        }
    }
}

// Funzione per controllare il campo codice fiscale
function checkCF(input) {
    let errorMsg = document.getElementById('cf-error');

    const valore = input.value.toUpperCase();
    const valido = valore.length === 16;

    if (!valido) {
        input.style.borderColor = "red";

        if (!errorMsg) {
            errorMsg = document.createElement('p');
            errorMsg.id = 'cf-error';
            errorMsg.style.color = 'red';
            errorMsg.textContent = 'Il codice fiscale deve essere composto da 16 caratteri';
            input.insertAdjacentElement('afterend', errorMsg);
        }
    } else {
        input.style.borderColor = "";
        if (errorMsg) errorMsg.remove();
    }
}

// Funzione per controllare il campo password
function checkPassword(input) {
    let errorMsg = document.getElementById('password-error');

    const valido = input.value.length >= 8;

    if (!valido) {
        input.style.borderColor = "red";

        if (!errorMsg) {
            errorMsg = document.createElement('p');
            errorMsg.id = 'password-error';
            errorMsg.style.color = 'red';
            errorMsg.textContent = 'La password deve essere di almeno 8 caratteri';
            input.insertAdjacentElement('afterend', errorMsg);
        }
    } else {
        input.style.borderColor = "";
        if (errorMsg) errorMsg.remove();
    }
}