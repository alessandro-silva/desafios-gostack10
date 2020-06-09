import styled from 'styled-components/native';
// import { darken } from 'polished';
// import colors from '../../styles/colors';

export const Container = styled.View`
  /* flex: 1; */
  /* flex-direction: row; */
  max-width: 1020px;
  padding: 20px;
`;

export const Item = styled.View`
  background: #fff;
  padding: 10px;
  margin: 15px;
  border-radius: 4px;
  width: 220px;
`;

export const ItemImg = styled.Image`
  height: 200px;
  width: 200px;
  border-radius: 4px;
`;

export const ItemTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #666;
`;

export const ItemPrice = styled.Text`
  margin: 14px 0px;
  font-size: 20px;
  margin-bottom: 14px;
  color: #333;
  font-weight: bold;
`;

export const ButtonAdd = styled.TouchableOpacity`
  background: #7159c1;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  margin-top: auto;
`;

export const ItemAmount = styled.View`
  padding: 12px;
  background: #191920;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const ItemAmountText = styled.Text`
  color: #fff;
  margin: 0px 4px 0px 10px;
`;

export const ButtonText = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #fff;
`;
