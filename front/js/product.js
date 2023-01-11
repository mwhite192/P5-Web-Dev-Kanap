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
    const productImage = document.createElement('img');
    productImage.src = `${product.imageUrl}`;
    document.getElementsByClassName('item__img')[0].appendChild(productImage);
    const productTitle = document.getElementById('title');
    productTitle.textContent = product.name;
    const productPrice = document.getElementById('price');
    productPrice.textContent = product.price;
    const productDescription = document.getElementById('description');
    productDescription.textContent = product.description;
    // And select the quantity
    // And select color option
}
loadPage();
// TODO - add products to the cart


