import React from 'react';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Wrapper, Container, ButtonLogo, Logo, BasketView, ItemAdd } from './styles';

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);

  return (
    <Wrapper>
      <Container>
        <ButtonLogo onPress={() => navigation.navigate('Home')}>
        <Logo />
        </ButtonLogo>
        <BasketView onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ItemAdd>{cartSize}</ItemAdd>
        </BasketView>
      </Container>
    </Wrapper>
  );
}
