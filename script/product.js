import * as utils from './utils.js';

const products_container = document.getElementById("products-container");
const sorting_filter = document.getElementById("filter");
const filter_color = document.getElementById("filter-color");
const filter_category = document.getElementById("filter-category");
const search_input = document.getElementById("search");
const search_btn = document.getElementById("search-btn");

const data = await utils.get_data("discription");
const colors = await utils.get_data("colors");
let local_json_data = data;
get_data_list(data);

function get_data_list(data) {
  const data_list = data.map((el, i) => product(el.id, el.title, el.images, el.price));

  products_container.innerHTML = data_list.join("");
  document.getElementById("items").innerText = `${data.length} items`;
}

function product(id, title, images, price) {
  const product = `
  <div class="w-full sm:w-[49%] lg:w-[24%] mb-6">
    <a href="discription.html?id=${encodeURIComponent(id)}">
      <div class="group w-full aspect-[3/4] relative overflow-hidden">
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
    return item.category.toLowerCase().includes(selectedCategory)
  });

  get_data_list(filteredCategoryData);
});

search_btn.addEventListener("click", () => {
  const search_value =search_input.value.toLowerCase();
  
  const filteredCategoryData = local_json_data.filter(item => {
    return item.category.toLowerCase().includes(search_value)
  });

  get_data_list(filteredCategoryData)
})