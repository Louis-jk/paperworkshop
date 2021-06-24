import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  // 파트너스 불러오기
  getPartners(ptype, cate1, popular, location, search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_list',
        ptype,
        cate1,
        popular,
        location,
        search,
      }),
    });
  },
  // 파트너스 상세 불러오기(특정 파트너스 값 가져오기)
  getPartnerChoise(company_id, mb_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_detail',
        company_id,
        mb_id,
      }),
    });
  },
  // 리뷰 등록하기
  sendReview(frmData) {
    return Send({
      method: 'post',
      data: frmData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  // 리뷰 가져오기
  getReview(company_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_review_list',
        company_id,
      }),
    });
  },
  // 리뷰 상세 가져오기
  getReviewDetail(pr_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_review_detail',
        pr_id,
      }),
    });
  },
  // 나의 파트너스 불러오기
  getMyPartners(mb_id, ptype, cate1, popular, location, search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_partner_list',
        mb_id,
        ptype,
        cate1,
        popular,
        location,
        search,
      }),
    });
  },
  // 나의 파트너 (찜하기)
  setFavorPartner(mb_id, company_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_zzim',
        mb_id,
        company_id,
      }),
    });
  },
  // 파트너 선정(나의 견적에서 파트너 선정)
  setEstimatePartner(pd_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_estimate_partner_yn',
        pd_id,
      }),
    });
  },
  // 파트너 선정(계약금 입금완료)
  setDepositPartner(pe_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_estimate_status2',
        pe_id,
      }),
    });
  },
  // 파트너 선정(인쇄 제작요청)
  setOrderProduct(pe_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_estimate_status3',
        pe_id,
      }),
    });
  },
  // 파트너 선정(수령완료)
  setOrderComplete(pe_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_estimate_status4',
        pe_id,
      }),
    });
  },
  // 메인페이지 파트너 3개씩 출력 부분
  getPartnerMain(ptype) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_main_partner_list',
        ptype,
      }),
    });
  },
};
