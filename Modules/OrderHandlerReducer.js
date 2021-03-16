// action type
const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
const SET_LOCATION = 'SET_LOCATION';

// action method
export const setOrderDetails = (payload) => ({
  type: SET_ORDER_DETAILS,
  payload,
});
export const setPartnerLocation = (payload) => ({
  type: SET_LOCATION,
  payload,
});

// initialize
const initialize = {
  type_details: null, // 2차 카테고리 세부내용
  partner_location: [], // 파트너스 등록 지역
};

// reducer create
export default function setOrder(state = initialize, action) {
  switch (action.type) {
    case SET_ORDER_DETAILS:
      return {
        ...state,
        type_details: action.payload,
      };
    case SET_LOCATION:
      return {
        ...state,
        partner_location: action.payload,
      };
    default:
      return state;
  }
}
