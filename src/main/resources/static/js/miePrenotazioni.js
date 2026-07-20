const API = "http://localhost:8080";

window.onload = function () {

    caricaPrenotazioni();

};

//======================================
// CARICA PRENOTAZIONI
//======================================

function caricaPrenotazioni() {

    const userId = localStorage.getItem("id");

    fetch(API + "/prenotazioni/" + userId, {

        method: "GET",

        headers: {

            "Authorization": "Bearer " + localStorage.getItem("token")

        }

    })
    .then(res => {

        if (!res.ok) {

            throw new Error("Errore nel caricamento delle prenotazioni");

        }

        return res.json();

    })
    .then(prenotazioni => {

        mostraPrenotazioni(prenotazioni);

    })
    .catch(err => {

        alert(err.message);

    });

}

//======================================
// CREA LE CARD
//======================================

function mostraPrenotazioni(listaPrenotazioni) {

    const contenitore = document.getElementById("contenitorePrenotazioni");

    contenitore.innerHTML = "";

    if (listaPrenotazioni.length === 0) {

        contenitore.innerHTML = "<h2>Non hai ancora effettuato prenotazioni.</h2>";

        return;

    }

    listaPrenotazioni.forEach(prenotazione => {

        const viaggio = prenotazione.viaggio;

        const card = document.createElement("div");

        card.className = "cardPrenotazione";

        card.innerHTML = `

            <h2>${viaggio.luogo}</h2>

            <p><strong>Data prenotazione:</strong> ${formattaData(prenotazione.dataPrenotazione)}</p>

            <p><strong>Persone:</strong> ${prenotazione.numPersone}</p>

            <hr>

            <p><strong>Partenza:</strong> ${formattaData(viaggio.dataPartenza)}</p>

            <p><strong>Ritorno:</strong> ${formattaData(viaggio.dataRitorno)}</p>

            <p><strong>Formula:</strong> ${formattaFormula(viaggio.formula)}</p>

            <p><strong>Costo:</strong> € ${viaggio.costo}</p>

            <p><strong>Costo Totale:</strong> € ${prenotazione.costoTotale}</p>

        `;

        contenitore.appendChild(card);

    });

}

//======================================
// FORMATTA DATA
//======================================

function formattaData(data) {

    if (!data) return "";

    const parti = data.split("-");

    return `${parti[2]}/${parti[1]}/${parti[0]}`;

}

//======================================
// FORMATTA ENUM
//======================================

function formattaFormula(formula) {

    return formula
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, c => c.toUpperCase());

}