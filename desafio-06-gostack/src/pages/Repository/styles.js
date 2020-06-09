import styled from 'styled-components/native';
import {} from 'react-native-webview';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  padding-bottom: 10px;
  border-color: #eee;
  background: #24292e;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin-top: 8px;
  border-radius: 50px;
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #eee;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;
