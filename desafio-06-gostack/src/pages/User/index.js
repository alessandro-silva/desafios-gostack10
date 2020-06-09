import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  ButtonDiv,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    stars: [],
    loading: false,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadPages();
  }

  loadPages = async () => {
    const { navigation } = this.props;
    const { stars, page } = this.state;
    const user = navigation.getParam('user');

    if (page === 1) {
      this.setState({ loading: true });
    }
    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    });
  };

  loadInclude = async () => {
    const { page } = this.state;

    await this.setState({
      page: page < 1 ? page + 1 : page + 1,
    });
    this.loadPages();
  };

  pullRefresh = () => {
    this.setState({ page: 1, refreshing: true, stars: [] }, this.loadPages);
  };

  handleNavigate = async (star) => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { star });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container loading={loading}>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator color="#333" size={40} />
        ) : (
          <Stars
            data={stars}
            onRefresh={this.pullRefresh}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadInclude}
            keyExtractor={(star) => String(star.id)}
            renderItem={({ item }) => (
              <ButtonDiv onPress={() => this.handleNavigate(item)}>
                <Starred>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              </ButtonDiv>
            )}
          />
        )}
      </Container>
    );
  }
}
