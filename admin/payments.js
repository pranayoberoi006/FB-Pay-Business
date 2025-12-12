const API = "https://fb-pay-business-backend.onrender.com/admin-api/payments";

const tbody = document.querySelector("tbody");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

// ---------------- FETCH PAYMENTS ----------------
async function loadPayments() {
    const token = localStorage.getItem("adminToken");

    if (!token) return (window.location.href = "login.html");

    const res = await fetch(API, {
        headers: { Authorization: "Bearer " + token }
    });

    const data = await res.json();
    window.allPayments = data;
    renderTable(data);
}

// ---------------- RENDER TABLE ----------------
function renderTable(list) {
    tbody.innerHTML = "";

    list.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.name}</td>
            <td>${p.phone}</td>
            <td>${p.email}</td>
            <td>₹${p.amount}</td>
            <td><span class="badge ${p.status}">${p.status}</span></td>
            <td>${p.order_id}</td>
            <td>${p.payment_id || "-"}</td>
            <td>${new Date(p.date).toLocaleString()}</td>
        `;

        tbody.appendChild(tr);
    });
}

// ---------------- SEARCH FILTER ----------------
searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();

    const filtered = window.allPayments.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.order_id.toLowerCase().includes(q)
    );

    renderTable(filtered);
});

// ---------------- STATUS FILTER ----------------
statusFilter.addEventListener("change", () => {
    const val = statusFilter.value;

    const filtered = val
        ? window.allPayments.filter(p => p.status === val)
        : window.allPayments;

    renderTable(filtered);
});

// ---------------- LOGOUT ----------------
document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
};

// Load data
loadPayments();
