import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  getBoxType(cate1, ca_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_box_list',
        cate1,
        ca_id,
      }),
    });
  },
  //
  getBoxTypeId(cate1, ca_id, type_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_box_list',
        cate1,
        ca_id,
        type_id,
      }),
    });
  },
  // 지류 초기값 가져오기
  getPaperInitialInfo(cate1, ca_id, type_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_feeder_list',
        cate1,
        ca_id,
        type_id,
      }),
    });
  },
  // 지류 해당 상세 정보 가져오기 - 경우에 따라 표지용
  getPaper1DepthInfo(cate1, ca_id, pf_id, type_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_paper_list',
        cate1,
        ca_id,
        pf_id,
        type_id,
      }),
    });
  },
  // 지종 세부 가져오기
  getPaperDetailInfo(ca_id, pd_id, in_yn) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_paper_detail_list',
        ca_id,
        pd_id,
        in_yn,
      }),
    });
  },
  // 지종 가져오기(지종세부 없는 경우)
  getPaperNoDetailInfo(cate1, ca_id, pf_id, pd_id, paper_name) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_paper_list_nodetail',
        cate1,
        ca_id,
        pf_id,
        pd_id,
        paper_name,
      }),
    });
  },
  // 색상 정보 가져오기
  getColorInfo(pd_id, paper_name2, paper_weight, in_yn) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_paper_color_list',
        pd_id,
        paper_name2,
        paper_weight,
        in_yn,
      }),
    });
  },
  // 인쇄도수/인쇄교정/인쇄감리 가져오기
  getCheckPrint(cate1, ca_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_check_print',
        cate1,
        ca_id,
      }),
    });
  },
  // 후가공
  getPostProcess(cate1, ca_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_postprocess_detail',
        cate1,
        ca_id,
      }),
    });
  },
};
