import * as utils from './utils.js';

const payment_form = document.getElementById("payment-form");
const email = document.getElementById("email");
const name = document.getElementById("name");
const address = document.getElementById("address");
const state_city = document.getElementById("state-city");
const p_number = document.getElementById("p-number")
const card_number = document.getElementById("card-number");

const cart_data = await utils.get_data("cart");
const cart_list = utils.map_data(cart_data);

document.getElementById("order-count").innerText = `Order Summary(${cart_data.length} item)`;
document.getElementById("product-detail").innerHTML = cart_list.join("");
const total_price = cart_data.reduce((acc, el) => acc + el.price + el.quantity, 0)

document.getElementById("total-price").innerText = `$${total_price}.00`;

console.log(payment_form)

payment_form.addEventListener("submit", async (el) => {
    el.preventDefault();

    console.log(email.value, name.value, address.value, state_city.value, p_number.value, card_number.value)

    if (email.value === "" || name.value === "" || address.value === "" || state_city.value === "" || p_number.value === "" || card_number.value === "") {
        alert("All fileds must be filled")
        return
    }

    if (card_number.value.length !== 16) {
        alert("enter valid creadit card number");
        return
    }

    const payment_info = {
        email: email.value,
        name: name.value,
        address: address.value,
        state_city: state_city.value,
        p_number: p_number.value,
        card_number: card_number.value
    }

    const res = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1"
        },
        body: JSON.stringify(payment_info)
    });

    if(res.ok){
        alert("payment done")
    }

})