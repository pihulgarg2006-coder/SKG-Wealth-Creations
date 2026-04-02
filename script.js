// ================================================
// SKG WEALTH CREATIONS — index.js
// Plain Vanilla JavaScript
// ================================================


// ---- TYPING ANIMATION (like 7.12 IIMB Animation) ----

let sentences = ["Our Mission.", "Your Future.", "Your Success.", "Your Growth."];

const animatedText = document.querySelector("#animated-text");
const cursor = document.querySelector("#cursor");

let sentenceCounter = 0;
let characterCounter = 0;

document.addEventListener("DOMContentLoaded", startAnimation);

function startAnimation() {
    if (animatedText) {
        setInterval(blinkerFunction, 500);
        addCharacters();
    }

    setupNavbar();
    setupHamburger();
    setupScrollFadeIn();
    setupStatCounters();
    setupContactForm();
}

function addCharacters() {
    if (characterCounter < sentences[sentenceCounter].length) {
        animatedText.textContent += sentences[sentenceCounter][characterCounter];
        characterCounter++;
        setTimeout(addCharacters, 100);
    } else {
        setTimeout(removeCharacter, 2000);
    }
}

function removeCharacter() {
    if (characterCounter >= 0) {
        animatedText.textContent = animatedText.textContent.slice(0, characterCounter);
        characterCounter--;
        setTimeout(removeCharacter, 40);
    } else {
        characterCounter = 0;
        sentenceCounter = (sentenceCounter + 1) % sentences.length;
        setTimeout(addCharacters, 300);
    }
}

function blinkerFunction() {
    if (cursor) {
        cursor.classList.toggle("hidden");
    }
}


// ---- NAVBAR SCROLL EFFECT ----

function setupNavbar() {
    const navbar = document.querySelector("#navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}


// ---- HAMBURGER MOBILE MENU ----

function setupHamburger() {
    const hamburger = document.querySelector("#hamburger");
    const navLinks = document.querySelector("#nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("open");
            navLinks.classList.toggle("open");
        });

        let allNavItems = document.querySelectorAll(".nav-item");
        for (let item of allNavItems) {
            item.addEventListener("click", function () {
                hamburger.classList.remove("open");
                navLinks.classList.remove("open");
            });
        }
    }
}


// ---- SCROLL FADE-IN ANIMATION ----

function setupScrollFadeIn() {
    let fadeElements = document.querySelectorAll(".service-card, .stat-box, #why-list li, .info-item, .two-col-grid > div");

    for (let el of fadeElements) {
        el.classList.add("fade-in");
    }

    let observer = new IntersectionObserver(function (entries) {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        }
    }, { threshold: 0.1 });

    for (let el of fadeElements) {
        observer.observe(el);
    }
}


// ---- STATS COUNTER ANIMATION ----

function setupStatCounters() {
    let statNumbers = document.querySelectorAll(".stat-number");

    let statsObserver = new IntersectionObserver(function (entries) {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                let el = entry.target;
                let target = parseInt(el.getAttribute("data-target"));
                animateCounter(el, target);
                statsObserver.unobserve(el);
            }
        }
    }, { threshold: 0.5 });

    for (let el of statNumbers) {
        statsObserver.observe(el);
    }
}

function animateCounter(el, target) {
    let current = 0;
    let duration = 1500;
    let steps = 60;
    let increment = target / steps;
    let interval = duration / steps;

    let timer = setInterval(function () {
        current += increment;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, interval);
}


// ---- CONTACT FORM VALIDATION ----

function setupContactForm() {
    let submitBtn = document.querySelector("#submit-btn");

    if (submitBtn) {
        submitBtn.addEventListener("click", function () {
            validateAndSubmitForm();
        });
    }
}

function validateAndSubmitForm() {
    let isValid = true;

    let nameInput = document.querySelector("#name");
    let phoneInput = document.querySelector("#phone");
    let serviceInput = document.querySelector("#service");

    let nameError = document.querySelector("#name-error");
    let phoneError = document.querySelector("#phone-error");
    let serviceError = document.querySelector("#service-error");

    // Clear previous errors
    nameError.textContent = "";
    phoneError.textContent = "";
    serviceError.textContent = "";

    // Validate name
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = "Please enter your full name.";
        isValid = false;
    }

    // Validate phone (10-digit Indian number)
    let phoneRegex = /^[6-9]\d{9}$/;
    let cleanPhone = phoneInput.value.replace(/[\s\-]/g, "");
    if (!phoneRegex.test(cleanPhone)) {
        phoneError.textContent = "Please enter a valid 10-digit mobile number.";
        isValid = false;
    }

    // Validate service selection
    if (serviceInput.value === "") {
        serviceError.textContent = "Please select a service.";
        isValid = false;
    }

    // If all valid, show success
    if (isValid) {
        document.querySelector("#contact-form").style.display = "none";
        document.querySelector("#form-success").style.display = "block";
    }
}