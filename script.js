/* =========================================================
   MEHKA GARMENTS — INTERACTIVE 3D EXPERIENCE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     PRODUCT DATA
     ======================================================= */

  const products = [
    {
      name: "Classic Black Shirt",
      category: "PREMIUM COLLECTION",
      price: "PKR 2,499",
      image: "assets/images/product1.jpg",
      bg: "#e8e1d5"
    },

    {
      name: "Signature Check Shirt",
      category: "NEW ARRIVAL",
      price: "PKR 2,499",
      image: "assets/images/product2.jpg",
      bg: "#dfe4df"
    },

    {
      name: "Essential White Shirt",
      category: "ESSENTIAL COLLECTION",
      price: "PKR 2,299",
      image: "assets/images/product3.jpg",
      bg: "#e9e7e0"
    }
  ];


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const loader = document.querySelector(".page-loader");

  const hero = document.querySelector(".hero");

  const heroImage =
    document.querySelector("#heroProductImage");

  const productName =
    document.querySelector("#productName");

  const productCategory =
    document.querySelector("#productCategory");

  const productPrice =
    document.querySelector("#productPrice");

  const productCount =
    document.querySelector("#heroProductCount");

  const heroProduct =
    document.querySelector(".hero-product");

  const productShadow =
    document.querySelector(".product-shadow");

  const prevButton =
    document.querySelector(".prev-product");

  const nextButton =
    document.querySelector(".next-product");

  const dots =
    document.querySelectorAll(".dot");


  /* =======================================================
     LOADER
     ======================================================= */

  window.addEventListener("load", () => {

    setTimeout(() => {

      loader?.classList.add("loaded");

      document.body.classList.remove("no-scroll");

    }, 900);

  });


  /* =======================================================
     PRODUCT STATE
     ======================================================= */

  let currentProduct = 0;

  let isChanging = false;


  /* =======================================================
     PRODUCT SWITCH FUNCTION
     ======================================================= */

  function changeProduct(index, direction = 1) {

    if (isChanging) return;

    if (index < 0) {
      index = products.length - 1;
    }

    if (index >= products.length) {
      index = 0;
    }

    if (index === currentProduct) return;

    isChanging = true;

    const product = products[index];


    /* EXIT ANIMATION */

    heroProduct.style.transition =
      "transform .45s cubic-bezier(.22,1,.36,1), opacity .35s ease";

    heroProduct.style.opacity = "0";

    heroProduct.style.transform =
      `translate(calc(-50% + ${direction * 70}px), -50%) rotateY(${direction * -15}deg) scale(.94)`;


    setTimeout(() => {

      currentProduct = index;


      /* UPDATE IMAGE */

      heroImage.src = product.image;

      heroImage.alt = product.name;


      /* UPDATE TEXT */

      productName.textContent =
        product.name;

      productCategory.textContent =
        product.category;

      productPrice.textContent =
        product.price;


      /* UPDATE NUMBER */

      productCount.textContent =
        String(products.length).padStart(2, "0");


      /* UPDATE BACKGROUND */

      hero.style.backgroundColor =
        product.bg;


      /* UPDATE DOTS */

      dots.forEach((dot, i) => {

        dot.classList.toggle(
          "active",
          i === currentProduct
        );

      });


      /* ENTER FROM OPPOSITE SIDE */

      heroProduct.style.transition = "none";

      heroProduct.style.opacity = "0";

      heroProduct.style.transform =
        `translate(calc(-50% + ${direction * -70}px), -50%) rotateY(${direction * 15}deg) scale(.94)`;


      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          heroProduct.style.transition =
            "transform 1s cubic-bezier(.22,1,.36,1), opacity .55s ease";

          heroProduct.style.opacity = "1";

          heroProduct.style.transform =
            "translate(-50%, -50%) rotateY(-7deg) scale(1)";

          isChanging = false;

        });

      });

    }, 400);

  }


  /* =======================================================
     NEXT / PREVIOUS
     ======================================================= */

  nextButton?.addEventListener("click", () => {

    changeProduct(
      currentProduct + 1,
      1
    );

  });


  prevButton?.addEventListener("click", () => {

    changeProduct(
      currentProduct - 1,
      -1
    );

  });


  /* =======================================================
     DOT NAVIGATION
     ======================================================= */

  dots.forEach((dot) => {

    dot.addEventListener("click", () => {

      const index =
        Number(dot.dataset.product);

      const direction =
        index > currentProduct ? 1 : -1;

      changeProduct(
        index,
        direction
      );

    });

  });


  /* =======================================================
     AUTO PRODUCT CHANGE
     ======================================================= */

  let autoPlay = setInterval(() => {

    changeProduct(
      currentProduct + 1,
      1
    );

  }, 6500);


  function resetAutoPlay() {

    clearInterval(autoPlay);

    autoPlay = setInterval(() => {

      changeProduct(
        currentProduct + 1,
        1
      );

    }, 6500);

  }


  nextButton?.addEventListener(
    "click",
    resetAutoPlay
  );

  prevButton?.addEventListener(
    "click",
    resetAutoPlay
  );


  /* =======================================================
     MOUSE 3D PRODUCT MOVEMENT
     ======================================================= */

  if (window.innerWidth > 800) {

    hero.addEventListener("mousemove", (event) => {

      const rect =
        hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left)
        / rect.width;

      const y =
        (event.clientY - rect.top)
        / rect.height;


      const rotateY =
        (x - .5) * 12;

      const rotateX =
        (y - .5) * -8;


      heroProduct.style.transform =
        `translate(-50%, -50%)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;


      /* SHADOW MOVEMENT */

      productShadow.style.transform =
        `translateX(calc(-50% + ${(x - .5) * 30}px))
         scaleX(${1 + Math.abs(x - .5) * .15})`;

    });


    hero.addEventListener("mouseleave", () => {

      heroProduct.style.transform =
        "translate(-50%, -50%) rotateY(-7deg)";

      productShadow.style.transform =
        "translateX(-50%)";

    });

  }


  /* =======================================================
     SCROLL PARALLAX
     ======================================================= */

  let ticking = false;

  function updateScroll() {

    const scrollY =
      window.scrollY;

    const heroHeight =
      hero.offsetHeight;

    const progress =
      Math.min(
        scrollY / heroHeight,
        1
      );


    if (scrollY <= heroHeight) {

      const moveY =
        progress * 100;

      const scale =
        1 - progress * .08;

      const rotate =
        progress * 8;


      heroProduct.style.setProperty(
        "--scroll-progress",
        progress
      );


      heroProduct.style.transform =
        `translate(-50%, calc(-50% + ${moveY}px))
         rotateY(${-7 + rotate}deg)
         scale(${scale})`;


      /* Hero text moves slightly faster */

      if (window.innerWidth > 700) {

        const heroCopy =
          document.querySelector(".hero-copy");

        if (heroCopy) {

          heroCopy.style.transform =
            `translateY(calc(-50% + ${progress * -70}px))`;

          heroCopy.style.opacity =
            String(1 - progress * 1.2);

        }

      }

    }


    ticking = false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          updateScroll
        );

        ticking = true;

      }

    },
    { passive: true }
  );


  /* =======================================================
     REVEAL ON SCROLL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: .12
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });


  /* =======================================================
     PRODUCT CARD 3D TILT
     ======================================================= */

  const cards =
    document.querySelectorAll(
      "[data-tilt]"
    );


  cards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        if (window.innerWidth <= 800) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateY =
          ((x - centerX) / centerX) * 4;

        const rotateX =
          ((centerY - y) / centerY) * 4;


        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-5px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "";

      }
    );

  });


  /* =======================================================
     QUICK VIEW
     ======================================================= */

  const quickView =
    document.querySelector("#quickView");

  const quickImage =
    document.querySelector("#quickImage");

  const quickName =
    document.querySelector("#quickName");

  const quickCategory =
    document.querySelector("#quickCategory");

  const quickPrice =
    document.querySelector("#quickPrice");

  const quickClose =
    document.querySelector(".quick-close");


  const viewButtons =
    document.querySelectorAll(
      ".view-product"
    );


  viewButtons.forEach((button, index) => {

    button.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        const product =
          products[index];

        quickImage.src =
          product.image;

        quickImage.alt =
          product.name;

        quickName.textContent =
          product.name;

        quickCategory.textContent =
          product.category;

        quickPrice.textContent =
          product.price;

        quickView.classList.add(
          "open"
        );

        document.body.classList.add(
          "no-scroll"
        );

      }
    );

  });


  function closeQuickView() {

    quickView.classList.remove(
      "open"
    );

    document.body.classList.remove(
      "no-scroll"
    );

  }


  quickClose?.addEventListener(
    "click",
    closeQuickView
  );


  quickView?.addEventListener(
    "click",
    (event) => {

      if (
        event.target === quickView
      ) {

        closeQuickView();

      }

    }
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeQuickView();

      }

    }
  );


  /* =======================================================
     SIZE BUTTONS
     ======================================================= */

  const sizeButtons =
    document.querySelectorAll(
      ".sizes button"
    );


  sizeButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        sizeButtons.forEach((item) => {

          item.classList.remove(
            "selected"
          );

        });

        button.classList.add(
          "selected"
        );

      }
    );

  });


  /* =======================================================
     MAGNETIC BUTTONS
     ======================================================= */

  const magneticButtons =
    document.querySelectorAll(
      ".magnetic"
    );


  magneticButtons.forEach((button) => {

    button.addEventListener(
      "mousemove",
      (event) => {

        if (window.innerWidth <= 800) {
          return;
        }

        const rect =
          button.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const moveX =
          (x - rect.width / 2) * .12;

        const moveY =
          (y - rect.height / 2) * .12;


        button.style.transform =
          `translate(${moveX}px, ${moveY}px)`;

      }
    );


    button.addEventListener(
      "mouseleave",
      () => {

        button.style.transform =
          "";

      }
    );

  });


  /* =======================================================
     CUSTOM CURSOR
     ======================================================= */

  const cursor =
    document.querySelector(".cursor");

  const cursorRing =
    document.querySelector(".cursor-ring");


  if (
    cursor &&
    cursorRing &&
    window.innerWidth > 800
  ) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    window.addEventListener(
      "mousemove",
      (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left =
          `${mouseX}px`;

        cursor.style.top =
          `${mouseY}px`;

      }
    );


    function animateCursor() {

      ringX +=
        (mouseX - ringX) * .12;

      ringY +=
        (mouseY - ringY) * .12;


      cursorRing.style.left =
        `${ringX}px`;

      cursorRing.style.top =
        `${ringY}px`;


      requestAnimationFrame(
        animateCursor
      );

    }


    animateCursor();


    const interactiveElements =
      document.querySelectorAll(
        "a, button, .product-card"
      );


    interactiveElements.forEach(
      (element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            cursorRing.classList.add(
              "active"
            );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            cursorRing.classList.remove(
              "active"
            );

          }
        );

      }
    );

  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const menuButton =
    document.querySelector(".menu-btn");

  const navLinks =
    document.querySelector(".nav-links");


  menuButton?.addEventListener(
    "click",
    () => {

      menuButton.classList.toggle(
        "open"
      );

      navLinks?.classList.toggle(
        "mobile-open"
      );

    }
  );


  /* =======================================================
     KEYBOARD PRODUCT CONTROL
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "ArrowRight"
      ) {

        changeProduct(
          currentProduct + 1,
          1
        );

        resetAutoPlay();

      }

      if (
        event.key === "ArrowLeft"
      ) {

        changeProduct(
          currentProduct - 1,
          -1
        );

        resetAutoPlay();

      }

    }
  );


  /* =======================================================
     TOUCH SWIPE
     ======================================================= */

  let touchStartX = 0;

  let touchEndX = 0;


  hero.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    { passive: true }
  );


  hero.addEventListener(
    "touchend",
    (event) => {

      touchEndX =
        event.changedTouches[0].screenX;


      const distance =
        touchEndX - touchStartX;


      if (Math.abs(distance) < 50) {
        return;
      }


      if (distance < 0) {

        changeProduct(
          currentProduct + 1,
          1
        );

      } else {

        changeProduct(
          currentProduct - 1,
          -1
        );

      }


      resetAutoPlay();

    },
    { passive: true }
  );


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  if (products[0]) {

    hero.style.backgroundColor =
      products[0].bg;

    heroImage.src =
      products[0].image;

    heroImage.alt =
      products[0].name;

    productName.textContent =
      products[0].name;

    productCategory.textContent =
      products[0].category;

    productPrice.textContent =
      products[0].price;

  }


  /* =======================================================
     CONSOLE
     ======================================================= */

  console.log(
    "%c MEHKA GARMENTS ",
    "background:#171717;color:#fff;padding:8px 14px;font-weight:bold;"
  );

  console.log(
    "Premium 3D Fashion Experience Loaded."
  );

});
