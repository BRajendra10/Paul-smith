// carousel
const carousel = document.getElementById("carousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// data handling
const add_to_cart_btn = document.getElementById("add-to-cart")
const z = new URLSearchParams(window.location.search);
const id = z.get("id");
const data = await get_data();
const new_cart_data = data;
map_image(data);
product_info();

document.getElementById("title").innerText = data.title;
document.getElementById("price").innerText = `$${data.price}.00`;
document.getElementById("img-1").src = data.images[0]
document.getElementById("img-2").src = data.images[1]

nextBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: 300, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: -300, behavior: "smooth" });
});

function product_info() {
  const product = `
  <div class="w-full h-fit mb-5">
    <h6 class="leading-7 uppercase text-base">The fit</h6>
    <h3 class="leading-7 text-base font-bold">${data.title}</h3>
    <p class="leading-7 text-base font-normal">- ${data.description}</p>
  </div>
  <div class="w-full h-fit mb-5">
    <div class="flex">
      <p class="text-base me-3">product code:</p>
      <p class="leading-7 text-base font-normal">${data.product_code}</p>
    </div>
    <div class="flex">
      <p class="text-base me-3">material:</p>
      <p class="leading-7 text-base font-normal">${data.material}</p>
    </div>
    <div class="flex">
      <p class="text-base me-3">made in:</p>
      <p class="leading-7 text-base font-normal">${data.made_in}</p>
    </div>
  </div>`

  document.getElementById("product-info").innerHTML = product;
}

async function get_data() {
  const res = await fetch(`http://localhost:3000/discription/${id}`);
  const data = await res.json();

  return data;
}

function map_image(data) {
  const img_list = data.images.map((el, i) => {
    return create_element("img", ["w-full", "h-auto", "rounded"], el);
  });

  img_list.forEach((img) => {
    const img_container = create_element("div", [
      "flex-shrink-0",
      "w-[500px]",
      "lg:w-[620px]",
    ]);
    img_container.appendChild(img);

    carousel.appendChild(img_container);
  });
}

function create_element(tag, class_name = [], tag_info) {
  let el = document.createElement(tag);
  class_name.forEach((cls) => el.classList.add(cls));

  if (tag_info !== undefined) {
    if (tag_info.includes("https://")) {
      el.src = tag_info;
    } else {
      el.innerHTML = tag_info;
    }
  }

  return el;
}

add_to_cart_btn.addEventListener("click", async () => {
  const res = await fetch(`http://localhost:3000/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...new_cart_data, quantity: 1 })
  });
  const data = await res.json();

  console.log(data)
})

// async function deelet_cart_data(id) {
//     const res = await fetch(`http://localhost:3000/cart/${id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" }
//     });
//     const data = await res.json();

//     map_data(data);
// }

// function cart(title, images, price, id) {
//     const cart = `
//   <div class="w-full h-fit flex justify-between mb-2">
//     <div class="w-[15%]">
//       <img src=${images[0]} class="w-full">
//     </div>
//     <div class="w-[60%]">
//       <h3 class="text-lg">${title}</h3>
//       <p class="text-base font-bold">$${price}.00</p>
//     </div>
//     <div class="w-[10%] flex flex-col justify-between items-center">
//       <div class="w-full flex justify-around">
//         <button class="text-base"><i class="ri-bookmark-line"></i></button>
//         <button class="text-base deelet-btn" data-id=${id}><i class="ri-delete-bin-7-line"></i></button>
//       </div>
//       <select class="w-full p-1" name="qty" id="qty">
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//         <option value="4">4</option>
//         <option value="5">5</option>
//       </select>
//       </div>
//   </div>
//   `

//     return cart;
// }