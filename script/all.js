// modals
const help_modal = document.getElementById("help-modal");
const login_modal = document.getElementById("login-modal");
const bag_modal = document.getElementById("bag-modal");
const usd_modal = document.getElementById("usd-modal");
const btns = document.querySelectorAll(".btn");

btns.forEach((btn) => {
  btn.addEventListener("click", (el) => {
    let target = btn.classList;

    if (target.contains("help-btn")) {
      help_modal.classList.remove("hidden");
    } else if (target.contains("help-modal-close")) {
      help_modal.classList.add("hidden");
    } else if (target.contains("bag-wishlist-btn")) {
      bag_modal.classList.remove("hidden");
    } else if (target.contains("bag-modal-close")) {
      bag_modal.classList.add("hidden");
    } else if (target.contains("usd-btn")) {
      usd_modal.classList.remove("hidden");
    } else if (target.contains("usd-modal-close")) {
      usd_modal.classList.add("hidden");
    } else if (target.contains("add-to-cart")) {
      console.log(target)
    } else {
      console.log(target);
    }
  });
});

const tabs = document.querySelectorAll(".tab-link");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {

    tabs.forEach((t) => t.classList.remove("text-blue-600", "border-blue-600"));
    
    contents.forEach((c) => c.classList.add("hidden"));

    tab.classList.add("text-blue-600", "border-blue-600");

    const target = tab.getAttribute("data-tab");
    document.getElementById(`tab-${target}`).classList.remove("hidden");
  });
});

// cart info load
const bag_container = document.getElementById("tab-bag");
const cart_count = document.getElementById("cart-count");
let cart_data = await get_cart_data();
const cart_list = map_data(cart_data);

document.getElementById("tab-bag").innerHTML = cart_list.join("");

cart_count.innerText = cart_data.length;

async function get_cart_data() {
  const res = await fetch("http://localhost:3000/cart");
  const data = await res.json();

  return data;
}

function map_data(data) {
  const cart_list = data.map((el, i) => cart(el.title, el.images, el.price))

  return cart_list
}

function cart(title, images, price) {
  const cart = `
  <div class="w-full h-fit flex justify-between mb-2">
    <div class="w-[15%]">
      <img src=${images[0]} class="w-full">
    </div>
    <div class="w-[60%]">
      <h3 class="text-lg">${title}</h3>
      <p class="text-base font-bold">$${price}.00</p>
    </div>
    <div class="w-[10%] flex flex-col justify-between items-center">
      <div class="w-full flex justify-around">
        <button class="text-base"><i class="ri-bookmark-line"></i></button>
        <button class="text-base"><i class="ri-delete-bin-7-line"></i></button>
      </div>
      <select class="w-full p-1" name="qty" id="qty">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      </div>
  </div> 
  `

  return cart;
}

console.log(document.querySelectorAll("#qty"))