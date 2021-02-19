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
  cate1: null, // 1차 카테고리('패키지','일반인쇄','기타인쇄')
  ca_id: null, // 2차 카테고리('패키지 -> 칼라박스, ~~박스', '일반인쇄 -> 접지 ~~ 등')
  type_id: null,
  mb_id: null, // 회원 아이디
  title: null, // 제작명
  company: null, // 회사명
  mb_name: null, // 주문자명
  mb_hp: null, // 주문자 휴대폰 번호
  ord_company: null, // 주문자 회사명
  design_print: null,
  favor_area: null,
  delivery_date: null,
  estimate_date: null,
  pe_file: [],
  memo: null,
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
