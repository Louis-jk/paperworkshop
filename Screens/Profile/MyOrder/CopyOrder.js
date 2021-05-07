import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/ko';
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import AutoHeightImage from 'react-native-auto-height-image';
import FastImage from 'react-native-fast-image';

import DetailHeader from '../../Common/DetailHeader';
import OrderAPI from '../../../src/api/OrderAPI';

const CopyOrder = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const pe_id = props.route.params.pe_id;
  const cate1 = props.route.params.cate1;

  console.log("pe_id?", pe_id);

  const [details, setDetails] = React.useState([]);

  // 기타인쇄 견적이 아닌 "일반인쇄", "패키지 인쇄의 경우"
  const [info01, setInfo01] = React.useState([]); // 제작정보 사이즈 등 정보
  const [info02, setInfo02] = React.useState([]); // 지류 지종 평량 골 등의 정보
  const [info03, setInfo03] = React.useState([]); // 인쇄도수, 인쇄감리, 인쇄교정 등의 정보
  const [info04, setInfo04] = React.useState([]); // 후가공 정보
  const [isLoading, setLoading] = React.useState(false);

  const [title, setTitle] = React.useState(null);

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
          setTitle(res.data.item.basic.title);
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

  console.log('details', details);
  console.log('info01', info01);
  console.log('info02', info02);

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
              maxHeight={600}
              resizeMode="contain"
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

  const [isImageModalVisible, setImageModalVisible] = React.useState(false);
  const [imgPath, setImgPath] = React.useState(false);

  // 이미지 모달 핸들러
  const imageModalHandler = (path) => {
    setImageModalVisible(!isImageModalVisible);
    setImgPath(path);
  };

  console.log('복사 후 재등록 :', props);

  // 납풀희망일, 견적마감일 상태
  const [date, setDate] = React.useState(new Date());
  const [arriveDate, setArriveDate] = React.useState(new Date());
  const [dDayDate, setdDayDate] = React.useState(new Date());
  const [mode01, setMode01] = React.useState('date');
  const [mode02, setMode02] = React.useState('date');
  const [show01, setShow01] = React.useState(false);
  const [show02, setShow02] = React.useState(false);

  // 각 메뉴 아코디언 형식 설정(collapse)
  const [collapseArrow01, setCollapseArrow01] = React.useState(true);
  const [collapseArrow02, setCollapseArrow02] = React.useState(true);
  const [collapseArrow03, setCollapseArrow03] = React.useState(true);
  const [collapseArrow04, setCollapseArrow04] = React.useState(true);
  const [collapseArrow05, setCollapseArrow05] = React.useState(true);

  const setCollapseArrowFunc01 = () => {
    setCollapseArrow01((prev) => !prev);
  };
  const setCollapseArrowFunc02 = () => {
    setCollapseArrow02((prev) => !prev);
  };
  const setCollapseArrowFunc03 = () => {
    setCollapseArrow03((prev) => !prev);
  };
  const setCollapseArrowFunc04 = () => {
    setCollapseArrow04((prev) => !prev);
  };
  const setCollapseArrowFunc05 = () => {
    setCollapseArrow05((prev) => !prev);
  };

  const onChange01 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow01(Platform.OS === 'ios');

    const nowDate = new Date();
    let weekAgo = nowDate.setDate(nowDate.getDate() + 7);

    if (selectedDate < date) {
      Alert.alert(
        '오늘 이전 날짜는 선택이 불가능 합니다.',
        '날짜를 다시 선택해주세요.',
        [
          {
            text: '확인',
          },
        ],
      );
      setdDayDate(date);
    } else if (selectedDate < weekAgo) {
      Alert.alert(
        '납품 희망일은 현재일 기준 7일 이후부터 선택 가능합니다.',
        '날짜를 다시 선택해주세요.',
        [
          {
            text: '확인',
          },
        ],
      );
      setdDayDate(date);
    } else {
      setArriveDate(currentDate);
    }
  };

  const onChange02 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow02(Platform.OS === 'ios');

    if (selectedDate < date) {
      Alert.alert(
        '오늘 이전 날짜는 선택이 불가능 합니다.',
        '날짜를 다시 선택해주세요.',
        [
          {
            text: '확인',
          },
        ],
      );
      setdDayDate(date);
    } else {
      setdDayDate(currentDate);
    }
  };

  const showMode01 = (currentMode) => {
    setShow01(true);
    setMode01(currentMode);
  };

  const showMode02 = (currentMode) => {
    setShow02(true);
    setMode02(currentMode);
  };

  const showDatepicker01 = () => {
    showMode01('date');
  };

  const showDatepicker02 = () => {
    showMode02('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const estimateCopyHandler = () => {
    OrderAPI.estimateCopy(pe_id).then(res => {
      if(res.data.result === '1') {
        
        sendEstimateCopyAPIHandler(res.data.item);
      } else {
        Alert.alert(res.data.message, '관리자에게 문의하세요.', [
          {
            text: '확인'
          }
        ])
      }
    }).catch(err => {
      Alert.alert(err, '관리자에게 문의하세요.', [
        {
          text: '확인'
        }
      ])
    })
  }

  const sendEstimateCopyAPIHandler = (newPeId) => {
    let arrDate = moment(arriveDate).format('YYYY-MM-DD');
    let dDate = moment(dDayDate).format('YYYY-MM-DD');

    console.log("arrDate ::::", arrDate);
    console.log("dDate ::::", dDate);

    OrderAPI.sendEstimateCopy(newPeId, arrDate, dDate).then(res => {
      
      if(res.data.result === '1') {
        Alert.alert(res.data.message, '나의 견적 페이지로 이동합니다.', [
          {
            text: '확인',
            onPress: () => navigation.navigate('MyOrder', {screen: 'MyOrder'})
          }
        ])
      } else {
        Alert.alert(res.data.message, '관리자에게 문의하세요.', [
          {
            text: '확인'
          }
        ])
      }
    }).catch(err => {
      Alert.alert(err, '관리자에게 문의하세요.', [
        {
          text: '확인'
        }
      ])
    })
  }

  console.log("arriveDate", arriveDate);
  console.log("dDayDate", dDayDate);

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

      <ImageModal
        imgPath={imgPath}
        isVisible={isImageModalVisible}
        toggleModal={imageModalHandler}
      />
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#EFF6FF',
            paddingVertical: 25,
          }}>
          <Image
            source={require('../../../src/assets/icon_bikkuri_blue.png')}
            resizeMode="contain"
            style={{width: 30, height: 30, marginBottom: 12}}
          />
          <Text
            style={[
              styles.normalText,
              {fontSize: 14, color: '#275696', marginBottom: 2},
            ]}>
            견적 내용을 확인 하신 후, 변경하실 정보를 입력해주세요.
          </Text>
          <Text style={[styles.normalText, {fontSize: 14, color: '#275696'}]}>
            재접수를 하시면 기존 입찰 업체는 모두 사라집니다.
          </Text>
        </View>
        {/* <View style={styles.wrap}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.9}>
            <View style={[styles.cancelBtn, { marginTop: 10, marginBottom: 5 }]}>
              <Text style={styles.cancelBtnText}>계약 포기 취소</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CancelOrder')} activeOpacity={0.9}>
            <View style={[styles.submitBtn]}>
              <Text style={styles.submitBtnText}>최종 선택 포기</Text>
            </View>
          </TouchableOpacity>
        </View> */}
        {/* 경계 라인 */}
        {/* <View
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
        /> */}
        {/* // 경계 라인 */}

        <View style={styles.wrap}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Text style={[styles.orderInfoTitle, {marginRight: 10}]}>
                기존 정보
              </Text>
              {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('OrderDetail')}
                style={{alignSelf: 'flex-end'}}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 12,
                      textDecorationLine: 'underline',
                      color: '#A2A2A2',
                    },
                  ]}>
                  세부 내용 보기
                </Text>
              </TouchableOpacity> */}
            </View>

            {/* 제목 */}
            <View style={{marginBottom: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={styles.profileTitle}>제목</Text>
                {/* <Text style={[styles.profileRequired, {marginLeft: 5}]}>
                  (필수)
                </Text> */}
              </View>              
              <TextInput
                value={title}
                placeholder="제목을 입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={[
                  styles.normalText,
                  {
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    paddingHorizontal: 10,
                    marginBottom: 5,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(text) => setTitle(text)}
                editable={false}
              />
            </View>
            {/* // 제목 */}

            {/* 납품 희망일 */}
            <View style={{marginBottom: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.profileTitle, {marginRight: 5}]}>
                  납품 희망일
                </Text>
                <Text style={[styles.profileRequired]}>(필수)</Text>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={showDatepicker01}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  marginBottom: 2,
                }}>
                <TextInput
                  value={moment(arriveDate).format('YY-MM-DD')}
                  placeholder="00-00-00"
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      paddingHorizontal: 10,
                      width: '70%',
                      color: '#000',
                    },
                  ]}
                  autoCapitalize="none"
                  editable={false}
                />
                <Image
                  source={require('../../../src/assets/icon03.png')}
                  resizeMode="contain"
                  style={{width: 30, height: 30, marginRight: 10}}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.profileRequired,
                  {fontSize: 13, marginTop: 5, marginBottom: 5},
                ]}>
                * 납품 희망일은 현재일 기준 7일 이후부터 선택 가능합니다.
              </Text>
              {show01 && (
                <DateTimePicker
                  testID="dateTimePicker01"
                  value={arriveDate}
                  mode={mode01}
                  is24Hour={true}
                  display="default"
                  onChange={onChange01}
                />
              )}
            </View>
            {/* // 납품 희망일 */}

            {/* 견적 마감일 */}
            <View style={{marginBottom: 25}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.profileTitle, {marginRight: 5}]}>
                  견적 마감일
                </Text>
                <Text style={[styles.profileRequired]}>(필수)</Text>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={showDatepicker02}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  marginBottom: 5,
                }}>
                <TextInput
                  value={moment(dDayDate).format('YY-MM-DD')}
                  placeholder="00-00-00"
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      paddingHorizontal: 10,
                      width: '70%',
                      color: '#000',
                    },
                  ]}
                  autoCapitalize="none"
                  editable={false}
                />
                <Image
                  source={require('../../../src/assets/icon03.png')}
                  resizeMode="contain"
                  style={{width: 30, height: 30, marginRight: 10}}
                />
              </TouchableOpacity>
              {show02 && (
                <DateTimePicker
                  testID="dateTimePicker01"
                  value={dDayDate}
                  mode={mode02}
                  is24Hour={true}
                  display="default"
                  onChange={onChange02}
                />
              )}
            </View>
            {/* // 견적 마감일 */}

            <View style={{marginBottom: 30}}>
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#EFF6FF',
                  width: Dimensions.get('window').width,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                }}>
                <Text
                  style={[styles.boldText, {fontSize: 16, color: '#275696'}]}>
                  견적 상세 정보
                </Text>
              </View>

              {/* 세부 정보 - 분류 */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={setCollapseArrowFunc01}>
                <View
                  style={[
                    styles.categoryTitle,
                    styles.mV10,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 20,
                    },
                  ]}>
                  <Text style={[styles.mediumText, {fontSize: 16}]}>분류</Text>
                  <Image
                    source={
                      collapseArrow01
                        ? require('../../../src/assets/collapse_down.png')
                        : require('../../../src/assets/collapse_up.png')
                    }
                    resizeMode="contain"
                    style={{width: 30, height: 20}}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapseArrow01}>
                <View style={[styles.infoBox, {marginBottom: 20}]}>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>분류</Text>
                    <Text style={styles.detailsDesc}>{details.ca_name}</Text>
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
                </View>
              </Collapsible>

              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  height: 1,
                  backgroundColor: '#E3E3E3',
                  width: Dimensions.get('window').width,
                }}
              />
              {/* // 세부 정보 - 분류 */}

              {/* 세부 정보 - 제작정보 */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={setCollapseArrowFunc02}>
                <View
                  style={[
                    styles.categoryTitle,
                    styles.mV10,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 20,
                    },
                  ]}>
                  <Text style={[styles.mediumText, {fontSize: 16}]}>
                    제작정보
                  </Text>
                  <Image
                    source={
                      collapseArrow02
                        ? require('../../../src/assets/collapse_down.png')
                        : require('../../../src/assets/collapse_up.png')
                    }
                    resizeMode="contain"
                    style={{width: 30, height: 20}}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapseArrow02}>
                <View style={[styles.infoBox, {marginBottom: 20}]}>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle02}>타입</Text>
                    <Text style={styles.detailsDesc}>
                      {cate1 === '1' ? '박스' : '인쇄'} 타입
                    </Text>
                  </View>

                  {/* 패키지인쇄일 경우 */}

                  {cate1 === '1' && info01.stype && info01.stype !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>싸바리형태</Text>
                      <Text style={styles.detailsDesc}>{info01.stype}</Text>
                    </View>
                  ) : null}

                  {cate1 === '1' &&
                  info01.board_tk &&
                  info01.board_tk !== '' ? (
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

                  {cate1 === '0' &&
                  info01.standard &&
                  info01.standard !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle02}>규격</Text>
                      <Text style={styles.detailsDesc}>{info01.standard}</Text>
                    </View>
                  ) : null}

                  {cate1 === '0' &&
                  info01.way_edit &&
                  info01.way_edit !== '' ? (
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

                  {cate1 === '0' &&
                  info01.page_cnt &&
                  info01.page_cnt !== '' ? (
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
                      <Text style={styles.detailsDesc}>
                        {info01.cover_color}
                      </Text>
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
              </Collapsible>

              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  height: 1,
                  backgroundColor: '#E3E3E3',
                  width: Dimensions.get('window').width,
                }}
              />
              {/* // 세부 정보 - 제작정보 */}

              {/* 세부 정보 - 지류 */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={setCollapseArrowFunc03}>
                <View
                  style={[
                    styles.categoryTitle,
                    styles.mV10,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 20,
                    },
                  ]}>
                  <Text style={[styles.mediumText, {fontSize: 16}]}>지류</Text>
                  <Image
                    source={
                      collapseArrow03
                        ? require('../../../src/assets/collapse_down.png')
                        : require('../../../src/assets/collapse_up.png')
                    }
                    resizeMode="contain"
                    style={{width: 30, height: 20}}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapseArrow03}>
                <View style={[styles.infoBox, {marginBottom: 20}]}>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>구분 (지류)</Text>
                    <Text style={styles.detailsDesc}>
                      {info02.feeder_name ? info02.feeder_name : null}
                    </Text>
                  </View>
                  {info02.paper_name && info02.paper_name !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>지종</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_name}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_name2 && info02.paper_name2 !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>지종세부</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_name2}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_weight && info02.paper_weight !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>평량</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_weight}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_weight_etc && info02.paper_weight_etc !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>평량(직접입력)</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_weight_etc}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_goal && info02.paper_goal !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>골</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_goal}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_goal_etc && info02.paper_goal_etc !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>골(직접입력)</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_goal_etc}
                      </Text>
                    </View>
                  ) : null}
                  {info02.paper_color && info02.paper_color !== '' ? (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>색상</Text>
                      <Text style={styles.detailsDesc}>
                        {info02.paper_color}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </Collapsible>

              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  height: 1,
                  backgroundColor: '#E3E3E3',
                  width: Dimensions.get('window').width,
                }}
              />
              {/* // 세부 정보 - 지류 */}

              {/* 세부 정보 - 인쇄도수/교정/감리 */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={setCollapseArrowFunc04}>
                <View
                  style={[
                    styles.categoryTitle,
                    styles.mV10,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 20,
                    },
                  ]}>
                  <Text style={[styles.mediumText, {fontSize: 16}]}>
                    인쇄도수/교정/감리
                  </Text>
                  <Image
                    source={
                      collapseArrow04
                        ? require('../../../src/assets/collapse_down.png')
                        : require('../../../src/assets/collapse_up.png')
                    }
                    resizeMode="contain"
                    style={{width: 30, height: 20}}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapseArrow04}>
                <View style={[styles.infoBox, {marginBottom: 20}]}>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>인쇄도수</Text>
                    <Text style={styles.detailsDesc}>
                      {info03.print_frequency}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>인쇄교정</Text>
                    <Text style={styles.detailsDesc}>
                      {info03.proof_printing === 'Y' ? '있음' : '없음'}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>인쇄감리</Text>
                    <Text style={styles.detailsDesc}>
                      {info03.print_supervision === 'Y' ? '있음' : '없음'}
                    </Text>
                  </View>
                </View>
              </Collapsible>

              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  height: 1,
                  backgroundColor: '#E3E3E3',
                  width: Dimensions.get('window').width,
                }}
              />

              {/* // 세부 정보 - 인쇄도수/교정/감리 */}

              {/* 세부 정보 - 후가공 */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={setCollapseArrowFunc05}>
                <View
                  style={[
                    styles.categoryTitle,
                    styles.mV10,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 20,
                    },
                  ]}>
                  <Text style={[styles.mediumText, {fontSize: 16}]}>
                    후가공
                  </Text>
                  <Image
                    source={
                      collapseArrow05
                        ? require('../../../src/assets/collapse_down.png')
                        : require('../../../src/assets/collapse_up.png')
                    }
                    resizeMode="contain"
                    style={{width: 30, height: 20}}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapseArrow05}>
                <View style={[styles.infoBox, {marginBottom: 20}]}>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>박가공</Text>
                    <Text style={styles.detailsDesc}>
                      {info04.park_processing === 'Y' ? '있음' : '없음'}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>형압</Text>
                    <Text style={styles.detailsDesc}>
                      {info04.press_design === 'Y' ? '있음' : '없음'}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>부분 실크</Text>
                    <Text style={styles.detailsDesc}>
                      {info04.partial_silk === 'Y' ? '있음' : '없음'}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>코팅</Text>
                    <Text style={styles.detailsDesc}>{info04.coating}</Text>
                  </View>
                </View>
              </Collapsible>

              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  height: 1,
                  backgroundColor: '#E3E3E3',
                  width: Dimensions.get('window').width,
                }}
              />

              {/* // 세부 정보 - 후가공 */}
            </View>

            <View style={{marginVertical: 10}} />
            <TouchableOpacity
              onPress={() => estimateCopyHandler()}
              activeOpacity={0.9}>
              <View style={[styles.submitBtn]}>
                <Text style={styles.submitBtnText}>복사 후 재등록</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
  profileTitle: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: '#111',
  },
  profileRequired: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#366DE5',
  },
  infoBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  infoStepDesc: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#275696',
    lineHeight: 23,
  },
  infoStepTitle: {
    fontFamily: 'SCDream4',
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
    fontFamily: 'SCDream4',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailsTitle: {
    fontFamily: 'SCDream4',
    width: 100,
    fontSize: 14,
    color: '#A2A2A2',
    marginVertical: 5,
  },
  detailsTitle02: {
    fontFamily: 'SCDream4',
    width: 230,
    fontSize: 14,
    lineHeight: 22,
    color: '#A2A2A2',
    marginVertical: 5,
  },
  detailsDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000',
  },
  detailsEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfoTitle: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#000000',
    marginTop: 20,
  },
  orderInfoTitleRow: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    marginTop: 20,
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
    fontFamily: 'SCDream4',
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
  cancelBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#275696',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
  },
  cancelBtnText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#275696',
    textAlign: 'center',
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
    fontFamily: 'SCDream4',
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
    fontFamily: 'SCDream4',
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

export default CopyOrder;
