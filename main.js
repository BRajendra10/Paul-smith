const carousel = document.getElementById("carousel");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

// Dynamically calculate the width of one product card (including gap)
const card = carousel.querySelector(".group");
const cardWidth = card.offsetWidth + 16; // 16px = gap-4

next.addEventListener("click", () => {
  carousel.scrollBy({
    left: cardWidth,
    behavior: "smooth",
  });
});

prev.addEventListener("click", () => {
  carousel.scrollBy({
    left: -cardWidth,
    behavior: "smooth",
  });
});

// accordion
document.querySelectorAll(".accordion-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const icon = button.querySelector(".arrow-icon");

    const isOpen = !content.classList.contains("hidden");
    content.classList.toggle("hidden");

    // Swap icon class
    icon.classList.toggle("ri-arrow-down-s-line", isOpen);
    icon.classList.toggle("ri-arrow-up-s-line", !isOpen);
  });
});

(function () {
  fetch("http://localhost:3000/info")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
})();
