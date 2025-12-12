const API = "https://fb-pay-business-backend.onrender.com/admin-api";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminRole", data.role);
        window.location.href = "/admin/dashboard.html"; 
    } else {
        alert(data.error || "Login failed");
    }
});
