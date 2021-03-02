import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  getBoxType(method, cate1, ca_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        cate1,
        ca_id,
      }),
    });
  },
  getBoxTypeId(method, cate1, ca_id, type_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        cate1,
        ca_id,
        type_id,
      }),
    });
  },
};
