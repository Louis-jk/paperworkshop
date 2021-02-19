// action type
const SELECT_CATE1 = 'SELECT_CATE1';
const SELECT_CA_ID = 'SELECT_CA_ID';
const SELECT_TYPE_ID = 'SELECT_TYPE_ID';
const SELECT_PF_ID = 'SELECT_PF_ID';
const SELECT_PD_ID = 'SELECT_PD_ID';
const SELECT_PN_ID = 'SELECT_PN_ID';
const SELECT_PAPER_NAME = 'SELECT_PAPER_NAME';
const SET_USER_ID = 'SET_USER_ID';
const SET_TITLE = 'SET_TITLE';
const SET_COMPANY = 'SET_COMPANY';
const SET_USER_NAME = 'SET_USER_NAME';
const SET_USER_MOBILE = 'SET_USER_MOBILE';
const SET_DESIGN = 'SET_DESIGN';
const SET_LOCATION = 'SET_LOCATION';
const SET_DELIVERY = 'SET_DELIVERY';
const SET_ESTIMATE = 'SET_ESTIMATE';
const SET_FILE = 'SET_FILE';
const SET_MEMO = 'SET_MEMO';

// action method
export const selectCate1 = (payload) => ({type: SELECT_CATE1, payload});
export const selectCaId = (payload) => ({type: SELECT_CA_ID, payload});
export const selectTypeId = (payload) => ({type: SELECT_TYPE_ID, payload});
export const selectPfId = (payload) => ({type: SELECT_PF_ID, payload});
export const selectPdId = (payload) => ({type: SELECT_PD_ID, payload});
export const selectPnId = (payload) => ({type: SELECT_PN_ID, payload});
export const selectPaperName = (payload) => ({
  type: SELECT_PAPER_NAME,
  payload,
});
export const setUserId = (payload) => ({type: SET_USER_ID, payload});
export const setTitle = (payload) => ({type: SET_TITLE, payload});
export const setCompany = (payload) => ({type: SET_COMPANY, payload});
export const setUserName = (payload) => ({type: SET_USER_NAME, payload});
export const setUserMobile = (payload) => ({type: SET_USER_MOBILE, payload});
export const setDesign = (payload) => ({type: SET_DESIGN, payload});
export const setLocation = (payload) => ({type: SET_LOCATION, payload});
export const setDelivery = (payload) => ({type: SET_DELIVERY, payload});
export const setEstimate = (payload) => ({type: SET_ESTIMATE, payload});
export const setFile = (payload) => ({type: SET_FILE, payload});
export const setMemo = (payload) => ({type: SET_MEMO, payload});

// initialize
const initialize = {
  cate1: null, // 1차 카테고리('패키지','일반인쇄','기타인쇄')
  ca_id: null, // 2차 카테고리('패키지 -> 칼라박스, ~~박스', '일반인쇄 -> 접지 ~~ 등')
  type_id: null, // 박스아이디
  pf_id: null, // 지류아이디
  pd_id: null, // 지종아이디
  pn_id: null, // 지종상세아이디
  paper_name2: null, // 지종상세(직접입력)
  mb_id: null, // 회원 아이디
  title: null, // 제작명
  company: null, // 회사명
  mb_name: null, // 주문자명
  mb_hp: null, // 주문자 휴대폰 번호
  design_print: null, // 디자인의뢰
  favor_area: null, // 지역
  delivery_date: null, // 납품희망일자
  estimate_date: null, // 견적마감일자
  pe_file: [], // 첨부파일
  memo: null, // 메모
  pwidth: 0, // 가로규격
  plength: 0, // 세로규격
  pheight: 0, // 높이규격
  cnt: 0, // 수량
  cnt_etc: 0, // 수량(직접입력)
  wood_pattern: null, // 목형
  easy_yn: null, // 간편견적여부
  paper_weight: 0, // 평량
  paper_weight_etc: 0, // 평량(직접입력)
  paper_goal: null, // 골
  paper_goal_etc: null, // 골(직접입력)
  paper_color: null, // 색상
  paper_color_etc: null, // 색상(직접입력)
  print_frequency: null, // 인쇄도수
  proof_printing: null, // 인쇄교정
  print_supervision: null, // 인쇄감리
  park_processing: null, // 박가공
  press_design: null, // 형압
  partial_silk: null, // 부분실크
  coating: null, // 코팅
  outside: null, // 바깥면여부
  status: null, // 상태
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
    case SELECT_TYPE_ID:
      return {
        ...state,
        type_id: action.payload,
      };
    case SELECT_PF_ID:
      return {
        ...state,
        pf_id: action.payload,
      };
    case SELECT_PD_ID:
      return {
        ...state,
        pd_id: action.payload,
      };
    case SELECT_PN_ID:
      return {
        ...state,
        pn_id: action.payload,
      };
    case SELECT_PAPER_NAME:
      return {
        ...state,
        paper_name2: action.payload,
      };
    case SET_USER_ID:
      return {
        ...state,
        mb_id: action.payload,
      };
    case SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case SET_COMPANY:
      return {
        ...state,
        company: action.payload,
      };
    case SET_USER_NAME:
      return {
        ...state,
        mb_name: action.payload,
      };
    case SET_USER_MOBILE:
      return {
        ...state,
        mb_hp: action.payload,
      };
    case SET_DESIGN:
      return {
        ...state,
        design_print: action.payload,
      };
    case SET_LOCATION:
      return {
        ...state,
        favor_area: action.payload,
      };
    case SET_DELIVERY:
      return {
        ...state,
        delivery_date: action.payload,
      };
    case SET_ESTIMATE:
      return {
        ...state,
        estimate_date: action.payload,
      };
    case SET_FILE:
      return {
        ...state,
        pe_file: action.payload,
      };
    case SET_MEMO:
      return {
        ...state,
        memo: action.payload,
      };
    default:
      return state;
  }
}
