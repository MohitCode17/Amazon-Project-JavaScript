export const cart = [
  // Dummary data, we'll remove this soon
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

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
