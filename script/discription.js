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

document.getElementById("title").innerHTML = data.title;
document.getElementById("price").innerHTML = `$${data.price}`;
document.getElementById("color").innerHTML = data.color;
document.getElementById("img-1").src = data.images[0];
document.getElementById("img-2").src = data.images[1];

async function get_data() {
  const res = await fetch(`http://localhost:3000/discription/${id}`);
  const data = await res.json();

  return data;
}

map_image(data);

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
