const API = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", function () {

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


    visualizzaTutti();

});

//====================================
// CAMBIO FILTRO
//====================================

function cambiaFiltro() {

    document.getElementById("ricercaLuogo").style.display = "none";
    document.getElementById("ricercaFormula").style.display = "none";
    document.getElementById("ricercaData").style.display = "none";

    const tipo = document.getElementById("tipoRicerca").value;

    if (tipo === "luogo") {

        document.getElementById("ricercaLuogo").style.display = "block";

    }

    if (tipo === "formula") {

        document.getElementById("ricercaFormula").style.display = "block";

    }

    if (tipo === "data") {

        document.getElementById("ricercaData").style.display = "block";

    }

}

//====================================
// MOSTRA TUTTI
//====================================

function visualizzaTutti() {

    fetch(API + "/viaggi", {

        method: "GET",

        headers: {

            "Authorization": "Bearer " + localStorage.getItem("token")
        }

    })
        .then(res => {

            if (!res.ok)
                throw new Error("Errore");

            return res.json();

        })
        .then(viaggi => mostraViaggi(viaggi))
        .catch(err => console.log(err));

}

//====================================
// CERCA
//====================================

function cercaViaggi() {

    const tipo = document.getElementById("tipoRicerca").value;

    let url = "";

    switch (tipo) {

        case "luogo":

            const luogo = document.getElementById("filtroLuogo").value.trim();

            if (luogo === "") {

                alert("Inserisci un luogo.");

                return;

            }

            url = API + "/viaggi/luogo/" + encodeURIComponent(luogo);

            break;


        case "formula":

            const formula = document.getElementById("filtroFormula").value;

            if (formula === "") {

                alert("Seleziona una formula.");

                return;

            }

            url = API + "/viaggi/formula/" + formula;

            break;


        case "data":

            const data = document.getElementById("filtroData").value;

            if (data === "") {

                alert("Seleziona una data.");

                return;

            }

            url = API + "/viaggi/data_partenza/" + data;

            break;


        default:

            alert("Seleziona il tipo di ricerca.");

            return;

    }

    fetch(url, {

        method: "GET",

        headers: {

            "Authorization": "Bearer " + localStorage.getItem("token")

        }

    })
        .then(res => {

            if (!res.ok)
                throw new Error("Errore nella ricerca");

            return res.json();

        })
        .then(viaggi => mostraViaggi(viaggi))
        .catch(err => console.log(err));

}

//====================================
// CREA LE CARD
//====================================

function mostraViaggi(listaViaggi) {

    const contenitore = document.getElementById("contenitoreViaggi");

    contenitore.innerHTML = "";

    if (listaViaggi.length === 0) {

        contenitore.innerHTML = "<h2>Nessun viaggio trovato.</h2>";

        return;

    }

    listaViaggi.forEach(viaggio => {

        const card = document.createElement("div");

        card.className = "cardViaggio";

        card.innerHTML = `

            <h2>${viaggio.luogo}</h2>

            <p><strong>Partenza:</strong> ${formattaData(viaggio.dataPartenza)}</p>

            <p><strong>Ritorno:</strong> ${formattaData(viaggio.dataRitorno)}</p>

            <p><strong>Formula:</strong> ${formattaFormula(viaggio.formula)}</p>

            <p><strong>Costo:</strong> € ${viaggio.costo}</p>

            <p><strong>Posti disponibili:</strong> ${viaggio.postiDisponibili}</p>

            <label>Numero persone</label>

            <input
                type="number"
                id="persone-${viaggio.id}"
                min="1"
                max="${viaggio.postiDisponibili}"
                value="1">

            <br><br>

            <button onclick="prenota(${viaggio.id})">
                Prenota
            </button>

        `;

        contenitore.appendChild(card);

    });

}

//====================================
// FORMATTA ENUM
//====================================

function formattaFormula(formula) {

    return formula
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, c => c.toUpperCase());

}

function formattaData(data) {

    if (!data) return "";

    const parti = data.split("-");

    return `${parti[2]}/${parti[1]}/${parti[0]}`;

}

//====================================
// PRENOTAZIONE
//====================================

function prenota(idViaggio) {

    const inputPersone = document.getElementById("persone-" + idViaggio);


    const numPersone = Number(inputPersone.value);

    if (numPersone < 1) {

        alert("Inserisci un numero di persone valido.");
        return;

    }

    const prenotazione = {

        numPersone: numPersone,
        viaggioId: idViaggio,
        userId: Number(localStorage.getItem("id"))

    };

    fetch(API + "/prenotazioni", {

        method: "POST",

        headers: {

            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"

        },

        body: JSON.stringify(prenotazione)

    })
    .then(res => {

        if (!res.ok) {
            throw new Error("Errore durante la prenotazione");
        }

        return res.json();

    })
    .then(() => {

        Toastify({
        text: "Prenotazione effettuata con successo!",
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

        // aggiorno i posti disponibili
        visualizzaTutti();

    })
    .catch(err => {

        alert(err.message);

    });

}