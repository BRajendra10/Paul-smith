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

    if (email.value === "" || name.value === "" || address.value === "" || state_city.value === "" || p_number.value === "" || card_number.value === "") {
        alert("All fileds must be filled")
        return
    }

    if (card_number.value.length !== 16) {
        alert("enter valid creadit card number");
        return
    }

    // Usage - corrected condition
    setTimeout(() => {
        if (card_number.value.length === 16) {  // Changed to ===
            console.log("payment done");
            showToast("Payment successful!", "success");
        } else {
            showToast("Payment failed - invalid card", "error");
        }
    }, 3000);
})

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `mb-2 p-4 rounded-lg shadow-lg flex items-center justify-between ${
        type === 'success' 
            ? 'bg-green-100 border-l-4 border-green-500 text-green-700' 
            : 'bg-red-100 border-l-4 border-red-500 text-red-700'
    }`;
    
    toast.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="ml-4 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
    `;
    
    const container = document.getElementById('modal-container');
    container.classList.remove("z-0", "opacity-0", "pointer-events-none");
    container.classList.add("z-50", "opacity-100", "pointer-events-auto");
    container.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.remove();
        // Hide container if no more toasts
        if (container.children.length === 0) {
            container.classList.add("z-0", "opacity-0", "pointer-events-none");
            container.classList.remove("z-50", "opacity-100", "pointer-events-auto");
        }
    }, 5000);
}