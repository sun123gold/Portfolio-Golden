// ==========================================
// HERO SECTION
// ==========================================

const heroWordElement = document.querySelector(".hero-word");

if (heroWordElement) {
    const heroWords = [
        "experiences.",
        "products.",
        "brands.",
        "websites."
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeHeroWord() {
        const currentWord = heroWords[wordIndex];

        if (!isDeleting) {
            charIndex += 1;
        } else {
            charIndex -= 1;
        }

        heroWordElement.textContent = currentWord.slice(0, charIndex);

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeHeroWord, 1400);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % heroWords.length;
        }

        const speed = isDeleting ? 55 : 110;
        setTimeout(typeHeroWord, speed);
    }

    typeHeroWord();
}

const heroVisual = document.querySelector(".hero-visual");
const heroVisualCard = document.querySelector(".hero-visual-card");
const heroFloatingCards = document.querySelectorAll(".hero-floating-card");

if (heroVisual && heroVisualCard) {
    heroVisual.addEventListener("pointermove", (event) => {
        const bounds = heroVisual.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        const rotateY = (x - 0.5) * 16;
        const rotateX = (0.5 - y) * 16;
        const translateX = (x - 0.5) * 18;
        const translateY = (y - 0.5) * 18;

        heroVisualCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
        heroVisualCard.style.transition = "transform 0.2s ease-out";

        heroFloatingCards.forEach((card, index) => {
            const offset = index === 0 ? 1 : -1;
            card.style.transform = `translate3d(${(x - 0.5) * 18 * offset}px, ${(y - 0.5) * 18 * offset}px, 0)`;
            card.style.transition = "transform 0.2s ease-out";
        });
    });

    heroVisual.addEventListener("pointerleave", () => {
        heroVisualCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
        heroFloatingCards.forEach((card) => {
            card.style.transform = "translate3d(0, 0, 0)";
        });
    });
}

// ==========================================
// ABOUT SECTION
// ==========================================

const aboutText = document.querySelectorAll(".about-text");
const aboutFocusCard = document.querySelector(".about-focus-card");

if (aboutText.length || aboutFocusCard) {
    const revealInitialState = () => {
        aboutText.forEach((element) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(24px)";
            element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        });

        if (aboutFocusCard) {
            aboutFocusCard.style.opacity = "0";
            aboutFocusCard.style.transform = "translateY(24px)";
            aboutFocusCard.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        }
    };

    revealInitialState();

    const aboutObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    aboutText.forEach((element) => {
        element.classList.add("about-reveal");
        aboutObserver.observe(element);
    });

    if (aboutFocusCard) {
        aboutFocusCard.classList.add("about-reveal");
        aboutObserver.observe(aboutFocusCard);

        aboutFocusCard.addEventListener("pointermove", (event) => {
            const bounds = aboutFocusCard.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width;
            const y = (event.clientY - bounds.top) / bounds.height;

            const rotateY = (x - 0.5) * 12;
            const rotateX = (0.5 - y) * 12;

            aboutFocusCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            aboutFocusCard.style.transition = "transform 0.2s ease-out";
        });

        aboutFocusCard.addEventListener("pointerleave", () => {
            aboutFocusCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    }
}

// ==========================================
// TRUST / SKILLS / SERVICES / EXPERIENCE /
// PROJECTS / CONTACT / FOOTER SECTION
// ==========================================

const revealTargets = document.querySelectorAll(
    "#trust p, #trust h2, #skills .rounded-3xl, #services article, #experience .rounded-3xl, #projects article, #contact .rounded-3xl, footer section, footer a, footer p"
);

if (revealTargets.length) {
    revealTargets.forEach((element, index) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(28px)";
        element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        element.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealTargets.forEach((element) => {
        revealObserver.observe(element);
    });
}

const interactiveCards = document.querySelectorAll(
    "#skills .rounded-3xl, #services article, #projects article, #contact .rounded-3xl"
);

interactiveCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        const rotateY = (x - 0.5) * 10;
        const rotateX = (0.5 - y) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        card.style.transition = "transform 0.2s ease-out";
    });

    card.addEventListener("pointerleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
});

const projectProgress = document.querySelector("#projects .h-full");

if (projectProgress) {
    projectProgress.style.width = "0%";

    requestAnimationFrame(() => {
        projectProgress.style.transition = "width 1.4s ease";
        projectProgress.style.width = "60%";
    });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    // Initialize EmailJS
    if (typeof emailjs !== "undefined") {
        emailjs.init("2OIgzR04vgwPQvXBW");
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.createElement("p");
    formStatus.className = "mt-4 text-sm text-gray-400";
    formStatus.setAttribute("aria-live", "polite");
    contactForm.appendChild(formStatus);

    const originalButtonText = submitButton.innerHTML;

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const companyInput = document.getElementById("company");
        const serviceInput = document.getElementById("service");
        const budgetInput = document.getElementById("budget");
        const messageInput = document.getElementById("message");

        const senderName = nameInput.value.trim();
        const senderEmail = emailInput.value.trim();
        const company = companyInput.value.trim() || "Not specified";
        const service = serviceInput.value || "Not specified";
        const budget = budgetInput.value || "Not specified";
        const message = messageInput.value.trim();

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";
        formStatus.textContent = "Sending your enquiry via email and WhatsApp...";
        formStatus.className = "mt-4 text-sm text-blue-400";

        try {
            // Send email via EmailJS if available
            if (typeof emailjs !== "undefined") {
                await emailjs.send("service_portfolio", "template_portfolio", {
                    to_email: "sundaygolden69@example.com",
                    from_name: senderName,
                    from_email: senderEmail,
                    company: company,
                    service: service,
                    budget: budget,
                    message: message,
                    reply_to: senderEmail
                });
            }

            // Send WhatsApp message
            const whatsappMessage = `Hi Golden, I'm ${senderName}%0A%0ACompany: ${company}%0AService: ${service}%0ABudget: ${budget}%0A%0AMessage: ${message}%0A%0AReply to: ${senderEmail}`;
            const whatsappLink = `https://wa.me/2349053630926?text=${whatsappMessage}`;
            window.open(whatsappLink, "_blank");

            // Success message
            setTimeout(() => {
                formStatus.textContent = `Thanks ${senderName}! Your project enquiry has been sent. I'll get back to you shortly via email or WhatsApp.`;
                formStatus.className = "mt-4 text-sm text-green-400";
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                contactForm.reset();
            }, 800);
        } catch (error) {
            console.error("Error sending form:", error);
            // Still open WhatsApp even if email fails
            const whatsappMessage = `Hi Golden, I'm ${senderName}%0A%0ACompany: ${company}%0AService: ${service}%0ABudget: ${budget}%0A%0AMessage: ${message}%0A%0AReply to: ${senderEmail}`;
            const whatsappLink = `https://wa.me/2349053630926?text=${whatsappMessage}`;
            window.open(whatsappLink, "_blank");
            formStatus.textContent = `Message sent via WhatsApp! Email may have failed. Please try again or check spam.`;
            formStatus.className = "mt-4 text-sm text-yellow-400";
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            contactForm.reset();
        }
    });
}

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ==========================================
// NAVBAR ELEMENTS
// ==========================================

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");
const navbar = document.querySelector("header");

const mobileLinks = document.querySelectorAll(".mobile-link");
const navLinks = document.querySelectorAll(".nav-link");

// ==========================================
// MENU ICONS
// ==========================================

const hamburgerIcon = `
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  `;

const closeIcon = `
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  `;



// ==========================================
// OPEN / CLOSE MOBILE MENU
// ==========================================

function openMenu() {
    mobileMenu.classList.remove("hidden");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    menuIcon.innerHTML = closeIcon;
}

function closeMenu() {
    mobileMenu.classList.add("hidden");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    menuIcon.innerHTML = hamburgerIcon;
}

// ==========================================
// TOGGLE MOBILE MENU
// ==========================================

menuButton.addEventListener("click", () => {

    const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }

});

// ==========================================
// CLOSE MENU WHEN MOBILE LINK IS CLICKED
// ==========================================

mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});

// ==========================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener("click", (event) => {

    const clickedInsideNavbar =
        navbar.contains(event.target);

    const menuIsOpen =
        menuButton.getAttribute("aria-expanded") === "true";

    if (!clickedInsideNavbar && menuIsOpen) {
        closeMenu();
    }

});

// ==========================================
// CLOSE MENU WITH ESCAPE KEY
// ==========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        const menuIsOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        if (menuIsOpen) {
            closeMenu();
            menuButton.focus();
        }

    }

});

// ==========================================
// CLOSE MOBILE MENU WHEN SCREEN BECOMES LARGE
// ==========================================

window.addEventListener("resize", () => {

    if (window.innerWidth >= 1024) {
        closeMenu();
    }

});

// ==========================================
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});

// ==========================================
// NAVBAR EFFECT ON SCROLL
// ==========================================

function updateNavbar() {

    if (window.scrollY > 30) {

        navbar.classList.add(
            "bg-[#070707]/95",
            "shadow-lg",
            "shadow-black/20"
        );

        navbar.classList.remove(
            "bg-[#070707]/80"
        );

    } else {

        navbar.classList.remove(
            "bg-[#070707]/95",
            "shadow-lg",
            "shadow-black/20"
        );

        navbar.classList.add(
            "bg-[#070707]/80"
        );

    }

}

window.addEventListener(
    "scroll",
    updateNavbar
);

// Run once when page loads
updateNavbar();

// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================

const sections = document.querySelectorAll(
    "section[id]"
);

const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentSection =
                        entry.target.getAttribute("id");


                    navLinks.forEach((link) => {

                        const linkTarget =
                            link.getAttribute("href");


                        // Remove active styling
                        link.classList.remove(
                            "text-white"
                        );

                        link.classList.add(
                            "text-gray-400"
                        );


                        // Add active styling
                        if (
                            linkTarget ===
                            `#${currentSection}`
                        ) {

                            link.classList.remove(
                                "text-gray-400"
                            );

                            link.classList.add(
                                "text-white"
                            );

                        }

                    });

                }

            });

        },
        {
            threshold: 0.35
        }
    );

sections.forEach((section) => {

    sectionObserver.observe(section);

});

const mobileNavLinks =
    document.querySelectorAll(
        ".mobile-link"
    );


    const mobileSectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentSection =
                        entry.target.getAttribute("id");


                    mobileNavLinks.forEach((link) => {

                        const linkTarget =
                            link.getAttribute("href");


                        link.classList.remove(
                            "bg-blue-500/10",
                            "text-blue-400"
                        );


                        link.classList.add(
                            "text-gray-400"
                        );


                        if (
                            linkTarget ===
                            `#${currentSection}`
                        ) {

                            link.classList.remove(
                                "text-gray-400"
                            );

                            link.classList.add(
                                "bg-blue-500/10",
                                "text-blue-400"
                            );

                        }

                    });

                }

            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach((section) => {

    mobileSectionObserver.observe(section);

});

