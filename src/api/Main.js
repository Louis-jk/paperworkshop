import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  onSlider(method, bn_position) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        bn_position,
      }),
    });
  },
};
