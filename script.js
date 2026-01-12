/* ----------------- MODAL CALENDLY ----------------- */
const modal = document.getElementById("calendarModal");
const closeBtn = document.querySelector(".close");

// Get ALL buttons that open Calendly
const calendarButtons = document.querySelectorAll(".open-calendar");

calendarButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";

    // Close mobile menu if open
    if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      burger.classList.remove("toggle");
    }
  });
});

// Close modal (X button)
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// Close when clicking outside modal
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

/* ----------------- BURGER & MOBILE MENU ----------------- */
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active"); // slide menu
  burger.classList.toggle("toggle"); // X animation
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active"); // close menu
    burger.classList.remove("toggle"); // reset burger
  });
});

/* ----------------- SMOOTH SCROLL ----------------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

/* ----------------- CONTACT FORM ----------------- */
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxdA6bSYEXA_P6u8RPA4c2hZvuPPf07vWrYyQrSLqv3lzCOj6BRJJKeaV_Z_zMdIKlQYQ/exec";

const form = document.getElementById("contactform");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  msg.innerHTML = "Sending message...";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      msg.innerHTML = "✅ Message sent successfully!";
      form.reset();
      setTimeout(() => (msg.innerHTML = ""), 3000);
    })
    .catch((error) => {
      console.error("Form submit error:", error);
      msg.innerHTML = "❌ Failed to send message. Try again later.";
    });
});

/* ----------------- ANTI-SPAM ----------------- */
const formStartTime = Date.now();

document.querySelector("form").addEventListener("submit", function (e) {
  const honeypot = document.getElementById("company").value;
  const timeSpent = (Date.now() - formStartTime) / 1000;

  if (honeypot !== "" || timeSpent < 5) {
    e.preventDefault();
    return false;
  }

  const spamWords = [
    "telegram",
    "whatsapp",
    "million messages",
    "bulk",
    "automatically generated",
    "feedback form",
    "proposal",
    "send messages",
  ];

  const msgVal = document.getElementById("message").value.toLowerCase();
  if (spamWords.some((word) => msgVal.includes(word))) {
    e.preventDefault();
    alert("Message blocked.");
    return false;
  }
});

/* ----------------- TESTIMONIAL SLIDER ----------------- */
const slider = document.getElementById("testimonialSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const scrollAmount = 300;

nextBtn?.addEventListener("click", () => {
  slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
});
prevBtn?.addEventListener("click", () => {
  slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;

    // FORCE instant jump (no smooth scroll)
    document.documentElement.style.scrollBehavior = "auto";
    target.scrollIntoView({ behavior: "auto" });

    // restore default (optional, safe)
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = "";
    }, 0);
  });
});
