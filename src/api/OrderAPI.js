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
};
