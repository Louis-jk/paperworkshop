// action type
const SELECT_CATE1 = 'SELECT_CATE1';
const SELECT_CA_ID = 'SELECT_CA_ID';
const SELECT_TYPE_ID = 'SELECT_TYPE_ID';
const SELECT_TYPE_NAME = 'SELECT_TYPE_NAME';
const SELECT_PF_ID = 'SELECT_PF_ID';
const SELECT_PD_ID = 'SELECT_PD_ID';
const SELECT_PN_ID = 'SELECT_PN_ID';
const SELECT_PAPER_NAME = 'SELECT_PAPER_NAME';
const SET_USER_ID = 'SET_USER_ID';
const SET_COMPANY_ID = 'SET_COMPANY_ID';
const SET_TITLE = 'SET_TITLE';
const SET_COMPANY = 'SET_COMPANY';
const SET_USER_NAME = 'SET_USER_NAME';
const SET_USER_MOBILE = 'SET_USER_MOBILE';
const SET_DESIGN = 'SET_DESIGN';
const SET_LOCATION = 'SET_LOCATION';
const SET_DELIVERY = 'SET_DELIVERY';
const SET_ESTIMATE = 'SET_ESTIMATE';
const SET_FILE_URL = 'SET_FILE_URL';
const SET_FILE_TYPE = 'SET_FILE_TYPE';
const SET_FILE_NAME = 'SET_FILE_NAME';
const SET_FILE_SIZE = 'SET_FILE_SIZE';
const SET_MEMO = 'SET_MEMO';
const SET_PWIDTH = 'SET_PWIDTH';
const SET_PLENGTH = 'SET_PLENGTH';
const SET_PHEIGHT = 'SET_PHEIGHT';
const SET_CNT = 'SET_CNT';
const SET_CNT_ETC = 'SET_CNT_ETC';
const SET_WOOD_PATTERN = 'SET_WOOD_PATTERN';
const SET_EASY_YN = 'SET_EASY_YN';
const SET_WEIGHT = 'SET_WEIGHT';
const SET_WEIGHT_ETC = 'SET_WEIGHT_ETC';
const SET_GOAL = 'SET_GOAL';
const SET_GOAL_ETC = 'SET_GOAL_ETC';
const SET_COLOR = 'SET_COLOR';
const SET_COLOR_ETC = 'SET_COLOR_ETC';
const SET_FREQUENCY = 'SET_FREQUENCY';
const SET_PRINTING = 'SET_PRINTING';
const SET_PRINT_SUPERVISION = 'SET_PRINT_SUPERVISION';
const SET_PARK_PROCESSING = 'SET_PARK_PROCESSING';
const SET_PRESS_DESIGN = 'SET_PRESS_DESIGN';
const SET_PARTIAL_SILK = 'SET_PARTIAL_SILK';
const SET_COATING = 'SET_COATING';
const SET_OUTSIDE = 'SET_OUTSIDE';
const SET_STATUS = 'SET_STATUS';

// action method
export const selectCate1 = (payload) => ({type: SELECT_CATE1, payload});
export const selectCaId = (payload) => ({type: SELECT_CA_ID, payload});
export const selectTypeId = (payload) => ({type: SELECT_TYPE_ID, payload});
export const selectTypeName = (payload) => ({type: SELECT_TYPE_NAME, payload});
export const selectPfId = (payload) => ({type: SELECT_PF_ID, payload});
export const selectPdId = (payload) => ({type: SELECT_PD_ID, payload});
export const selectPnId = (payload) => ({type: SELECT_PN_ID, payload});
export const selectPaperName = (payload) => ({
  type: SELECT_PAPER_NAME,
  payload,
});
export const setUserId = (payload) => ({type: SET_USER_ID, payload});
export const setCompanyId = (payload) => ({type: SET_COMPANY_ID, payload});
export const setUserTitle = (payload) => ({type: SET_TITLE, payload});
export const setUserCompany = (payload) => ({type: SET_COMPANY, payload});
export const setUserName = (payload) => ({type: SET_USER_NAME, payload});
export const setUserMobile = (payload) => ({type: SET_USER_MOBILE, payload});
export const setUserDesign = (payload) => ({type: SET_DESIGN, payload});
export const setUserLocation = (payload) => ({type: SET_LOCATION, payload});
export const setUserDelivery = (payload) => ({type: SET_DELIVERY, payload});
export const setUserEstimate = (payload) => ({type: SET_ESTIMATE, payload});
export const setUserFileUrl = (payload) => ({type: SET_FILE_URL, payload});
export const setUserFileType = (payload) => ({type: SET_FILE_TYPE, payload});
export const setUserFileName = (payload) => ({type: SET_FILE_NAME, payload});
export const setUserFileSize = (payload) => ({type: SET_FILE_SIZE, payload});
export const setUserMemo = (payload) => ({type: SET_MEMO, payload});
export const setUserPwidth = (payload) => ({type: SET_PWIDTH, payload});
export const setUserPlength = (payload) => ({type: SET_PLENGTH, payload});
export const setUserPheight = (payload) => ({type: SET_PHEIGHT, payload});
export const setUserCnt = (payload) => ({type: SET_CNT, payload});
export const setUserCntEtc = (payload) => ({type: SET_CNT_ETC, payload});
export const setUserWoodPattern = (payload) => ({
  type: SET_WOOD_PATTERN,
  payload,
});
export const setUserEasyYn = (payload) => ({type: SET_EASY_YN, payload});
export const setUserWeight = (payload) => ({type: SET_WEIGHT, payload});
export const setUserWeightEtc = (payload) => ({type: SET_WEIGHT_ETC, payload});
export const setUserGoal = (payload) => ({type: SET_GOAL, payload});
export const setUserGoalEtc = (payload) => ({type: SET_GOAL_ETC, payload});
export const setUserColor = (payload) => ({type: SET_COLOR, payload});
export const setUserColorEtc = (payload) => ({type: SET_COLOR_ETC, payload});
export const setUserFrequency = (payload) => ({type: SET_FREQUENCY, payload});
export const setUserPrinting = (payload) => ({type: SET_PRINTING, payload});
export const setUserPrintSup = (payload) => ({
  type: SET_PRINT_SUPERVISION,
  payload,
});
export const setUserParkProc = (payload) => ({
  type: SET_PARK_PROCESSING,
  payload,
});
export const setUserPressDgn = (payload) => ({type: SET_PRESS_DESIGN, payload});
export const setUserPartialSilk = (payload) => ({
  type: SET_PARTIAL_SILK,
  payload,
});
export const setUserCoating = (payload) => ({type: SET_COATING, payload});
export const setUserOutside = (payload) => ({type: SET_OUTSIDE, payload});
export const setUserStatus = (payload) => ({type: SET_STATUS, payload});

// initialize
const initialize = {
  cate1: null, // 분류아이디 (1차 카테고리('패키지','일반인쇄','기타인쇄'))
  ca_id: null, // 1차분류아이디('패키지 -> 칼라박스, ~~박스', '일반인쇄 -> 접지 ~~ 등')
  type_id: null, // 박스아이디
  type_name: null, // 박스아이디
  pf_id: null, // 지류아이디
  pd_id: null, // 지종아이디
  pn_id: null, // 지종상세아이디
  paper_name2: null, // 지종상세(직접입력)
  mb_id: null, // 회원 아이디
  company_id: null, // 업체 아이디
  title: null, // 제작명
  company: null, // 회사명
  mb_name: null, // 주문자명
  mb_hp: null, // 주문자 휴대폰 번호
  design_print: null, // 디자인의뢰
  favor_area: null, // 지역
  delivery_date: null, // 납품희망일자
  estimate_date: null, // 견적마감일자
  pe_file_url: null, // 첨부파일 url
  pe_file_type: null, // 첨부파일 type
  pe_file_name: null, // 첨부파일 name
  pe_file_size: null, // 첨부파일 size
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
    case SELECT_TYPE_NAME:
      return {
        ...state,
        type_name: action.payload,
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
    case SET_COMPANY_ID:
      return {
        ...state,
        company_id: action.payload,
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
    case SET_FILE_URL:
      return {
        ...state,
        pe_file_url: action.payload,
      };
    case SET_FILE_TYPE:
      return {
        ...state,
        pe_file_type: action.payload,
      };
    case SET_FILE_NAME:
      return {
        ...state,
        pe_file_name: action.payload,
      };
    case SET_FILE_SIZE:
      return {
        ...state,
        pe_file_size: action.payload,
      };
    case SET_MEMO:
      return {
        ...state,
        memo: action.payload,
      };
    case SET_PWIDTH:
      return {
        ...state,
        pwidth: action.payload,
      };
    case SET_PLENGTH:
      return {
        ...state,
        plength: action.payload,
      };
    case SET_PHEIGHT:
      return {
        ...state,
        pheight: action.payload,
      };
    case SET_CNT:
      return {
        ...state,
        cnt: action.payload,
      };
    case SET_CNT_ETC:
      return {
        ...state,
        cnt_etc: action.payload,
      };
    case SET_WOOD_PATTERN:
      return {
        ...state,
        wood_pattern: action.payload,
      };
    case SET_EASY_YN:
      return {
        ...state,
        easy_yn: action.payload,
      };
    case SET_WEIGHT:
      return {
        ...state,
        paper_weight: action.payload,
      };
    case SET_WEIGHT_ETC:
      return {
        ...state,
        paper_weight_etc: action.payload,
      };
    case SET_GOAL:
      return {
        ...state,
        paper_goal: action.payload,
      };
    case SET_GOAL_ETC:
      return {
        ...state,
        paper_goal_etc: action.payload,
      };
    case SET_COLOR:
      return {
        ...state,
        paper_color: action.payload,
      };
    case SET_COLOR_ETC:
      return {
        ...state,
        paper_color_etc: action.payload,
      };
    case SET_FREQUENCY:
      return {
        ...state,
        print_frequency: action.payload,
      };
    case SET_PRINTING:
      return {
        ...state,
        proof_printing: action.payload,
      };
    case SET_PRINT_SUPERVISION:
      return {
        ...state,
        print_supervision: action.payload,
      };
    case SET_PARK_PROCESSING:
      return {
        ...state,
        park_processing: action.payload,
      };
    case SET_PRESS_DESIGN:
      return {
        ...state,
        press_design: action.payload,
      };
    case SET_PARTIAL_SILK:
      return {
        ...state,
        partial_silk: action.payload,
      };
    case SET_COATING:
      return {
        ...state,
        coating: action.payload,
      };
    case SET_OUTSIDE:
      return {
        ...state,
        outside: action.payload,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
