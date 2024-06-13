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
// Highlight active section in the sidebar based on scroll position
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar-nav ul li a");

    function setActiveLink() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove("active"));
        navLinks[index].classList.add("active");
    }

    setActiveLink();
    window.addEventListener("scroll", setActiveLink);
});

AOS.init({
    duration: 800, // Duration of animation in milliseconds
    once: true,    // Whether animation should happen only once
});

// document.addEventListener('DOMContentLoaded', () => {
//     const track = document.querySelector('.carousel-track');
//     const slides = Array.from(track.children);
//     const nextButton = document.querySelector('.carousel-button-right');
//     const prevButton = document.querySelector('.carousel-button-left');
//     const slideWidth = slides[0].getBoundingClientRect().width;

//     // Arrange the slides next to each other
//     const setSlidePosition = (slide, index) => {
//         slide.style.left = slideWidth * index + 'px';
//     };
//     slides.forEach(setSlidePosition);

//     const moveToSlide = (track, currentSlide, targetSlide) => {
//         track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
//         currentSlide.classList.remove('current-slide');
//         targetSlide.classList.add('current-slide');
//     };

//     // When I click left, move slides to the left
//     prevButton.addEventListener('click', e => {
//         const currentSlide = track.querySelector('.current-slide');
//         const prevSlide = currentSlide.previousElementSibling;

//         if (prevSlide) {
//             moveToSlide(track, currentSlide, prevSlide);
//         }
//     });

//     // When I click right, move slides to the right
//     nextButton.addEventListener('click', e => {
//         const currentSlide = track.querySelector('.current-slide');
//         const nextSlide = currentSlide.nextElementSibling;

//         if (nextSlide) {
//             moveToSlide(track, currentSlide, nextSlide);
//         }
//     });

//     // Set the first slide as the current slide
//     slides[0].classList.add('current-slide');
// });
$(document).ready(function(){
    $('.achievements-carousel').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true, // Enables navigation dots
        arrows: true, // Enables navigation arrows
        prevArrow: '.carousel-button-left',
        nextArrow: '.carousel-button-right',
        autoplay: true, // Automatically cycles through slides
        autoplaySpeed: 5000, // Time each slide is shown in milliseconds
    });
});









