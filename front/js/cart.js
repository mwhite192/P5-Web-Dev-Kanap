// Gets the cart from local storage
function getCartFromStorage(){
  return JSON.parse(localStorage.getItem('shoppingCart'));
}
// Gets the cart from local storage
const customerCart = getCartFromStorage();
// -----------------------------------------------------

// Gets the itemID from each item in the cart array
const customerCartID = customerCart.map(item => item.itemID);
//------------------------------------------------------

// Fetches the product info for each item in the cart array
Promise.all(
  customerCartID.map((id) =>
    fetch(`http://localhost:3000/api/products/${id}`).then((data) =>
      data.json()
    )
  )
)
  .then((data) => {
    // Creates new arrays with the product info and cart info combined
    const customerOrder = [];
    // Iterates over the product info array
    for (let i = 0; i < data.length; i++) {
      // Combines the product info and cart info into a new object
      const newItem = {
        ...data[i],
        ...customerCart[i],
      };
      // Inserts the new objects into the new arrays
      customerOrder.push(newItem);
    }
    // Inserts the cart items into the cart page
    insertCartItems(customerOrder);
    // Gets the price of each item in the cart
    const customerTotal = customerOrder.map((total) => total.price);
    // Gets the quantity of each item in the cart and converts it to a number
    const customerQty = customerOrder.map((qty) => Number(qty.itemQty));
    // Gets the subtotal element on the cart page
    const subTotalClass = document.querySelectorAll('.itemSubtotal');
    // Gets the total price of each item in the cart
    const cartTotal = customerTotal
      .map((itemPrice, index) => {
        const thisSubtotal = itemPrice * customerQty[index];
        subTotalClass[index].textContent = thisSubtotal;
        return thisSubtotal;
      })
      .reduce((total, index) => total + index, 0);
    // Gets the total price element on the cart page
    const totalHolder = document.getElementById('totalPrice');
    // Inserts the total price into the total price element
    totalHolder.textContent = cartTotal;
  });
// -----------------------------------------------------

// Inserts cart items into cart page
function insertCartItems(customerOrder){
  // Iterates over the cart array 
  for (let i = 0; i < customerOrder.length; i++){
    // Gets the existing section element on the cart page where cart items can be inserted
    const cartHolder = document.getElementById('cart__items');
    // Gets the current element in the cart array
    const item = customerOrder[i];
    // Creates a new cart item element
    // Inserts current element's info into new cart item element
    // And inserts new cart item element into the cart page
    cartHolder.innerHTML += `<article class='cart__item' data-id='${item.itemID}' data-color='${item.itemColor}'>
    <div class='cart__item__img'>
      <img src='${item.imageUrl}' alt='${item.altTxt}'>
    </div>
    <div class='cart__item__content'>
      <div class='cart__item__content__description'>
        <h2>${item.name}</h2>
        <p>${item.itemColor}</p>
        <p class='itemSubtotal'>${item.price}</p>
      </div>
      <div class='cart__item__content__settings'>
        <div class='cart__item__content__settings__quantity'>
          <p>Quantity : </p>
          <input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value='${item.itemQty}'>
        </div>
        <div class='cart__item__content__settings__delete'>
          <p class='deleteItem'>Delete</p>
        </div>
      </div>
    </div>`;
    let itemQuantity = document.querySelectorAll('.itemQuantity');
      for (let i = 0; i < itemQuantity.length; i++){
        itemQuantity[i].addEventListener('change', updateCart);
      }
    let deleteItem = document.querySelectorAll('.deleteItem');
      for (let i = 0; i < deleteItem.length; i++){
        deleteItem[i].addEventListener('click', removeFromCart);
      }
  }
}
// -----------------------------------------------------

// Gets the sum of the quantity of items in the cart
function getCartQty(){
  const newCustomerOrder = getCartFromStorage();
  const cartQty = newCustomerOrder.map(qty => {
    const articleTotal = Number(qty.itemQty);
    const subTotal = Number(qty.itemQty) * qty.price;
    return {subTotal, articleTotal};
  }).reduce(({subTotal, articleTotal}, index) => ({
    subTotal: subTotal + index.subTotal,
    articleTotal: articleTotal + index.articleTotal}));
  // Gets the total quantity element on the cart page
  const totalQtyHolder = document.getElementById('totalQuantity');
  // Gets the total price element on the cart page
  const totalPriceHolder = document.getElementById('totalPrice');
  // Inserts the sum of items in the cart into the total quantity element
  totalQtyHolder.textContent = cartQty.articleTotal;
  totalPriceHolder.textContent = cartQty.subTotal;
}
getCartQty();
// -----------------------------------------------------

// updates the cart quantity and total price when the quantity of an item is changed
function updateCart(event){
  // Gets the itemID and itemColor of the current cart item element
  const {id, color} = event.target.closest('.cart__item').dataset;
  // Gets the itemQty of the current cart item element
  const itemQty = event.target.value;
    // Iterates over the cart array
    for (let i = 0; i < customerCart.length; i++){
      // If the itemID and itemColor of the current cart item element matches the itemID and itemColor of the current cart array element
      if (id === customerCart[i].itemID && color === customerCart[i].itemColor){
        // Update the itemQty of the current cart array element
        customerCart[i].itemQty = itemQty;
      }
    }
    // Updates the cart in local storage
    localStorage.setItem('shoppingCart', JSON.stringify(customerCart));
    // reloads the page
    location.reload();
  }
// -----------------------------------------------------

// Deletes the current cart item element from the cart page
function removeFromCart(event){
  // Gets the itemID and itemColor of the current cart item element
  const {id, color} = event.target.closest('.cart__item').dataset;
  // Iterates over the cart array
  for (let i = 0; i < customerCart.length; i++){
    // If the itemID and itemColor of the current cart item element matches the itemID and itemColor of the current cart array element
    if (id === customerCart[i].itemID && color === customerCart[i].itemColor){
      // Removes the current cart array element
      customerCart.splice(i, 1);
    }
  }
  // Updates the cart in local storage
  localStorage.setItem('shoppingCart', JSON.stringify(customerCart));
  // reloads the page
  location.reload();
}
// -----------------------------------------------------

// validates customer info form
// Gets the error message elements
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const emailErrorMsg = document.getElementById('emailErrorMsg');
// Validates the first name input
function validateFirstName(){
  const firstName = document.getElementById('firstName').value;
  if (firstName.length === 0){
    firstNameErrorMsg.textContent = 'First Name Required';
    return false;
  }
  if (!firstName.match(/^[a-zA-Z]+$/)){
    firstNameErrorMsg.textContent = 'First Name must be letters only';
    return false;
  } 
  firstNameErrorMsg.textContent = 'Entry Valid';
  return true;
}
const firstName = document.getElementById('firstName');
firstName.addEventListener('input', validateFirstName);

// Validates the last name input
function validateLastName(){
  const lastName = document.getElementById('lastName').value;
  if (lastName.length === 0){
    lastNameErrorMsg.textContent = 'Last Name Required';
    return false;
  }
  if (!lastName.match(/^[a-zA-Z]+$/)){
    lastNameErrorMsg.textContent = 'Last Name must be letters only';
    return false;
  } 
  lastNameErrorMsg.textContent = 'Entry Valid';
  return true;
}
const lastName = document.getElementById('lastName');
lastName.addEventListener('input', validateLastName);

// Validates the address input
function validateAddress(){
  const address = document.getElementById('address').value;
  if (address.length === 0){
    addressErrorMsg.textContent = 'Address Required';
    return false;
  }
  if (!address.match(/([A-Za-z0-9]+( [A-Za-z0-9]+)+)/i)){
    addressErrorMsg.textContent = 'Address must be in the format: 123 Main St';
    return false;
  } 
  addressErrorMsg.textContent = 'Entry Valid';
  return true;
}
const address = document.getElementById('address');
address.addEventListener('input', validateAddress);

// Validates the city input
function validateCity(){
  const city = document.getElementById('city').value;
  if (city.length === 0){
    cityErrorMsg.textContent = 'City Required';
    return false;
  }
  if (!city.match(/^[a-zA-Z]+$/)){
    cityErrorMsg.textContent = 'City must be letters only';
    return false;
  } 
  cityErrorMsg.textContent = 'Entry Valid';
  return true;
}
const city = document.getElementById('city');
city.addEventListener('input', validateCity);

// Validates the email input
function validateEmail(){
  const email = document.getElementById('email').value;
  if (email.length === 0){
    emailErrorMsg.textContent = 'Email Required';
    return false;
  }
  if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
    emailErrorMsg.textContent = 'Email Invalid';
    return false;
  }
  emailErrorMsg.textContent = 'Entry Valid';
  return true;
}
const email = document.getElementById('email');
email.addEventListener('input', validateEmail);

// Validates the form
function validateForm(){
  if (!validateFirstName() || !validateLastName() || !validateAddress() || !validateCity() || !validateEmail()){
    alert('Please complete all required fields and correct any errors.');
    return false;
  }
  if (validateFirstName() || validateLastName() || validateAddress() || validateCity() || validateEmail()){
    return true;
}
}
// -----------------------------------------------------

// Compiles the customer order and sends it to the server via a POST request when the order button is clicked
// Defines products array
const products = customerCartID;
// Gets the order input element
const customerForm = document.querySelector('#order');
// Adds an event listener to the order button
  customerForm.addEventListener('click', (event) => {
    // Validates the form
    const isFormValid = validateForm();
    // If the form is valid then send the order
    if (isFormValid){
      sendOrder(event);
    }
  });
// Sends the order to the server
function sendOrder(event){
  // Prevents the default action of the order button
  event.preventDefault();
  // Gets the customer info
  const contact = {
    contact : {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value
    },
    products: products,
  };
  // Sends the customer info to the server
  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  })
  .then(response => response.json())
  .then(data => {
    alert('Order Submitted');
    window.location = 'confirmation.html?id=' + data.orderId;
  })
}





