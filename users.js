const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) window.location.href = "login.html";

// Only superadmin can see this page
if (role !== "superadmin") {
    alert("Access denied! Superadmin only.");
    window.location.href = "dashboard.html";
}

// Fetch All Users
async function loadUsers() {
    try {
        const res = await fetch("https://fb-pay-business-backend.onrender.com/admin-api/users", {
            headers: { Authorization: "Bearer " + token }
        });

        const data = await res.json();
        console.log("USERS:", data);

        if (data.error) {
            alert(data.error);
            return;
        }

        document.getElementById("usersTable").innerHTML = "";

        data.forEach(u => {
            document.getElementById("usersTable").innerHTML += `
                <tr>
                    <td>${u.name}</td>
                    <td>${u.email}</td>
                    <td>${u.role}</td>
                    <td>${new Date(u.createdAt).toLocaleString()}</td>
                </tr>
            `;
        });
    } catch (err) {
        console.log(err);
        alert("Failed to load users");
    }
}

loadUsers();

// logout
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
