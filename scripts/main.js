// Smooth scrolling for navigation links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Skill bar animation
function animateSkillBars() {
    const skillsSection = document.getElementById('skills');
    const skills = document.querySelectorAll('.skill-bar-fill');

    if (skillsSection.getBoundingClientRect().top < window.innerHeight) {
        skills.forEach(skill => {
            skill.style.width = skill.getAttribute('data-width');
        });
    }
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Handle skill bar animation on accordion toggle
document.querySelectorAll('.collapse').forEach(collapse => {
    collapse.addEventListener('shown.bs.collapse', animateSkillBars);
});

document.addEventListener("DOMContentLoaded", function() {
    AOS.init();
     // Smooth scroll for links
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    const tabs = document.querySelectorAll(".qualification__button");
    const contents = document.querySelectorAll(".qualification__content");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("qualification__active"));
            tab.classList.add("qualification__active");

            const target = tab.getAttribute("data-target");
            contents.forEach((content) => {
                content.classList.remove("qualification__active");
                if (content.getAttribute("id") === target.substring(1)) {
                    content.classList.add("qualification__active");
                }
            });
        });
    });
});

