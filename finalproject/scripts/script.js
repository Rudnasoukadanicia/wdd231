document.addEventListener("DOMContentLoaded", () => {

    
    const menubutton = document.querySelector("#menu");
    const navbar = document.querySelector(".nav-bar");

    if(menubutton && navbar){
        menubutton.addEventListener("click", () => {
            navbar.classList.toggle("show");
            menubutton.textContent = menubutton.textContent === "☰" ? "✖" : "☰";
        });
    };
    
    const icons = document.querySelectorAll(".toggle-icon");
    if (!icons.length) {
        console.error("No .toggle-icon icon found in the DOM.");
        return;
    };

    icons.forEach(icon => {
        // protection si l'image est cassée
        icon.addEventListener("error", () => {
        console.error("Image loading failed:", icon.getAttribute("src"));
        icon.style.opacity = 0.5;
        });

        icon.addEventListener("click", () => {
        const src = icon.getAttribute("src");       // on utilise getAttribute pour garder le chemin relatif
        const alt = icon.getAttribute("data-alt");

        if (!alt) {
            console.warn("data-alt not defined for", icon);
            return;
        };

        icon.setAttribute("src", alt);
        icon.setAttribute("data-alt", src);
        });
    });

    let allCategories = []

    // Use Json

    async function loadData(){
        try{
            const res = await fetch('data/donne.json');
            allCategories = await res.json();
            displayCategories(allCategories)
        }
        catch(error){
        console.error("JSON loading error:", error);
        }
    }     

    // add the categories information by js

    function  displayCategories(categories){
        const contenair = document.getElementById('categories');
        contenair.innerHTML='';

        categories.forEach(categorie =>{
            const cards = document.createElement('div');
            cards.classList.add('categorie-card');

            cards.innerHTML=`
            <img src="images/${categorie.image}" alt="${categorie.name}">
            <h3>${categorie.name}</h3>`;

            contenair.appendChild(cards);
        });

    }
    loadData();

    const dataFilterLinks = document.querySelectorAll("a[data-filter]");
    dataFilterLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const filter = link.getAttribute("data-filter");
            filterCategories(filter);
        });
    });

    function filterCategories(filter) {
        let filteredCat = [];
        
       if(filter === "all"){
        filteredCat = allCategories;
       }
       else {
        filteredCat = allCategories.filter(item => item.categories.trim().toLowerCase() === filter.toLowerCase());
       }
        displayCategories(filteredCat);

    }


});
