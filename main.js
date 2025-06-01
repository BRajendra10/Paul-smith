const carousel = document.getElementById("carousel");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

// Dynamically calculate the width of one product card (including gap)
const card = carousel.querySelector(".group");
const cardWidth = card.offsetWidth + 16; // 16px = gap-4

next.addEventListener("click", () => {
  carousel.scrollBy({
    left: cardWidth,
    behavior: "smooth"
  });
});

prev.addEventListener("click", () => {
  carousel.scrollBy({
    left: -cardWidth,
    behavior: "smooth"
  });
});
