import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  // 이벤트 전체 리스트
  getEvent(search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_event_list',
        search,
      }),
    });
  },
};
