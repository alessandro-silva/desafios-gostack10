import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  Item,
  ItemImg,
  ItemTitle,
  ItemPrice,
  ButtonAdd,
  ItemAmount,
  ItemAmountText,
  ButtonText,
} from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state => state.cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount;

    return sumAmount;
  }, {}));

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  function renderAddItem({ item }) {
    return (
      <Item key={item.id}>
        <ItemImg
          source={{ uri: item.image }}
        />
        <ItemTitle>{item.title}</ItemTitle>
        <ItemPrice>{item.priceFormatted}</ItemPrice>
        <ButtonAdd onPress={() => handleAddProduct(item.id)}>
          <ItemAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <ItemAmountText>{amount[item.id] || 0}</ItemAmountText>
          </ItemAmount>
          <ButtonText>CARRINHO</ButtonText>
        </ButtonAdd>
      </Item>
    )
  }

  return (
    <Container>
      <FlatList
        horizontal
        data={products}
        // extraData={this.props}
        keyExtractor={item => String(item.id)}
        renderItem={renderAddItem}
      />
    </Container>
  );
}
