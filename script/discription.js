const carousel = document.getElementById("carousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

nextBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: 300, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: -300, behavior: "smooth" });
});

const z = new URLSearchParams(window.location.search);
const id = z.get("id");
const data = await get_data();
map_image(data);

(function product_info(){
  const product = `
  <div class="w-full h-fit mb-5">
    <h6 class="leading-7 uppercase text-base mb-3">The fit</h6>
    <h3 class="leading-7 text-base font-bold">${data.title}</h3>
    <p class="leading-7 text-base font-normal">- ${data.description}</p>
  </div>
  <div class="flex items-center justify-between mt-4">
    <div id="carousel" class="flex overflow-x-auto gap-2 scroll-smooth scrollbar-hide w-full px-2">
      ${data.images.slice(0, 5).map(img => `
        <img src="${img}" alt="product" class="w-28 h-28 object-cover rounded-md border" />
      `).join('')}
    </div>
  </div>`

  document.getElementById("product-info").innerHTML = product;
})();


// (function(){
//   const product = `
//   <div class="flex flex-col lg:flex-row w-full h-fit border-t-1 py-2">
//     <div class="w-fit lg:w-[20%]">
//       <h6 class="uppercase text-sm leading-6">Material</h6>
//     </div>
//     <div>
//       <p class="text-sm leading-6 uppercase leading-6">${data.material}</p>
//     </div>
//   </div>
//   <div class="flex flex-col lg:flex-row w-full h-fit border-t-1 py-2">
//     <div class="w-fit lg:w-[20%]">
//       <h6 class="uppercase text-sm leading-6">Made in</h6>
//     </div>
//     <div>
//       <p class="text-sm leading-6 uppercase leading-6">${data.made_in}</p>
//     </div>
//   </div>
//   <div class="flex flex-col lg:flex-row w-full h-fit border-t-1 py-2">
//     <div class="w-fit lg:w-[20%]">
//       <h6 class="uppercase text-sm leading-6">Product code</h6>
//     </div>
//     <div>
//       <p class="text-sm leading-6 uppercase leading-6">${data.product_code}</p>
//     </div>
//   </div>
//   <div class="flex flex-col lg:flex-row w-full h-fit border-t-1 py-2">
//     <div class="w-fit lg:w-[20%]">
//       <h6 class="uppercase text-sm leading-6">services</h6>
//     </div>
//     <div>
//       <p class="text-sm leading-6 uppercase leading-6">${data.product_code}</p>
//     </div>
//   </div>
//   <div class="w-full h-fit my-2 border-t-1 py-2">
//     <button class="uppercase text-sm py-3 hover:bg-gray-200"><a href="#">Read more</a></button>
//   </div>
//   `
//   document.getElementById("product-information").innerHTML = product;
// })();

/*<div class="flex flex-col lg:flex-row w-full h-fit border-t-1 py-2">
  <div class="w-fit lg:w-[20%]">
    <h6 class="uppercase text-sm leading-6">Material</h6>
  </div>
  <div>
    <p class="text-sm leading-6 leading-6">100% Linen Lining: 100% Viscose</p>
  </div>
</div>*/

document.getElementById("title").innerText = data.title;
document.getElementById("price").innerText = `$${data.price}.00`;
document.getElementById("color").innerText = data.color;
document.getElementById("img-1").src = data.images[0];
document.getElementById("img-2").src = data.images[1];

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
