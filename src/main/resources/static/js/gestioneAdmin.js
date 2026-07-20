const API = "http://localhost:8080";

//====================================
// CARICA VIAGGI AL LOAD
//====================================

window.onload = function(){

    Toastify({
        text: "Benvenuto " + localStorage.getItem("username"),
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
    caricaViaggi();
}

//====================================
// CARICA E VISUALIZZA TUTTI I VIAGGI
//====================================

function caricaViaggi(){
    fetch(API + "/viaggi", {
        method:"GET",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    .then(res => {
        if(!res.ok){
            return res.text().then(msg => { throw new Error("Status " + res.status + ": " + msg); })
        }
        return res.json();
    })
    .then(viaggi => mostraViaggiAdmin(viaggi))
    .catch(errore => console.log("Errore nel caricamento: " + errore.message))
}

//====================================
// VISUALIZZA VIAGGI NELLA SEZIONE ADMIN
//====================================

function mostraViaggiAdmin(listaViaggi){
    const contenitore = document.getElementById("elencoViaggiAdmin");
    contenitore.innerHTML = "";

    if(listaViaggi.length === 0){
        contenitore.innerHTML = "<p>Nessun viaggio creato.</p>";
        return;
    }

    listaViaggi.forEach(viaggio => {
        const card = document.createElement("div");
        card.className = "cardViaggio";
        card.innerHTML = `
            <h2>${viaggio.luogo}</h2>
            <p><strong>Partenza:</strong> ${viaggio.dataPartenza}</p>
            <p><strong>Ritorno:</strong> ${viaggio.dataRitorno}</p>
            <p><strong>Formula:</strong> ${formattaFormula(viaggio.formula)}</p>
            <p><strong>Costo:</strong> € ${viaggio.costo}</p>
            <p><strong>Posti disponibili:</strong> ${viaggio.postiDisponibili}</p>
            <button class="btnModifica" onclick="caricaPerModifica(${viaggio.id})">Modifica</button>
            <button class="btnCancella" onclick="cancellaViaggio(${viaggio.id})">Cancella</button>
        `;
        contenitore.appendChild(card);
    });
}

//====================================
// FORMATTA ENUM
//====================================

function formattaFormula(formula){
    return formula
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}

//====================================
// CARICA VIAGGIO PER MODIFICA
//====================================

function caricaPerModifica(idViaggio){
    fetch(API + "/viaggi/" + idViaggio, {
        method:"GET",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    .then(res => {
        if(!res.ok){
            return res.text().then(msg => { throw new Error("Status " + res.status + ": " + msg); })
        }
        return res.json();
    })
    .then(viaggio => {
        document.getElementById("codiceViaggio").value = viaggio.id;
        document.getElementById("luogo").value = viaggio.luogo;
        document.getElementById("dataPartenza").value = viaggio.dataPartenza;
        document.getElementById("dataRitorno").value = viaggio.dataRitorno;
        document.getElementById("formula").value = viaggio.formula;
        document.getElementById("costo").value = viaggio.costo;
        document.getElementById("postiDisponibili").value = viaggio.postiDisponibili;

        //cambio il bottone e i label
        document.getElementById("btnSalvaViaggio").value = "Salva modifiche";
        document.getElementById("btnSalvaViaggio").onclick = function(){ modifica() };
        document.getElementById("btnAnnullaModifica").style.display = "inline";
        
        //scroll al form
        document.getElementById("formViaggio").scrollIntoView({behavior: "smooth"});
    })
    .catch(errore => alert("Errore: " + errore.message))
}

//====================================
// MODIFICA VIAGGIO
//====================================

function modifica(){
    const idViaggio = document.getElementById("codiceViaggio").value;
    
    //recupero i dati
    const luogo = document.getElementById("luogo").value;
    const dataPartenza = document.getElementById("dataPartenza").value;
    const dataRitorno = document.getElementById("dataRitorno").value;
    const formula = document.getElementById("formula").value;
    const costo = document.getElementById("costo").value;
    const postiDisponibili = document.getElementById("postiDisponibili").value;

    //costruisco l'oggetto
    const viaggioModificato = {
        id: idViaggio,
        luogo: luogo,
        dataPartenza: dataPartenza,
        dataRitorno: dataRitorno,
        formula: formula,
        costo: costo,
        postiDisponibili: postiDisponibili
    };

    fetch(API + "/viaggi/" + idViaggio, {
        method:"PUT",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(viaggioModificato)
    })
    .then(res => {
        if(!res.ok){
            return res.text().then(msg => { throw new Error("Status " + res.status + ": " + msg); })
        }
        return res.json();
    })
    .then(viaggio => {

        Toastify({
            text: "Viaggio modificato con successo!",
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
        annullaModifica();
        caricaViaggi();
    })
    .catch(errore => {

        Toastify({
            text: "Errore: " + errore.message,
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

//====================================
// ANNULLA MODIFICA
//====================================

function annullaModifica(){
    document.getElementById("formViaggio").reset();
    document.getElementById("codiceViaggio").value = "";
    document.getElementById("btnSalvaViaggio").value = "Aggiungi viaggio";
    document.getElementById("btnSalvaViaggio").onclick = function(){ crea() };
    document.getElementById("btnAnnullaModifica").style.display = "none";
}

//====================================
// CREA VIAGGIO
//====================================

function crea(){
            
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

    fetch(API + "/viaggi", {
        method:"POST",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token"), 
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(nuovoViaggio)
    })
    .then(res => {
        if(!res.ok){
            return res.text().then(msg => { throw new Error("Status " + res.status + ": " + msg); })
        }
        return res.json();
    })
    .then(viaggio => {

        Toastify({
            text: "Viaggio inserito con successo!",
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
        document.getElementById("formViaggio").reset();
        caricaViaggi();
    })
    .catch(errore => {

        Toastify({
            text: "Errore: " + errore.message,
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

//====================================
// CANCELLA VIAGGIO
//====================================

function cancellaViaggio(idViaggio){
    if(!confirm("Sei sicuro di voler cancellare questo viaggio?")){
        return;
    }

    fetch(API + "/viaggi/" + idViaggio, {
        method:"DELETE",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    .then(res => {
        if(!res.ok){
            return res.text().then(msg => { throw new Error("Status " + res.status + ": " + msg); })
        }
        return res.text();
    })
    .then(() => {
        Toastify({
            text: "Viaggio cancellato con successo!",
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
        caricaViaggi();
    })
    .catch(errore => {

        Toastify({
            text: "Errore: " + errore.message,
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