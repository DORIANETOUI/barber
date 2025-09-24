var form = document.querySelector('form');
var status = document.createElement('div');
status.className = "text-center mt-3";
form.parentNode.insertBefore(status, form.nextSibling);

form.addEventListener("submit", function(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(response) {
        if (response.ok) {
            status.innerHTML = "Merci ! Votre message a été envoyé.";
            status.className += " text-success";
            form.reset();
        } else {
            response.json().then(function(data) {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Une erreur est survenue, veuillez réessayer.";
                }
                status.className += " text-danger";
            });
        }
    }).catch(function(error) {
        status.innerHTML = "Une erreur est survenue, veuillez réessayer.";
        status.className += " text-danger";
    });
});