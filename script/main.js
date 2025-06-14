import * as utils from './utils.js';

const carousel = document.getElementById("carousel");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let card = null;
let cardWidth = null;

// Dynamically calculate the width of one product card (including gap)
setTimeout(() => {
  card = carousel.querySelector(".group");
  cardWidth = card.offsetWidth + 16; // 16px = gap-4
}, 1000);

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


// data handling
const home_data = await utils.get_data("home");
get_data_list(home_data);

function get_data_list(data) {
  const data_list = data.map((el, i) => product(el));

  carousel.innerHTML = data_list.join("");
}

function product(product_data) {
  const product = `
    <div class="group w-[480px] h-[800px] shrink-0">
      <a href="discription.html?id=${encodeURIComponent(product_data.id)}">
      <div class="group w-full h-[740px]">
        <img class="group-hover:hidden w-[100%] h-[100%] duration-700 ease-in-out" src=${product_data.images[0]} alt="img-1" data-id=${product_data.id}>
        <img class="hidden group-hover:block w-[100%] h-[100%] duration-700 ease-in-out" src=${product_data.images[1]} alt="img-1" data-id=data-id=${product_data.id}>
      </div>
      </a>
      <div class="w-full h-[60px]">
        <span class="h-[30px] flex justify-between items-center">
        <h4 class="uppercase text-xs font-semibold cursor-pointer" data-id="1">${product_data.title}</h4>
        <p class="text-xs font-semibold">$${product_data.price}</p>
        </span>
        <span class="h-[30px] flex justify-between items-center hidden group-hover:flex">
          <button class="text-xs uppercase font-semibold">Add <i class="ri-add-line"></i></button>
          <button class="text-xs uppercase font-semibold"><i class="ri-bookmark-line"></i></button>
          </span>
      </div>
    </div>
  `;

  return product;
}