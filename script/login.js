
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let submit = document.querySelector(".btn")
let users = JSON.parse(localStorage.getItem("users")) || []
console.log(users)
submit.addEventListener('click', (e) => {
    e.preventDefault();
    let validation = true;
    if (!email.value) {
        validation = false
    }
    if (!password.value) {
        validation = false
    }

    if (validation === false) {
        alert("entre information ")
    } else {
        users.forEach(user => {
            if (user.email === email.value && user.password === password.value) {
                window.location.href = `./index.html`
                localStorage.setItem('user_active', JSON.stringify(user))
            } else {
                alert("not match")
            }
        });
    }
})