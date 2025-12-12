const token2 = localStorage.getItem("token");
const role2 = localStorage.getItem("role");

if (role2 !== "superadmin") {
    alert("Access denied");
    window.location.href = "dashboard.html";
}

async function loadUsers() {
    const res = await fetch("https://fb-pay-business-backend.onrender.com/admin-api/users", {
        headers: { Authorization: "Bearer " + token2 }
    });

    const users = await res.json();
    document.getElementById("userTable").innerHTML = "";

    users.forEach(u => {
        document.getElementById("userTable").innerHTML += `
            <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
            </tr>`;
    });
}

loadUsers();

async function createUser() {
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    const res = await fetch("https://fb-pay-business-backend.onrender.com/admin-api/create-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token2
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.status);
    loadUsers();
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
