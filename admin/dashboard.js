const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const name = localStorage.getItem("name");

document.getElementById("adminName").innerText = name;

// Hide Manage Users for admins/viewers
if (role !== "superadmin") {
    document.getElementById("usersMenu").style.display = "none";
}

if (!token) window.location.href = "login.html";

// Fetch Payments
async function loadPayments() {
    const res = await fetch("https://fb-pay-business-backend.onrender.com/admin-api/payments", {
        headers: { Authorization: "Bearer " + token }
    });

    const data = await res.json();

    let total = 0;
    document.getElementById("paymentsTable").innerHTML = "";

    data.forEach(p => {
        total += p.amount;

        document.getElementById("paymentsTable").innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>₹${p.amount}</td>
                <td>${p.status}</td>
                <td>${p.order_id}</td>
                <td>${new Date(p.date).toLocaleString()}</td>
            </tr>
        `;
    });

    document.getElementById("totalPayments").innerText = data.length;
    document.getElementById("totalAmount").innerText = "₹" + total;
}

loadPayments();

// Search filter
function searchPayments() {
    const value = document.getElementById("searchBox").value.toLowerCase();
    const rows = document.querySelectorAll("#paymentsTable tr");

    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
    });
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
