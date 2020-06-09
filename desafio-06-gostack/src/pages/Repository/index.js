import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

import { Container, Header, Avatar, Name } from './styles';

export default class Repository extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('star').name,
  });

  state = {};

  render() {
    const { navigation } = this.props;

    const user = navigation.getParam('star');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.owner.avatar_url }} />
          <Name>{user.owner.login}</Name>
        </Header>
        <WebView source={{ uri: user.html_url }} style={{ flex: 1 }} />
      </Container>
    );
  }
}
