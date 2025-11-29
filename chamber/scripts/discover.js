import { places } from "../data/places.mjs";

document.addEventListener("DOMContentLoaded", () => {

    
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `The last Modifed date is: ${document.lastModified}`

    // button humberger

    const menubutton = document.querySelector("#menu");
    const navbar = document.querySelector(".nav-bar");

    if(menubutton && navbar){
        menubutton.addEventListener("click", () => {
            navbar.classList.toggle("show");
            menubutton.textContent = menubutton.textContent === "☰" ? "✖" : "☰";
        });
    }

    const grid = document.getElementById("placesGrid");
    const areas = ["a","b","c","d","e","f","g","h"];

    places.forEach((place, index) => {
        const card = document.createElement("div");
        card.classList.add("place-card");

        // IMPORTANT pour grid-template-areas
        card.style.gridArea = areas[index];

        card.innerHTML = `
            <h2>${place.title}</h2>

            <figure>
                <img src="images/${place.image}" alt="${place.title}">
            </figure>

            <address>${place.address}</address>
            <p class="description">${place.description}</p>

            <div class="actions">
                <button class="learn">Learn More</button>
            </div>
        `;
        grid.appendChild(card);
    });

    // --------- VISITOR MESSAGE ----------
    const visitMessage = document.getElementById("visitMessage");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysDiff < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDiff === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysDiff} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
});
