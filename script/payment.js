import * as utils from './utils.js';

const cart_data = await utils.get_data("cart");
const cart_list = utils.map_data(cart_data);

document.getElementById("product-detail").innerHTML = cart_list