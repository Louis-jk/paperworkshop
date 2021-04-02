import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  sendOrder(frmdata) {
    return Send({
      method: 'post',
      data: frmdata,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getMyOrder(mb_id, status, cate1, search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_estimate_list',
        mb_id,
        status,
        cate1,
        search,
      }),
    });
  },
  getMyOrderDetail(pe_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_estimate_detail',
        pe_id,
      }),
    });
  },
  getMyOrderParticulars(method, pe_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        pe_id,
      }),
    });
  },
  getAllOrders(type) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_main_estimate_list',
        type,
      }),
    });
  },
  // 견적 요청 포기
  delOrder(pe_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_estimate_status',
        pe_id,
      }),
    });
  },
  // 견적 제안 보기
  getOfferDetail(pd_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_real2_estimate_detail',
        pd_id,
      }),
    });
  },
};
