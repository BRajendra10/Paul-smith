const modal_container = document.getElementById("modal-container");
const help_btn = document.getElementById("help-btn");
const usd_btn = document.getElementById("usd-btn");
const bag_wishlist_btn = document.getElementById("bag-wishlist-btn");

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

bag_wishlist_btn.addEventListener("click", () => {
    const modal = bag_modal();
    modal_container.innerHTML = modal;

    const closeBtn = document.getElementById("bag-modal-close");
    modal_functionality(closeBtn)
})

function modal_functionality(closeBtn){
    modal_container.classList.remove("z-0", "opacity-0", "pointer-events-none");
    modal_container.classList.add("z-50", "opacity-100", "pointer-events-auto");

    closeBtn.addEventListener("click", () => {
        modal_container.classList.remove("z-50", "opacity-100", "pointer-events-auto");
        modal_container.classList.add("z-0", "opacity-0", "pointer-events-none");
        modal_container.innerHTML = "";
    });
}

function help_modal(){
    const help = `
    <div class="absolute top-0 right-0 w-full sm:w-[500px] h-[100vh] bg-gray-200 p-5" id="help-modal">
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

function usd_modal(){
    const usd = `
    <div class="absolute top-0 right-0 w-full md:w-[750px] h-fit bg-gray-50 p-5" id="usd-modal">
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

function bag_modal(){
    const bag = `
    <div class="fixed top-0 right-0 w-full lg:w-[700px] h-[90vh] bg-gray-50 p-5" id="bag-modal">
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
                <button class="w-full py-3 bg-gray-900 hover:bg-gray-700 transition-colors">
                    <a class="text-gray-50 block text-center" href="#">Submit</a>
                </button>
            </div>
        </div>
    </div>
    `

    return bag;
}