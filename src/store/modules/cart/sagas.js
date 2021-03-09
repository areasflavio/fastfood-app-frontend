import { select, put, all, takeLatest } from 'redux-saga/effects';

import db from '../../../db.json';

import { formatPrice } from '../../../utils/format';

import { addToCartSuccess, updateAmount } from './actions';

function* addToCart({ id }) {
  const foodExists = yield select((state) =>
    state.cart.find((food) => food.id === id)
  );

  if (foodExists) {
    const amount = foodExists.amount + 1;

    yield put(updateAmount(id, amount));
  } else {
    const food = db.foods[id - 1];

    const data = {
      ...food,
      amount: 1,
      priceFormatted: formatPrice(food.price),
    };

    yield put(addToCartSuccess(data));
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
