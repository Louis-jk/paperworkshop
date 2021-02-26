import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  // 파트너스
  getPartners(method, ptype, cate1, popular, location) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        ptype,
        cate1,
        popular,
        location,
      }),
    });
  },
};
