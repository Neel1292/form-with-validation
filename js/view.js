const userData = JSON.parse(localStorage.getItem("user"));
const displayData = document.querySelector(".table-body");
function getDataView() {
  const form = document.querySelector(".data-view");


  if (userData && userData.length > 0) {
    userData.forEach((user, index) => {
      displayData.innerHTML += `
            <tr>
                <td>${index+1}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.mobile}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td data-index="${user.email}"><i class="fa-solid fa-user-pen" onclick="editUser('${user.email}')"></i></td>
                <td><i class="fa-solid fa-user-minus" onclick="deleteUser()" data-index="${index}"></i></td>
            </tr>`;
    });
  } else {
    form.innerHTML = `<h2>No Data Available...</h2><br/>
        <div class="add_user_btn"><a href='../html/form.html' class="btn" >Add User</a></div>`;
    form.classList.remove(".data_table");
    form.classList.add(".no-data");
  }

}

function deleteUser() {
  // debugger
  const removeUser = document.querySelectorAll(".fa-user-minus");
  removeUser.forEach(icon => {
    icon.addEventListener('click', () => {
      const index = icon.getAttribute('data-index')
      // Display confirmation block
      if (confirm("Are you sure you want to delete this user's data?")) {
        // If user confirms, perform the deletion
        userData.splice(index, 1)
        localStorage.setItem('user', JSON.stringify(userData))
        displayData.innerHTML = ''
        getDataView()
      }
    })
  })
}

function editUser(email) {
  window.location.href = `../html/update.html?email=${email}`;
}

getDataView();