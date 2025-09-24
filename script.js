document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById('reservation-form');
    // Supprimez la ligne pour l'élément "status" qui n'est plus nécessaire
    // var status = document.getElementById('form-status');

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var data = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if (response.ok) {
                // Affiche la modale de succès
                var successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
                form.reset();
            } else {
                response.json().then(function(data) {
                    // Affiche la modale d'erreur
                    var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
                    var errorModalBody = document.getElementById('errorModalBody');
                    if (Object.hasOwn(data, 'errors')) {
                        errorModalBody.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        errorModalBody.innerHTML = "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.";
                    }
                    errorModal.show();
                });
            }
        }).catch(function(error) {
            // Affiche la modale d'erreur en cas de problème de connexion
            var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
            var errorModalBody = document.getElementById('errorModalBody');
            errorModalBody.innerHTML = "Une erreur est survenue. Veuillez vérifier votre connexion et réessayer.";
            errorModal.show();
        });
    });
});