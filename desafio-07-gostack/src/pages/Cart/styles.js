import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  margin: 15px;

`;
export const Items = styled.View`

`;

export const Item = styled.View`
  border: 1px solid #eee;
  margin-bottom: 10px;
  border-radius: 4px;
`;

export const ItemInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ItemImg = styled.Image`
  height: 90px;
  width: 90px;
  margin: 2px 0 0 2px;
  border-radius: 4px;
`;

export const ItemDetails = styled.View`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
`;

export const ItemTitle = styled.Text`
  font-weight: bold;
  color: #666;
`;

export const ItemPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
  color: #7159c1;
`;

export const ItemDelete = styled.TouchableOpacity`
  padding: 6px;
`;

export const ItemControls = styled.View`
  flex-direction: row;
  align-items: center;
  /* background: #eee; */
  margin: 3px 0 3px 0;
  padding: 8px;
  border-radius: 4px;
`;

export const ItemAmount = styled.TextInput.attrs({
  readonly: true,
})`
  padding: 5px;
  margin: 0 5px;
  color: #333;
  font-weight: bold;
  border-radius: 4px;
  /* min-width: 5px; */
  text-align: center;
`;

export const ItemControlButton = styled.TouchableOpacity`
`;

export const ItemSubTotal = styled.Text`
  font-weight: bold;
  font-size: 16px;
  flex: 1;
  text-align: right;
`;

export const TotalContainer = styled.View`
 margin-top: 10px;
`;

export const TotalText = styled.Text`
  text-align: center;
  color: #999;
  font-weight: bold;
`;

export const TotalAmount = styled.Text`
  text-align: center;
  margin-top: 5px;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
`;

export const Order = styled.TouchableOpacity`
  background: #7159c1;
  padding: 12px;
  border-radius: 4px;
`;

export const OrderText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const EmptyText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 18px;
  color: #333;
`;
