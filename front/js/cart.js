// Gets the cart from local storage
function getCartFromStorage(){
  return JSON.parse(localStorage.getItem('shoppingCart'));
}
// Gets the cart from local storage
const customerCart = getCartFromStorage();

// Gets the itemID from each item in the cart array
const customerCartID = customerCart.map(item => item.itemID);
// Fetches the product info for each item in the cart array
Promise.all(customerCartID.map(id => fetch(`http://localhost:3000/api/products/${id}`).then((data) => data.json())))
.then((data) =>{
  // Creates a new array with the product info and cart info combined
  const customerOrder = [];
  // Iterates over the product info array
  for (let i = 0; i < data.length; i++){
    // Combines the product info and cart info into a new object
    const newItem = {
      ...data[i],
      ...customerCart[i],
    }
    // Inserts the new object into the new array
    customerOrder.push(newItem);
  }
  insertCartItems(customerOrder);
});
// Inserts cart items into cart page
function insertCartItems(customerOrder){
  // Iterates over the cart array 
  for (let i = 0; i < customerOrder.length; i++){
    // Gets the existing section element on the cart page where cart items can be inserted
    const cartHolder = document.getElementById("cart__items");
    // Gets the current element in the cart array
    const item = customerOrder[i];
    // Creates a new cart item element
    // Inserts current element's info into new cart item element
    // And inserts new cart item element into the cart page
    cartHolder.innerHTML += `<article class="cart__item" data-id="${item.itemID}" data-color="${item.itemColor}">
    <div class="cart__item__img">
      <img src="${item.imageUrl}" alt="${item.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${item.name}</h2>
        <p>${item.itemColor}</p>
        <p>${item.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantity : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.itemQty}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>`;
  }
}

// Gets the sum of the price of items in the cart
Promise.all(customerCartID.map(id => fetch(`http://localhost:3000/api/products/${id}`).then((data) => data.json())))
.then((data) =>{
  // Creates a new array with the product info and cart info combined
  const customerTotal = [];
  // Iterates over the product info array
  for (let i = 0; i < data.length; i++){
    // Combines the product info and cart info into a new object
    const newItem = {
      ...data[i],
      ...customerCart[i],
    }
    customerTotal.push(newItem);
  }
  // Gets the price of each item in the cart
  const newCustomerTotal = customerTotal.map(total => total.price);
  // Gets the quantity of each item in the cart and converts it to a number
  const customerQty = customerTotal.map(qty => qty.itemQty).map(Number);
  // Gets the total price of each item in the cart
  const cartTotal = newCustomerTotal.map((total, index) => total * customerQty[index]).reduce((sum, index) => sum + index, 0);
  // Gets the total price element on the cart page
  const totalHolder = document.getElementById("totalPrice");
  // Inserts the total price into the total price element
  totalHolder.textContent = cartTotal;
});

// Gets the sum of the quantity of items in the cart
const cartQty = customerCart.map(qty => qty.itemQty).map(Number).reduce((sum, index) => sum + index, 0);
// Gets the total quantity element on the cart page
const totalQtyHolder = document.getElementById("totalQuantity");
// Inserts the sum of items in the cart into the total quantity element
totalQtyHolder.textContent = cartQty;












