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
  // console.log(id, title, images[0], price)
  const product = `
  <div class="group w-full sm:w-[49%] lg:w-[24%] mb-6">
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

    <div class="w-full mt-2 px-1">
      <div class="flex justify-between items-start flex-wrap gap-y-1">
        <h4 class="w-[75%] text-sm sm:text-xs uppercase font-semibold cursor-pointer" data-id="${id}">
          ${title}
        </h4>
        <p class="text-sm sm:text-xs font-semibold">
          $${price}
        </p>
      </div>

      <div class="flex justify-between items-center mt-2 hidden group-hover:flex">
        <button class="text-xs uppercase font-semibold">Add <i class="ri-add-line"></i></button>
        <button class="text-xs uppercase font-semibold"><i class="ri-bookmark-line"></i></button>
      </div>
    </div>
  </div>
`;

  return product;
}

sorting_filter.addEventListener("change", () => {
  let selected = sorting_filter.value;
  let sorted_data = [...local_json_data]; // Clone original array

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
  const selectedCategory = filter_category.value.toLowerCase(); // Normalize value

  // Filter matching category data
  const filteredCategoryData = local_json_data.filter(item => {
    console.log(item.category.toLowerCase().includes(selectedCategory));
    return item.category.toLowerCase().includes(selectedCategory)
  });

  // Output the result
  console.log("Filtered Data:", filteredCategoryData);

  get_data_list(filteredCategoryData);
});

(function () {
  const names = local_json_data.map((item, i) => item.category)

  console.log(names);
})();