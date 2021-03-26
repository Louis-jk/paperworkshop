import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  onReviews(cate1, search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_story_review',
        cate1,
        search,
      }),
    });
  },
};
