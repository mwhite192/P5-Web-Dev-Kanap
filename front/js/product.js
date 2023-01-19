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
// TODO - add product to the cart
// cart array that will be placed in local storage 
let cart = [];
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
document.getElementById("addToCart").addEventListener("click", () => {
     // stores returned product to variable
     const selectedItem = addToCart();
     // checks to see if item already exist in cart
     const hasMatchingItem = cart.some((thisItem) => (thisItem.productID === selectedItem.productID && thisItem.itemColor === selectedItem.itemColor));
     // pushes item to cart or increases qty should product already exist in cart
     if (hasMatchingItem) {
       alert("item already exist");
     } else {
       cart.push(selectedItem);
     } 
});
console.log(cart);








// // creates item object based off product info
// const item = {
//     itemID: productID,
//     itemColor: itemColor,
//     itemQty: itemQty,
// };
// //checks to see if product already exist in cart
// if(cart.some((item) => item.itemColor === item.itemColor)){
//     alert("Item Already Exists!");
// }
// else{
//     cart.push(item);
//     console.log(cart);
// } 



// if (hasMatchingItem) {
//   alert("item already exist")
// } else {
// cart.push(hasMatchingItem);
// }