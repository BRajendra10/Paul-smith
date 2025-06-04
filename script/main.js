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

const tabs = document.querySelectorAll(".tab-link");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active styles from all tabs
    tabs.forEach((t) => t.classList.remove("text-blue-600", "border-blue-600"));
    // Hide all content
    contents.forEach((c) => c.classList.add("hidden"));

    // Add active style to current tab
    tab.classList.add("text-blue-600", "border-blue-600");

    // Show related content
    const target = tab.getAttribute("data-tab");
    document.getElementById(`tab-${target}`).classList.remove("hidden");
  });
});

// // modals
// const help_modal = document.getElementById("help-modal");
// const login_modal = document.getElementById("login-modal");
// const bag_modal = document.getElementById("bag-modal");
// const usd_modal = document.getElementById("usd-modal");

// const btns = document.querySelectorAll(".btn");

// btns.forEach((btn, i) => {
//   btn.addEventListener("click", () => {
//     let target = btn.classList;
//     if (target.contains("help-btn")) {
//       help_modal.classList.remove("hidden");
//     } else if (target.contains("help-modal-close")) {
//       help_modal.classList.add("hidden");
//     } else if (target.contains("login-btn")) {
//       login_modal.classList.remove("hidden");
//     } else if (target.contains("login-modal-close")) {
//       login_modal.classList.add("hidden");
//     } else if (target.contains("bag-wishlist-btn")) {
//       bag_modal.classList.remove("hidden");
//     } else if (target.contains("bag-modal-close")) {
//       bag_modal.classList.add("hidden");
//     } else if (target.contains("usd-btn")) {//
//       usd_modal.classList.remove("hidden");
//     } else if (target.contains("usd-modal-close")) {
//       usd_modal.classList.add("hidden");
//     } else {
//       console.log(target);
//     }
//     // console.log(btn.classList);
//   });
// });

// document.getElementById("help-btn").addEventListener("click",()=>{
//   help_modal.classList.remove("hidden");
// })
// document.getElementById("help-modal-close").addEventListener("click",()=>{
//   help_modal.classList.add("hidden");
// })
// document.getElementById("login-btn").addEventListener("click",()=>{
//   login_modal.classList.remove("hidden");
// })
// document.getElementById("login-modal-close").addEventListener("click",()=>{
//   login_modal.classList.add("hidden");
// })
// document.getElementById("bag-wishlist-btn").addEventListener("click", () => {
//   bag_modal.classList.remove("hidden");
// });
// document.getElementById("bag-modal-close").addEventListener("click", () => {
//   bag_modal.classList.add("hidden");
// });
// document.getElementById("usd-btn").addEventListener("click", () => {
//   usd_modal.classList.remove("hidden");
// });
// document.getElementById("usd-modal-close").addEventListener("click", () => {
//   usd_modal.classList.add("hidden");
// });

// data handling
let json_data = [];

(function () {
  fetch("http://localhost:3000/home")
    .then((res) => res.json())
    .then((data) => {
      json_data = data;
      get_data_list(data);
    })
    .catch((err) => console.log(err));
})();

function get_data_list(data) {
  const data_list = data.map((el, i) => product(el));

  carousel.innerHTML = data_list.join("");
}

function product(product_data) {
  const product = `
    <div class="group w-[480px] h-[800px] shrink-0">
      <div class="group w-full h-[740px]">
        <img class="group-hover:hidden w-[100%] h-[100%] duration-700 ease-in-out" src=${product_data.images[0]} alt="img-1" data-id=${product_data.id}>
        <img class="hidden group-hover:block w-[100%] h-[100%] duration-700 ease-in-out" src=${product_data.images[1]} alt="img-1" data-id=data-id=${product_data.id}>
      </div>
      <div class="w-full h-[60px]">
        <span class="h-[30px] flex justify-between items-center">
        <h4 class="uppercase text-xs font-semibold cursor-pointer" data-id="1">${product_data.title}</h4>
        <p class="text-xs font-semibold">${product_data.price}</p>
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

// document.addEventListener("click", (el) =>{
//   console.log(el.target.getAttribute("data-id"));
// })
