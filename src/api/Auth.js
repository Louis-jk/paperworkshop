import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  onLogin(mb_id, mb_password, mb_3, mb_4) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_login_member',
        mb_id,
        mb_password,
        mb_3,
        mb_4,
      }),
    });
  },
  onSearchIdStep01(mb_name, mb_hp, mb_level) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_search_id',
        mb_name,
        mb_hp,
        mb_level,
      }),
    });
  },
  onSearchIdStep02(mb_name, mb_hp, cert_num, mb_level, rt_yn) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_search_id_confirm',
        mb_name,
        mb_hp,
        cert_num,
        mb_level,
        rt_yn,
      }),
    });
  },
  onSearchPwdStep01(mb_id, mb_hp, mb_level) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_search_pass',
        mb_id,
        mb_hp,
        mb_level,
      }),
    });
  },
  onSearchPwdStep02(mb_id, mb_hp, cert_num, mb_level, rt_yn) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_search_pass_confirm',
        mb_id,
        mb_hp,
        cert_num,
        mb_level,
        rt_yn,
        // check_yn,
      }),
    });
  },
  onSetPwd(mb_id, mb_password, mb_password_re) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_change_pass',
        mb_id,
        mb_password,
        mb_password_re,
      }),
    });
  },
  getMyInfo(mb_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_member_detail',
        mb_id,
      }),
    });
  },
};
