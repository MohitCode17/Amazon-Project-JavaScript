export const cart = [];

// 👉 Function: Add to cart
export function addToCart(productId) {
  let matchingProduct;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  });

  // Take quantity from select input
  const selectInput = document.querySelector(
    `.js-quantity-select-${productId}`
  );
  const quantity = Number(selectInput.value);

  if (matchingProduct) {
    matchingProduct.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity: quantity,
    });
  }
}

// 👉 Function: Calculate cart quantity
export function calculateCartQuantity() {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return totalQuantity;
}
