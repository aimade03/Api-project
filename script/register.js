let name = document.querySelector("#name")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let confirmPassword = document.querySelector("#confirm-password")
let submit = document.querySelector(".btn")
let users = JSON.parse(localStorage.getItem("users")) || []
submit.addEventListener('click' , (e) => {
    e.preventDefault();
    let validation = true;
    if(!name.value){
        validation = false
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!email.value || !emailRegex.test(email.value) ){
        alert("email is not correct ")
        validation = false
    }
    const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(!password.value || !passwordRegex.test(password.value)){
        alert('password form not correct')
        validation = false
    }
    if(!confirmPassword.value && confirmPassword.value === password.value){
        validation = false
    }
    users.forEach(user => {
        if(user.email === email.value){
            validation = false
        }
    });
    if(validation === false){
        alert("entre information ")
    } else {
        let user = {
            name: name.value,
            email: email.value,
            password: password.value
        };
        users.push(user)
        
        localStorage.setItem('users',JSON.stringify(users))
        name.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = "";
        
    }    
})