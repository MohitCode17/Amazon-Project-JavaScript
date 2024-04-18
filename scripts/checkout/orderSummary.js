import {
  calculateCartQuantity,
  cart,
  removeFromCart,
  updateCartQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderOrderSummary() {
  let orderSummaryHTML = "";

  cart.forEach((cartItem) => {
    const { productId, deliveryOptionId } = cartItem;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd MMMM, DD");

    orderSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${
        matchingProduct.id
      }">
          <div class="delivery-date">Delivery date: ${dateString}</div>
  
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
              ${renderDeliveryOptions(matchingProduct.id, deliveryOptionId)}
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

      updateCheckoutHeaderQuantity();
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

  // 👉 Function to render delivery options
  function renderDeliveryOptions(matchingProductId, deliveryOptionId) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd MMMM, DD");

      const deliveryPriceString =
        deliveryOption.deliveryPriceCents === 0
          ? "FREE"
          : `$${(deliveryOption.deliveryPriceCents / 100).toFixed(2)}`;

      const isChecked = deliveryOption.id === deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option" data-product-id=${matchingProductId} data-delivery-option-id=${
        deliveryOption.id
      }>
        <input
          type="radio"
          ${isChecked && "checked"}
          class="delivery-option-input"
          name="delivery-option-${matchingProductId}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${deliveryPriceString} - Shipping</div>
        </div>
      </div>
      `;
    });

    return html;
  }

  // 👉 Make delivery option interactive
  document.querySelectorAll(".js-delivery-option").forEach((deliveryOption) => {
    deliveryOption.addEventListener("click", () => {
      const { productId, deliveryOptionId } = deliveryOption.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
    });
  });

  // 👉 Function: Update quantity in checkout header
  function updateCheckoutHeaderQuantity() {
    const totalQuantity = calculateCartQuantity();
    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${totalQuantity} items`;
  }
}
