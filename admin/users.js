const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) {
    window.location.href = "login.html";
}

if (role !== "superadmin") {
    alert("Access denied");
    window.location.href = "dashboard.html";
}

async function loadUsers() {
    const res = await fetch(
        "https://fb-pay-business-backend.onrender.com/admin-api/users",
        {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    );

    if (!res.ok) {
        console.error("Users API failed");
        return;
    }

    const users = await res.json();
    const table = document.getElementById("usersTable");
    table.innerHTML = "";

    users.forEach(u => {
        table.innerHTML += `
            <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>${new Date(u.createdAt).toLocaleString()}</td>
            </tr>
        `;
    });
}

loadUsers();
