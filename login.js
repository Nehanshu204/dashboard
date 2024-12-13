document.getElementById("login").addEventListener("click", display);

function display(e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let storedusername = localStorage.getItem("username");
  let storedpassword = localStorage.getItem("password");

  if (username === storedusername && password === storedpassword) {
    alert(`Login Successful , welcome ${storedusername}`);
    window.location.href = "welcome.html";
  } else {
    alert("Incorrect details");
  }
}