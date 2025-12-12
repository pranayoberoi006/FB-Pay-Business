const BACKEND = "https://fb-pay-business-backend.onrender.com";
const token = localStorage.getItem("token");

if (!token) window.location.href = "login.html";

// ---------------- CREATE USER ----------------
async function createUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  const res = await fetch(`${BACKEND}/admin-api/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ name, email, password, role })
  });

  const data = await res.json();

  document.getElementById("msg").innerText =
    data.status || data.error;

  loadUsers();
}

// ---------------- LOAD USERS ----------------
async function loadUsers() {
  const res = await fetch(`${BACKEND}/admin-api/users`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const users = await res.json();
  const table = document.getElementById("usersTable");
  table.innerHTML = "";

  users.forEach(u => {
    table.innerHTML += `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
      </tr>
    `;
  });
}

loadUsers();
