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
  getMyOrder(mb_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_estimate_list',
        mb_id,
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
};
