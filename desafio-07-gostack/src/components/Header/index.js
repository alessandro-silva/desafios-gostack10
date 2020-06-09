import React from 'react';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Wrapper, Container, ButtonLogo, Logo, BasketView, ItemAdd } from './styles';

function Header({ navigation, cartSize }) {
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

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
