import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  // 전체 갤러리
  getPartner(method, cate1) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        cate1,
      }),
    });
  },
  // 타입별 갤러리
  getPartnerType(method, cate1, ca_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        cate1,
        ca_id: ca_id ? ca_id : null,
      }),
    });
  },
};
