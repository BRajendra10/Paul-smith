const carousel = document.getElementById("carousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

nextBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: 300, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: -300, behavior: "smooth" });
});

async function get_data() {
  const res = await fetch("http://localhost:3000/discription/4");
  const data = await res.json();

  map_image(data.images);

  // const img_container = create_element("div", ["flex-shrink-0", "w-[500px]","lg:w-[620px]"])
}
get_data();

function map_image(images) {
  const image_list = images.map((el, i) => {
    let tag = "img";

    if(el.type === "video") tag = "video"

    const img_vedio = create_element(tag, ["w-full", "h-auto", "rounded"], el.url);
    const img_container = create_element("div", ["flex-shrink-0", "w-[500px]", "lg:w-[620px]"]);

    img_container.appendChild(img_vedio);

    return img_container;
  });

  image_list.forEach((img_container) => {
    carousel.appendChild(img_container);
  });

}

function create_element(tag, class_name = [], tag_info){
  let el = document.createElement(tag);
  el.src = tag_info;
  class_name.forEach((cls) => el.classList.add(cls))

  if (tag_info !== undefined) el.innerHTML = tag_info;

  if(tag === "vedio") {
    img_vedio.setAttribute("autoplay", "");
    img_vedio.setAttribute("loop", "");
    img_vedio.setAttribute("muted", "");
    img_vedio.setAttribute("playsInline", "");
  }

  return el;
}