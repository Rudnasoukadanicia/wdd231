document.addEventListener("DOMContentLoaded", () => {
    // Footer dynamique
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Dernière modification : ${document.lastModified}`;

    // Menu hamburger
    const menuButton = document.querySelector("#menu");
    const navbar = document.querySelector(".nav-bar");

    if (menuButton && navbar) {
        menuButton.addEventListener("click", () => {
            navbar.classList.toggle("show");
            menuButton.textContent = menuButton.textContent === "☰" ? "✖" : "☰";
        });
    }

    // Spotlights
    async function loadMembers() {
        try {
            const response = await fetch('data/members.json');
            const data = await response.json();

            const qualifiedMembers = data.filter(member => member.membership === 2 || member.membership === 3);
            const selectedMembers = qualifiedMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

            const container = document.getElementById("spotlight-container");
            container.innerHTML = '';

            selectedMembers.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("spotlight-card");

                card.innerHTML = `
                    images/${member.image}
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    ${member.website}Visiter le site</a>
                    <p><strong>Niveau :</strong> ${getMembershipLevel(member.membership)}</p>
                `;
                container.appendChild(card);
            });
        } catch (error) {
            console.error("Erreur chargement JSON :", error);
        }
    }

    function getMembershipLevel(level) {
        switch(level) {
            case 1: return "Bronze";
            case 2: return "Silver";
            case 3: return "Gold";
            default: return "Membre";
        }
    }

    loadMembers();

    // Météo
    const apiKey = "bdcdca724f45450a27defe8058ff8bb5";
    const lat = -4.2;
    const lon = 12.6667;
    const units = "metric";

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    const tempElement = document.getElementById("weather-temp");
    const descElement = document.getElementById("weather-desc");
    const forecastContainer = document.getElementById("forecast");

    async function getWeather() {
        try {
            // Météo actuelle
            const response = await fetch(weatherURL);
            const data = await response.json();

            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;

            tempElement.textContent = `${temperature}°C`;
            descElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);

            // Prévisions
            const forecastResponse = await fetch(forecastURL);
            const forecastData = await forecastResponse.json();

            const dailyForecasts = forecastData.list
                .filter((item, index) => index % 8 === 0)
                .slice(1, 4);

            forecastContainer.innerHTML = "";

            dailyForecasts.forEach(day => {
                const date = new Date(day.dt_txt);
                const temp = Math.round(day.main.temp);
                const des = day.weather[0].description;

                const card = document.createElement("div");
                card.classList.add("forecast-day");

                card.innerHTML = `
                    <p><strong>${date.toLocaleDateString("fr-FR", { weekday: "short" })}</strong></p>
                    <p>${temp} °C</p>
                    <p>${des}</p>
                `;
                forecastContainer.appendChild(card);
            });

            const sourceNote = document.createElement("p");
            sourceNote.classList.add("small");
            sourceNote.textContent = "Données fournies par OpenWeatherMap.";
            forecastContainer.appendChild(sourceNote);

        } catch (error) {
            console.error("Erreur météo :", error);
            tempElement.textContent = "-- °C";
            descElement.textContent = "Météo indisponible";
        }
    }

    getWeather();
});