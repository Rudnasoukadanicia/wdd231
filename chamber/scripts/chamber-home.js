document.addEventListener("DOMContentLoaded",()=>{
    // date 
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

    // Menu Humberger

    const nemubutton = document.querySelector("#menu");
    const navbar = document.querySelector(".nav-bar");

   if(nemubutton && navbar){
        nemubutton.addEventListener("click", ()=> {
            navbar.classList.toggle("show");
            nemubutton.textContent = nemubutton.textContent === "☰" ? "✖" : "☰";
        })
   };

    // fetch spotlight members from json file

    async function loadMembers(){
        try{
            const response = await fetch('data/member.json');
            const data = await response.json();

            const qualifiedMembers = data.filter(member => member.membership === "Gold" || member.membership ==="Silver");
            const selectedMembers = qualifiedMembers.sort(()=> 0.5 - Math.random()).slice(0,3);

            const contenair = document.getElementById("spotlight-container");
            contenair.innerHTML = '';

            selectedMembers.foreach(member =>{
                const card = document.createAttribute("div");
                card.classList.add("spotlight-card");
                card.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit the site</a>
                `;
                contenair.appendChild(card);
            });
        } catch(error) {
            console.error("Error loading JSON:", error);
        }

    }
    loadMembers();

    const apiKey = "";
    const last = -4.2;
    const lon = 12.6667;
    const units = "metric";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    const tempElement = document.getElementById("weather-temp");
    const descElement = document.getElementById("weather-desc");
    const forecastContainer = document.getElementById("forecast");

    async function getWeather(){
        try{
            // meteo now
            const response = await fetch(weatherURL);
            const data = await response.json();
            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;

            tempElement.textContent = `${temperature}°C`;
            descElement.textContent =description.charAt(0).toUpperCase() + description.slice(1);

            // prevision meteo 

            const forecastResponse = await fetch(forecastURL);
            const forecastData = await forecastResponse.json();

            const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0).slice(1, 4);
            forecastContainer.innerHTML = "";

            dailyForecasts.foreach(day =>{
                const date = new Date(day.dt_txt);
                const temp = Math.round(day.main.temp);
                const des = day.weather[0].description;

                const card = document.createAttribute("div");
                card.classList.add("forecast-card");
                card.innerHTML =`
                    <p><strong>${date.toLocaleDateString("en-GB", { weekday: "short" })}</strong></p>
                    <p>${temp} °C</p>
                    <p>${desc}</p>`;
                forecastContainer.appendChild(card);
            });

            const sourceNote =document.createElement("p");
            sourceNote.classList.add("small");
            sourceNote.textContent ="Data provided by OpenWeatherMap.";
            forecastContainer.appendChild(sourceNote);
        } catch(error){
            console.error("Error fetching weather data:", error);
            tempElement.textContent = "-- °C";
            descElement.textContent = "Weather unavailable";
        }
    }

    getWeather();  

});