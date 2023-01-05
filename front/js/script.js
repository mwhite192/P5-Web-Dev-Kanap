// TODO - get stuff or array of products from the backend API i.e., Products
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })
  .then((items) => {
    insertProducts(items);
  });

function insertProducts(items) {
  // TODO - get the existing element on the page where I can insert cards i.e., I think I saw it in the section tag
  const productHolder = document.getElementById("items");
  // TODO - iterate over the stuff that came from backend API i.e., array of products
  for (let i = 0; i < items.length; i++) {
    // and get the current element in the array
    const item = items[i];
    // and create a new card DOM element which will be inserted into the home page
    // and insert current element's info into new DOM card element
    productHolder.innerHTML += ` <a href="./product.html?${item.id}">
    <article>
      <img src="${item.imageUrl}" alt="${item.altTxt}">
      <h3 class="productName">${item.name}</h3>
      <p class="productDescription">${item.description}</p>
    </article>
    </a>`;
  }
}
