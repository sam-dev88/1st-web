const slider = document.getElementById("testimonialSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const scrollAmount = 300; // Adjust scroll distance

nextBtn.addEventListener("click", () => {
  slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active"); // toggle menu
  burger.classList.toggle("toggle"); // toggle X animation
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

/*---------- Contact Form ------------*/
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxdA6bSYEXA_P6u8RPA4c2hZvuPPf07vWrYyQrSLqv3lzCOj6BRJJKeaV_Z_zMdIKlQYQ/exec";

const form = document.getElementById("contactform");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  msg.innerHTML = "Sending message...";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`); // ✅ fixed
      }

      msg.innerHTML = "✅ Message sent successfully!";
      form.reset();
      setTimeout(() => {
        msg.innerHTML = "";
      }, 3000);
    })
    .catch((error) => {
      console.error("Form submit error:", error);
      msg.innerHTML = "❌ Failed to send message. Try again later.";
    });
});
