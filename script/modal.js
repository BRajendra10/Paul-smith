const modal_container = document.getElementById("modal-container");
const help_btn = document.getElementById("help-btn");
const usd_btn = document.getElementById("usd-btn");
const bag_wishlist_btn = document.getElementById("bag-wishlist-btn");
const cart_count = document.getElementById("cart-count");

const cart_data = await get_cart_data();
cart_count.innerText = cart_data.length;

help_btn.addEventListener("click", () => {
    const modal = help_modal();
    modal_container.innerHTML = modal;

    const closeBtn = document.getElementById("help-modal-close");
    modal_functionality(closeBtn)
})

usd_btn.addEventListener("click", () => {
    const modal = usd_modal();
    modal_container.innerHTML = modal;

    const closeBtn = document.getElementById("usd-modal-close");
    modal_functionality(closeBtn)
})

bag_wishlist_btn.addEventListener("click", async () => {
    const total_cart_price = cart_data.reduce((acc, el) => acc + el.price + el.quantity, 0)
    console.log(total_cart_price)
    const modal = bag_modal(total_cart_price);
    modal_container.innerHTML = modal;

    const bag_container = document.getElementById("tab-bag");
    const cart_list = map_data(cart_data);

    bag_container.innerHTML = cart_list.join("");
    get_cart_delet_btn();

    const closeBtn = document.getElementById("bag-modal-close");
    modal_functionality(closeBtn)
})

function get_cart_delet_btn() {
    const deelet_btn = document.querySelectorAll(".delete-btn");
    
    deelet_btn.forEach((btn) => {
        btn.addEventListener("click", (el) => {
            const id = el.currentTarget.getAttribute("data-id");

            deelet_cart_data(id);
        })
    })
}

function modal_functionality(closeBtn) {
    modal_container.classList.remove("z-0", "opacity-0", "pointer-events-none");
    modal_container.classList.add("z-50", "opacity-100", "pointer-events-auto");

    tab_funclitionality();

    closeBtn.addEventListener("click", () => {
        modal_container.classList.remove("z-50", "opacity-100", "pointer-events-auto");
        modal_container.classList.add("z-0", "opacity-0", "pointer-events-none");
        modal_container.innerHTML = "";
    });
}

function tab_funclitionality() {
    const tabs = document.querySelectorAll(".tab-link");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {

            tabs.forEach((t) => t.classList.remove("text-blue-600", "border-blue-600"));

            contents.forEach((c) => c.classList.add("hidden"));

            tab.classList.add("text-blue-600", "border-blue-600");

            const target = tab.getAttribute("data-tab");
            document.getElementById(`tab-${target}`).classList.remove("hidden");
        });
    });
}

function help_modal() {
    const help = `
    <div class="absolute top-0 right-0 w-full sm:w-[500px] h-[100vh] bg-gray-100 p-5" id="help-modal">
        <div class="flex justify-end items-center mb-5">
            <button class="text-2xl cursor-pointer btn help-modal-close" id="help-modal-close"><i class="ri-close-fill"></i></button>
        </div>
        <div class="w-full h-fit">
            <h1 class="text-xl">How can we assist you?</h1>

            <div class="w-full h-fit mt-8">
                <ul class="w-full group">
                    <li class="text-xs font-bold uppercase leading-7 group-hover:text-stone-500 hover:text-stone-900 text-stone-900"><a href="#">Live chat</a></li>
                    <li class="text-xs font-bold uppercase leading-7 group-hover:text-stone-500 hover:text-stone-900 text-stone-900"><a href="#">Contact form</a></li>
                    <li class="text-xs font-bold uppercase leading-7 group-hover:text-stone-500 hover:text-stone-900 text-stone-900"><a href="#">track your order</a></li>
                </ul>
            </div>

            <div class="w-full h-fit mt-8">
                <h1 class="text-lg leading-8">Call us</h1>
                <ul class="w-full group">
                    <li class="text-base font-medium uppercase leading-7 group-hover:text-stone-500 hover:text-stone-900 text-stone-900"><a href="#">+44 (0)115 968 5821</a></li>
                    <li class="text-base font-medium uppercase leading-7 group-hover:text-stone-500 hover:text-stone-900 text-stone-900"><a href="#">09:00–17:00 GMT, Monday to Friday (UK holidays excluded)</a></li>
                </ul>
            </div>

            <div class="w-full h-fit mt-8">
                <ul class="w-full group">
                    <li class="text-xs font-bold uppercase leading-7 group-hover:text-stone-500 hover:text-stone-900 text-stone-900"><a href="#">Faq</a></li>
                    <li class="text-xs font-bold uppercase leading-7 group-hover:text-stone-500 hover:text-stone-900 text-stone-900"><a href="#">shipping</a></li>
                    <li class="text-xs font-bold uppercase leading-7 group-hover:text-stone-500 hover:text-stone-900 text-stone-900"><a href="#">returns</a></li>
                    <li class="text-xs font-bold uppercase leading-7 group-hover:text-stone-500 hover:text-stone-900 text-stone-900"><a href="#">alterations & repaires</a></li>
                </ul>
            </div>
        </div>
    </div>
    `
    return help;
}

function usd_modal() {
    const usd = `
    <div class="absolute top-0 right-0 w-full md:w-[750px] h-fit bg-gray-100 p-5" id="usd-modal">
        <div class="flex justify-end items-center mb-5">
            <button class="text-2xl cursor-pointer btn usd-modal-close" id="usd-modal-close"><i class="ri-close-fill"></i></button>
        </div>
        <div class="flex flex-col justify-start items-center w-full h-[300px]">
            <h3 class="px-2 text-xl">Shipping to a different country?</h3>

            <div class="flex flex-col justify-between items-center w-full h-[250px] p-5">
                <div class="w-full mx-auto mt-8">
                    <label for="options" class="block mb-2 text-xs font-thin text-gray-600">Select your country?</label>
                    <select id="options" class="block w-full p-2  border-b-1 text-sm bg-white focus:outline-none focus:ring-0 focus:border-black">
                        <option value="Albania">Albania</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Canada">Canada</option>
                        <option value="China">China</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India" selected>India</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Korea">Korea</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Norway">Norway</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Romania">Romania</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Spain">Spain</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                    </select>
                </div>

                <button class="px-13 py-2 bg-gray-900 hover:bg-gray-700">
                    <a class="text-gray-50" href="#">Submit</a>
                </button>

                <p class="text-xs">Item availability, prices and delivery information will be updated in line with your new shipping destination.</p>
            </div>
        </div>
    </div>
    `
    return usd;
}

function bag_modal(total) {
    const bag = `
    <div class="fixed top-0 right-0 w-full lg:w-[700px] h-[90vh] bg-gray-100 p-5" id="bag-modal">
        <div class="flex flex-col h-full">
            
            <div class="flex justify-end mb-4">
                <button class="text-2xl cursor-pointer btn bag-modal-close" id="bag-modal-close">
                    <i class="ri-close-fill"></i>
                </button>
            </div>

            <div class="flex-1 overflow-y-auto">
                <nav class="flex space-x-4 mb-4">
                    <button data-tab="bag" class="tab-link text-xl text-gray-400 py-2 px-4 hover:text-gray-900 transition-all duration-300">Bag</button>
                    <button data-tab="wishlist" class="tab-link text-xl text-gray-400 py-2 px-4 hover:text-gray-900 transition-all duration-300">Wishlist</button>
                </nav>

                <div class="w-full">
                    <div id="tab-bag" class="tab-content">
                    <div class="w-full min-h-[300px]">
                        <p class="text-center text-2xl font-medium">Your bag is empty</p>
                    </div>
                    </div>
                    <div id="tab-wishlist" class="tab-content hidden">
                    <div class="w-full min-h-[300px]">
                        <p class="text-center text-2xl font-medium">Your wishlist is empty</p>
                    </div>
                    </div>
                </div>
            </div>

            <div class="pt-4">
                <div class="w-full h-fit mb-2">
                    <div class="flex justify-between">
                        <h5 class="leading-6" id="Subtotal">Subtotal</h5>
                        <p>$${total}.00</p>
                    </div>
                    <div class="flex justify-between">
                        <h5 class="leading-6">Shipping</h5>
                        <p>Free</p>
                    </div>
                    <div class="flex justify-between">
                        <h5 class="leading-6" id="Total">Total</h5>
                        <p>$${total}.00</p>
                    </div>
                </div>
                <button class="w-full py-3 bg-gray-900 hover:bg-gray-700 transition-colors">
                    <a class="text-gray-50 block text-center" href="#">Buy now</a>
                </button>
            </div>
        </div>
    </div>
    `

    return bag;
}

async function deelet_cart_data(id) {
    const res = await fetch(`http://localhost:3000/cart/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();

    map_data(data);
}

async function get_cart_data() {
    const res = await fetch("http://localhost:3000/cart");
    const data = await res.json();

    return data;
}

function map_data(data) {
    const cart_list = data.map((el, i) => cart(el.title, el.images, el.price, el.id))

    return cart_list
}

function cart(title, images, price, id) {
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

function set_qty() {
    const quantity = document.querySelectorAll("#qty");

    quantity.forEach((el, i) => {
        el.addEventListener("change", async () => {
            const newData = { ...cart_data[i], quantity: el.value };

            const res = await fetch(`http://localhost:3000/cart/${cart_data[i].id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData),
            });
            const data = await res.json();

            console.log(data);
        })
    })
}