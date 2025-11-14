document.addEventListener("DOMContentLoaded", () => {

    // --- Display the data of the modified ---

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


        // Use Json
    
        async function loadMembers() {
        try{
            const response = await fetch('data/members.json');
            const members = await response.json();
            displayMembers(members);

        }
        catch (error){
            console.error("JSON loading error :", error);
        }
        
    }

    //  add the members information by js
    
    function displayMembers(members){
        const contenair = document.getElementById('members');
        contenair.innerHTML = '';

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit the site</a>
                <p><strong>Level:</strong> ${getMembershipLevel(member.membership)}</p>
            `;

            contenair.appendChild(card);
        });
    }

    function getMembershipLevel(level) {
        switch(level) {
            case 1: return "Bronze Member";
            case 2: return "Silver Member";
            case 3: return "Gold Member";
            default: return "Member";
        }
        
    }

    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    const membersContainer = document.getElementById('members');

    gridBtn.addEventListener('click', () => {
        membersContainer.classList.add('grid-view');
        membersContainer.classList.remove('list-view');
    });

    listBtn.addEventListener('click', () => {
        membersContainer.classList.add('list-view');
        membersContainer.classList.remove('grid-view');
    });
    

    // --- Exécution ---
    loadMembers();
})
