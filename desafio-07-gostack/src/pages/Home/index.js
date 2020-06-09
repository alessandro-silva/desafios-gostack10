import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

class Home extends Component {
  state= {
    products: [],
  }

  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

   addToCartRequest(id);
  }

  renderAddItem = ({ item }) => {
    const { amount } = this.props;

    return (
      <Item key={item.id}>
            <ItemImg
              source={{ uri: item.image }}
            />
            <ItemTitle>{item.title}</ItemTitle>
            <ItemPrice>{item.priceFormatted}</ItemPrice>
            <ButtonAdd onPress={() => this.handleAddProduct(item.id)}>
              <ItemAmount>
                <Icon name="add-shopping-cart" color="#FFF" size={20} />
                <ItemAmountText>{amount[item.id] || 0}</ItemAmountText>
              </ItemAmount>
              <ButtonText>CARRINHO</ButtonText>
            </ButtonAdd>
        </Item>
    )
  }

  render() {
    const { products } = this.state;

    return (
      <Container>
        <FlatList
          horizontal
          data={products}
          extraData={this.props}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderAddItem}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
