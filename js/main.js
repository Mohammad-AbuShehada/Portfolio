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

  // ─── 12. INTERACTIVE 3D HOLOGRAPHIC GEOMETRY ENGINE (60fps) ────
  const canvas = document.getElementById("hero-particle-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    // 3D Geometry: Golden Icosahedron + Orbiting Satellites
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    const edges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [1, 9], [1, 8], [1, 7],
      [2, 11], [2, 4], [2, 3], [2, 6], [2, 10],
      [3, 4], [3, 9], [3, 8], [3, 6],
      [4, 5], [4, 9], [4, 11],
      [5, 9], [5, 11],
      [6, 7], [6, 8], [6, 10],
      [7, 8], [7, 10],
      [8, 9],
      [10, 11]
    ];

    // Scale vertices
    const radius = Math.min(width, height) * (window.innerWidth < 768 ? 0.28 : 0.22);
    const vertices = baseVertices.map(([x, y, z]) => {
      const len = Math.hypot(x, y, z);
      return { x: (x / len) * radius, y: (y / len) * radius, z: (z / len) * radius };
    });

    // Add orbital 3D satellites
    const satelliteCount = window.innerWidth < 768 ? 16 : 28;
    const satellites = [];
    for (let i = 0; i < satelliteCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phiAngle = (Math.random() - 0.5) * Math.PI;
      const dist = radius * (1.2 + Math.random() * 0.9);
      satellites.push({
        x: dist * Math.cos(phiAngle) * Math.cos(theta),
        y: dist * Math.sin(phiAngle),
        z: dist * Math.cos(phiAngle) * Math.sin(theta),
        speed: (Math.random() * 0.006 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        orbitRadius: dist
      });
    }

    // 3D Rotation State & Inertia
    let rotX = 0.3;
    let rotY = 0.4;
    let velX = 0.003;
    let velY = 0.005;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let shockwave = 0;

    function rotate3D(v, rx, ry) {
      // Rotate around X
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const y1 = v.y * cosX - v.z * sinX;
      const z1 = v.y * sinX + v.z * cosX;

      // Rotate around Y
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const x2 = v.x * cosY + z1 * sinY;
      const z2 = -v.x * sinY + z1 * cosY;

      return { x: x2, y: y1, z: z2 };
    }

    function project3D(v, cx, cy) {
      const fov = 450;
      const zOffset = 380;
      const scale = fov / (fov + v.z + zOffset);
      return {
        x: cx + v.x * scale,
        y: cy + v.y * scale,
        scale: scale,
        z: v.z
      };
    }

    function render3D() {
      ctx.clearRect(0, 0, width, height);

      // Center of 3D universe: positioned towards the right side on desktop
      const cx = window.innerWidth < 992 ? width * 0.5 : width * 0.68;
      const cy = height * 0.5;

      // Inertia update
      if (!isDragging) {
        rotX += velX;
        rotY += velY;
        velX *= 0.98;
        velY *= 0.98;
        if (Math.abs(velX) < 0.002) velX = 0.002;
        if (Math.abs(velY) < 0.003) velY = 0.003;
      }

      // Decay shockwave
      if (shockwave > 0) shockwave *= 0.94;

      // Rotate and Project Core Vertices
      const projected = vertices.map(v => {
        const pulse = 1 + shockwave * 0.25;
        const expanded = { x: v.x * pulse, y: v.y * pulse, z: v.z * pulse };
        const rotated = rotate3D(expanded, rotX, rotY);
        return project3D(rotated, cx, cy);
      });

      // Draw Core 3D Edges with Depth Shading
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.08, Math.min(0.55, 0.32 + avgZ / (radius * 3)));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(212, 163, 115, ${alpha})`;
        ctx.lineWidth = Math.max(0.6, (p1.scale + p2.scale) * 0.85);
        ctx.stroke();
      });

      // Draw Core 3D Vertices
      projected.forEach(p => {
        const nodeAlpha = Math.max(0.2, Math.min(0.9, 0.5 + p.z / (radius * 2)));
        const nodeSize = Math.max(1.8, 3.2 * p.scale);

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 163, 115, ${nodeAlpha})`;
        ctx.fill();

        // Subtle glow on closer vertices
        if (p.z > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeSize * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 163, 115, ${nodeAlpha * 0.22})`;
          ctx.fill();
        }
      });

      // Orbit and Draw 3D Satellites
      satellites.forEach(s => {
        // Orbital drift
        const cosS = Math.cos(s.speed);
        const sinS = Math.sin(s.speed);
        const nextX = s.x * cosS - s.z * sinS;
        const nextZ = s.x * sinS + s.z * cosS;
        s.x = nextX;
        s.z = nextZ;

        const rotated = rotate3D(s, rotX * 0.8, rotY * 0.8);
        const p = project3D(rotated, cx, cy);
        const alpha = Math.max(0.1, Math.min(0.7, 0.4 + p.z / (radius * 3)));

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, 2 * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 183, 141, ${alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(render3D);
    }

    // 3D Drag & Touch Controls
    const heroSection = canvas.parentElement;
    heroSection.addEventListener("mousedown", (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      velY = dx * 0.004;
      velX = dy * 0.004;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Touch support for mobile
    heroSection.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      velY = dx * 0.004;
      velX = dy * 0.004;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchend", () => {
      isDragging = false;
    });

    // Click / Tap 3D Pulse
    heroSection.addEventListener("click", () => {
      shockwave = 1.0;
    });

    window.addEventListener("resize", () => {
      if (heroSection) {
        width = canvas.width = heroSection.offsetWidth;
        height = canvas.height = heroSection.offsetHeight;
      }
    });

    render3D();
  }

  // ─── 13. FLOATING BACK TO TOP WITH PROGRESS RING ───────────────
  const backToTopBtn = document.getElementById("back-to-top-btn");
  const progressCircle = document.getElementById("progress-ring-circle");
  const circumference = 2 * Math.PI * 20; // 125.66

  if (backToTopBtn && progressCircle) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progressPercent = Math.min((scrollTop / (scrollHeight || 1)) * 100, 100);

      // Update ring offset
      const offset = circumference - (circumference * progressPercent) / 100;
      progressCircle.style.strokeDashoffset = `${offset}`;

      // Toggle button visibility
      if (scrollTop > 280) {
        backToTopBtn.classList.add("is-visible");
      } else {
        backToTopBtn.classList.remove("is-visible");
      }
    }, { passive: true });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ─── 14. NAVBAR SCROLLSPY ACTIVE LINK ──────────────────────────
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const navLink = document.querySelector(`.navbar-nav a[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  }, { passive: true });
});
