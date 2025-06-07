const products_container = document.getElementById("products-container");
const sorting_filter = document.getElementById("filter");
const filter_color = document.getElementById("filter-color");
const filter_category = document.getElementById("filter-category");

const data = await get_data();
let local_json_data = data;

get_data_list(data);

document.getElementById("items").innerText = `${data.length} items`;

async function get_data() {
  const res = await fetch("http://localhost:3000/discription");
  const data = await res.json();

  return data
}

async function get_colors_data() {
  const res = await fetch("http://localhost:3000/colors");
  const data = await res.json();

  return data;
}

function get_data_list(data) {
  const data_list = data.map((el, i) => product(el.id, el.title, el.images, el.price));

  products_container.innerHTML = data_list.join("");
}

function product(id, title, images, price) {
  const product = `
  <div class="w-full sm:w-[49%] lg:w-[24%] mb-6">
    <a href="discription.html?id=${encodeURIComponent(id)}">
      <div class="w-full aspect-[3/4] relative overflow-hidden">
        <img 
          class="group-hover:hidden absolute top-0 left-0 w-full h-full object-cover duration-700 ease-in-out" 
          src="${images[0]}" 
          alt="img-1" 
          id="${id}">
          
        <img 
          class="hidden group-hover:block absolute top-0 left-0 w-full h-full object-cover duration-700 ease-in-out" 
          src="${images[1]}" 
          alt="img-2" 
          id="${id}">
      </div>
    </a>

    <div class="w-full h-fit mt-2 px-1">
      <div class="flex justify-between items-start flex-wrap gap-y-1">
        <h4 class="w-[75%] text-sm sm:text-xs uppercase font-semibold cursor-pointer" data-id="${id}">
          ${title}
        </h4>
        <p class="text-sm sm:text-xs font-semibold">
          $${price}
        </p>
      </div>

      <div class="flex justify-between items-center mt-2">
        <button type="button" class="text-sm uppercase font-semibold cursor-pointer">Add <i class="ri-add-line"></i></button>
        <button type="button" class="text-sm uppercase font-semibold cursor-pointer"><i class="ri-bookmark-line"></i></button>
      </div>
    </div>
  </div>
`;

  return product;
}

sorting_filter.addEventListener("change", () => {
  let selected = sorting_filter.value;
  let sorted_data = [...local_json_data]; 

  if (selected === "low to high") {
    sorted_data.sort((a, b) => a.price - b.price);
  } else if (selected === "hight to low") {
    sorted_data.sort((a, b) => b.price - a.price);
  } else if (selected === "Women") {
    sorted_data = sorted_data.filter((el, i) => el.title.includes("Women's"))
  } else if (selected === "Men") {
    sorted_data = sorted_data.filter((el, i) => el.title.includes("Men's"))
  } else {
    sorted_data = [...local_json_data];
  }

  get_data_list(sorted_data);
});

const colors = await get_colors_data();

filter_color.addEventListener("change", () => {
  let selected = filter_color.value;
  let sorted_data = [...local_json_data]; // clone
  let selectedColorNames = [];

  const colorGroup = colors.find((color) => color.name.toLowerCase() === selected.toLowerCase());

  if (colorGroup) {
    colorGroup.color.forEach((el) => {
      selectedColorNames.push(el);
    })

    sorted_data = local_json_data.filter((item) =>
      selectedColorNames.includes(item.color)
    );
  }

  get_data_list(sorted_data);
});

filter_category.addEventListener("change", () => {
  const selectedCategory = filter_category.value.toLowerCase();

  const filteredCategoryData = local_json_data.filter(item => {
    console.log(item.category.toLowerCase().includes(selectedCategory));
    return item.category.toLowerCase().includes(selectedCategory)
  });

  console.log("Filtered Data:", filteredCategoryData);

  get_data_list(filteredCategoryData);
});

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