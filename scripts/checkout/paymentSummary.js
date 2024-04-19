import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingCents = 0;

  cart.forEach((cartItem) => {
    let product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingCents += deliveryOption.deliveryPriceCents;
  });

  const totalBeforePriceCents = productPriceCents + shippingCents;
  const taxCents = totalBeforePriceCents * 0.1;
  const totalOrderPriceCents = totalBeforePriceCents + taxCents;

  const html = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$${(
        Math.round(productPriceCents) / 100
      ).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${(
        Math.round(shippingCents) / 100
      ).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${(
        Math.round(totalBeforePriceCents) / 100
      ).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${(
        Math.round(taxCents) / 100
      ).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${(
        Math.round(totalOrderPriceCents) / 100
      ).toFixed(2)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
    `;

  document.querySelector(".js-payment-summary").innerHTML = html;
}
