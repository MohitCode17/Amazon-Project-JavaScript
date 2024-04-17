export let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
      deliveryOptionId: "1",
    });
  }

  saveCartToStorage();
}

// 👉 Function: Save cart in localStorage
function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 👉 Function: Remove products from cart
export function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveCartToStorage();
}

// 👉 Function: Update cart quantity with new quantity
export function updateCartQuantity(productId, newQuantityValue) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantityValue;
    }
  });

  saveCartToStorage();
}

// 👉 Function: Calculate cart quantity
export function calculateCartQuantity() {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return totalQuantity;
}
