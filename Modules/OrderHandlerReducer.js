// action type
const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';

// action method
export const setOrderDetails = (payload) => ({
  type: SET_ORDER_DETAILS,
  payload,
});

// initialize
const initialize = {
  type_details: null, // 2차 카테고리 세부내용
};

// reducer create
export default function setOrder(state = initialize, action) {
  switch (action.type) {
    case SET_ORDER_DETAILS:
      return {
        ...state,
        type_details: action.payload,
      };
    default:
      return state;
  }
}
