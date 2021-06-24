// action type
const SELECT_CATE1 = 'SELECT_CATE1';
const SELECT_CA_ID = 'SELECT_CA_ID';
const SELECT_TYPE_ID = 'SELECT_TYPE_ID';
const SELECT_TYPE_NAME = 'SELECT_TYPE_NAME';
const SELECT_PF_ID = 'SELECT_PF_ID';
const SELECT_PF_ID02 = 'SELECT_PF_ID02';
const SELECT_PD_ID = 'SELECT_PD_ID';
const SELECT_PD_ID02 = 'SELECT_PD_ID02';
const SELECT_PN_ID = 'SELECT_PN_ID';
const SELECT_PN_ID02 = 'SELECT_PN_ID02';
const SELECT_PF_DIRECT_NAME = 'SELECT_PF_DIRECT_NAME';
const SELECT_PF_DIRECT_NAME2 = 'SELECT_PF_DIRECT_NAME2';
const SELECT_PAPER_NAME = 'SELECT_PAPER_NAME';
const SELECT_PAPER_NAME02 = 'SELECT_PAPER_NAME02';
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
const SET_STYPE = 'SET_STYPE';
const SET_BOARD_TK = 'SET_BOARD_TK';
const SET_GROUND_METHOD = 'SET_GROUND_METHOD';
const SET_WAY_EDIT = 'SET_WAY_EDIT';
const SET_EASY_YN = 'SET_EASY_YN';
const SET_WEIGHT = 'SET_WEIGHT';
const SET_WEIGHT_ETC = 'SET_WEIGHT_ETC';
const SET_WEIGHT_ETC02 = 'SET_WEIGHT_ETC02';
const SET_GOAL = 'SET_GOAL';
const SET_GOAL_ETC = 'SET_GOAL_ETC';
const SET_COLOR = 'SET_COLOR';
const SET_COLOR02 = 'SET_COLOR02';
const SET_COLOR_ETC = 'SET_COLOR_ETC';
const SET_COLOR_ETC02 = 'SET_COLOR_ETC02';
const SET_FREQUENCY = 'SET_FREQUENCY';
const SET_PRINTING = 'SET_PRINTING';
const SET_PRINT_SUPERVISION = 'SET_PRINT_SUPERVISION';
const SET_PARK_PROCESSING = 'SET_PARK_PROCESSING';
const SET_PRESS_DESIGN = 'SET_PRESS_DESIGN';
const SET_PARTIAL_SILK = 'SET_PARTIAL_SILK';
const SET_NUMBERING = 'SET_NUMBERING';
const SET_COATING = 'SET_COATING';
const SET_OUTSIDE = 'SET_OUTSIDE';
const SET_STATUS = 'SET_STATUS';

/////////// 추가 건
const SET_PAGE_CNT = 'SET_PAGE_CNT';
const SET_PAGE_CNT2 = 'SET_PAGE_CNT2';
const SET_BIND_TYPE = 'SET_BIND_TYPE';
const SET_STANDARD = 'SET_STANDARD';
const SET_STANDARD_ETC = 'SET_STANDARD_ETC';
const SET_THOMSON_TYPE = 'SET_THOMSON_TYPE';
const SET_WRITEING_PAPER = 'SET_WRITEING_PAPER';
const SET_COVER_COLOR = 'SET_COVER_COLOR';
const SET_SECTION_COLOR = 'SET_SECTION_COLOR';
const SET_BACK_SIDE = 'SET_BACK_SIDE';
const SET_GEOMANCER = 'SET_GEOMANCER';
const SET_FILE02_URL = 'SET_FILE02_URL';
const SET_FILE02_TYPE = 'SET_FILE02_TYPE';
const SET_FILE02_NAME = 'SET_FILE02_NAME';
const SET_FILE02_SIZE = 'SET_FILE02_SIZE';
const SET_WEIGHT2 = 'SET_WEIGHT2';
const SET_FREQUENCY2 = 'SET_FREQUENCY2';
const SET_PRINTING2 = 'SET_PRINTING2';
const SET_PRINT_SUPERVISION2 = 'SET_PRINT_SUPERVISION2';
const SET_PARK_PROCESSING2 = 'SET_PARK_PROCESSING2';
const SET_PRESS_DESIGN2 = 'SET_PRESS_DESIGN2';
const SET_PARTIAL_SILK2 = 'SET_PARTIAL_SILK2';
const SET_COATING2 = 'SET_COATING2';

const RESET = 'RESET';

// action method
export const selectCate1 = (payload) => ({type: SELECT_CATE1, payload});
export const selectCaId = (payload) => ({type: SELECT_CA_ID, payload});
export const selectTypeId = (payload) => ({type: SELECT_TYPE_ID, payload});
export const selectTypeName = (payload) => ({type: SELECT_TYPE_NAME, payload});
export const selectPfId = (payload) => ({type: SELECT_PF_ID, payload});
export const selectPdId = (payload) => ({type: SELECT_PD_ID, payload});
export const selectPnId = (payload) => ({type: SELECT_PN_ID, payload});
export const selectPfId02 = (payload) => ({type: SELECT_PF_ID02, payload});
export const selectPdId02 = (payload) => ({type: SELECT_PD_ID02, payload});
export const selectPnId02 = (payload) => ({type: SELECT_PN_ID02, payload});
export const selectPaperName = (payload) => ({
  type: SELECT_PAPER_NAME,
  payload,
});
export const selectPaperName02 = (payload) => ({
  type: SELECT_PAPER_NAME02,
  payload,
});
export const selectPfDirectName = (payload) => ({
  type: SELECT_PF_DIRECT_NAME,
  payload,
});
export const selectPfDirectName2 = (payload) => ({
  type: SELECT_PF_DIRECT_NAME2,
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
export const setUserStype = (payload) => ({type: SET_STYPE, payload});
export const setUserBoardTk = (payload) => ({type: SET_BOARD_TK, payload});
export const setUserGroundMethod = (payload) => ({
  type: SET_GROUND_METHOD,
  payload,
});
export const setUserWayEdit = (payload) => ({type: SET_WAY_EDIT, payload});
export const setUserEasyYn = (payload) => ({type: SET_EASY_YN, payload});
export const setUserWeight = (payload) => ({type: SET_WEIGHT, payload});
export const setUserWeightEtc = (payload) => ({type: SET_WEIGHT_ETC, payload});
export const setUserWeightEtc02 = (payload) => ({
  type: SET_WEIGHT_ETC02,
  payload,
});
export const setUserGoal = (payload) => ({type: SET_GOAL, payload});
export const setUserGoalEtc = (payload) => ({type: SET_GOAL_ETC, payload});
export const setUserColor = (payload) => ({type: SET_COLOR, payload});
export const setUserColor02 = (payload) => ({type: SET_COLOR02, payload});
export const setUserColorEtc = (payload) => ({type: SET_COLOR_ETC, payload});
export const setUserColorEtc02 = (payload) => ({
  type: SET_COLOR_ETC02,
  payload,
});
export const setUserFrequency = (payload) => ({type: SET_FREQUENCY, payload});
export const setUserPrinting = (payload) => ({type: SET_PRINTING, payload});
export const setUserPrintSup = (payload) => ({
  type: SET_PRINT_SUPERVISION,
  payload,
});

export const setUserOutside = (payload) => ({type: SET_OUTSIDE, payload});
export const setUserStatus = (payload) => ({type: SET_STATUS, payload});

export const setUserPageCnt = (payload) => ({type: SET_PAGE_CNT, payload});
export const setUserPageCnt2 = (payload) => ({type: SET_PAGE_CNT2, payload});
export const setUserBindType = (payload) => ({type: SET_BIND_TYPE, payload});
export const setUserStandard = (payload) => ({type: SET_STANDARD, payload});
export const setUserStandardEtc = (payload) => ({
  type: SET_STANDARD_ETC,
  payload,
});
export const setUserThomsonType = (payload) => ({
  type: SET_THOMSON_TYPE,
  payload,
});
export const setUserWriteP = (payload) => ({type: SET_WRITEING_PAPER, payload});
export const setUserCoverColor = (payload) => ({
  type: SET_COVER_COLOR,
  payload,
});
export const setUserSectionColor = (payload) => ({
  type: SET_SECTION_COLOR,
  payload,
});
export const setUserBackSide = (payload) => ({type: SET_BACK_SIDE, payload});
export const setUserGeomancer = (payload) => ({type: SET_GEOMANCER, payload});
export const setUserFile02Url = (payload) => ({type: SET_FILE02_URL, payload});
export const setUserFile02Type = (payload) => ({
  type: SET_FILE02_TYPE,
  payload,
});
export const setUserFile02Name = (payload) => ({
  type: SET_FILE02_NAME,
  payload,
});
export const setUserFile02Size = (payload) => ({
  type: SET_FILE02_SIZE,
  payload,
});
export const setUserWeight2 = (payload) => ({type: SET_WEIGHT2, payload});
export const setUserFrequency2 = (payload) => ({type: SET_FREQUENCY2, payload});
export const setUserPrinting2 = (payload) => ({type: SET_PRINTING2, payload});
export const setUserPrintSup2 = (payload) => ({
  type: SET_PRINT_SUPERVISION2,
  payload,
});

/////////// 후가공
export const setUserParkProc = (payload) => ({
  type: SET_PARK_PROCESSING,
  payload,
});
export const setUserParkProc2 = (payload) => ({
  type: SET_PARK_PROCESSING2,
  payload,
});
export const setUserPressDgn = (payload) => ({type: SET_PRESS_DESIGN, payload});
export const setUserPressDgn2 = (payload) => ({
  type: SET_PRESS_DESIGN2,
  payload,
});
export const setUserPartialSilk = (payload) => ({
  type: SET_PARTIAL_SILK,
  payload,
});
export const setUserPartialSilk2 = (payload) => ({
  type: SET_PARTIAL_SILK2,
  payload,
});
export const setUserNumbering = (payload) => ({
  type: SET_NUMBERING,
  payload,
});
export const setUserCoating = (payload) => ({type: SET_COATING, payload});
export const setUserCoating2 = (payload) => ({type: SET_COATING2, payload});

export const resetState = () => ({type: RESET, initialize});

// initialize
const initialize = {
  cate1: '', // 분류아이디 (1차 카테고리('패키지','일반인쇄','기타인쇄'))
  ca_id: '', // 1차분류아이디('패키지 -> 칼라박스, ~~박스', '일반인쇄 -> 접지 ~~ 등')
  type_id: '', // 박스아이디
  type_name: '', // 박스아이디
  pf_id: '', // 지류아이디
  pf_id2: '', // 지류아이디 - 내지
  pd_id: '', // 지종아이디
  pd_id2: '', // 지종아이디 - 내지
  pn_id: '', // 지종상세아이디
  pn_id2: '', // 지종상세아이디 - 내지
  pf_direct_name: '', // 지류 (직접입력)
  pf_direct_name2: '', // 지류 - 내지 (직접입력)
  paper_name2: '', // 지종상세(직접입력)
  paper_name2_02: '', // 지종상세(직접입력) - 내지
  mb_id: '', // 회원 아이디
  company_id: '', // 업체 아이디
  title: '', // 제작명
  company: '', // 회사명
  mb_name: '', // 주문자명
  mb_hp: '', // 주문자 휴대폰 번호
  design_print: '', // 디자인의뢰
  favor_area: '', // 지역
  delivery_date: '', // 납품희망일자
  estimate_date: '', // 견적마감일자
  pe_file_url: '', // 첨부파일 url
  pe_file_type: '', // 첨부파일 type
  pe_file_name: '', // 첨부파일 name
  pe_file_size: '', // 첨부파일 size
  memo: '', // 메모
  pwidth: '', // 가로규격
  plength: '', // 세로규격
  pheight: '', // 높이규격
  cnt: '', // 수량
  cnt_etc: '', // 수량(직접입력)
  wood_pattern: '', // 목형
  stype: '', // 싸바리형태
  board_tk: '', // 속지 판지두께
  ground_method: '', // 접지방법
  way_edit: '', // 편집방법
  easy_yn: 'N', // 간편견적여부
  page_cnt: '', // 페이지수
  page_cnt2: '', // 페이지수(내지)
  bind_type: '', // 제본방식
  standard: '', // 규격
  standard_etc: '', // 규격 직접입력
  thomson_type: '', // 톰슨모양
  writeing_paper: '', // 간지
  cover_color: '', // 표지간지색상
  section_color: '', // 섹션간지색상
  back_side: '', // 후면반칼형
  geomancer: '', // 지관
  pe_file02_url: '', // 첨부파일02 url
  pe_file02_type: '', // 첨부파일02 type
  pe_file02_name: '', // 첨부파일02 name
  pe_file02_size: '', // 첨부파일02 size
  paper_weight: '', // 평량
  paper_weight2: '', // 평량(내지)
  paper_weight_etc: '', // 평량(직접입력)
  paper_weight_etc2: '', // 평량(직접입력) -- 추가
  paper_goal: '', // 골
  paper_goal_etc: '', // 골(직접입력)
  paper_color: '', // 색상
  paper_color2: '', // 색상 - 내지
  paper_color_etc: '', // 색상(직접입력)
  paper_color_etc2: '', // 색상(직접입력)
  print_frequency: '', // 인쇄도수
  print_frequency2: '', // 인쇄도수(내지)
  proof_printing: '', // 인쇄교정
  proof_printing2: '', // 인쇄교정(내지)
  print_supervision: '', // 인쇄감리
  print_supervision2: '', // 인쇄감리(내지)
  park_processing: '', // 박가공
  park_processing2: '', // 박가공
  press_design: '', // 형압
  press_design2: '', // 형압
  partial_silk: '', // 부분실크
  partial_silk2: '', // 부분실크(내지)
  coating: '', // 코팅
  coating2: '', // 코팅(내지)
  outside: '', // 바깥면여부
  status: '', // 상태
};

// reducer create
export default function setOrder(state = initialize, action) {
  switch (action.type) {
    case RESET:
      return {
        cate1: '',
        ca_id: '',
        type_id: '',
        type_name: '',
        pf_id: '',
        pf_id2: '',
        pd_id: '',
        pd_id2: '',
        pn_id: '',
        pn_id2: '',
        paper_name2: '',
        paper_name2_02: '',
        mb_id: '',
        company_id: '',
        title: '',
        company: '',
        mb_name: '',
        mb_hp: '',
        design_print: '',
        favor_area: '',
        delivery_date: '',
        estimate_date: '',
        pe_file_url: '',
        pe_file_type: '',
        pe_file_name: '',
        pe_file_size: '',
        memo: '',
        pwidth: '',
        plength: '',
        pheight: '',
        cnt: '',
        cnt_etc: '',
        wood_pattern: '',
        stype: '',
        board_tk: '',
        ground_method: '',
        way_edit: '',
        easy_yn: 'N',
        page_cnt: '',
        page_cnt2: '',
        bind_type: '',
        standard: '',
        thomson_type: '',
        writeing_paper: '',
        cover_color: '',
        section_color: '',
        back_side: '',
        geomancer: '',
        pe_file02_url: '',
        pe_file02_type: '',
        pe_file02_name: '',
        pe_file02_size: '',
        paper_weight: '',
        paper_weight2: '',
        paper_weight_etc: '',
        paper_weight_etc2: '',
        paper_goal: '',
        paper_goal_etc: '',
        paper_color: '',
        paper_color2: '',
        paper_color_etc: '',
        paper_color_etc2: '',
        print_frequency: '',
        print_frequency2: '',
        proof_printing: '',
        proof_printing2: '',
        print_supervision: '',
        print_supervision2: '',
        park_processing: '',
        park_processing2: '',
        press_design: '',
        press_design2: '',
        partial_silk: '',
        partial_silk2: '',
        numbering: '',
        coating: '',
        coating2: '',
        outside: 'N',
        status: '',
      };
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
    case SELECT_PF_ID02:
      return {
        ...state,
        pf_id2: action.payload,
      };
    case SELECT_PD_ID:
      return {
        ...state,
        pd_id: action.payload,
      };
    case SELECT_PD_ID02:
      return {
        ...state,
        pd_id2: action.payload,
      };
    case SELECT_PN_ID:
      return {
        ...state,
        pn_id: action.payload,
      };
    case SELECT_PN_ID02:
      return {
        ...state,
        pn_id2: action.payload,
      };
    case SELECT_PF_DIRECT_NAME:
      return {
        ...state,
        pf_direct_name: action.payload,
      };
    case SELECT_PF_DIRECT_NAME2:
      return {
        ...state,
        pf_direct_name2: action.payload,
      };
    case SELECT_PAPER_NAME:
      return {
        ...state,
        paper_name2: action.payload,
      };
    case SELECT_PAPER_NAME02:
      return {
        ...state,
        paper_name2_02: action.payload,
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
    case SET_STYPE:
      return {
        ...state,
        stype: action.payload,
      };
    case SET_BOARD_TK:
      return {
        ...state,
        board_tk: action.payload,
      };
    case SET_GROUND_METHOD:
      return {
        ...state,
        ground_method: action.payload,
      };
    case SET_WAY_EDIT:
      return {
        ...state,
        way_edit: action.payload,
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
    case SET_WEIGHT_ETC02:
      return {
        ...state,
        paper_weight_etc2: action.payload,
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
    case SET_COLOR02:
      return {
        ...state,
        paper_color2: action.payload,
      };
    case SET_COLOR_ETC:
      return {
        ...state,
        paper_color_etc: action.payload,
      };
    case SET_COLOR_ETC02:
      return {
        ...state,
        paper_color_etc2: action.payload,
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
    case SET_PAGE_CNT:
      return {
        ...state,
        page_cnt: action.payload,
      };
    case SET_PAGE_CNT2:
      return {
        ...state,
        page_cnt2: action.payload,
      };
    case SET_BIND_TYPE:
      return {
        ...state,
        bind_type: action.payload,
      };
    case SET_STANDARD:
      return {
        ...state,
        standard: action.payload,
      };
    case SET_STANDARD_ETC:
      return {
        ...state,
        standard_etc: action.payload,
      };
    case SET_THOMSON_TYPE:
      return {
        ...state,
        thomson_type: action.payload,
      };
    case SET_WRITEING_PAPER:
      return {
        ...state,
        writeing_paper: action.payload,
      };
    case SET_COVER_COLOR:
      return {
        ...state,
        cover_color: action.payload,
      };
    case SET_SECTION_COLOR:
      return {
        ...state,
        section_color: action.payload,
      };
    case SET_BACK_SIDE:
      return {
        ...state,
        back_side: action.payload,
      };
    case SET_GEOMANCER:
      return {
        ...state,
        geomancer: action.payload,
      };
    case SET_FILE02_URL:
      return {
        ...state,
        pe_file02_url: action.payload,
      };
    case SET_FILE02_TYPE:
      return {
        ...state,
        pe_file02_type: action.payload,
      };
    case SET_FILE02_NAME:
      return {
        ...state,
        pe_file02_name: action.payload,
      };
    case SET_FILE02_SIZE:
      return {
        ...state,
        pe_file02_size: action.payload,
      };
    case SET_WEIGHT2:
      return {
        ...state,
        paper_weight2: action.payload,
      };
    case SET_FREQUENCY2:
      return {
        ...state,
        print_frequency2: action.payload,
      };
    case SET_PRINTING2:
      return {
        ...state,
        proof_printing2: action.payload,
      };
    case SET_PRINT_SUPERVISION2:
      return {
        ...state,
        print_supervision2: action.payload,
      };
    case SET_PARK_PROCESSING2:
      return {
        ...state,
        park_processing2: action.payload,
      };
    case SET_PRESS_DESIGN2:
      return {
        ...state,
        press_design2: action.payload,
      };
    case SET_PARTIAL_SILK2:
      return {
        ...state,
        partial_silk2: action.payload,
      };
    case SET_NUMBERING:
      return {
        ...state,
        numbering: action.payload,
      };
    case SET_COATING2:
      return {
        ...state,
        coating2: action.payload,
      };
    default:
      return state;
  }
}
