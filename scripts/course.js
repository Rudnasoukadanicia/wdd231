const courses = [
    {code: "CSE 110", title:"Intro to Programming", credits: 2, dept: "CSE", completed: true},
    {code: "WDD 130", title:"Web Fundamentals", credits: 2, dept: "WDD", completed: true},
    {code: "CSE 111", title:"Programming with Functions", credits: 2, dept: "CSE", completed: true},
    {code: "CSE 210", title:"Programming with Classes", credits: 2, dept: "CSE", completed: true},
    {code: "WDD 131", title:"Dynamic Web Fundamentals", credits: 2, dept: "WDD", completed: true},
    {code: "WDD 231", title:"Web Frontend Development", credits: 2, dept: "WDD", completed: false},
];

const container = document.getElementById("courses-container");
const totalCreditEl = document.getElementById("total-credit");
const filterButtons = document.querySelectorAll(".btn-filter");

function displayCourses(courseArray) {
    container.innerHTML = "";

    courseArray.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        if (course.completed) courseCard.classList.add("completed");

        courseCard.innerHTML = `
        <h3>${course.code} - ${course.title}</h3>
        <p>Department: ${course.dept}</p>
        <p>Credits: ${course.credits}</p>
        <p>Status: ${course.completed ? "Completed" : "In Progress"}</p>
        `;
        container.appendChild(courseCard);
  });

  // total des crédits
    const totalCredits = courseArray.reduce((sum, c) => sum + c.credits, 0);
    totalCreditEl.textContent = totalCredits;
}

// Filtres
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        if (filter === "all") {
        displayCourses(courses);
        } else {
        const filteredCourses = courses.filter(
            course => course.dept.toLowerCase() === filter
        );
        displayCourses(filteredCourses);
        }
    });
});

// Afficher tous les cours au démarrage
displayCourses(courses);
