import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  // 파트너스
  getPartners(ptype, cate1, popular, location) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_list',
        ptype,
        cate1,
        popular,
        location,
      }),
    });
  },
  getMyPartners(mb_id, ptype, cate1, popular, location) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_partner_list',
        mb_id,
        ptype,
        cate1,
        popular,
        location,
      }),
    });
  },
  setFavorPartner(mb_id, company_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_zzim',
        mb_id,
        company_id,
      }),
    });
  },
};
