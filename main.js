document.getElementById("userForm").onsubmit = async function(e){
    e.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        amount: document.getElementById("amount").value
    };

    let order = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData)
    });

    order = await order.json();

    var options = {
        "key": "YOUR_KEY_ID",
        "amount": order.amount,
        "currency": "INR",
        "name": "FB Pay Business",
        "description": "Payment",
        "order_id": order.id,

        "handler": async function (response){
            await fetch("https://fb-pay-business-backend.onrender.com/cashfree-success", {

                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    payment: response,
                    user: userData
                })
            });
            alert("Payment Successful! Receipt sent to your Email and Phone.");
        }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
};
