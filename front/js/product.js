// gets single product id 
const productUrl = window.location.search;
const urlParams = new URLSearchParams(productUrl);
const productID = urlParams.get("_id");
// gets single product via product id
async function getProduct() {
    const response = await fetch('http://localhost:3000/api/products/' + (productID));
    return response.json(); 
}
// displays the product on the product's page
async function loadPage() {
  const {imageUrl, name, price, description, colors} = await getProduct();
  // inserts product image
  const productImage = document.createElement("img");
  productImage.src = `${imageUrl}`;
  document.getElementsByClassName("item__img")[0].appendChild(productImage);
  // inserts product name
  const productTitle = document.getElementById("title");
  productTitle.textContent = name;
  // inserts prince of product
  const productPrice = document.getElementById("price");
  productPrice.textContent = price;
  // inserts product description
  const productDescription = document.getElementById("description");
  productDescription.textContent = description;

  // below adds color options to product page
  // loops through color array and inserts product color options
  for (let i = 0; i < colors.length; i++) {
    const colorChoice = document.getElementById("colors");
    const option = document.createElement("option");
    option.value = colors[i];
    option.text = colors[i];
    colorChoice.add(option);
  }
} 
loadPage();
// cart array that will be placed in local storage 
let cart = JSON.parse(localStorage.getItem('shoppingCart')||'[]');
// adds product to cart
function addToCart(){
  // creates the product object 
  const product = {itemID: productID};
  // gets the color and quantity values selected by user
  const itemColor = document.getElementById("colors").value;
  const itemQty = document.getElementById("quantity").value;
  // adds the color and quantity key value pairs to the product object
  product.itemColor = itemColor;
  product.itemQty = itemQty;
  return product;
} 
// adds cart to local storage
function saveCartToStorage(){
  localStorage.setItem('shoppingCart',JSON.stringify(cart));
}
// checks for duplicates and adds product to cart on 'click' event
document.getElementById("addToCart").addEventListener("click", () => {
     // stores returned product to variable
     const selectedItem = addToCart();
     // checks to see if item already exist in cart
     // stores existing product in variable to allow qty update
     const match = cart.find((thisItem) => (thisItem.itemID === selectedItem.itemID && thisItem.itemColor === selectedItem.itemColor));
     // increases qty should product already exist in cart or pushes new item to cart  
     if (match) {
       match.itemQty++;
       alert('Additional item added to cart')
     } else {
       cart.push(selectedItem);
       alert('Item added to cart');
     } 
     console.log(cart);
     // saves cart to browser's local storage
     saveCartToStorage();
});









