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

async function get_data() {
  const res = await fetch(`http://localhost:3000/discription/${id}`);
  const data = await res.json();

  document.getElementById("title").innerHTML = data.title;
  document.getElementById("price").innerHTML = data.price;
  document.getElementById("color").innerHTML = data.color;

  if(data.components.length>=2){
    document.getElementById("img-1").innerHTML = create_element("img", ["w-full", "h-auto", "rounded"], data.components[0].images[0])
    document.getElementById("img-2").innerHTML = create_element("img", ["w-full", "h-auto", "rounded"], data.components[1].images[0])
  }else{
    document.getElementById("img-1").src = data.images[0]
    document.getElementById("img-2").src = data.images[1]
  }

  map_image(data.images);
}

get_data();

function map_image(images) {
  const image_list = images.map((el, i) => create_element("img", ["w-full", "h-auto", "rounded"], el))

  image_list.forEach((img) =>{
    const img_container = create_element("div", ["flex-shrink-0", "w-[500px]", "lg:w-[620px]"]);
    img_container.appendChild(img)
    carousel.appendChild(img_container);
  })
}

function create_element(tag, class_name = [], tag_info){
  let el = document.createElement(tag);
  el.src = tag_info;
  class_name.forEach((cls) => el.classList.add(cls))

  if (tag_info !== undefined) el.innerHTML = tag_info;

  return el;
}