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

// Gets the sum of items in the cart
function sumOfCartItems(customerCart){
  let sum = 0;
  const cartQty = customerCart.map(qty => qty.itemQty);
  const newCartQty = cartQty.map(Number);
  newCartQty.map(qty => sum += qty);
  return sum;
}
// Gets the total quantity element on the cart page
const totalQty = document.getElementById("totalQuantity");
// Inserts the sum of items in the cart into the total quantity element
totalQty.textContent = sumOfCartItems(customerCart);

// Gets the sum of the price of items in the cart
Promise.all(customerCartID.map(id => fetch(`http://localhost:3000/api/products/${id}`).then((data) => data.json())))
.then((data) =>{
  let cartTotal = 0;
  // Gets the price of each item in the cart
  const customerTotal = data.map(total => total.price);
  // Gets the quantity of each item in the cart
  customerTotal.map(total => cartTotal += total);
  // Gets the total price element on the cart page
  const totalHolder = document.getElementById("totalPrice");
  // Inserts the total price into the total price element
  totalHolder.textContent = cartTotal; 
});




