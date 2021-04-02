import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'; // 파일 다운로드 패키지
import Modal from 'react-native-modal';
import AutoHeightImage from 'react-native-auto-height-image';
import FastImage from 'react-native-fast-image';

import DetailHeader from '../../Common/DetailHeader';
import OrderAPI from '../../../src/api/OrderAPI';

const OrderDetail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const pe_id = props.route.params.pe_id;
  const cate1 = props.route.params.cate1;

  const [details, setDetails] = React.useState([]);

  // 기타인쇄 견적이 아닌 "일반인쇄", "패키지 인쇄의 경우"
  const [info01, setInfo01] = React.useState([]); // 제작정보 사이즈 등 정보
  const [info02, setInfo02] = React.useState([]); // 지류 지종 평량 골 등의 정보
  const [info03, setInfo03] = React.useState([]); // 인쇄도수, 인쇄감리, 인쇄교정 등의 정보
  const [info04, setInfo04] = React.useState([]); // 후가공 정보
  const [isLoading, setLoading] = React.useState(false);

  const getMyOrderParticularsAPI = () => {
    setLoading(true);
    let method = '';

    if (cate1 === '0') {
      method = 'proc_my_real_estimate_detail';
    } else if (cate1 === '1') {
      method = 'proc_my_real_estimate_detail2';
    } else {
      method = 'proc_my_real_estimate_detail3';
    }

    OrderAPI.getMyOrderParticulars(method, pe_id)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setDetails(res.data.item.basic);
          if (cate1 !== '2') {
            setInfo01(res.data.item.basic2);
            setInfo02(res.data.item.feeder);
            setInfo03(res.data.item.print);
            setInfo04(res.data.item.end);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getMyOrderParticularsAPI();
  }, []);

  // 파일 다운로드 핸들러
  const fileDownloadHandler = (filePath, fileName) => {
    Alert.alert('파일을 다운로드 하시겠습니까?', '', [
      {
        text: '다운드로',
        onPress: () => downloader(filePath, fileName),
      },
      {
        text: '취소',
      },
    ]);
  };

  // 파일 다운로드 메소드
  const downloader = async (filePath, fileName) => {
    await RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`,
      },
    })
      .fetch('GET', filePath)
      .then((res) => {
        Alert.alert('다운로드 되었습니다.', '내파일에서 확인해주세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  // 이미지 모달창
  const ImageModal = ({toggleModal, isVisible, imgPath}) => {
    return (
      <View>
        <Modal
          isVisible={isVisible}
          // onBackdropPress={toggleModal}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginBottom: 20}}>
            <AutoHeightImage
              width={Dimensions.get('window').width - 40}
              source={{uri: `${imgPath}`}}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleModal}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#fff',
              paddingHorizontal: 14,
              paddingVertical: 7,
            }}>
            <Text style={{fontFamily: 'SCDream4', fontSize: 13, color: '#fff'}}>
              닫기
            </Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [imgPath, setImgPath] = React.useState(false);

  // 이미지 모달 핸들러
  const imageModalHandler = (path) => {
    setModalVisible(!isModalVisible);
    setImgPath(path);
  };

  return (
    <>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            flex: 1,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            elevation: 0,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <ActivityIndicator size="large" color="#275696" />
        </View>
      )}

      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageModal
          imgPath={imgPath}
          isVisible={isModalVisible}
          toggleModal={imageModalHandler}
        />
        <View style={styles.wrap}>
          <Text
            style={[
              styles.mediumText,
              {fontSize: 16, color: '#275696', marginBottom: 10},
            ]}>
            기본 정보
          </Text>
          <View style={[styles.infoBox, {marginBottom: 20}]}>
            <Text style={styles.infoStepDesc}>제목</Text>
            <Text style={styles.infoStepTitle}>{details.title}</Text>
            <View style={styles.line} />
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>분류</Text>
              <Text style={styles.detailsDesc}>{details.ca_name}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>견적 마감일</Text>
              <Text style={styles.detailsDesc}>{details.estimate_date}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>납품 희망일</Text>
              <Text style={styles.detailsDesc}>{details.delivery_date}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>디자인 의뢰</Text>
              <Text style={styles.detailsDesc}>
                {details.design_print === 'P'
                  ? '인쇄만 의뢰'
                  : details.design_print === 'D'
                  ? '인쇄 + 디자인의뢰'
                  : null}
              </Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>인쇄 업체 선호 지역</Text>
              <Text style={styles.detailsDesc}>
                {details.favor_area === 'seoul'
                  ? '서울'
                  : details.favor_area === 'busan'
                  ? '부산'
                  : details.favor_area === 'daegu'
                  ? '대구'
                  : details.favor_area === 'incheon'
                  ? '인천'
                  : details.favor_area === 'gwangju'
                  ? '광주'
                  : details.favor_area === 'sejong'
                  ? '세종'
                  : details.favor_area === 'ulsan'
                  ? '울산'
                  : details.favor_area === 'gyeongi'
                  ? '경기'
                  : details.favor_area === 'gangwon'
                  ? '강원'
                  : details.favor_area === 'choongcheong'
                  ? '충청'
                  : details.favor_area === 'jeonra'
                  ? '전라'
                  : details.favor_area === 'gyeongsang'
                  ? '경상'
                  : details.favor_area === 'jeju'
                  ? '제주'
                  : null}
              </Text>
            </View>
          </View>
          <Text
            style={[
              styles.normalText,
              {fontSize: 14, color: '#A2A2A2', marginBottom: 10},
            ]}>
            첨부파일 01
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            {details.pe_file &&
            (details.type_name === 'jpg' || details.type_name === 'png') ? (
              <TouchableOpacity
                onPress={() => imageModalHandler(details.pe_file)}>
                <Image
                  source={{uri: `${details.pe_file}`}}
                  resizeMode="cover"
                  style={{
                    width: 114,
                    height: 114,
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
            ) : details.pe_file && details.type_name === 'gif' ? (
              <TouchableOpacity
                onPress={() => imageModalHandler(details.pe_file)}>
                <FastImage
                  source={{uri: `${details.pe_file}`}}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{
                    width: 114,
                    height: 114,
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
            ) : details.pe_file &&
              (details.type_name !== 'jpg' ||
                details.type_name !== 'png' ||
                details.type_name !== 'gif') ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  fileDownloadHandler(details.pe_file, details.pe_source_file)
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../src/assets/down.png')}
                  resizeMode="cover"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    marginRight: 5,
                  }}
                />
                <Text style={{fontFamily: 'SCDream4'}}>
                  {details.pe_source_file}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  color: '#B5B5B5',
                  fontSize: 13,
                }}>
                첨부파일이 없습니다.
              </Text>
            )}
          </View>
        </View>

        {/* 경계 라인 */}
        <View
          style={{
            height: 1,
            backgroundColor: '#E3E3E3',
            width: Dimensions.get('window').width,
          }}
        />
        <View
          style={{
            height: 6,
            backgroundColor: '#F5F5F5',
            width: Dimensions.get('window').width,
          }}
        />
        {/* // 경계 라인 */}

        {cate1 === '2' ? (
          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 16, color: '#275696', marginBottom: 10},
              ]}>
              희망 인쇄물 기입사항
            </Text>
            <View style={[styles.infoBox, {marginBottom: 10}]}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle02}>{details.memo}</Text>
              </View>
            </View>
          </View>
        ) : null}
        {cate1 !== '2' ? (
          <>
            <View style={[styles.wrap, {marginVertical: 10}]}>
              <Text
                style={[
                  styles.mediumText,
                  {fontSize: 16, color: '#275696', marginBottom: 10},
                ]}>
                타입 선택
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={[styles.normalText, {fontSize: 16, color: '#000000'}]}>
                  {cate1 === '1' ? '박스' : '인쇄'} 타입
                </Text>
                <Text
                  style={[styles.normalText, {fontSize: 16, color: '#000000'}]}>
                  {details.ca_type_name}
                </Text>
              </View>
            </View>

            {/* 경계 라인 */}
            <View
              style={{
                height: 1,
                backgroundColor: '#E3E3E3',
                width: Dimensions.get('window').width,
              }}
            />
            <View
              style={{
                height: 6,
                backgroundColor: '#F5F5F5',
                width: Dimensions.get('window').width,
              }}
            />
            {/* // 경계 라인 */}

            <View style={[styles.wrap, {marginVertical: 10}]}>
              <Text
                style={[
                  styles.mediumText,
                  {fontSize: 16, color: '#275696', marginBottom: 10},
                ]}>
                제작 정보
              </Text>
              <View style={[styles.infoBox, {marginBottom: 20}]}>
                {/* 패키지인쇄일 경우 */}

                {cate1 === '1' && info01.stype && info01.stype !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>싸바리형태</Text>
                    <Text style={styles.detailsDesc}>{info01.stype}</Text>
                  </View>
                ) : null}

                {cate1 === '1' && info01.board_tk && info01.board_tk !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>속지 판지두께</Text>
                    <Text style={styles.detailsDesc}>{info01.board_tk}</Text>
                  </View>
                ) : null}

                {cate1 === '1' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>
                      가로/세로/높이 규격 (단위:mm)
                    </Text>
                    <Text style={styles.detailsDesc}>
                      {info01.pwidth}/{info01.plength}/{info01.pheight}
                    </Text>
                  </View>
                ) : null}

                {/* // 패키지인쇄일 경우 */}

                {/* 일반인쇄일 경우 */}

                {cate1 === '0' && info01.standard && info01.standard !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>규격</Text>
                    <Text style={styles.detailsDesc}>{info01.standard}</Text>
                  </View>
                ) : null}

                {cate1 === '0' && info01.way_edit && info01.way_edit !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>편집방법</Text>
                    <Text style={styles.detailsDesc}>{info01.way_edit}</Text>
                  </View>
                ) : null}

                {cate1 === '0' &&
                info01.ground_method &&
                info01.ground_method !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>접지방법</Text>
                    <Text style={styles.detailsDesc}>
                      {info01.ground_method}
                    </Text>
                  </View>
                ) : null}

                {cate1 === '0' &&
                info01.bind_type &&
                info01.bind_type !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>제본방식</Text>
                    <Text style={styles.detailsDesc}>{info01.bind_type}</Text>
                  </View>
                ) : null}

                {cate1 === '0' && info01.page_cnt && info01.page_cnt !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>페이지수</Text>
                    <Text style={styles.detailsDesc}>{info01.page_cnt}</Text>
                  </View>
                ) : null}

                {cate1 === '0' &&
                info01.page_cnt2 &&
                info01.page_cnt2 !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>페이지수(내지)</Text>
                    <Text style={styles.detailsDesc}>{info01.page_cnt2}</Text>
                  </View>
                ) : null}

                {cate1 === '0' &&
                info01.writeing_paper &&
                info01.writeing_paper !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>간지</Text>
                    <Text style={styles.detailsDesc}>
                      {info01.writeing_paper}
                    </Text>
                  </View>
                ) : null}

                {cate1 === '0' &&
                info01.cover_color &&
                info01.cover_color !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>표지간지색상</Text>
                    <Text style={styles.detailsDesc}>{info01.cover_color}</Text>
                  </View>
                ) : null}

                {cate1 === '0' &&
                info01.section_color &&
                info01.section_color !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>섹션간지색상</Text>
                    <Text style={styles.detailsDesc}>
                      {info01.section_color}
                    </Text>
                  </View>
                ) : null}

                {cate1 === '0' &&
                info01.geomancer &&
                info01.geomancer !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>지관</Text>
                    <Text style={styles.detailsDesc}>{info01.geomancer}</Text>
                  </View>
                ) : null}

                {cate1 === '0' &&
                info01.back_side &&
                info01.back_side !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>후면반칼형</Text>
                    <Text style={styles.detailsDesc}>{info01.back_side}</Text>
                  </View>
                ) : null}

                {cate1 === '0' &&
                info01.thomson_type &&
                info01.thomson_type !== '' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>톰슨모양</Text>
                    <Text style={styles.detailsDesc}>
                      {info01.thomson_type}
                    </Text>
                  </View>
                ) : null}

                {/* // 일반인쇄일 경우 */}

                {info01.cnt && info01.cnt !== '0' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>수량</Text>
                    <Text style={styles.detailsDesc}>{info01.cnt}</Text>
                  </View>
                ) : null}

                {info01.cnt_etc && info01.cnt_etc !== '0' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>수량(직접입력)</Text>
                    <Text style={styles.detailsDesc}>{info01.cnt_etc}</Text>
                  </View>
                ) : null}

                {cate1 === '1' ? (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>목형</Text>
                    <Text style={styles.detailsDesc}>
                      {info01.wood_pattern === 'Y' ? '있음' : '없음'}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text
                style={[
                  styles.normalText,
                  {fontSize: 14, color: '#A2A2A2', marginBottom: 10},
                ]}>
                첨부파일 02
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                {info01.pe_file2 &&
                (info01.type_name2 === 'jpg' || info01.type_name2 === 'png') ? (
                  <TouchableOpacity
                    onPress={() => imageModalHandler(info01.pe_file2)}>
                    <Image
                      source={{uri: `${info01.pe_file2}`}}
                      resizeMode="cover"
                      style={{
                        width: 114,
                        height: 114,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                  </TouchableOpacity>
                ) : info01.pe_file2 &&
                  (details.type_name !== 'jpg' ||
                    info01.type_name !== 'png' ||
                    info01.type_name !== 'gif') ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      fileDownloadHandler(
                        info01.pe_file2,
                        info01.pe_source_file2,
                      )
                    }
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../../src/assets/down.png')}
                      resizeMode="cover"
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5,
                        marginRight: 5,
                      }}
                    />
                    <Text style={{fontFamily: 'SCDream4'}}>
                      {info01.pe_source_file2}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      color: '#B5B5B5',
                      fontSize: 13,
                    }}>
                    첨부파일이 없습니다.
                  </Text>
                )}
              </View>
            </View>

            {/* // 간편 견적 유무에 따른 표시 Area */}
            {/* // 경계 라인 */}
            {details.easy_yn === 'N' ? (
              <>
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#E3E3E3',
                    width: Dimensions.get('window').width,
                  }}
                />

                <View
                  style={{
                    height: 6,
                    backgroundColor: '#F5F5F5',
                    width: Dimensions.get('window').width,
                  }}
                />
              </>
            ) : null}
            {/* // 경계 라인 */}

            {/* // 간편 견적 유무에 따른 표시 Area */}
            {details.easy_yn === 'N' ? (
              <View style={[styles.wrap, {marginVertical: 10}]}>
                <Text
                  style={[
                    styles.mediumText,
                    {fontSize: 16, color: '#275696', marginBottom: 10},
                  ]}>
                  지류 선택
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 15, color: '#000000'},
                    ]}>
                    구분 (지류)
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        fontSize: 15,
                        color: '#000000',
                      },
                    ]}>
                    {info02.feeder_name ? info02.feeder_name : null}
                  </Text>
                </View>
                <View style={[styles.infoBox]}>
                  {info02.paper_name && info02.paper_name !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>지종</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_name}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_name2 && info02.paper_name2 !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>지종세부</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_name2}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_weight && info02.paper_weight !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>평량</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_weight}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_weight_etc && info02.paper_weight_etc !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>평량(직접입력)</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_weight_etc}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_goal && info02.paper_goal !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>골</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_goal}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_goal_etc && info02.paper_goal_etc !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>골(직접입력)</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_goal_etc}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_color && info02.paper_color !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>색상</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_color}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}
            {/* 경계 라인 */}
            {details.easy_yn === 'N' ? (
              <>
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#E3E3E3',
                    width: Dimensions.get('window').width,
                  }}
                />
                <View
                  style={{
                    height: 6,
                    backgroundColor: '#F5F5F5',
                    width: Dimensions.get('window').width,
                  }}
                />
              </>
            ) : null}
            {/* // 경계 라인 */}

            {/* // 간편 견적 유무에 따른 표시 Area */}
            {details.easy_yn === 'N' &&
            (info03.print_frequency !== '' ||
              info03.proof_printing !== '' ||
              info03.print_supervision !== '') ? (
              <View style={[styles.wrap, {marginVertical: 10}]}>
                <Text
                  style={[
                    styles.mediumText,
                    {fontSize: 16, color: '#275696', marginBottom: 10},
                  ]}>
                  인쇄도수/교정/감리 선택
                </Text>
                <View style={[styles.infoBox, {marginBottom: 10}]}>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>인쇄도수</Text>
                    <Text style={styles.detailsDesc}>
                      {info03.print_frequency}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>인쇄교정</Text>
                    <Text style={styles.detailsDesc}>
                      {info03.proof_printing === 'Y' ? '있음' : '없음'}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>인쇄감리</Text>
                    <Text style={styles.detailsDesc}>
                      {info03.print_supervision === 'Y' ? '있음' : '없음'}
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}

            {/* // 간편 견적 유무에 따른 표시 Area */}
            {/* 경계 라인 */}
            {details.easy_yn === 'N' ? (
              <>
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#E3E3E3',
                    width: Dimensions.get('window').width,
                  }}
                />
                <View
                  style={{
                    height: 6,
                    backgroundColor: '#F5F5F5',
                    width: Dimensions.get('window').width,
                  }}
                />
              </>
            ) : null}
            {/* // 경계 라인 */}

            {/* // 간편 견적 유무에 따른 표시 Area */}
            {details.easy_yn === 'N' &&
            (info04.park_processing !== '' ||
              info04.press_design !== '' ||
              info04.partial_silk !== '' ||
              info04.coating !== '') ? (
              <View style={[styles.wrap, {marginVertical: 10}]}>
                <Text
                  style={[
                    styles.mediumText,
                    {fontSize: 16, color: '#275696', marginBottom: 10},
                  ]}>
                  후가공
                </Text>
                <View style={[styles.infoBox, {marginBottom: 10}]}>
                  {info04.park_processing ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>박가공</Text>
                      <Text style={styles.detailsDesc}>
                        {info04.park_processing === 'Y' ? '있음' : '없음'}
                      </Text>
                    </View>
                  ) : null}
                  {info04.press_design ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>형압</Text>
                      <Text style={styles.detailsDesc}>
                        {info04.press_design === 'Y' ? '있음' : '없음'}
                      </Text>
                    </View>
                  ) : null}
                  {info04.partial_silk ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>부분 실크</Text>
                      <Text style={styles.detailsDesc}>
                        {info04.partial_silk === 'Y' ? '있음' : '없음'}
                      </Text>
                    </View>
                  ) : null}
                  {info04.coating ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>코팅</Text>
                      <Text style={styles.detailsDesc}>{info04.coating}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}
            {/* // 간편 견적 유무에 따른 표시 Area */}
          </>
        ) : null}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  infoBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  infoStepDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#A2A2A2',
    lineHeight: 23,
  },
  infoStepTitle: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#000000',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
    marginVertical: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailsTitle: {
    fontFamily: 'SCDream4',
    width: 150,
    fontSize: 14,
    color: '#A2A2A2',
  },
  detailsDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000',
  },
  detailsTitle02: {
    fontFamily: 'SCDream4',
    width: 200,
    fontSize: 14,
    lineHeight: 22,
    color: '#A2A2A2',
  },
  detailsEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfoTitle: {
    fontFamily: 'SCDream4',
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
    marginBottom: 25,
  },
  orderInfoDesc: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    color: '#000',
    marginBottom: 10,
  },
  textInput: {
    fontFamily: 'SCDream4',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginRight: 5,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  wd50per: {
    width: '50%',
  },
  mgB10: {
    marginBottom: 10,
  },
  mgB20: {
    marginBottom: 20,
  },
  mgB30: {
    marginBottom: 30,
  },
  mgB40: {
    marginBottom: 40,
  },
  orderInfoContentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  orderInfoContentTitle: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    color: '#111',
  },
  orderInfoContentDetail: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#707070',
  },
  submitBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#275696',
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  submitBtnBorder: {
    borderWidth: 1,
    borderColor: '#275696',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnBorderText: {
    fontSize: 16,
    color: '#275696',
    textAlign: 'center',
  },
  normalText: {
    fontFamily: 'SCDream4',
  },
  mediumText: {
    fontFamily: 'SCDream5',
  },
  boldText: {
    fontFamily: 'SCDream6',
  },
});

export default OrderDetail;
