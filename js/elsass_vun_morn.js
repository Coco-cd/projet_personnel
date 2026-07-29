function navigateTo(page) { // Fonction pour naviguer vers une autre page
    window.location.href = page; // Redirige vers la page spécifiée
}

function updateLastModifiedDate() { // Fonction pour mettre à jour la date de dernière modification
    const lastUpdatedElement = document.getElementById('last-updated'); // Récupère l'élément avec l'ID 'last-updated'
    if (!lastUpdatedElement) return; // Si l'élément n'existe pas encore, on quitte
    const lastUpdatedDate = new Date(document.lastModified || Date.now()); // Crée une nouvelle date
    lastUpdatedElement.textContent = lastUpdatedDate.toLocaleDateString('fr-FR', { // Met à jour le texte de l'élément avec la date formatée
        year: 'numeric', // Affiche l'année en format numérique
        month: 'long', // Affiche le mois en format long
        day: 'numeric' // Affiche le jour en format numérique
    });
}

async function loadFooter() {
    try {
        const res = await fetch('includes/footer.html');
        const html = await res.text();
        const container = document.getElementById('site-footer');
        if (container) container.innerHTML = html;
        updateLastModifiedDate();
    } catch (e) {
        console.error('Erreur lors du chargement du footer :', e);
    }
}
async function loadHeader() {
    try {
        const res = await fetch('includes/header.html');
        const html = await res.text();
        const container = document.getElementById('site-header');
        if (container) container.innerHTML = html;
        updateLastModifiedDate();
    } catch (e) {
        console.error('Erreur lors du chargement du header :', e);
    }
}

document.addEventListener('DOMContentLoaded', (event) => { // Ajoute un écouteur d'événement pour le chargement du DOM
    loadHeader(); // Charge le header commun
    loadFooter(); // Charge le footer commun
    emailjs.init("OIb4_RPslh8Pui9zv"); /* Initialise EmailJS avec la clé publique */
    console.log("EmailJS initialized"); // Affiche un message dans la console pour indiquer que EmailJS est initialisé
});

function validateForm(event) { // Fonction pour valider le formulaire
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    
    const name = document.getElementById("name").value; // Récupère la valeur du champ 'name'
    const email = document.getElementById("email").value; // Récupère la valeur du champ 'email'
    const message = document.getElementById("message-form").value; // Récupère la valeur du champ 'message-form'

    document.querySelectorAll('.error').forEach(error => error.style.display = 'none'); // Réinitialise les messages d'erreur

    let isValid = true; // Initialise la variable de validation à true

    if (!name) { // Valide le champ 'name'
        document.getElementById("name-error").style.display = "block"; // Affiche le message d'erreur pour le champ 'name'
        isValid = false; // Met à jour la variable de validation à false
    }

    if (!email || !email.includes('@') || !email.includes('.')) { // Valide le champ 'email'
        document.getElementById("email-error").style.display = "block"; // Affiche le message d'erreur pour le champ 'email'
        isValid = false; // Met à jour la variable de validation à false
    }

    if (!message) { // Valide le champ 'message'
        document.getElementById("message-error").style.display = "block"; // Affiche le message d'erreur pour le champ 'message'
        isValid = false; // Met à jour la variable de validation à false
    }

    if (isValid) { // Si le formulaire est valide
        console.log("Form is valid, sending email..."); // Affiche un message dans la console pour indiquer que le formulaire est valide
        sendEmail(name, email, message); // Appelle la fonction pour envoyer l'email
    }
}

function sendEmail(name, email, message) { // Fonction pour envoyer un email
    console.log("Sending email with the following details:", { name, email, message }); // Affiche les détails de l'email dans la console
    emailjs.send("service_xglnn87", "template_5al5qwq", { // Envoie l'email via EmailJS avec le service ID et le template ID
        // https://dashboard.emailjs.com/admin  ; https://dashboard.emailjs.com/admin/templates
        from_name: name, // Nom de l'expéditeur
        from_email: email, // Email de l'expéditeur
        message: message // Message de l'email
    }).then(function(response) { // Si l'envoi est réussi
        console.log("Email sent successfully:", response); // Affiche un message dans la console pour indiquer que l'email a été envoyé avec succès
        alert("Message envoyé avec succès !"); // Affiche une alerte pour indiquer que l'email a été envoyé avec succès
    }).catch(function(error) { // Si l'envoi échoue
        console.error("Échec de l'envoi du message : ", error); // Affiche l'erreur dans la console
        alert("Échec de l'envoi du message : " + JSON.stringify(error)); // Affiche une alerte pour indiquer que l'envoi de l'email a échoué
    });
}
