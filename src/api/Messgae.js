import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  //  메세지(채팅방 입장 전 리스트 페이지)
  onChatList(mb_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_my_message_list',
        mb_id,
      }),
    });
  },
};
