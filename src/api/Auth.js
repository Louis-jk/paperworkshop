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
  onSearchIdStep01(method, mb_name, mb_hp, mb_level) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        mb_name,
        mb_hp,
        mb_level,
      }),
    });
  },
  onSearchIdStep02(method, mb_name, mb_hp, cert_num, mb_level, rt_yn) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        mb_name,
        mb_hp,
        cert_num,
        mb_level,
        rt_yn,
      }),
    });
  },
  onSearchPwdStep01(method, mb_id, mb_hp, mb_level) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        mb_id,
        mb_hp,
        mb_level,
      }),
    });
  },
  onSearchPwdStep02(method, mb_id, mb_hp, cert_num, mb_level, rt_yn) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        mb_id,
        mb_hp,
        cert_num,
        mb_level,
        rt_yn,
        // check_yn,
      }),
    });
  },
  onSetPwd(method, mb_id, mb_password, mb_password_re) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        mb_id,
        mb_password,
        mb_password_re,
      }),
    });
  },
};
