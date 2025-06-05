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
  const res = await fetch("http://localhost:3000/discription/2");
  const data = await res.json();

  map_data(data.images);

  // const img_container = create_element("div", ["flex-shrink-0", "w-[500px]","lg:w-[620px]"])
}
get_data();

function map_data(images) {
  const image_list = images.map((el, i) => {
    let img_vedio = "";

    if (el.type === "video") {
      img_vedio = create_image("video", el.url, ["w-full", "h-auto", "rounded"])

        img_vedio.setAttribute("autoplay", "");
        img_vedio.setAttribute("loop", "");
        img_vedio.setAttribute("muted", "");
        img_vedio.setAttribute("playsinline", "");
    } else {
      tag = img_vedio = create_image("img", el.url, ["w-full", "h-auto", "rounded"]);
    }

    // const img = create_image(tag, el.url, ["w-full", "h-auto", "rounded"]);
    // console.log(img);

    const img_container = create_element("div", [
      "flex-shrink-0",
      "w-[500px]",
      "lg:w-[620px]",
    ]);

    img_container.appendChild(img_vedio);
    console.log(img_container);

    return img_container;
  });

  image_list.forEach((img_container) => {
    carousel.appendChild(img_container);
  });

  // carousel.innerHTML = image_list
}

function create_image(eliment, source, class_name = []) {
  let el = document.createElement(eliment);
  el.src = source;

  class_name.forEach((cls) => el.classList.add(cls));

  return el;
}

function create_element(tag, class_name = [], tag_info) {
  let el = document.createElement(tag);
  class_name.forEach((cls) => el.classList.add(cls));
  if (tag_info !== undefined) el.innerHTML = tag_info;

  return el;
}
