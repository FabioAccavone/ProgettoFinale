function modificaViaggio(){

    const codice = document.getElementById("codiceViaggio").value
    const luogo = document.getElementById("luogo").value
    const dataPartenza = document.getElementById("dataPartenza").value
    const dataRitorno = document.getElementById("dataRitorno").value
    const formula = document.getElementById("formula").value
    const costo = document.getElementById("costo").value
    const postiDisponibili = document.getElementById("postiDisponibili").value

    const viaggioDaModificare = {
        codice: codice,
        luogo: luogo,
        dataPartenza: dataPartenza,
        dataRitorno: dataRitorno,
        formula: formula,
        costo: costo,
        postiDisponibili: postiDisponibili
    }

    fetch("http://localhost:8080/viaggi{id}", {
        method:"PUT",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(viaggioDaModificare)
    })
    .then(res => {
        console.log("Status:", res.status);
        if(!res.ok){
            return res.text().then(msg => { throw new Error("Status " + res.status + ": " + msg); })
        }
        return res.json();
    })
    .then(viaggio => {
        alert("Viaggio modificato!\n" + JSON.stringify(viaggio))
        visualizzaTutti() //ricarico la tabella per vedere i dati aggiornati
    })
    .catch(errore => alert("Errore: " + errore.message))



}