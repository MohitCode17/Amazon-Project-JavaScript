/*
👉 Create HTML for order summary and display in checkout page using JavaScript

Steps to Follow:-
1. We'll loop through the cart and took all the products inside of it.
2. We've product id and quantity inside the cart, We grab product id.
3. Check that product id inside the products.js
4. And display thoose products which match with id
*/

import { calculateCartQuantity, cart } from "../data/cart.js";
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
    <div class="cart-item-container">
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
                <span> Quantity: <span class="quantity-label">${
                  cartItem.quantity
                }</span> </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary">
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

updateQuantity();

// 👉 Function: Update quantity in checkout header
function updateQuantity() {
  const totalQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${totalQuantity} items`;
}
