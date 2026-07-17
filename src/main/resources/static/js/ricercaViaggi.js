//getAll
function visualizzaTutti(){

    const body_viaggi = document.getElementById("body_viaggi")

    body_viaggi.innerHTML = ""

    fetch(BASE_URL + "/viaggi", {
        method: "GET",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token"), //recupero dal localStorage il token che avevo salvato
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then(res=>{
        if(!res.ok) {
            throw new Error("Errore nel caricamento dei viaggi")
        }
        return res.json()
    })
    .then(viaggi=>viaggi.forEach(element => {

        const riga = document.createElement("tr") //creo una riga

                //creo le celle che conterranno i dati
                const td_codice = document.createElement("td")
                const td_luogo = document.createElement("td")
                const td_partenza = document.createElement("td")
                const td_ritorno = document.createElement("td")
                const td_formula = document.createElement("td")
                const td_costo = document.createElement("td")
                const td_posti = document.createElement("td")

                //inserisco i dati nella tabella
                td_codice.textContent = element.codice
                td_luogo.textContent = element.luogo
                td_partenza.textContent = element.partenza
                td_ritorno.textContent = element.ritorno
                td_formula.textContent = element.formula
                td_costo.textContent = element.costo
                td_posti.textContent = element.posti

                //inserisco nella riga
                riga.appendChild(td_codice)
                riga.appendChild(td_luogo)
                riga.appendChild(td_partenza)
                riga.appendChild(td_ritorno)
                riga.appendChild(td_formula)
                riga.appendChild(td_costo)
                riga.appendChild(td_posti)

                //inserisco la riga nella tabella
                body_viaggi.appendChild(riga)
        
    }))
}

function cercaViaggi(){

    const luogo = document.getElementById("filtroLuogo").value
    const formula = document.getElementById("filtroFormula").value
    const data = document.getElementById("filtroData").value

    const body_viaggi = document.getElementById("body_viaggi")

    body_viaggi.innerHTML= ""

    //capire come filtrare la ricerca
    
}