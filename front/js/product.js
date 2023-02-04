// Gets single product id 
const productUrl = window.location.search;
const urlParams = new URLSearchParams(productUrl);
const productID = urlParams.get("_id");
// Gets single product via product id
async function getProduct(){
    const response = await fetch('http://localhost:3000/api/products/' + (productID));
    return response.json(); 
}

// Displays the product on the product's page
async function loadPage(){
  // Gets product info
  const {imageUrl, name, price, description, colors} = await getProduct();
  // Inserts product image
  const productImage = document.createElement("img");
  productImage.src = `${imageUrl}`;
  document.getElementsByClassName("item__img")[0].appendChild(productImage);
  // Inserts product name
  const productTitle = document.getElementById("title");
  productTitle.textContent = name;
  // Inserts prince of product
  const productPrice = document.getElementById("price");
  productPrice.textContent = price;
  // Inserts product description
  const productDescription = document.getElementById("description");
  productDescription.textContent = description;
  // Below adds color options to product page
  // Loops through color array and inserts product color options
  for (let i = 0; i < colors.length; i++){
    // Gets the existing select element on the page where color options can be inserted
    const colorChoice = document.getElementById("colors");
    // Creates a new option element
    const option = document.createElement("option");
    // Inserts current element's info into new option element
    option.value = colors[i];
    option.text = colors[i];
    // Inserts new option element into the product page
    colorChoice.add(option);
  }
} 
loadPage();

// Cart array that will be placed in local storage 
let cart = JSON.parse(localStorage.getItem('shoppingCart')||'[]');
// Adds product to cart
function addToCart(){
  // Creates the product object 
  const product = {itemID: productID};
  // Gets the color and quantity values selected by user
  const itemColor = document.getElementById("colors").value;
  const itemQty = document.getElementById("quantity").value;
  // Adds the color and quantity key value pairs to the product object
  product.itemColor = itemColor;
  product.itemQty = itemQty;
  return product;
} 

// Adds cart to local storage
function saveCartToStorage(){
  localStorage.setItem('shoppingCart',JSON.stringify(cart));
}
// Checks for duplicates and adds product to cart on 'click' event
document.getElementById("addToCart").addEventListener("click", () => {
     // Stores returned product to variable
     const selectedItem = addToCart();
     // Checks to see if item already exist in cart
     // Stores existing product in variable to allow qty update
     const match = cart.find((thisItem) => (thisItem.itemID === selectedItem.itemID && thisItem.itemColor === selectedItem.itemColor));
     // Increases qty should product already exist in cart or pushes new item to cart  
     if (match) {
       match.itemQty++;
       alert('Additional item added to cart')
     } else {
       cart.push(selectedItem);
       alert('Item added to cart');
     } 
     // Saves cart to browser's local storage
     saveCartToStorage();
});









