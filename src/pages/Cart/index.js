import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FiEdit3,
  FiPlusCircle,
  FiMinusCircle,
  FiTrash,
  FiTrash2,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Container from '../../components/Container';
import { HeadDiv, DishesList, Controls, Footer, EmptyCart } from './styles';

import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../utils/format';

export default function Cart() {
  const cart = useSelector((state) =>
    state.cart.map((food) => ({
      ...food,
      subtotal: formatPrice(food.price * food.amount),
    }))
  );

  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce(
        (totalSum, food) => totalSum + food.price * food.amount,
        0
      )
    )
  );

  const dispatch = useDispatch();

  function incrementAmount(food) {
    dispatch(CartActions.updateAmount(food.id, food.amount + 1));
  }

  function decrementAmount(food) {
    dispatch(CartActions.updateAmount(food.id, food.amount - 1));
  }

  function handleClearCart() {
    dispatch(CartActions.removeAllFromCart());
  }

  return (
    <>
      <Header title={['Shop', 'cart']} />

      {cart.length === 0 ? (
        <Container>
          <h2>My order</h2>
          <EmptyCart>
            <h3>Oops...</h3>
            <strong>You have not placed any order yet</strong>
            <Link to="/menu">Look the menu</Link>
          </EmptyCart>
        </Container>
      ) : (
        <Container>
          <HeadDiv>
            <h2>My order</h2>
            <Link to="/menu">
              <FiEdit3 size={18} />
            </Link>
          </HeadDiv>
          <DishesList>
            {cart.map((food) => (
              <li key={food.id}>
                <img src={food.image_url} alt={food.title} />

                <section>
                  <Controls>
                    <button type="button" onClick={() => incrementAmount(food)}>
                      <FiPlusCircle size={16} />
                    </button>
                    <button type="button" onClick={() => decrementAmount(food)}>
                      <FiMinusCircle size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(CartActions.removeFromCart(food.id))
                      }
                    >
                      <FiTrash size={16} />
                    </button>
                  </Controls>

                  <h3>{food.amount}</h3>
                  <small> X </small>
                  <strong>{food.title}</strong>
                </section>

                <h3>{food.subtotal}</h3>
              </li>
            ))}
          </DishesList>
          <Footer>
            <section>
              <button type="button" onClick={handleClearCart} id="clear">
                <FiTrash2 size={16} color="#ff5853" />
              </button>

              <button type="button" id="checkout">
                Checkout
              </button>
            </section>
            <div>
              <strong>Total Amount:</strong>
              <h2>{total}</h2>
            </div>
          </Footer>
        </Container>
      )}
    </>
  );
}
