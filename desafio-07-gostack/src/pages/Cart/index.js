import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CartActions from '../../store/modules/cart/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatPrice } from '../../util/format';

import {
  Container,
  Items,
  Item,
  ItemInfo,
  ItemImg,
  ItemDetails,
  ItemTitle,
  ItemPrice,
  ItemDelete,
  ItemControls,
  ItemAmount,
  ItemControlButton,
  ItemSubTotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,

 } from './styles';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1)
  }

  return (
    <Container>
      {cart.length ?
      <>
      <Items>
        {cart.map(product => (
          <Item key={product.id}>
          <ItemInfo>
            <ItemImg source={{ uri: product.image }} />
            <ItemDetails>
              <ItemTitle>{product.title}</ItemTitle>
              <ItemPrice>{product.priceFormatted}</ItemPrice>
            </ItemDetails>
            <ItemDelete onPress={() => removeFromCart(product.id)}>
              <Icon name="delete-forever" size={24} color="#7159c1" />
            </ItemDelete>
          </ItemInfo>
          <ItemControls>
            <ItemControlButton onPress={() => decrement(product)}>
              <Icon name="remove-circle" size={20} color="#7159c1" />
            </ItemControlButton>
            <ItemAmount>{product.amount}</ItemAmount>
            <ItemControlButton onPress={() => increment(product)}>
              <Icon name="add-circle" size={20} color="#7159c1" />
            </ItemControlButton>
            <ItemSubTotal>{product.subtotal}</ItemSubTotal>
          </ItemControls>
        </Item>
        ))}
      </Items>
      <TotalContainer>
        <TotalText>TOTAL</TotalText>
        <TotalAmount>{total}</TotalAmount>
        <Order>
          <OrderText>FINALIZAR PEDIDO</OrderText>
        </Order>
      </TotalContainer>
      </> :
      <EmptyContainer>
        <Icon name="remove-shopping-cart" size={78} color="#7159c1" />
        <EmptyText>Seu carinho está vazio</EmptyText>
      </EmptyContainer>
      }
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(state.cart.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0)),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
