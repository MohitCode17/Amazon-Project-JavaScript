import { addToCart, calculateCartQuantity, cart } from "../data/cart.js";
import { products } from "../data/products.js";

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
            <select class="js-quantity-select-${product.id}">
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

        <div class="added-to-cart js-added-to-cart-${product.id}">
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
updateCartIconQuantity();

// 👉 Make "Add to cart" interactive
document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;

    addToCart(productId);
    updateCartIconQuantity();
    displayAddedToCartMessage(productId);
  });
});

// 👉 Function: Update cart quantity
function updateCartIconQuantity() {
  const totalQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
}

// Function: Display popup for added to cart
function displayAddedToCartMessage(productId) {
  const messageElement = document.querySelector(
    `.js-added-to-cart-${productId}`
  );

  messageElement.classList.add("added-to-cart-visible");

  setTimeout(() => {
    messageElement.classList.remove("added-to-cart-visible");
  }, 1000);
}
