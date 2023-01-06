// Gets single product id 
const productUrl = window.location.search;
const urlParams = new URLSearchParams(productUrl);
const productID = urlParams.get("_id");
// Gets single product via product id
async function getProduct() {
    const response = await fetch('http://localhost:3000/api/products/' + (productID));
    const data = await response.json();
    console.log(data)
}
getProduct();
// TODO - Display the product on the product's page

    // And select the quantity
    // And select color option
// TODO - add products to the cart


