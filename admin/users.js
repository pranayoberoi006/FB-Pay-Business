const BACKEND = "https://fb-pay-business-backend.onrender.com";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

// Auth check
if (!token) {
    window.location.href = "login.html";
}

if (role !== "superadmin") {
    alert("Access denied");
    window.location.href = "dashboard.html";
}

// ---------------- LOAD USERS ----------------
async function loadUsers() {
    const res = await fetch(`${BACKEND}/admin-api/users`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (!res.ok) {
        console.error("Users API failed");
        return;
    }

    const users = await res.json();
    const table = document.getElementById("userTable");
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

// ---------------- CREATE USER ----------------
async function createUser() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!name || !email || !password) {
        alert("All fields are required");
        return;
    }

    const res = await fetch(`${BACKEND}/admin-api/create-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    alert("User created successfully");

    // clear form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    loadUsers();
}

// ---------------- LOGOUT ----------------
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

// initial load
loadUsers();
