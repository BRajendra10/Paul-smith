export async function get_data(key) {
    const res = await fetch(`http://localhost:3000/${key}`);
    const data = await res.json();

    return data;
}

export function map_data(data) {
    const cart_list = data.map((el, i) => cart(el.title, el.images, el.price, el.id))

    return cart_list
}

export function cart(title, images, price, id) {
    const cart = `
  <div class="w-full h-fit flex justify-between mb-2">
    <div class="w-[15%]">
      <img src=${images[0]} class="w-full">
    </div>
    <div class="w-[60%]">
      <h3 class="text-lg">${title}</h3>
      <p class="text-base font-bold">$${price}.00</p>
    </div>
    <div class="w-[10%] flex flex-col justify-between items-center">
      <div class="w-full flex justify-around">
        <button class="text-base"><i class="ri-bookmark-line"></i></button>
        <button class="text-base delete-btn" data-id=${id}><i class="ri-delete-bin-7-line"></i></button>
      </div>
      <select class="w-full p-1" name="qty" id="qty">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      </div>
  </div> 
  `

    return cart;
}