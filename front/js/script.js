// Gets array of products from the API
fetch("http://localhost:3000/api/products")

  .then((data) => {
    return data.json();
  })
  .then((items) => {
    insertProducts(items);
  });
 // Inserts products into homepage 
function insertProducts(items) {
  // Gets the existing section element on the page where cards can be inserted
  const productHolder = document.getElementById("items");
  // Iterates over the array of products that came from backend API
  for (let i = 0; i < items.length; i++) {
    // Gets the current element in the array
    const item = items[i];
    // Creates a new card element 
    // Inserts current element's info into new card element
    // And inserts new card element into the homepage
    productHolder.innerHTML += ` <a href="./product.html?_id=${item._id}">
    <article>
      <img src="${item.imageUrl}" alt="${item.altTxt}">
      <h3 class="productName">${item.name}</h3>
      <p class="productDescription">${item.description}</p>
    </article>
    </a>`;
  }
}
