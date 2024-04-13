/*
👉 Make "Add to cart" interactive

Steps to Follow:-

1. Grab all the buttons using JS, Add event to it.
2. Create Cart, When clicking to button product should added to cart

💡 Cart is kind of an array, which stores all products in kind of object form

🤔 Here we need to figuring out how do we know which product to add in cart ?

We have products.js file and each product has its own unique id. We can put that id to button, to determine which product should added to cart

Data Attribute:-
- is just another HTML attribute
- allows us to attach any information to an element
*/

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
            <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img src="images/ratings/rating-${
              product.rating.stars * 10
            }.png" class="product-rating-stars">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
            <select>
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>

        <div class="added-to-cart">
            <img src="images/icons/checkmark.png" >
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id=${
          product.id
        }>Add to Cart</button>
    </div>
  `;
});

// Render productsHTML into HTML element
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// 👉 Make "Add to cart" interactive
document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;

    cart.push({
      productId,
      quantity: 1,
    });
    console.log(cart);
  });
});
