import * as utils from './utils.js';

const payment_form = document.getElementById("payment-form");
const email = document.getElementById("email");
const name = document.getElementById("name");
const address = document.getElementById("address");
const state_city = document.getElementById("state-city");
const p_number = document.getElementById("p-number")
const card_number = document.getElementById("card-number");
const modal_container = document.getElementById("modal-container");

const cart_data = await utils.get_data("cart");
const cart_list = utils.map_data(cart_data);

document.getElementById("order-count").innerText = `Order Summary(${cart_data.length} item)`;
document.getElementById("product-detail").innerHTML = cart_list.join("");
const total_price = cart_data.reduce((acc, el) => acc + el.price + el.quantity, 0)

document.getElementById("total-price").innerText = `$${total_price}.00`;

payment_form.addEventListener("submit", async (el) => {
    el.preventDefault();

    if (email.value === "" || name.value === "" || address.value === "" || state_city.value === "" || p_number.value === "" || card_number.value === "") {
        alert("All fileds must be filled")
        return
    }

    if (card_number.value.length !== 16) {
        alert("enter valid creadit card number");
        return
    }else{
        setTimeout(() => {
            const modal = payment_modal(card_number.value, total_price, name.value, email.value, address.value, p_number.value);
            modal_container.innerHTML = modal;

            const closeBtn = document.getElementById("help-modal-close");
            utils.modal_functionality(modal_container, closeBtn)
        }, 3000);
    }
})

function payment_modal(card_no, total_price, name, email, address, p_no){
    return `
    <div class="absolute top-1/2 left-1/2 w-full sm:w-[500px] h-[500px] bg-gray-100 p-5 
            transform -translate-x-1/2 -translate-y-1/2" id="help-modal">
        <div class="flex justify-end items-center mb-5">
            <button class="text-2xl cursor-pointer btn help-modal-close" id="help-modal-close"><i class="ri-close-fill"></i></button>
        </div>
        <div class="w-full h-fit">
            <h1 class="text-base font-bold leading-7">Payment details :</h1>
            <h3 class="text-sm font-bold leading-7">Payment status: Success</h3>
            <h3 class="text-sm font-bold leading-7">Creadit Card no: ${card_no}</h3>
            <p class="text-sm font-bold leading-7">Price: $${total_price}</p>

            <h1 class="text-base font-bold leading-7 mt-5">User details :</h1>
            <h3 class="text-sm font-bold leading-7">User name: ${name}</h3>
            <h3 class="text-sm font-bold leading-7">Email: ${email}</h3>
            <p class="text-sm font-bold leading-7">Address: ${address}</p>
            <p class="text-sm font-bold leading-7">Phone no: ${p_no}</p>
        </div>
    </div>
    `
}