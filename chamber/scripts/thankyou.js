document.addEventListener("DOMContentLoaded", () => {
    
    const params = new URLSearchParams(window.location.search);
        document.getElementById("summary").innerHTML = `
                <h2>Merci pour votre inscription !</h2>
                <p><strong>Prénom :</strong> ${params.get("firstName")}</p>
                <p><strong>Nom :</strong> ${params.get("lastName")}</p>
                <strong>Téléphone :</strong> ${params.get("phone")}</p>
                <p><strong>Organisation :</strong> ${params.get("organization")}</p>
                <p><strong>Date :</strong> ${params.get("timestamp")}</p>
            `;
        });