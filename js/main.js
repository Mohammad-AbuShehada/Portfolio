/**
 * MOHAMMAD ABUSHEHADA — PORTFOLIO JAVASCRIPT
 * Smooth Theme Switcher, Spotlight Effect, Project Filters & Form Handling
 */

document.addEventListener("DOMContentLoaded", () => {
  // ─── 1. THEME SWITCHER (Dark / Light) ──────────────────────────
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlRoot = document.documentElement;

  function initTheme() {
    const savedTheme = localStorage.getItem("ma-theme");
    if (savedTheme) {
      if (savedTheme === "light") {
        htmlRoot.classList.add("light");
      } else {
        htmlRoot.classList.remove("light");
      }
    } else {
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      if (prefersLight) {
        htmlRoot.classList.add("light");
      }
    }
  }

  function toggleTheme() {
    htmlRoot.classList.add("theming");
    const isLight = htmlRoot.classList.toggle("light");
    localStorage.setItem("ma-theme", isLight ? "light" : "dark");

    setTimeout(() => {
      htmlRoot.classList.remove("theming");
    }, 400);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  initTheme();

  // ─── 2. MOUSE SPOTLIGHT GLOW (Lightweight 60fps) ───────────────
  const spotlight = document.getElementById("cursor-spotlight");
  if (spotlight && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMoving = false;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        spotlight.style.opacity = "1";
        isMoving = true;
      }
    });

    document.addEventListener("mouseleave", () => {
      spotlight.style.opacity = "0";
      isMoving = false;
    });

    function renderSpotlight() {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(renderSpotlight);
    }
    requestAnimationFrame(renderSpotlight);
  }

  // ─── 3. NAVBAR SCROLL EFFECT & MOBILE CLOSE ────────────────────
  const navbar = document.getElementById("main-navbar");
  const navCollapse = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navCollapse && navCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // ─── 4. INTERSECTION OBSERVER REVEALS ──────────────────────────
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
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
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    reveals.forEach((item) => revealObserver.observe(item));
  } else {
    // Fallback if IntersectionObserver is unsupported
    reveals.forEach((item) => item.classList.add("is-visible"));
  }

  // ─── 5. PROJECT CATEGORY FILTERING ────────────────────────────
  const filterTabs = document.querySelectorAll(".filter-tab");
  const projectItems = document.querySelectorAll(".project-item");

  function setProjectFilter(category) {
    filterTabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.filter === category);
    });

    projectItems.forEach((item) => {
      const itemCat = item.dataset.category;
      if (category === "all" || itemCat === category) {
        item.classList.remove("is-hidden");
      } else {
        item.classList.add("is-hidden");
      }
    });
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter || "all";
      setProjectFilter(filter);
    });
  });

  // ─── 6. CONTACT FORM ASYNC SUBMISSION ──────────────────────────
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');

      // Local file preview bypass
      if (window.location.protocol === "file:") {
        if (formStatus) {
          formStatus.className = "form-feedback is-visible is-success";
          formStatus.textContent = "Form is running locally. In production, this sends an email via FormSubmit.";
        }
        return;
      }

      event.preventDefault();

      if (formStatus) {
        formStatus.className = "form-feedback is-visible";
        formStatus.textContent = "Sending your message...";
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = `<span>Sending...</span>`;
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
          throw new Error(result.message || "Failed to send message.");
        }

        if (formStatus) {
          formStatus.className = "form-feedback is-visible is-success";
          formStatus.textContent = "Thank you! Your message was sent successfully. I will get back to you soon.";
        }

        contactForm.reset();
      } catch (error) {
        const name = (formData.get("name") || "").toString().trim();
        const email = (formData.get("email") || "").toString().trim();
        const message = (formData.get("message") || "").toString().trim();
        const subject = encodeURIComponent(`Portfolio inquiry from ${name || "Visitor"}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        if (formStatus) {
          formStatus.className = "form-feedback is-visible is-error";
          formStatus.textContent = "Direct sending encountered an issue. Redirecting to your email client as fallback...";
        }

        setTimeout(() => {
          window.location.href = `mailto:mohammadabushehada2@gmail.com?subject=${subject}&body=${body}`;
        }, 1200);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = `<span>Send Message</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
        }
      }
    });
  }
});
