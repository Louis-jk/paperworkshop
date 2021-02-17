// action type
const SELECT_CATE1 = 'SELECT_CATE1';
const SELECT_CA_ID = 'SELECT_CA_ID';
const TYPE_ID = 'TYPE_ID';

// action method
export const selectCate1 = (payload) => ({type: SELECT_CATE1, payload});
export const selectCaId = (payload) => ({type: SELECT_CA_ID, payload});
export const selectTypeId = (payload) => ({type: SELECT_TYPE_ID, payload});

// initialize
const initialize = {
  cate1: null,
  ca_id: null,
  type_id: null,
};

// reducer create
export default function setOrder(state = initialize, action) {
  switch (action.type) {
    case SELECT_CATE1:
      return {
        ...state,
        cate1: action.payload,
      };
    case SELECT_CA_ID:
      return {
        ...state,
        ca_id: action.payload,
      };
    case TYPE_ID:
      return {
        ...state,
        type_id: action.payload,
      };
    default:
      return state;
  }
}
