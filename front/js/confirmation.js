// Get the order ID from the URL
const orderUrl = window.location.search;
const urlParams = new URLSearchParams(orderUrl);
const orderID = urlParams.get('id');
// Add the order ID to the page
const orderIdHolder = document.getElementById('orderId');
orderIdHolder.innerHTML = orderID;
// Clear the cart and remove the cart from local storage
localStorage.removeItem('shoppingCart');