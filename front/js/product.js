// Gets single product id 
const productUrl = window.location.search;
const urlParams = new URLSearchParams(productUrl);
const productID = urlParams.get("_id");
// Gets single product via product id
async function getProduct() {
    const response = await fetch('http://localhost:3000/api/products/' + (productID));
    return response.json(); 
}
// TODO - Display the product on the product's page
async function loadPage() {
    const product = await getProduct();
    // inserts product image 
    const productImage = document.createElement('img');
    productImage.src = `${product.imageUrl}`;
    document.getElementsByClassName('item__img')[0].appendChild(productImage);
    // inserts product name 
    const productTitle = document.getElementById('title');
    productTitle.textContent = product.name;
    // inserts prince of product
    const productPrice = document.getElementById('price');
    productPrice.textContent = product.price;
    // inserts product description
    const productDescription = document.getElementById('description');
    productDescription.textContent = product.description;

    // below adds color options to product page
    // loops through color array and inserts product color options
    for (let i = 0; i < product.colors.length; i++) {
      const colorChoice = document.getElementById("colors");
      const option = document.createElement("option");
      option.value = product.colors[i];
      option.text = product.colors[i];
      colorChoice.add(option);
    }
    // And select the quantity  
}
loadPage();
// TODO - add products to the cart


