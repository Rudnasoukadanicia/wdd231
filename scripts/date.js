
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `The last Modifed date is: ${document.lastModified}`
})