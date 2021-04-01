import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  // 검색어 히스토리 가져오기 및 추가, 삭제
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
  // 검색 결과 가져오기
  getSearchResult(keyword) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_search',
        keyword,
      }),
    });
  },
};
