/**
 * MOHAMMAD ABUSHEHADA — PORTFOLIO JAVASCRIPT
 * Interactive 0-100% Preloader + Enter Button, Smart Cursor with Labels, 3D Tilt Cards, Magnetic Buttons & Scroll Progress
 */

document.addEventListener("DOMContentLoaded", () => {
  // ─── 1. SCROLL PROGRESS BAR ────────────────────────────────────
  const progressBar = document.getElementById("scroll-progress-bar");
  window.addEventListener("scroll", () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressPercent = (scrollTop / (scrollHeight || 1)) * 100;
    progressBar.style.width = `${Math.min(progressPercent, 100)}%`;
  }, { passive: true });

  // ─── 2. INTERACTIVE PRELOADER (0% -> 100% + ENTER BUTTON) ─────────
  const preloader = document.getElementById("site-preloader");
  const preloaderBar = document.getElementById("preloader-bar");
  const preloaderPercent = document.getElementById("preloader-percent");
  const preloaderStatusRow = document.getElementById("preloader-status-row");
  const preloaderEnterBtn = document.getElementById("preloader-enter-btn");

  function enterPortfolio() {
    if (!preloader || preloader.classList.contains("loaded")) return;
    preloader.classList.add("loaded");

    // Sequential reveal for hero elements
    const heroReveals = document.querySelectorAll(".hero-section .reveal");
    heroReveals.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("is-visible");
      }, index * 100);
    });
  }

  if (preloader && preloaderBar && preloaderPercent) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 9) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        preloaderBar.style.width = "100%";
        preloaderPercent.textContent = "100%";

        setTimeout(() => {
          if (preloaderStatusRow) preloaderStatusRow.style.opacity = "0";
          if (preloaderEnterBtn) {
            preloaderEnterBtn.classList.add("is-visible");
            preloaderEnterBtn.focus();
          }
        }, 180);
      } else {
        preloaderBar.style.width = `${progress}%`;
        preloaderPercent.textContent = `${progress}%`;
      }
    }, 22);

    if (preloaderEnterBtn) {
      preloaderEnterBtn.addEventListener("click", enterPortfolio);
    }

    // Keyboard trigger (Enter or Space)
    window.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && preloaderEnterBtn && preloaderEnterBtn.classList.contains("is-visible")) {
        enterPortfolio();
      }
    });
  }

  // ─── 3. INTERACTIVE SMART CURSOR WITH LABELS ──────────────────────
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");
  const cursorLabel = document.getElementById("cursor-label");

  if (cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isVisible = false;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      if (!isVisible) {
        cursorDot.style.opacity = "1";
        cursorRing.style.opacity = "1";
        isVisible = true;
      }
    });

    document.addEventListener("mouseleave", () => {
      cursorDot.style.opacity = "0";
      cursorRing.style.opacity = "0";
      isVisible = false;
    });

    function updateCursorRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(updateCursorRing);
    }
    requestAnimationFrame(updateCursorRing);

    // Dynamic contextual cursor hover labels
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, .project-card, .skill-card, .info-card, .cert-item, .filter-tab, .theme-toggle-btn"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover");
        const customLabel = el.getAttribute("data-cursor");
        if (customLabel && cursorLabel) {
          cursorLabel.textContent = customLabel;
          document.body.classList.add("has-label");
        }
      });

      el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover");
        document.body.classList.remove("has-label");
        if (cursorLabel) cursorLabel.textContent = "";
      });
    });
  }

  // ─── 4. 3D CARD TILT & DYNAMIC LIGHT EFFECT (60fps) ─────────────
  const tiltCards = document.querySelectorAll(".js-tilt-card");
  if (window.matchMedia("(pointer: fine)").matches) {
    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }

  // ─── 5. MAGNETIC BUTTONS ATTRACTION ────────────────────────────
  const magneticButtons = document.querySelectorAll(".js-magnetic-btn");
  if (window.matchMedia("(pointer: fine)").matches) {
    magneticButtons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate3d(0, 0, 0)";
      });
    });
  }

  // ─── 6. THEME SWITCHER (Dark / Light) ──────────────────────────
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
    }, 380);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  initTheme();

  // ─── 7. MOUSE SPOTLIGHT GLOW ───────────────────────────────────
  const spotlight = document.getElementById("cursor-spotlight");
  if (spotlight && window.matchMedia("(pointer: fine)").matches) {
    let spotMouseX = window.innerWidth / 2;
    let spotMouseY = window.innerHeight / 2;
    let spotCurrentX = spotMouseX;
    let spotCurrentY = spotMouseY;
    let isSpotActive = false;

    window.addEventListener("mousemove", (e) => {
      spotMouseX = e.clientX;
      spotMouseY = e.clientY;
      if (!isSpotActive) {
        spotlight.style.opacity = "1";
        isSpotActive = true;
      }
    });

    document.addEventListener("mouseleave", () => {
      spotlight.style.opacity = "0";
      isSpotActive = false;
    });

    function renderSpotlight() {
      spotCurrentX += (spotMouseX - spotCurrentX) * 0.12;
      spotCurrentY += (spotMouseY - spotCurrentY) * 0.12;
      spotlight.style.transform = `translate3d(${spotCurrentX}px, ${spotCurrentY}px, 0)`;
      requestAnimationFrame(renderSpotlight);
    }
    requestAnimationFrame(renderSpotlight);
  }

  // ─── 8. NAVBAR SCROLL & MOBILE CLOSE ───────────────────────────
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

  // ─── 9. INTERSECTION OBSERVER REVEALS ──────────────────────────
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
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    reveals.forEach((item) => revealObserver.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add("is-visible"));
  }

  // ─── 10. PROJECT CATEGORY FILTERING ────────────────────────────
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

  // ─── 11. CONTACT FORM ASYNC SUBMISSION ─────────────────────────
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');

      if (window.location.protocol === "file:") {
        if (formStatus) {
          formStatus.className = "form-feedback is-visible is-success";
          formStatus.textContent = "Running locally. In production, this delivers messages via FormSubmit.";
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
          formStatus.textContent = "Thank you! Your message has been sent successfully.";
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
          formStatus.textContent = "Direct submission encountered an error. Opening email client fallback...";
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
