import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  getBoxType(cate1, ca_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_box_list',
        cate1,
        ca_id,
      }),
    });
  },
  getBoxTypeId(cate1, ca_id, type_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_box_list',
        cate1,
        ca_id,
        type_id,
      }),
    });
  },
};
