import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const itemIndex = draft.findIndex(p => p.id === action.id);

        if (itemIndex >= 0) {
          draft.splice(itemIndex, 1);
        }

      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        const itemIndex = draft.findIndex(p => p.id === action.id);


        if (itemIndex >= 0) {
          draft[itemIndex].amount = Number(action.amount);
        }
      })
    }
    default:
      return state;
  }

}
