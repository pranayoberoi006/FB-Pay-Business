const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const name = localStorage.getItem("name");

if (!token) {
    window.location.href = "login.html";
}

document.getElementById("adminName").innerText = name || "Admin";

// hide users menu if not superadmin
if (role !== "superadmin") {
    document.getElementById("usersMenu").style.display = "none";
}

// LOAD PAYMENTS
async function loadPayments() {
    try {
        const res = await fetch(
            "https://fb-pay-business-backend.onrender.com/admin-api/payments",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!res.ok) {
            console.error("Payments API failed");
            return;
        }

        const data = await res.json();

        let totalAmount = 0;
        const table = document.getElementById("paymentsTable");
        table.innerHTML = "";

        data.forEach(p => {
            totalAmount += Number(p.amount || 0);

            table.innerHTML += `
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
        document.getElementById("totalAmount").innerText = "₹" + totalAmount;

    } catch (err) {
        console.error("Dashboard error:", err);
    }
}

loadPayments();

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
