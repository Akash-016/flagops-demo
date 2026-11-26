import flagsmith from "./flagsmith-client.js";

export function renderCheckout(cart) {
  const limit = flagsmith.getValue("max_cart_items");
  if (cart.items.length > limit) {
    return { error: `You can have at most ${limit} items in your cart.` };
  }

  if (flagsmith.hasFeature("checkout_v2")) {
    return { page: "checkout-v2", items: cart.items };
  }
  return { page: "checkout", items: cart.items };
}

export function addToCart(cart, item) {
  if (cart.items.length >= flagsmith.getValue("max_cart_items")) return false;
  cart.items.push(item);
  return true;
}
