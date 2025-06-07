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

if (data.related_product) {
  product_info(data.related_product.images);
} else {
  product_info(data.images);
}

function product_info(images) {
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
