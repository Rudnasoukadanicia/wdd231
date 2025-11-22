
document.addEventListener("DOMContentLoaded", () => {
    // Footer dynamique
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Dernière modification : ${document.lastModified}`;

    // Timestamp
    document.getElementById("timestamp").value = new Date().toISOString();

    // Menu hamburger
    const menuButton = document.querySelector("#menu");
    const navbar = document.querySelector(".nav-bar");
    menuButton.addEventListener("click", () => {
        navbar.classList.toggle("show");
        menuButton.textContent = menuButton.textContent === "☰" ? "✖" : "☰";
    });

    // Modals
    const modalLinks = document.querySelectorAll(".modal-link");
    modalLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const modalId = link.dataset.modal;
            document.getElementById(modalId).classList.add("show");
        });
    });

    const closeButtons = document.querySelectorAll(".close-modal");
    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".modal").classList.remove("show");
        });
    });
});
