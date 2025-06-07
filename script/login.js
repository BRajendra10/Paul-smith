const login_form = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const user_data = await get_user_data();

login_form.addEventListener("submit", (el) => {
    el.preventDefault();

    const matchedUser = user_data.find((user) => {
        return user.email === email.value && user.password === password.value
    });


    if (matchedUser) {
        modify_user_data(matchedUser.id);
    } else {
        alert("you don't have account");
    }
})

async function get_user_data() {
    const res = await fetch("http://localhost:3000/user");
    const data = await res.json();

    return data
}

async function modify_user_data(id) {
    const res = await fetch(`http://localhost:3000/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({logedIn: true })
    })
    const data = res.json();
}