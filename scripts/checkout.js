import {
  calculateCartQuantity,
  cart,
  removeFromCart,
  updateCartQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";

let orderSummaryHTML = "";

cart.forEach((cartItem) => {
  const { productId } = cartItem;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  orderSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>

        <div class="cart-item-details-grid">
            <img
            class="product-image"
            src="${matchingProduct.image}"
            />

            <div class="cart-item-details">
            <div class="product-name">
               ${matchingProduct.name}
            </div>
            <div class="product-price">$${(
              matchingProduct.priceCents / 100
            ).toFixed(2)}</div>
            <div class="product-quantity">
                <span> Quantity: <span class="quantity-label js-quantity-label-${
                  matchingProduct.id
                }">${cartItem.quantity}</span> </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id=${
                  matchingProduct.id
                }>
                Update
                </span>

                <input type="number" class="new-quantity-input js-new-quantity-input-${
                  matchingProduct.id
                }" value="1">
                <span class="save-quantity-link link-primary js-save-link" data-product-id=${
                  matchingProduct.id
                }>Save</span>

                <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${
                  matchingProduct.id
                }>
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input
                type="radio"
                checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                />
                <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
                </div>
            </div>
            <div class="delivery-option">
                <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                />
                <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
                </div>
            </div>
            <div class="delivery-option">
                <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                />
                <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
                </div>
            </div>
            </div>
        </div>
    </div>
  `;
});

document.querySelector(".js-order-summary").innerHTML = orderSummaryHTML;

updateCheckoutHeaderQuantity();

// 👉 Make Delete link interactive, when clicked product remove from cart
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    removeFromCart(productId);

    const itemContainer = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    itemContainer.remove();
  });
});

// 👉 Make update link interactive, when click new input box and save link should be display
document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;

    const itemContainer = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    itemContainer.classList.add("is-editing-quantity");
  });
});

// 👉 Make save link interactive, when click new input box and save link should be hide & update link should be display
document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;

    const itemContainer = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    itemContainer.classList.remove("is-editing-quantity");

    const newQuantityInputElement = document.querySelector(
      `.js-new-quantity-input-${productId}`
    );
    const newQuantityValue = Number(newQuantityInputElement.value);
    updateCartQuantity(productId, newQuantityValue);

    let quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );

    quantityLabel.innerHTML = newQuantityValue;

    updateCheckoutHeaderQuantity();
  });
});

// 👉 Function: Update quantity in checkout header
function updateCheckoutHeaderQuantity() {
  const totalQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${totalQuantity} items`;
}
