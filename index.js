let viewData = document.querySelector('.view');
const userData = JSON.parse(localStorage.getItem("user"));

function viewRecords() {
    
    viewData.addEventListener('click', function() {
        if (userData && !(userData.length > 0)) {
            window.location.href = './html/view.html'; 
        } else {
            window.location.href = './html/form.html'; 
        }
    });
}

viewRecords();