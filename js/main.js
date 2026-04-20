const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const projectTabs = document.querySelectorAll(".project-tab");
const projectEntries = document.querySelectorAll(".project-entry");

function setProjectFilter(filter) {
  projectTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.filter === filter);
  });

  projectEntries.forEach((entry) => {
    const shouldShow = entry.dataset.category === filter;
    entry.classList.toggle("is-hidden", !shouldShow);
  });
}

projectTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setProjectFilter(tab.dataset.filter);
  });
});

setProjectFilter("frontend");

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (formStatus) {
      formStatus.className = "form-status is-visible";
      formStatus.textContent = "Sending message...";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/mohammadabushehada2@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || result.success === "false") {
        throw new Error(result.message || "Unable to send the message right now.");
      }

      if (formStatus) {
        formStatus.className = "form-status is-visible is-success";
        formStatus.textContent = "Your message was sent successfully.";
      }

      contactForm.reset();
    } catch (error) {
      const name = (formData.get("name") || "").toString().trim();
      const email = (formData.get("email") || "").toString().trim();
      const message = (formData.get("message") || "").toString().trim();
      const subject = encodeURIComponent(`Portfolio message from ${name || "Website Visitor"}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      if (formStatus) {
        formStatus.className = "form-status is-visible is-error";
        formStatus.textContent = "Direct sending failed on this browser. Opening your email app as a fallback.";
      }

      window.location.href = `mailto:mohammadabushehada2@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
  });
}
