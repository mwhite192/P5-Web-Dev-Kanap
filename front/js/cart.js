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
    // Saves the new cart array to local storage
    localStorage.setItem('shoppingCart', JSON.stringify(customerOrder));
    // Gets the price of each item in the cart
    const customerTotal = customerOrder.map((total) => total.price);
    // Gets the quantity of each item in the cart and converts it to a number
    const customerQty = customerOrder.map((qty) => Number(qty.itemQty));
    // Gets the total price of each item in the cart
    const cartTotal = customerTotal
      .map((itemPrice, index) => itemPrice * customerQty[index])
      .reduce((total, index) => total + index, 0);
    // Gets the total price element on the cart page
    const totalHolder = document.getElementById("totalPrice");
    // Inserts the total price into the total price element
    totalHolder.textContent = cartTotal;
  });
// -----------------------------------------------------

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
    let itemQuantity = document.querySelectorAll(".itemQuantity");
      for (let i = 0; i < itemQuantity.length; i++){
        itemQuantity[i].addEventListener("change", updateCart);
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
  const totalQtyHolder = document.getElementById("totalQuantity");
  // Gets the total price element on the cart page
  const totalPriceHolder = document.getElementById("totalPrice");
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
  console.log(customerCart);
// -----------------------------------------------------











