const signup_form = document.getElementById("signup");
const email = document.getElementById("email");
const first_name = document.getElementById("first-name")
const last_name = document.getElementById("last-name")
const password = document.getElementById("password")
const confirm_password = document.getElementById("confirm-password");

signup_form.addEventListener("submit", async (el) => {
    el.preventDefault();

    const user_data = await get_user_data();

    // Basic validation
    if (email.value == "" || first_name.value == "" || last_name.value == "" || password.value == "" || confirm_password.value == "") {
        alert("Please fill all the fields.");
        return;
    }

    if (password.value !== confirm_password.value) {
        alert("Passwords do not match.");
        return;
    }

    // Check if email already exists
    const userExists = user_data.find((user) => user.email === email.value);

    if (userExists) {
        alert("User with this email already exists. Please login.");
        return;
    }

    const newUser = {
        email: email.value,
        firstName: first_name.value,
        lastName: last_name.value,
        name: first_name.value + last_name.value,
        password: password.value,
        logedIn: true
    };

    const res = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    });

    const data = await res.json();
    console.log("User created:", data);
})

async function get_user_data() {
    const res = await fetch("http://localhost:3000/user");
    const data = await res.json();

    return data
}