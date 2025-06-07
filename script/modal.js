// modals
const help_modal = document.getElementById("help-modal");
const login_modal = document.getElementById("login-modal");
const bag_modal = document.getElementById("bag-modal");
const usd_modal = document.getElementById("usd-modal");

const btns = document.querySelectorAll(".btn");

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    let target = btn.classList;
    if (target.contains("help-btn")) {
      help_modal.classList.remove("hidden");
    } else if (target.contains("help-modal-close")) {
      help_modal.classList.add("hidden");
    } else if (target.contains("bag-wishlist-btn")) {
      bag_modal.classList.remove("hidden");
    } else if (target.contains("bag-modal-close")) {
      bag_modal.classList.add("hidden");
    } else if (target.contains("usd-btn")) {//
      usd_modal.classList.remove("hidden");
    } else if (target.contains("usd-modal-close")) {
      usd_modal.classList.add("hidden");
    } else {
      console.log(target);
    }
    // console.log(btn.classList);
  });
});