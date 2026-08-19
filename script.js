/* =========================================================
   MEHKA GARMENTS
   PREMIUM 3D / CINEMATIC INTERACTIONS
   SCRIPT.JS — VERSION 1
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01 — LOADER
    ===================================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hide");
            }

        }, 900);

    });


    /* =====================================================
       02 — HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector("header");

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       03 — MOBILE MENU
    ===================================================== */

    const menuButton = document.querySelector(".menu");
    const nav = document.querySelector("nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("open");

            menuButton.classList.toggle("active");

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuButton.classList.remove("active");

            });

        });

    }


    /* =====================================================
       04 — SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       05 — SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* =====================================================
       06 — PRODUCT 3D TILT
    ===================================================== */

    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        product.addEventListener("mousemove", event => {

            if (window.innerWidth <= 800) return;

            const rect =
                product.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -3;


            const rotateY =
                ((x - centerX) / centerX) * 3;


            product.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale3d(1.015,1.015,1.015)`;

        });


        product.addEventListener("mouseleave", () => {

            product.style.transform =
                "";

        });

    });


    /* =====================================================
       07 — BUTTON MAGNETIC EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach(button => {

        button.addEventListener("mousemove", event => {

            if (window.innerWidth <= 800) return;

            const rect =
                button.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            button.style.transform =
                `translate(${x * 0.08}px,
                           ${y * 0.08}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });


    /* =====================================================
       08 — HERO PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroRing =
        document.querySelector(".hero-ring");


    window.addEventListener("scroll", () => {

        if (!hero || !heroRing) return;

        const scroll =
            window.scrollY;


        if (scroll < window.innerHeight * 1.2) {

            heroRing.style.transform =
                `translateY(calc(-50% + ${scroll * 0.12}px))
                 rotate(${scroll * 0.04}deg)`;

        }

    }, {
        passive: true
    });


    /* =====================================================
       09 — PRODUCT IMAGE PARALLAX
    ===================================================== */

    const productImages =
        document.querySelectorAll(
            ".product-image img"
        );


    window.addEventListener("scroll", () => {

        productImages.forEach(image => {

            const rect =
                image.getBoundingClientRect();


            const viewport =
                window.innerHeight;


            if (
                rect.top < viewport &&
                rect.bottom > 0
            ) {

                const progress =
                    (viewport - rect.top) /
                    (viewport + rect.height);


                const movement =
                    (progress - 0.5) * 18;


                image.style.transform =
                    `scale(1.045)
                     translateY(${movement}px)`;

            }

        });

    }, {
        passive: true
    });


    /* =====================================================
       10 — MOUSE LIGHT / GLOW
    ===================================================== */

    const glowElements =
        document.querySelectorAll(
            ".product, .feature-image"
        );


    glowElements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth <= 800) return;

                const rect =
                    element.getBoundingClientRect();


                const x =
                    ((event.clientX -
                        rect.left) /
                        rect.width) * 100;


                const y =
                    ((event.clientY -
                        rect.top) /
                        rect.height) * 100;


                element.style.background =
                    `radial-gradient(
                        circle at ${x}% ${y}%,
                        rgba(214,189,124,.06),
                        transparent 38%
                    )`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.background = "";

            }
        );

    });


    /* =====================================================
       11 — PRODUCT MODAL
    ===================================================== */

    const modal =
        document.querySelector(".modal");

    const modalBox =
        document.querySelector(".modal-box");

    const closeButton =
        document.querySelector(".close");


    const modalTitle =
        document.querySelector(
            ".modal-content h2"
        );


    const modalImage =
        document.querySelector(
            ".modal-image img"
        );


    const modalPrice =
        document.querySelector(
            ".modal-price"
        );


    function openModal(product) {

        if (!modal) return;


        const title =
            product.dataset.title ||
            product.querySelector("h3")?.textContent ||
            "Mehka Garment";


        const price =
            product.dataset.price ||
            product.querySelector(".price")?.textContent ||
            "";


        const image =
            product.dataset.image ||
            product.querySelector("img")?.src ||
            "";


        if (modalTitle) {
            modalTitle.textContent =
                title.trim();
        }


        if (modalPrice) {
            modalPrice.textContent =
                price.trim();
        }


        if (modalImage && image) {
            modalImage.src = image;
        }


        modal.classList.add("open");

        document.body.style.overflow =
            "hidden";

    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("open");

        document.body.style.overflow =
            "";

    }


    products.forEach(product => {

        product.addEventListener("click", () => {

            openModal(product);

        });

    });


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       12 — CURSOR GLOW
    ===================================================== */

    const cursorGlow =
        document.createElement("div");


    cursorGlow.className =
        "cursor-glow";


    cursorGlow.style.cssText = `
        position:fixed;
        width:180px;
        height:180px;
        border-radius:50%;
        pointer-events:none;
        z-index:9997;
        background:radial-gradient(
            circle,
            rgba(214,189,124,.07),
            transparent 68%
        );
        transform:translate(-50%,-50%);
        opacity:0;
        transition:opacity .4s ease;
    `;


    document.body.appendChild(
        cursorGlow
    );


    window.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth <= 800) {

                cursorGlow.style.opacity =
                    "0";

                return;

            }


            cursorGlow.style.opacity =
                "1";


            cursorGlow.style.left =
                `${event.clientX}px`;


            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );


    /* =====================================================
       13 — IMAGE LOAD ANIMATION
    ===================================================== */

    document.querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "loaded"
                    );

                }
            );

        });


    /* =====================================================
       14 — BUTTON RIPPLE
    ===================================================== */

    document.querySelectorAll(".btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const ripple =
                        document.createElement(
                            "span"
                        );


                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );


                    ripple.style.cssText = `
                        position:absolute;
                        width:${size}px;
                        height:${size}px;
                        left:${event.clientX - rect.left - size / 2}px;
                        top:${event.clientY - rect.top - size / 2}px;
                        border-radius:50%;
                        background:rgba(255,255,255,.22);
                        pointer-events:none;
                        transform:scale(0);
                        animation:buttonRipple .65s ease-out forwards;
                    `;


                    button.appendChild(
                        ripple
                    );


                    setTimeout(() => {

                        ripple.remove();

                    }, 700);

                }
            );

        });


    /* =====================================================
       15 — RIPPLE ANIMATION STYLE
    ===================================================== */

    const rippleStyle =
        document.createElement("style");


    rippleStyle.textContent = `
        @keyframes buttonRipple {
            to {
                transform:scale(2.2);
                opacity:0;
            }
        }

        img.loaded {
            animation:imageLoaded .8s cubic-bezier(.16,1,.3,1);
        }

        @keyframes imageLoaded {
            from {
                opacity:0;
                transform:scale(1.025);
            }

            to {
                opacity:1;
                transform:scale(1);
            }
        }
    `;


    document.head.appendChild(
        rippleStyle
    );


    /* =====================================================
       16 — ACTIVE SECTION DETECTION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            'nav a[href^="#"]'
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            navLinks.forEach(
                                link => {

                                    link.classList
                                        .remove(
                                            "active"
                                        );

                                }
                            );


                            const active =
                                document.querySelector(
                                    `nav a[href="#${entry.target.id}"]`
                                );


                            if (active) {

                                active.classList
                                    .add(
                                        "active"
                                    );

                            }

                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }


    /* =====================================================
       17 — PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );


    console.log(
        "MEHKA GARMENTS — Premium Experience Loaded"
    );

});
