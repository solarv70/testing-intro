function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0)
    throw new RangeError("Количество должно быть положительным.");

  const existingItem = cart.find((item) => item.id === product.id);
  const nextQuantity = (existingItem?.quantity || 0) + quantity;

  if (nextQuantity > product.stock) {
    throw new RangeError("Количество превышает остаток на складе.");
  }

  if (!existingItem) {
    return [...cart, { ...product, quantity }];
  }

  return cart.map((item) =>
    item.id === product.id ? { ...item, quantity: nextQuantity } : item,
  );
}
function changeQuantity(cart, productId, quantity) {
  const existingItem = cart.find((item) => item.id === productId);

  if (!existingItem) return [...cart];
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть положительным.");
  }
  if (quantity > existingItem.stock) {
    throw new RangeError("Количество превышает остаток на складе.");
  }

  return cart.map((item) =>
    item.id === productId ? { ...item, quantity } : item,
  );
}
function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}
function calculateCartSubtotal(cart) {
  return cart.reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0,
  );
}
function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount =
    promoCode === "SAVE10" && subtotal >= 20000 ? subtotal * 0.1 : 0;
  const delivery = subtotal < 50000 ? 30000 : 0;

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
