function cancella(){

    fetch("http://localhost:8080/viaggi/{id}", {
        method: "DELETE",
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log("Status:", res.status)
        if(!res.ok){
            return res.text().then(msg => { throw new Error("Status " + res.status + ": " + msg); })
        }
        alert("Viaggio eliminato!")
        visualizzaTutti() 
    })
    .catch(errore => alert("Errore: " + errore.message))
}