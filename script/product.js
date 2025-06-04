const products_container = document.getElementById("products-container");

async function get_data() {
  const res = await fetch("http://localhost:3000/products");
  const data = await res.json();

  get_data_list(data);
}

get_data();

function get_data_list(data) {
  const data_list = data.map((el, i) => product(el));

  products_container.innerHTML = data_list.join("");
}

function product(product_data) {
 const product = `
  <div class="group w-full sm:w-[49%] lg:w-[24%] mb-6">
    <div class="w-full aspect-[3/4] relative overflow-hidden">
      <img 
        class="group-hover:hidden absolute top-0 left-0 w-full h-full object-cover duration-700 ease-in-out" 
        src="${product_data.images[0]}" 
        alt="img-1" 
        data-id="${product_data.id}">
        
      <img 
        class="hidden group-hover:block absolute top-0 left-0 w-full h-full object-cover duration-700 ease-in-out" 
        src="${product_data.images[1]}" 
        alt="img-2" 
        data-id="${product_data.id}">
    </div>

    <div class="w-full mt-2 px-1">
      <div class="flex justify-between items-start flex-wrap gap-y-1">
        <h4 class="w-[75%] text-sm sm:text-xs uppercase font-semibold cursor-pointer" data-id="${product_data.id}">
          ${product_data.name}
        </h4>
        <p class="text-sm sm:text-xs font-semibold">
          ₹${product_data.new_price}
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
