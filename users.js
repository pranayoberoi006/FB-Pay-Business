const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

async function loadUsers() {
    const res = await fetch(
        "https://fb-pay-business-backend.onrender.com/admin-api/users",
        {
            headers: {
                Authorization: "Bearer " + token
            }
        }
    );

    const users = await res.json();

    const tbody = document.getElementById("usersTable");
    tbody.innerHTML = "";

    users.forEach(u => {
        tbody.innerHTML += `
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
