// Smooth scrolling for navigation links
// document.querySelectorAll('a.nav-link').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

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

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar-nav ul li a");

    function setActiveLink() {
        let index = sections.length;

        while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLinks[index]) {
            navLinks[index].classList.add("active");
        }
    }

    setActiveLink();
    window.addEventListener("scroll", setActiveLink);
});


AOS.init({
    duration: 800, // Duration of animation in milliseconds
    once: true,    // Whether animation should happen only once
});

// Project Data
let projects = [
    {
        image: "images/cartpole-gif.gif",
        title: "Reinforcement Learning with Classical ML Techniques",
        description: "Solving the classic cartpole problem without neural networks",
        backDescription: "Final Project of Machine Learning with 4 classmates",
        linkDescription: "View Github",
        skills: ["Python", "Gymnasium", "Pytorch", "Numpy", "Matplotlib"],
        link: "https://github.com/rhit-luttredn/CSSE415-Project"
    },
    {
        image: "images/globe-cropped.gif",
        title: "Global Recipe Roulette",
        description: "Simple web application with an animated and interactive globe to get recipes from around the world",
        backDescription: "Final Project of Web Development with one classmate",
        linkDescription: "Go to Website",
        skills: ["HTML", "JavaScript", "CSS", "Firebase"],
        link: "https://global-recipe-roulette.web.app/"
    },
    {
        image: "images/planner.png",
        title: "Omniplanner App (IN PROGRESS)",
        description: "Life planning app with AI assist",
        backDescription: "Leading the implementation of AI assistance",
        linkDescription: "More Info on Senior Project",
        skills: ["React", "JavaScript", "Python"],
        link: "https://www.rose-hulman.edu/career-services/for-recruiters-and-employers/Partnership-Projects/capstone-and-senior-design-projects.html"
    },
    // pc build, heart app, bone fracture recognition, water potability, sudoku solver?, genetic algorithms
];

// Gallery View Functionality
let mainImg = 0;
let prevImg = projects.length - 1;
let nextImg = 1;

function loadGallery() {
    let mainView = document.getElementById("mainView");
    let leftView = document.getElementById("leftView");
    let rightView = document.getElementById("rightView");
    // Find the card front inside mainView and apply the image
    let mainCardFront = mainView.querySelector('.card-front');
    mainCardFront.style.backgroundImage = "url(" + projects[mainImg].image + ")";
    // let linkTag = document.getElementById("linkTag");

    // mainView.style.background = "url(" + projects[mainImg].image + ")";
    mainView.querySelector('.project-details').innerHTML = `
        <h3>${projects[mainImg].title}</h3>
        <p>${projects[mainImg].description}</p>
        <div class="project-skills">
            ${projects[mainImg].skills.map(skill => `<span>${skill}</span>`).join('')}
        </div>
    `;
    // Update the GitHub link on the back of the card
    const mainLink = mainView.querySelector('.project-link');
    if (mainLink) {
        mainLink.setAttribute('href', projects[mainImg].link); // Set GitHub link
    }

    // Update the content of the back of the card (description and GitHub link)
    let mainCardBack = mainView.querySelector('.card-back');
    mainCardBack.querySelector('.back-content').innerHTML = `
        <p class="project-description">${projects[mainImg].backDescription}</p>
        <a href="${projects[mainImg].link}" target="_blank" class="project-link">${projects[mainImg].linkDescription}</a>
    `;

    leftView.style.background = "url(" + projects[prevImg].image + ")";
    leftView.querySelector('.project-details').innerHTML = `
        <h3>${projects[prevImg].title}</h3>
    `;

    rightView.style.background = "url(" + projects[nextImg].image + ")";
    rightView.querySelector('.project-details').innerHTML = `
        <h3>${projects[nextImg].title}</h3>
    `;
}

function scrollRight() {
    prevImg = mainImg;
    mainImg = nextImg;
    nextImg = (nextImg >= projects.length - 1) ? 0 : nextImg + 1;
    loadGallery();
}

function scrollLeft() {
    nextImg = mainImg;
    mainImg = prevImg;
    prevImg = (prevImg === 0) ? projects.length - 1 : prevImg - 1;
    loadGallery();
}

document.getElementById("navRight").addEventListener("click", scrollRight);
document.getElementById("navLeft").addEventListener("click", scrollLeft);
document.getElementById("rightView").addEventListener("click", scrollRight);
document.getElementById("leftView").addEventListener("click", scrollLeft);
document.addEventListener('keyup', function(e) {
    if (e.keyCode === 37) scrollLeft();
    if (e.keyCode === 39) scrollRight();
});

loadGallery();

// Toggle card flip on click
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flip');
    });
    // Ensure the link works without flipping the card
    const link = card.querySelector('.project-link');
    if (link) {
        link.addEventListener('click', (e) => {
            e.stopPropagation();  // Prevent the click from flipping the card
            // window.open(link.href, '_blank');  // Open the link in a new tab
        });
    }
});

// Achievements Carousel JavaScript
let currentIndex = 0;

function moveCarousel(direction) {
    const carousel = document.querySelector('.achievements-carousel');
    const items = document.querySelectorAll('.achievement-card');
    currentIndex -= direction;

    if (currentIndex < 0) {
        currentIndex = items.length - 1;
    } else if (currentIndex >= items.length) {
        currentIndex = 0;
    }

    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

document.addEventListener('DOMContentLoaded', () => {
    const firstItem = document.querySelector('.achievement-card');
    if (firstItem) {
        firstItem.classList.add('active');
    }
    document.querySelector('.carousel-button-left').addEventListener('click', () => moveCarousel(-1));
    document.querySelector('.carousel-button-right').addEventListener('click', () => moveCarousel(1));
});

// Fade-in effect for sections
document.addEventListener('DOMContentLoaded', () => {
    const fadeInElements = document.querySelectorAll('.fade-in');

    function checkVisibility() {
        fadeInElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    checkVisibility(); // Check visibility on page load
    window.addEventListener('scroll', checkVisibility); // Check on scroll
});
