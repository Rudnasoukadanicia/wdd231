document.addEventListener("DOMContentLoaded", () => {
    const menubutton = document.querySelector("#menu");
    const navbar = document.querySelector(".nav-bar");

    if(menubutton && navbar){
        menubutton.addEventListener("click", () => {
            navbar.classList.toggle("show");
            menubutton.textContent = menubutton.textContent === "☰" ? "✖" : "☰";
        });
    }
})