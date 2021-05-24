import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  // 전체 갤러리
  getGallery(method, cate1, search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        cate1,
        search
      }),
    });
  },
  // 타입별 갤러리
  getGalleryType(method, cate1, ca_id, search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        cate1,
        ca_id: ca_id ? ca_id : null,
        search
      }),
    });
  },
};
