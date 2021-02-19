import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  onLogin(method, mb_id, mb_password, mb_3, mb_4) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        mb_id,
        mb_password,
        mb_3,
        mb_4,
      }),
    });
  },
};
