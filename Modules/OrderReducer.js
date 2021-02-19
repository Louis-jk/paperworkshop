// action type
const SELECT_CATE1 = 'SELECT_CATE1';
const SELECT_CA_ID = 'SELECT_CA_ID';
const TYPE_ID = 'TYPE_ID';
const PF_ID = 'PF_ID';
const PD_ID = 'PD_ID';
const PN_ID = 'PN_ID';

// action method
export const selectCate1 = (payload) => ({type: SELECT_CATE1, payload});
export const selectCaId = (payload) => ({type: SELECT_CA_ID, payload});
export const selectTypeId = (payload) => ({type: SELECT_TYPE_ID, payload});
export const selectPfId = (payload) => ({type: SELECT_PF_ID, payload});
export const selectPdId = (payload) => ({type: SELECT_PD_ID, payload});
export const selectPnId = (payload) => ({type: SELECT_PN_ID, payload});

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
  ord_company: null, // 주문자 회사명
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
    case TYPE_ID:
      return {
        ...state,
        type_id: action.payload,
      };
    case PF_ID:
      return {
        ...state,
        pf_id: action.payload,
      };
    case PD_ID:
      return {
        ...state,
        pd_id: action.payload,
      };
    case PN_ID:
      return {
        ...state,
        pn_id: action.payload,
      };
    default:
      return state;
  }
}
