const form = document.getElementById("contactForm");
if (form) {
    const status = document.getElementById("formStatus");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        const email = form.elements.email.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { status.textContent = "Please enter a valid email address."; status.dataset.state = "error"; form.elements.email.focus(); return; }
        const button = form.querySelector("button[type=submit]");
        button.disabled = true; button.textContent = "Checking details..."; status.textContent = "This contact form is currently in frontend demo mode. No message was sent."; status.dataset.state = "demo";
        setTimeout(() => { button.disabled = false; button.textContent = "Send enquiry"; form.reset(); }, 700);
    });
}
