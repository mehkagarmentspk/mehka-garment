const slides = [
    { bg: "#d81b60", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500", price: "#15,000" },
    { bg: "#4e3629", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500", price: "#14,000" },
    { bg: "#212121", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500", price: "#16,000" }
];

let currentIndex = 0;

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    } else if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    const currentSlide = slides[currentIndex];
    document.body.style.backgroundColor = currentSlide.bg;
    document.getElementById("product-img").src = currentSlide.img;
    document.getElementById("product-price").innerText = currentSlide.price;
}
