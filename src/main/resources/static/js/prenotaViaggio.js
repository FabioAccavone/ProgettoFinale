function prenotaViaggio(){

    const codiceViaggio = document.getElementById("codicePrenotazione").value
    const numeroPersone = document.getElementById("numeroPersone").value

    const prenotazione = {
        codiceViaggio: codiceViaggio,
        numeroPersone: numeroPersone
    }

    fetch("http://localhost:8080/prenotazioni", {
        method: "POST",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(prenotazione)
    })
    .then(res => {
        console.log("Status:", res.status); //codice HTTP reale
        if(!res.ok){
            return res.text().then(msg => { throw new Error("Status " + res.status + ": " + msg); })
        }
        return res.json();
    })
    .then(prenotazione => {
        alert("Prenotazione effettuata!");
        console.log(prenotazione);
    })
    .catch(errore => alert("Errore: " + errore.message))
}