export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSuccess(food) {
  return {
    type: '@cart/ADD_SUCCESS',
    food,
  };
}

export function updateAmount(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT',
    id,
    amount,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

export function removeAllFromCart(id) {
  return {
    type: '@cart/REMOVE_ALL',
    id,
  };
}
