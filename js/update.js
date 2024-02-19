const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
const passRequire = [
    { regex: /.{8,16}/, index: 0 }, // Minimum of 8 Character
    { regex: /[0-9]/, index: 1}, // At least one number
    { regex: /[A-Z]/, index: 2}, // At least one uppercase letter
    { regex: /[a-z]/, index: 3}, // At least one lowercase letter
    { regex: /[^A-Za-z0-9]/, index: 4}, // At least one special character
];

let user_name = document.getElementById('name');

document.addEventListener("DOMContentLoaded", function() {
const eyeIcon = document.querySelector("#eye-icon");
    
const userPassword = document.getElementById('password')
const requirementList = document.querySelectorAll('.password-match-list li')

const urlParams = new URLSearchParams(window.location.search)
const email = urlParams.get('email')
 
function populateForm (email) {
  let users = JSON.parse(localStorage.getItem('user'))
  const user = users.find(user => user.email === email)

  if (user) {
    document.getElementById('name').value = user.name
    document.getElementById('age').value = user.age
    document.getElementById('mobile_number').value = user.mobile
    document.getElementById('email').value = user.email
    document.getElementById('password').value = user.password
  }
}

populateForm(email);

user_name.addEventListener("input", function(e){
  let isCharacter = (/^[A-Za-z]+(?: [A-Za-z]+)*$/).test(e.target.value);
  const inputControl = user_name.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  if (!isCharacter) {
    errorDisplay.innerText = 'Bro You are not name after King '
  } else {
      errorDisplay.innerText = "";
      
  }
});

document.querySelector('.update-form').addEventListener('submit', e => {
  e.preventDefault()

  const name = document.getElementById('name')
  const age = document.getElementById('age')
  const mobile = document.getElementById('mobile_number')
  const email = document.getElementById('email')
  const password = userPassword.value

  let users = JSON.parse(localStorage.getItem('user'))
  const index = users.findIndex(user => user.email === email.value)

  if (index !== -1) {
    users[index] = {
      name: name.value,
      age: age.value,
      mobile: mobile.value,
      email: email.value,
      password: password
    }
  
    if (!isEmpty(name)) { setSuccess(name)}
    else { setError(name, "Good Name should be there"); }

    if (!isEmpty(age)) { 
        if((parseInt(age.value) >= 18 && parseInt(age.value) <= 30)) {
            setSuccess(age);
        } else {
            setError(age, 'Please Check Your Age')
        }
    } else { 
        setError(age, 'Age cannot be blank'); 
    }

    if(!isEmpty(name) && !isEmpty(age)  && !isEmpty(userPassword)) {
      localStorage.setItem('user', JSON.stringify(users));
      alert('User data updated successfully!')
      window.location.href = '../html/view.html'
    }
  } else {
    alert('User not found!')
  }
})

userPassword.addEventListener('keyup', e => {
  document.querySelector('.password-match-list').style.display = 'block'
  if (!isEmpty(userPassword)) {
    passRequire.forEach(item => {
      // Check if Enter Letter is Matches
      const isValid = item.regex.test(e.target.value)
      const requirementItem = requirementList[item.index]
      if (isValid) {
        requirementItem.firstElementChild.className = 'fa-solid fa-check'
        requirementItem.classList.add('valid')
      } else {
        requirementItem.firstElementChild.className = 'fa-solid fa-xmark'
        requirementItem.classList.remove('valid')
      }
    })
  } else {
    document.querySelector('.password-match-list').style.display = 'none'
  }
})

userPassword.addEventListener('blur', e => {
  document.querySelector('.password-match-list').style.display = 'none'
})

eyeIcon.addEventListener("click", ()=> {
  password.type = password.type === "password" ? "text" : "password";

  eyeIcon.className = `fa-solid fa-eye${password.type !== "password" ? '-slash':""}`
})

function isEmpty(data) {
    return data.value.trim() === '';
}
  
function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    
    errorDisplay.innerText = message;   
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};
  
function setSuccess(element) {
    const inputControl = element.parentElement;
    const successDisplay = inputControl.querySelector(".error");
  
    successDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
  };

});