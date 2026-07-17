//ADMIN
function creaViaggio(){
            
    //recupero i dati
    const luogo = document.getElementById("luogo").value
    const dataPartenza = document.getElementById("dataPartenza").value
    const dataRitorno = document.getElementById("dataRitorno").value
    const formula = document.getElementById("formula").value
    const costo = document.getElementById("costo").value
    const postiDisponibili = document.getElementById("postiDisponibili").value

    //costruisco l'oggetto
    const nuovoViaggio = {
        luogo: luogo,
        dataPartenza: dataPartenza,
        dataRitorno: dataRitorno,
        formula: formula,
        costo: costo,
        postiDisponibili: postiDisponibili
    }

    fetch("http://localhost:8080/viaggi", {
        method:"POST",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(nuovoViaggio)
    })
    .then(res => {
        console.log("Status:", res.status); //codice HTTP reale
        if(!res.ok){
            return res.text().then(msg => { throw new Error("Status " + res.status + ": " + msg); })
        }
        return res.json();
    })
    .then(viaggio => alert("Viaggio creato!\n" + JSON.stringify(viaggio)))
    .catch(errore => alert("Errore: " + errore.message))
}