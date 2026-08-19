/* =========================================================
   MEHKA GARMENTS
   Premium Smooth Animation System
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     1. PAGE LOADER
  --------------------------------------------------------- */

  document.body.classList.add("page-ready");

  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });


  /* ---------------------------------------------------------
     2. SMOOTH SCROLL
  --------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });


  /* ---------------------------------------------------------
     3. NAVBAR SCROLL EFFECT
  --------------------------------------------------------- */

  const navbar =
    document.querySelector("nav") ||
    document.querySelector(".navbar") ||
    document.querySelector("header");

  function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  updateNavbar();


  /* ---------------------------------------------------------
     4. SCROLL REVEAL ANIMATION
  --------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".reveal, .fade-up, .animate, .product-card, .category-card, section"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* ---------------------------------------------------------
     5. PRODUCT 3D TILT
  --------------------------------------------------------- */

  const productCards = document.querySelectorAll(
    ".product-card, .product, .card"
  );

  productCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -4;

      const rotateY =
        ((x - centerX) / centerX) * 4;

      card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-6px)`;

    });

    card.addEventListener("mouseleave", () => {

      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

  });


  /* ---------------------------------------------------------
     6. IMAGE PARALLAX
  --------------------------------------------------------- */

  const parallaxImages = document.querySelectorAll(
    ".parallax img, .hero img, .hero-image img"
  );

  window.addEventListener("scroll", () => {

    const scrollPosition = window.scrollY;

    parallaxImages.forEach(img => {

      const rect = img.getBoundingClientRect();

      if (
        rect.top < window.innerHeight &&
        rect.bottom > 0
      ) {

        const movement =
          (window.innerHeight / 2 - rect.top) * 0.025;

        img.style.transform =
          `translate3d(0, ${movement}px, 0)`;

      }

    });

  }, {
    passive: true
  });


  /* ---------------------------------------------------------
     7. BUTTON CLICK EFFECT
  --------------------------------------------------------- */

  const buttons = document.querySelectorAll(
    "button, .btn, .button, .shop-btn, .cta"
  );

  buttons.forEach(button => {

    button.addEventListener("click", function (e) {

      const ripple = document.createElement("span");

      ripple.classList.add("click-ripple");

      const rect =
        this.getBoundingClientRect();

      ripple.style.left =
        `${e.clientX - rect.left}px`;

      ripple.style.top =
        `${e.clientY - rect.top}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 700);

    });

  });


  /* ---------------------------------------------------------
     8. MAGNETIC BUTTON EFFECT
  --------------------------------------------------------- */

  const magneticButtons =
    document.querySelectorAll(
      ".magnetic, .shop-btn, .cta"
    );

  magneticButtons.forEach(button => {

    button.addEventListener("mousemove", e => {

      const rect =
        button.getBoundingClientRect();

      const x =
        e.clientX - rect.left - rect.width / 2;

      const y =
        e.clientY - rect.top - rect.height / 2;

      button.style.transform =
        `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });

    button.addEventListener("mouseleave", () => {

      button.style.transform =
        "translate(0, 0)";

    });

  });


  /* ---------------------------------------------------------
     9. MOBILE MENU
  --------------------------------------------------------- */

  const menuButton =
    document.querySelector(".menu-toggle") ||
    document.querySelector(".hamburger") ||
    document.querySelector("#menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu") ||
    document.querySelector(".nav-links") ||
    document.querySelector(".menu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      menuButton.classList.toggle("active");

      mobileMenu.classList.toggle("active");

      document.body.classList.toggle("menu-open");

    });

  }


  /* ---------------------------------------------------------
     10. CLOSE MOBILE MENU AFTER CLICK
  --------------------------------------------------------- */

  document.querySelectorAll(
    ".mobile-menu a, .nav-links a, .menu a"
  ).forEach(link => {

    link.addEventListener("click", () => {

      if (mobileMenu) {
        mobileMenu.classList.remove("active");
      }

      if (menuButton) {
        menuButton.classList.remove("active");
      }

      document.body.classList.remove("menu-open");

    });

  });


  /* ---------------------------------------------------------
     11. CUSTOM CURSOR GLOW
  --------------------------------------------------------- */

  const cursorGlow =
    document.createElement("div");

  cursorGlow.className = "cursor-glow";

  document.body.appendChild(cursorGlow);

  document.addEventListener("mousemove", e => {

    cursorGlow.style.left =
      `${e.clientX}px`;

    cursorGlow.style.top =
      `${e.clientY}px`;

  });


  /* ---------------------------------------------------------
     12. HOVER GLOW ON INTERACTIVE ELEMENTS
  --------------------------------------------------------- */

  const interactiveElements =
    document.querySelectorAll(
      "a, button, .product-card, .category-card"
    );

  interactiveElements.forEach(element => {

    element.addEventListener("mouseenter", () => {
      document.body.classList.add("hovering");
    });

    element.addEventListener("mouseleave", () => {
      document.body.classList.remove("hovering");
    });

  });


  /* ---------------------------------------------------------
     13. PRODUCT IMAGE ZOOM
  --------------------------------------------------------- */

  const productImages =
    document.querySelectorAll(
      ".product-card img, .product img"
    );

  productImages.forEach(img => {

    img.addEventListener("mouseenter", () => {

      img.style.transition =
        "transform 0.6s cubic-bezier(.2,.8,.2,1)";

      img.style.transform =
        "scale(1.06)";

    });

    img.addEventListener("mouseleave", () => {

      img.style.transform =
        "scale(1)";

    });

  });


  /* ---------------------------------------------------------
     14. ACTIVE NAVIGATION LINK
  --------------------------------------------------------- */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll(
      'nav a[href^="#"], .navbar a[href^="#"]'
    );

  window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 180;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") ===
        `#${currentSection}`
      ) {
        link.classList.add("active");
      }

    });

  }, {
    passive: true
  });


  /* ---------------------------------------------------------
     15. HERO TEXT PARALLAX
  --------------------------------------------------------- */

  const heroText =
    document.querySelector(
      ".hero-content, .hero-text"
    );

  window.addEventListener("scroll", () => {

    if (!heroText) return;

    const scroll =
      window.scrollY;

    if (scroll < window.innerHeight) {

      heroText.style.transform =
        `translateY(${scroll * 0.12}px)`;

      heroText.style.opacity =
        Math.max(
          0,
          1 - scroll / 650
        );

    }

  }, {
    passive: true
  });


  /* ---------------------------------------------------------
     16. NUMBER / COUNTER ANIMATION
  --------------------------------------------------------- */

  const counters =
    document.querySelectorAll(
      "[data-count]"
    );

  const counterObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const counter =
            entry.target;

          const target =
            parseInt(
              counter.dataset.count,
              10
            );

          let current = 0;

          const duration = 1600;

          const start =
            performance.now();

          function animateCounter(time) {

            const progress =
              Math.min(
                (time - start) / duration,
                1
              );

            current =
              Math.floor(
                progress * target
              );

            counter.textContent =
              current.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(
                animateCounter
              );
            }

          }

          requestAnimationFrame(
            animateCounter
          );

          counterObserver.unobserve(counter);

        });

      },
      {
        threshold: 0.6
      }
    );

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });


  /* ---------------------------------------------------------
     17. IMAGE LAZY LOADING
  --------------------------------------------------------- */

  document.querySelectorAll("img").forEach(img => {

    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

  });


  /* ---------------------------------------------------------
     18. ESC KEY — CLOSE MENU
  --------------------------------------------------------- */

  document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

      if (mobileMenu) {
        mobileMenu.classList.remove("active");
      }

      if (menuButton) {
        menuButton.classList.remove("active");
      }

      document.body.classList.remove(
        "menu-open"
      );

    }

  });


  /* ---------------------------------------------------------
     19. PAGE TRANSITION
  --------------------------------------------------------- */

  document.querySelectorAll(
    'a:not([target="_blank"])'
  ).forEach(link => {

    link.addEventListener("click", function (e) {

      const href =
        this.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      if (
        href.startsWith("http") &&
        !href.includes(window.location.hostname)
      ) {
        return;
      }

      e.preventDefault();

      document.body.classList.add(
        "page-exit"
      );

      setTimeout(() => {
        window.location.href = href;
      }, 350);

    });

  });


  /* ---------------------------------------------------------
     20. SCROLL PROGRESS
  --------------------------------------------------------- */

  const progressBar =
    document.createElement("div");

  progressBar.className =
    "scroll-progress";

  document.body.appendChild(
    progressBar
  );

  window.addEventListener("scroll", () => {

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.width =
      `${progress}%`;

  }, {
    passive: true
  });


  /* ---------------------------------------------------------
     21. CONSOLE MESSAGE
  --------------------------------------------------------- */

  console.log(
    "%c MEHKA GARMENTS ",
    "font-size:20px;font-weight:bold;"
  );

  console.log(
    "Premium fashion experience loaded."
  );

});
