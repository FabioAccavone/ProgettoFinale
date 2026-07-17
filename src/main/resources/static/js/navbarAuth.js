fetch("navbarAuth.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("navbarAuthenticated")
        .innerHTML=data;

    })