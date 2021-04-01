import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  getSearchHistory(mb_id, id, keyword, insert, del) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_search_history',
        mb_id,
        id,
        keyword,
        insert,
        delete: del,
      }),
    });
  },
};
