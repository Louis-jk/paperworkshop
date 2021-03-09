import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  TextInput,
  Button,
  Image,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import DetailHeader from '../Common/DetailHeader';
import Modal from './easyOrderModal';
import {
  setUserPwidth,
  setUserPlength,
  setUserPheight,
  setUserCnt,
  setUserCntEtc,
  setUserWoodPattern,
  setUserEasyYn,
} from '../../Modules/OrderReducer';
import {setOrderDetails} from '../../Modules/OrderHandlerReducer';
import BoxType from '../../src/api/BoxType';
import OrderAPI from '../../src/api/OrderAPI';
import {number} from 'yup/lib/locale';

const Step04 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const propsScreenName = props.route.params.screen;

  const dispatch = useDispatch();

  const {type_details} = useSelector((state) => state.OrderHandlerReducer);
  const {
    cate1,
    ca_id,
    type_id,
    mb_id,
    title,
    company,
    mb_name,
    mb_hp,
    design_print,
    favor_area,
    delivery_date,
    estimate_date,
    pe_file_url,
    pe_file_type,
    pe_file_name,
    pe_file_size,
    memo,
    wood_pattern,
  } = useSelector((state) => state.OrderReducer);

  // 간단 견적 제출 func
  const [source, setSource] = React.useState('');
  const [pWidth, setPwidth] = React.useState(null);
  const [pLength, setPlength] = React.useState(null);
  const [pHeight, setPheight] = React.useState(null);

  const easyOrderBefore = () => {
    if (
      pe_file_url &&
      pe_file_type &&
      pe_file_name !== null &&
      pe_file_name !== ''
    ) {
      setSource({
        uri: pe_file_url,
        type: pe_file_type,
        name: pe_file_name,
      });
      easyOrderSubmit();
    } else {
      easyOrderSubmit();
    }
  };

  const easyOrderSubmit = () => {
    const frmdata = new FormData();
    frmdata.append('method', 'proc_estimate');
    frmdata.append('cate1', cate1);
    frmdata.append('ca_id', ca_id);
    frmdata.append('type_id', type_id);
    frmdata.append('mb_id', mb_id);
    frmdata.append('title', title);
    frmdata.append('company', company ? company : '');
    frmdata.append('mb_name', mb_name);
    frmdata.append('mb_hp', mb_hp);
    frmdata.append('design_print', design_print);
    frmdata.append('favor_area', favor_area);
    frmdata.append('delivery_date', delivery_date);
    frmdata.append('estimate_date', estimate_date);
    frmdata.append('pe_file[]', source);
    frmdata.append('memo', memo ? memo : '');
    frmdata.append('pwidth', pWidth);
    frmdata.append('plength', pLength);
    frmdata.append('pheight', pHeight);
    frmdata.append('cnt', quantity !== 'direct' ? quantity : '');
    frmdata.append('cnt_etc', quantity === 'direct' ? quantityDirect : '');
    frmdata.append('wood_pattern', wood_pattern);
    frmdata.append('easy_yn', 'Y');

    OrderAPI.sendOrder(frmdata)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          // console.log('간편견적', res);
          setModalVisible(!isModalVisible);
          navigation.navigate('easyOrderComplete');
        } else if (res.data.result === '1' && res.data.count <= 0) {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  };

  const directRef = React.useRef(null); // 수량 직접 입력폼 ref
  const directSizeRef = React.useRef(null); // 규격 직접 입력폼 ref

  const [infoDetail, setInfoDetail] = React.useState(null);
  const [getQuantity, setGetQuantity] = React.useState([]);

  // 일반인쇄
  // 카달로그(ca_id 1) 또는 책자, 서적류(ca_id 4)일 경우
  const [pageCount, setPageCount] = React.useState([]); // page count(페이지수 표지) 정보 담기
  const [pageCountCur, setPageCountCur] = React.useState([]); // page count(페이지수 표지) 선택값 담기
  const [pageCountInner, setPageCountInner] = React.useState(''); // page_cnt2(페이지수 내지) 정보 담기
  const [pageCountInnerCur, setPageCountInnerCur] = React.useState(''); // 페이지수(페이지수 내지) 선택값 담기
  const [pageCountText, setPageCountText] = React.useState(''); // page count(페이지 수) 안내 문구 정보 담기
  const [bindType, setBindType] = React.useState([]); // bind_type(제본방식) 정보 담기
  const [bindTypeText, setBindTypeText] = React.useState(''); // bind_type(제본방식) 안내 문구 담기
  const [bindTypeCur, setBindTypeCur] = React.useState(''); // bind_type(제본방식) 선택값 담기
  const [standard, setStandard] = React.useState([]); // 일반인쇄 - 카달로그 type_id 71일 경우 standard(종이 규격) 정보 담기
  const [writeing, setWriteing] = React.useState([]); // 일반인쇄 - 책자, 서적류(ca_id : 4)일 경우 간지 정보 담기
  const [writeingCur, setWriteingCur] = React.useState(''); // 일반인쇄 - 책자, 서적류(ca_id : 4)일 경우 간지 선택값 담기
  const [coverColor, setCoverColor] = React.useState([]); // 일반인쇄 - 책자, 서적류(ca_id : 4)일 경우 표지간지색상 정보 담기
  const [coverColorCur, setCoverColorCur] = React.useState(''); // 일반인쇄 - 책자, 서적류(ca_id : 4)일 경우 표지간지색상 선택값 담기
  const [sectionColor, setSectionColor] = React.useState([]); // 일반인쇄 - 책자, 서적류(ca_id : 4)일 경우 섹션간지색상 정보 담기
  const [sectionColorCur, setSectionColorCur] = React.useState(''); // 일반인쇄 - 책자, 서적류(ca_id : 4)일 경우 섹션간지색상 선택값 담기

  // 스티커(ca_id 6)
  const [thomsonType, setThomsonType] = React.useState([]); // 톰슨모양 정보 담기
  const [thomsonCur, setThomsonCur] = React.useState([]); // 톰슨모양 선택값 담기

  const [isLoading, setLoading] = React.useState(false);
  const [prepareCover, setPrepareCover] = React.useState(false); // 표지간지색상 표시여부
  const [prepareSection, setPrepareSection] = React.useState(false); // 섹션간지색상 표시여부

  console.log('ca_id 는 ?', ca_id);

  const getType = () => {
    setLoading(true);
    BoxType.getBoxTypeId(cate1, ca_id, type_id)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          console.log('상세정보', res);
          setInfoDetail(res.data.item);
          setGetQuantity(res.data.item[0].making_cnt);

          if (res.data.item[0].cate1 === '0' && ca_id !== '6') {
            setPageCount(res.data.item[0].page_cnt);
            setPageCountInner(res.data.item[0].page_cnt2);
            setPageCountText(res.data.item[0].page_cnt_text);
            setBindType(res.data.item[0].bind_type);
            setBindTypeText(res.data.item[0].bind_type_text);
            setStandard(res.data.item[0].standard);
            if (
              res.data.item[0].ca_id === '4' ||
              res.data.item[0].ca_id === '1'
            ) {
              setCoverColor(res.data.item[0].cover_color); // 표지간지색상
              setSectionColor(res.data.item[0].section_color); // 섹션간지색상
              setWriteing(res.data.item[0].writeing_paper); // 간지
            }
          } else if (
            res.data.item[0].cate1 === '0' &&
            res.data.item[0].ca_id === '6'
          ) {
            console.log('스티커 출력!');
            setThomsonType(res.data.item[0].thomson_type);
          }

          setLoading(false);
        } else if (res.data.result === '1' && res.data.count <= 0) {
          setGetQuantity(null);
          setLoading(false);
        } else {
          setGetQuantity(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  React.useEffect(() => {
    getType();
  }, []);

  console.log('thomsonType ?', thomsonType);
  console.log('standard ?', standard);

  // 규격 입력 (일반 인쇄)
  const [size, setSize] = React.useState(null);
  const [sizeDirect, setSizeDirect] = React.useState(null);
  const setOrderSize = (v) => {
    directSizeRef.current.focus();
    let value = v.replace(/(^0+)/, '');
    setSize(value);
  };

  // 수량 입력
  const [quantity, setQuantity] = React.useState(null);
  const [quantityDirect, setQuantityDirect] = React.useState(null);
  const setOrderQuantity = (v) => {
    directRef.current.focus();
    let value = v.replace(/(^0+)/, '');
    setQuantity(value);
  };

  const [pattern, setPattern] = React.useState(true);
  const setIsPattern = (b) => {
    setPattern(b);
  };

  // 간단 견적 전 모달
  const [isModalVisible, setModalVisible] = React.useState(false);

  const [pWidthError, setPwidthError] = React.useState(false);
  const [pLengthError, setPlengthError] = React.useState(false);
  const [pHeightError, setPheightError] = React.useState(false);
  const [quantityError, setQuantityError] = React.useState(false); // 수량 지정 안했을 때 유효성 체크
  const [directError, setDirectError] = React.useState(false); // 수량 직접 입력 선택 후 입력 없을 시 에러
  const [sizeError, setSizeError] = React.useState(false); // 규격 지정 안했을 때 유효성 체크
  const [sizeDirectError, setSizeDirectError] = React.useState(false); // 규격 직접 입력 선택 후 입력 없을 시 에러

  const toggleModal = () => {
    if (pWidth === '' || pWidth === null) {
      setPwidthError(true);
    } else if (pLength === '' || pLength === null) {
      setPlengthError(true);
    } else if (pHeight === '' || pHeight === null) {
      setPheightError(true);
    } else if (
      (quantity === 'direct' && quantityDirect === null) ||
      (quantity === 'direct' && quantityDirect === '')
    ) {
      setDirectError(true);
    } else if (
      (quantity !== 'direct' && quantity === null) ||
      (quantity !== 'direct' && quantity === '')
    ) {
      setQuantityError(true);
    } else {
      setModalVisible(!isModalVisible);
      dispatch(setUserPwidth(pWidth));
      dispatch(setUserPlength(pLength));
      dispatch(setUserPheight(pHeight));

      if (quantity !== 'direct') {
        dispatch(setUserCnt(quantity));
        dispatch(setUserCntEtc(0));
      } else {
        dispatch(setUserCntEtc(quantityDirect));
        dispatch(setUserCnt(0));
      }

      if (pattern) {
        dispatch(setUserWoodPattern('Y'));
      } else {
        dispatch(setUserWoodPattern('N'));
      }
    }

    // dispatch(setUserEasyYn('Y'))
  };

  // 다음 스텝 이동
  const nextStep = (width, length, height) => {
    if (
      (quantity === 'direct' && quantityDirect === null) ||
      (quantity === 'direct' && quantityDirect === '')
    ) {
      setDirectError(true);
    } else if (
      (quantity !== 'direct' && quantity === null) ||
      (quantity !== 'direct' && quantity === '')
    ) {
      setQuantityError(true);
    } else {
      if (ca_id === '12') {
        dispatch(setOrderDetails(infoDetail));
      }
      dispatch(setUserPwidth(width));
      dispatch(setUserPlength(length));
      dispatch(setUserPheight(height));
      dispatch(setUserEasyYn('N'));

      if (quantity !== 'direct') {
        dispatch(setUserCnt(quantity));
        dispatch(setUserCntEtc(0));
      } else {
        dispatch(setUserCntEtc(quantityDirect));
        dispatch(setUserCnt(0));
      }
      if (pattern) {
        dispatch(setUserWoodPattern('Y'));
      } else {
        dispatch(setUserWoodPattern('N'));
      }

      navigation.navigate('OrderStep05', {
        screen: propsScreenName === 'DirectOrder' ? propsScreenName : null,
      });
    }
  };

  // 파일 업로드 (document picker)

  const [fileUrlCurrent, setFileUrlCurrent] = React.useState(null);
  const [fileTypeCurrent, setFileTypeCurrent] = React.useState(null);
  const [fileNameCurrent, setFileNameCurrent] = React.useState(null);
  const [fileSizeCurrent, setFileSizeCurrent] = React.useState(null);
  const [extension, setExtension] = React.useState(null);

  const filePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      // console.log('이미지', res);
      const imgName = res.name.split('.');
      const extArray = res.type.split('/');
      setFileUrlCurrent(res.uri);
      setFileTypeCurrent(res.type);
      setFileNameCurrent(imgName[0]);
      setFileSizeCurrent(res.size);
      setExtension(extArray[1]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  // 유효성 체크
  const validationSchema = yup.object().shape({
    order_width: yup
      .string()
      .matches(/^\d+$/, '숫자만 입력 가능합니다.')
      // .min(10, '규격은 10(mm)이상부터 입력 가능합니다.')
      .required('가로 규격을 입력해주세요.')
      .label('Width'),
    order_length: yup
      .string()
      .matches(/^\d+$/, '숫자만 입력 가능합니다.')
      .required('세로 규격을 입력해주세요.')
      .label('Length'),
    order_height: yup
      .string()
      .matches(/^\d+$/, '숫자만 입력 가능합니다.')
      .required('높이 규격을 입력해주세요.')
      .label('Height'),
  });

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        goEasyComplete={easyOrderBefore}
      />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <ActivityIndicator size="large" color="#275696" />
        </View>
      ) : (
        <>
          <DetailHeader
            title={
              propsScreenName === 'DirectOrder' ? propsScreenName : routeName
            }
            navigation={navigation}
          />
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <Formik
              initialValues={{
                order_width: '',
                order_length: '',
                order_height: '',
              }}
              onSubmit={(values, actions) => {
                console.log('Hey');

                nextStep(
                  values.order_width,
                  values.order_length,
                  values.order_height,
                );

                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 1000);
              }}
              validationSchema={validationSchema}>
              {(formikProps) => (
                <View>
                  <View style={styles.wrap}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={[
                          styles.boldText,
                          {fontSize: 16, color: '#000000'},
                        ]}>
                        제작 정보
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.wrap]}>
                    {/* 일반인쇄일 경우 - 표지, 내지 */}
                    {(cate1 === '0' && ca_id == '1') ||
                    (cate1 === '0' && ca_id == '4') ? (
                      <View
                        style={{
                          marginBottom: 25,
                        }}>
                        <Text
                          style={[
                            styles.mediumText,
                            {
                              fontSize: 15,
                              color: '#000000',
                              marginRight: 5,
                              marginBottom: 10,
                            },
                          ]}>
                          페이지수(표지)
                        </Text>
                        <View
                          style={[
                            styles.details,
                            {
                              marginBottom: pageCount ? 15 : 0,
                            },
                          ]}>
                          {pageCount
                            ? pageCount.map((q, idx) => (
                                <TouchableOpacity
                                  key={idx}
                                  activeOpacity={1}
                                  hitSlop={{
                                    top: 10,
                                    bottom: 10,
                                    left: 10,
                                    right: 10,
                                  }}
                                  onPress={() => {
                                    setPageCountCur(q);
                                  }}
                                  style={[
                                    styles.details,
                                    {
                                      marginRight: 20,
                                    },
                                  ]}>
                                  <Image
                                    source={
                                      pageCountCur === q
                                        ? require('../../src/assets/radio_on.png')
                                        : require('../../src/assets/radio_off.png')
                                    }
                                    resizeMode="contain"
                                    style={{
                                      width: 20,
                                      height: 20,
                                      marginRight: 5,
                                    }}
                                  />
                                  <Text
                                    style={[
                                      styles.normalText,
                                      {fontSize: 14, color: '#000'},
                                    ]}>
                                    {q}
                                  </Text>
                                </TouchableOpacity>
                              ))
                            : null}
                        </View>
                        {cate1 === '0' && pageCountText ? (
                          <Text
                            style={[
                              styles.normalText,
                              {fontSize: 12, color: '#B5B5B5', marginRight: 5},
                            ]}>
                            {pageCountText}
                          </Text>
                        ) : null}
                      </View>
                    ) : null}

                    {/* 페이지수(내지) 직접입력 폼 */}
                    {cate1 === '0' &&
                    pageCountInner !== null &&
                    pageCountInner !== '' &&
                    pageCountInner === 'Y' ? (
                      <View
                        style={{
                          marginBottom: 25,
                        }}>
                        <Text
                          style={[
                            styles.mediumText,
                            {
                              fontSize: 15,
                              color: '#000000',
                              marginRight: 5,
                              marginBottom: 10,
                            },
                          ]}>
                          페이지수(내지)
                        </Text>
                        <TextInput
                          value={pageCountInnerCur}
                          placeholder="페이지수를 직접 입력해주세요."
                          placeholderTextColor="#A2A2A2"
                          style={[
                            styles.normalText,
                            {
                              borderWidth: 1,
                              borderColor: '#E3E3E3',
                              borderRadius: 4,
                              paddingHorizontal: 10,
                            },
                          ]}
                          onChangeText={(value) => {
                            setPageCountInnerCur(value);
                          }}
                          autoCapitalize="none"
                          keyboardType="decimal-pad"
                        />
                      </View>
                    ) : null}
                    {/* // 페이지수(내지) 직접입력 폼 */}

                    {/* // 일반인쇄일 경우 - 표지, 내지 */}

                    {/* 일반인쇄 - 책자, 서적류일 경우 간지종류 */}
                    {cate1 === '0' &&
                    ca_id === '4' &&
                    writeing !== null &&
                    writeing !== '' ? (
                      <View style={{width: '100%', marginBottom: 25}}>
                        <Text
                          style={[
                            styles.mediumText,
                            {
                              fontSize: 15,
                              color: '#000000',
                              marginRight: 5,
                              marginBottom: 10,
                            },
                          ]}>
                          간지종류
                        </Text>
                        <DropDownPicker
                          value={writeingCur}
                          placeholder="간지종류를 선택해주세요."
                          placeholderStyle={{
                            fontSize: 14,
                            color: '#A2A2A2',
                            fontWeight: '400',
                          }}
                          activeLabelStyle={{color: '#000'}}
                          activeItemStyle={{color: '#000'}}
                          selectedLabelStyle={{color: '#000'}}
                          dropDownMaxHeight={300}
                          items={writeing.map((v, _i) => {
                            // setPfId(v.pf_id);
                            return {value: v, label: v};
                          })}
                          containerStyle={{height: 50}}
                          style={{
                            backgroundColor: '#fff',
                            borderTopRightRadius: 4,
                            borderTopLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            borderBottomLeftRadius: 4,
                          }}
                          itemStyle={{
                            justifyContent: 'flex-start',
                            paddingVertical: 10,
                          }}
                          labelStyle={{
                            fontFamily: 'SCDream4',
                            color: '#A2A2A2',
                          }}
                          dropDownStyle={{backgroundColor: '#fff'}}
                          onChangeItem={(item) => {
                            setWriteingCur(item.value);
                          }}
                          onOpen={() => {
                            setPrepareCover(true);
                            setPrepareSection(true);
                          }}
                          onClose={() => {
                            setPrepareCover(false);
                            setPrepareSection(false);
                          }}
                          customArrowDown={() => (
                            <Image
                              source={require('../../src/assets/arr01.png')}
                              style={{width: 25, height: 25}}
                              resizeMode="contain"
                            />
                          )}
                          customArrowUp={() => (
                            <Image
                              source={require('../../src/assets/arr01_top.png')}
                              style={{width: 25, height: 25}}
                              resizeMode="contain"
                            />
                          )}
                        />
                      </View>
                    ) : null}
                    {/*  // 일반인쇄 - 책자, 서적류일 경우 간지종류*/}

                    {/* 일반인쇄 - 책자, 서적류일 경우 표지간지색상 */}
                    {prepareCover === false &&
                    cate1 === '0' &&
                    ca_id === '4' &&
                    coverColor !== null &&
                    coverColor !== '' ? (
                      <View style={{width: '100%', marginBottom: 25}}>
                        <Text
                          style={[
                            styles.mediumText,
                            {
                              fontSize: 15,
                              color: '#000000',
                              marginRight: 5,
                              marginBottom: 10,
                            },
                          ]}>
                          표지간지색상
                        </Text>
                        <DropDownPicker
                          value={coverColorCur}
                          placeholder="표지간지색상을 선택해주세요."
                          placeholderStyle={{
                            fontSize: 14,
                            color: '#A2A2A2',
                            fontWeight: '400',
                          }}
                          activeLabelStyle={{color: '#000'}}
                          activeItemStyle={{color: '#000'}}
                          selectedLabelStyle={{color: '#000'}}
                          dropDownMaxHeight={300}
                          items={coverColor.map((v, _i) => {
                            // setPfId(v.pf_id);
                            return {value: v, label: v};
                          })}
                          containerStyle={{height: 50}}
                          style={{
                            backgroundColor: '#fff',
                            borderTopRightRadius: 4,
                            borderTopLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            borderBottomLeftRadius: 4,
                          }}
                          itemStyle={{
                            justifyContent: 'flex-start',
                            paddingVertical: 10,
                          }}
                          labelStyle={{
                            fontFamily: 'SCDream4',
                            color: '#A2A2A2',
                          }}
                          dropDownStyle={{backgroundColor: '#fff'}}
                          onChangeItem={(item) => {
                            setCoverColorCur(item.value);
                          }}
                          onOpen={() => setPrepareSection(true)}
                          onClose={() => setPrepareSection(false)}
                          customArrowDown={() => (
                            <Image
                              source={require('../../src/assets/arr01.png')}
                              style={{width: 25, height: 25}}
                              resizeMode="contain"
                            />
                          )}
                          customArrowUp={() => (
                            <Image
                              source={require('../../src/assets/arr01_top.png')}
                              style={{width: 25, height: 25}}
                              resizeMode="contain"
                            />
                          )}
                        />
                      </View>
                    ) : null}
                    {/*  // 일반인쇄 - 책자, 서적류일 경우 표지간지색상 */}

                    {/* 일반인쇄 - 책자, 서적류일 경우 섹션간지색상 */}
                    {prepareSection === false &&
                    cate1 === '0' &&
                    ca_id === '4' &&
                    sectionColor !== null &&
                    sectionColor !== '' ? (
                      <View style={{width: '100%', marginBottom: 25}}>
                        <Text
                          style={[
                            styles.mediumText,
                            {
                              fontSize: 15,
                              color: '#000000',
                              marginRight: 5,
                              marginBottom: 10,
                            },
                          ]}>
                          섹션간지색상
                        </Text>
                        <DropDownPicker
                          value={sectionColorCur}
                          placeholder="섹션간지색상을 선택해주세요."
                          placeholderStyle={{
                            fontSize: 14,
                            color: '#A2A2A2',
                            fontWeight: '400',
                          }}
                          activeLabelStyle={{color: '#000'}}
                          activeItemStyle={{color: '#000'}}
                          selectedLabelStyle={{color: '#000'}}
                          dropDownMaxHeight={300}
                          items={sectionColor.map((v, _i) => {
                            // setPfId(v.pf_id);
                            return {value: v, label: v};
                          })}
                          containerStyle={{height: 50}}
                          style={{
                            backgroundColor: '#fff',
                            borderTopRightRadius: 4,
                            borderTopLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            borderBottomLeftRadius: 4,
                          }}
                          itemStyle={{
                            justifyContent: 'flex-start',
                            paddingVertical: 10,
                          }}
                          labelStyle={{
                            fontFamily: 'SCDream4',
                            color: '#A2A2A2',
                          }}
                          dropDownStyle={{backgroundColor: '#fff'}}
                          onChangeItem={(item) => {
                            setSectionColorCur(item.value);
                            // setIsLoading01(true);

                            // setIsLoading02(true);
                          }}
                          customArrowDown={() => (
                            <Image
                              source={require('../../src/assets/arr01.png')}
                              style={{width: 25, height: 25}}
                              resizeMode="contain"
                            />
                          )}
                          customArrowUp={() => (
                            <Image
                              source={require('../../src/assets/arr01_top.png')}
                              style={{width: 25, height: 25}}
                              resizeMode="contain"
                            />
                          )}
                        />
                      </View>
                    ) : null}
                    {/*  // 일반인쇄 - 책자, 서적류일 경우 섹션간지색상 */}

                    {/* 일반인쇄 - 제본방식 */}
                    {(cate1 === '0' &&
                      ca_id == '1' &&
                      bindType !== null &&
                      bindType !== '') ||
                    (cate1 === '0' &&
                      ca_id == '4' &&
                      bindType !== null &&
                      bindType !== '') ? (
                      <View
                        style={{
                          marginBottom: 25,
                        }}>
                        <Text
                          style={[
                            styles.mediumText,
                            {
                              fontSize: 15,
                              color: '#000000',
                              marginRight: 5,
                              marginBottom: 10,
                            },
                          ]}>
                          제본방식
                        </Text>
                        <View
                          style={[
                            styles.details,
                            {
                              flexWrap: 'wrap',
                              marginBottom:
                                cate1 === '0' &&
                                ca_id === '4' &&
                                type_id === '76'
                                  ? 0
                                  : 10,
                            },
                          ]}>
                          {bindType
                            ? bindType.map((q, idx) => (
                                <TouchableOpacity
                                  key={idx}
                                  activeOpacity={1}
                                  hitSlop={{
                                    top: 10,
                                    bottom: 10,
                                    left: 10,
                                    right: 10,
                                  }}
                                  onPress={() => {
                                    setBindTypeCur(q);
                                  }}
                                  style={[
                                    styles.details,
                                    {
                                      marginRight: 20,
                                      marginBottom: 15,
                                    },
                                  ]}>
                                  <Image
                                    source={
                                      bindTypeCur === q
                                        ? require('../../src/assets/radio_on.png')
                                        : require('../../src/assets/radio_off.png')
                                    }
                                    resizeMode="contain"
                                    style={{
                                      width: 20,
                                      height: 20,
                                      marginRight: 5,
                                    }}
                                  />
                                  <Text
                                    style={[
                                      styles.normalText,
                                      {fontSize: 14, color: '#000'},
                                    ]}>
                                    {q}
                                  </Text>
                                </TouchableOpacity>
                              ))
                            : null}
                        </View>
                        {cate1 === '0' && bindTypeText ? (
                          <Text
                            style={[
                              styles.normalText,
                              {fontSize: 12, color: '#B5B5B5', marginRight: 5},
                            ]}>
                            {bindTypeText}
                          </Text>
                        ) : cate1 === '0' &&
                          ca_id === '4' &&
                          type_id === '76' ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                            }}>
                            <Text
                              style={[
                                styles.normalText,
                                {
                                  fontSize: 12,
                                  color: '#B5B5B5',
                                  marginRight: 5,
                                },
                              ]}>
                              ※
                            </Text>
                            <View>
                              <Text
                                style={[
                                  styles.normalText,
                                  {
                                    fontSize: 12,
                                    color: '#B5B5B5',
                                    marginRight: 5,
                                  },
                                ]}>
                                학위논문 인쇄의 경우, 제본방향은 세로좌철,
                              </Text>
                              <Text
                                style={[
                                  styles.normalText,
                                  {
                                    fontSize: 12,
                                    color: '#B5B5B5',
                                    marginRight: 5,
                                  },
                                ]}>
                                제본방식은 양장제본입니다.
                              </Text>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    ) : null}
                    {/*  // 일반인쇄 - 제본방식 */}

                    {/* 가로 규격 */}
                    {cate1 === '1' && (
                      <View style={{marginBottom: 25}}>
                        <View
                          style={[
                            styles.details,
                            {
                              marginBottom: 10,
                            },
                          ]}>
                          <Text
                            style={[
                              styles.mediumText,
                              {fontSize: 15, color: '#000000', marginRight: 5},
                            ]}>
                            가로 규격
                          </Text>
                          <Text
                            style={[
                              styles.normalText,
                              {fontSize: 14, color: '#000000'},
                            ]}>
                            (mm)
                          </Text>
                        </View>
                        <TextInput
                          placeholder="예) 10"
                          placeholderTextColor="#A2A2A2"
                          style={[
                            styles.normalText,
                            {
                              borderWidth: 1,
                              borderColor: '#E3E3E3',
                              borderRadius: 4,
                              paddingHorizontal: 10,
                            },
                          ]}
                          onChangeText={(value) => {
                            setPwidth(value);
                            formikProps.setFieldValue('order_width', value);
                            setPwidthError(false);
                          }}
                          onBlur={formikProps.handleBlur('order_width')}
                          autoCapitalize="none"
                          keyboardType="number-pad"
                        />
                        {formikProps.touched.order_width &&
                        formikProps.errors.order_width ? (
                          <Text
                            style={{
                              width: '100%',
                              fontFamily: 'SCDream4',
                              fontSize: 12,
                              lineHeight: 18,
                              color: '#366DE5',
                              marginVertical: 5,
                            }}>
                            {formikProps.touched.order_width &&
                              formikProps.errors.order_width}
                          </Text>
                        ) : pWidthError ? (
                          <Text
                            style={{
                              width: '100%',
                              fontFamily: 'SCDream4',
                              fontSize: 12,
                              lineHeight: 18,
                              color: '#366DE5',
                              marginVertical: 5,
                            }}>
                            가로 규격을 입력해주세요.
                          </Text>
                        ) : null}
                      </View>
                    )}
                    {/* // 가로 규격 */}

                    {/* 세로 규격 */}
                    {cate1 === '1' && (
                      <View style={{marginBottom: 25}}>
                        <View
                          style={[
                            styles.details,
                            {
                              marginBottom: 10,
                            },
                          ]}>
                          <Text
                            style={[
                              styles.mediumText,
                              {fontSize: 15, color: '#000000', marginRight: 5},
                            ]}>
                            세로 규격
                          </Text>
                          <Text
                            style={[
                              styles.normalText,
                              {fontSize: 14, color: '#000000'},
                            ]}>
                            (mm)
                          </Text>
                        </View>
                        <TextInput
                          placeholder="예) 10"
                          placeholderTextColor="#A2A2A2"
                          style={[
                            styles.normalText,
                            {
                              borderWidth: 1,
                              borderColor: '#E3E3E3',
                              borderRadius: 4,
                              paddingHorizontal: 10,
                            },
                          ]}
                          onChangeText={(value) => {
                            setPlength(value);
                            formikProps.setFieldValue('order_length', value);
                            setPlengthError(false);
                          }}
                          onBlur={formikProps.handleBlur('order_length')}
                          autoCapitalize="none"
                          keyboardType="number-pad"
                        />
                        {formikProps.touched.order_length &&
                        formikProps.errors.order_length ? (
                          <Text
                            style={{
                              width: '100%',
                              fontFamily: 'SCDream4',
                              fontSize: 12,
                              lineHeight: 18,
                              color: '#366DE5',
                              marginVertical: 5,
                            }}>
                            {formikProps.touched.order_length &&
                              formikProps.errors.order_length}
                          </Text>
                        ) : pLengthError ? (
                          <Text
                            style={{
                              width: '100%',
                              fontFamily: 'SCDream4',
                              fontSize: 12,
                              lineHeight: 18,
                              color: '#366DE5',
                              marginVertical: 5,
                            }}>
                            세로 규격을 입력해주세요.
                          </Text>
                        ) : null}
                      </View>
                    )}
                    {/* // 세로 규격 */}

                    {/* 높이 규격 */}
                    {cate1 === '1' && (
                      <View style={{marginBottom: 25}}>
                        <View
                          style={[
                            styles.details,
                            {
                              marginBottom: 10,
                            },
                          ]}>
                          <Text
                            style={[
                              styles.mediumText,
                              {fontSize: 15, color: '#000000', marginRight: 5},
                            ]}>
                            높이 규격
                          </Text>
                          <Text
                            style={[
                              styles.normalText,
                              {fontSize: 14, color: '#000000'},
                            ]}>
                            (mm)
                          </Text>
                        </View>
                        <TextInput
                          placeholder="예) 10"
                          placeholderTextColor="#A2A2A2"
                          style={[
                            styles.normalText,
                            {
                              borderWidth: 1,
                              borderColor: '#E3E3E3',
                              borderRadius: 4,
                              paddingHorizontal: 10,
                            },
                          ]}
                          onChangeText={(value) => {
                            setPheight(value);
                            formikProps.setFieldValue('order_height', value);
                            setPheightError(false);
                          }}
                          onBlur={formikProps.handleBlur('order_height')}
                          autoCapitalize="none"
                          keyboardType="number-pad"
                        />
                        {formikProps.touched.order_height &&
                        formikProps.errors.order_height ? (
                          <Text
                            style={{
                              width: '100%',
                              fontFamily: 'SCDream4',
                              fontSize: 12,
                              lineHeight: 18,
                              color: '#366DE5',
                              marginVertical: 5,
                            }}>
                            {formikProps.touched.order_height &&
                              formikProps.errors.order_height}
                          </Text>
                        ) : pHeightError ? (
                          <Text
                            style={{
                              width: '100%',
                              fontFamily: 'SCDream4',
                              fontSize: 12,
                              lineHeight: 18,
                              color: '#366DE5',
                              marginVertical: 5,
                            }}>
                            높이 규격을 입력해주세요.
                          </Text>
                        ) : null}
                      </View>
                    )}
                    {/* // 높이 규격 */}

                    {/* 수량 */}
                    <View style={{marginBottom: 25}}>
                      <View style={{marginBottom: 5}}>
                        <Text
                          style={[
                            styles.mediumText,
                            {fontSize: 15, color: '#000000', marginRight: 5},
                          ]}>
                          수량
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.details,
                          {
                            flexWrap: 'wrap',
                            marginBottom: getQuantity ? 5 : 0,
                          },
                        ]}>
                        {getQuantity
                          ? getQuantity.map((q, idx) => (
                              <TouchableOpacity
                                key={idx}
                                activeOpacity={1}
                                hitSlop={{
                                  top: 10,
                                  bottom: 10,
                                  left: 10,
                                  right: 10,
                                }}
                                onPress={() => {
                                  setQuantity(q);
                                  setQuantityDirect(null);
                                  setQuantityError(false);
                                }}
                                style={[
                                  styles.details,
                                  {
                                    marginRight: 20,
                                    marginBottom: 10,
                                  },
                                ]}>
                                <Image
                                  source={
                                    quantity === q
                                      ? require('../../src/assets/radio_on.png')
                                      : require('../../src/assets/radio_off.png')
                                  }
                                  resizeMode="contain"
                                  style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 5,
                                  }}
                                />
                                <Text
                                  style={[
                                    styles.normalText,
                                    {fontSize: 14, color: '#000'},
                                  ]}>
                                  {q}
                                </Text>
                              </TouchableOpacity>
                            ))
                          : null}
                      </View>
                      <View>
                        <TouchableOpacity
                          activeOpacity={1}
                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                          onPress={() => setOrderQuantity('direct')}
                          style={[
                            styles.details,
                            {
                              marginBottom: 10,
                            },
                          ]}>
                          <Image
                            source={
                              quantity === 'direct'
                                ? require('../../src/assets/radio_on.png')
                                : require('../../src/assets/radio_off.png')
                            }
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 5}}
                          />
                          <Text
                            style={[
                              styles.normalText,
                              {fontSize: 14, color: '#000'},
                            ]}>
                            직접 입력
                          </Text>
                        </TouchableOpacity>
                        <TextInput
                          ref={directRef}
                          value={quantityDirect}
                          placeholder="수량을 직접 입력해주세요."
                          placeholderTextColor="#A2A2A2"
                          onChangeText={(text) => {
                            setQuantityDirect(text);
                            setDirectError(false);
                          }}
                          onFocus={() => {
                            setQuantity('direct');
                          }}
                          style={[
                            styles.normalText,
                            {
                              borderWidth: 1,
                              borderColor: '#E3E3E3',
                              borderRadius: 4,
                              paddingHorizontal: 10,
                            },
                          ]}
                          autoCapitalize="none"
                          keyboardType="number-pad"
                        />
                        {directError ? (
                          <Text
                            style={{
                              width: '100%',
                              fontFamily: 'SCDream4',
                              fontSize: 12,
                              lineHeight: 18,
                              color: '#366DE5',
                              marginVertical: 5,
                            }}>
                            수량을 입력해주세요.
                          </Text>
                        ) : quantityError ? (
                          <Text
                            style={{
                              width: '100%',
                              fontFamily: 'SCDream4',
                              fontSize: 12,
                              lineHeight: 18,
                              color: '#366DE5',
                              marginVertical: 5,
                            }}>
                            수량을 지정해주세요.
                          </Text>
                        ) : null}
                      </View>
                    </View>
                    {/* // 수량 */}

                    {/* 일반인쇄 - 규격 */}
                    {cate1 === '0' && standard !== null && standard !== '' ? (
                      <View
                        style={{
                          marginBottom: 25,
                        }}>
                        <View>
                          <Text
                            style={[
                              styles.mediumText,
                              {
                                fontSize: 15,
                                color: '#000000',
                                marginRight: 5,
                                marginBottom: 5,
                              },
                            ]}>
                            규격
                          </Text>
                          <View
                            style={[
                              styles.details,
                              {
                                flexWrap: 'wrap',
                                marginBottom: standard ? 5 : 0,
                              },
                            ]}>
                            {standard !== '' && standard !== null
                              ? standard.map((q, idx) => (
                                  <TouchableOpacity
                                    key={idx}
                                    activeOpacity={1}
                                    hitSlop={{
                                      top: 10,
                                      bottom: 10,
                                      left: 10,
                                      right: 10,
                                    }}
                                    onPress={() => {
                                      setSize(q);
                                      setSizeDirect(null);
                                      setSizeError(false);
                                    }}
                                    style={[
                                      styles.details,
                                      {
                                        marginRight: 20,
                                        marginBottom: 10,
                                      },
                                    ]}>
                                    <Image
                                      source={
                                        size === q
                                          ? require('../../src/assets/radio_on.png')
                                          : require('../../src/assets/radio_off.png')
                                      }
                                      resizeMode="contain"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 5,
                                      }}
                                    />
                                    <Text
                                      style={[
                                        styles.normalText,
                                        {fontSize: 14, color: '#000'},
                                      ]}>
                                      {q}
                                    </Text>
                                  </TouchableOpacity>
                                ))
                              : null}
                          </View>
                        </View>
                        <View>
                          <TouchableOpacity
                            activeOpacity={1}
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            onPress={() => setOrderSize('direct')}
                            style={[
                              styles.details,
                              {
                                marginBottom: 10,
                              },
                            ]}>
                            <Image
                              source={
                                size === 'direct'
                                  ? require('../../src/assets/radio_on.png')
                                  : require('../../src/assets/radio_off.png')
                              }
                              resizeMode="contain"
                              style={{width: 20, height: 20, marginRight: 5}}
                            />
                            <Text
                              style={[
                                styles.normalText,
                                {fontSize: 14, color: '#000'},
                              ]}>
                              직접 입력 {cate1 === '0' ? '(가로 X 세로)' : null}
                            </Text>
                          </TouchableOpacity>
                          <TextInput
                            ref={directSizeRef}
                            value={sizeDirect}
                            placeholder="규격을 직접 입력해주세요."
                            placeholderTextColor="#A2A2A2"
                            onChangeText={(text) => {
                              setSizeDirect(text);
                              setSizeDirectError(false);
                            }}
                            onFocus={() => {
                              setSize('direct');
                            }}
                            style={[
                              styles.normalText,
                              {
                                borderWidth: 1,
                                borderColor: '#E3E3E3',
                                borderRadius: 4,
                                paddingHorizontal: 10,
                              },
                            ]}
                            autoCapitalize="none"
                            keyboardType="number-pad"
                          />
                          {sizeDirectError ? (
                            <Text
                              style={{
                                width: '100%',
                                fontFamily: 'SCDream4',
                                fontSize: 12,
                                lineHeight: 18,
                                color: '#366DE5',
                                marginVertical: 5,
                              }}>
                              규격을 입력해주세요.
                            </Text>
                          ) : sizeError ? (
                            <Text
                              style={{
                                width: '100%',
                                fontFamily: 'SCDream4',
                                fontSize: 12,
                                lineHeight: 18,
                                color: '#366DE5',
                                marginVertical: 5,
                              }}>
                              규격을 지정해주세요.
                            </Text>
                          ) : null}
                        </View>
                      </View>
                    ) : null}
                    {/* // 일반인쇄 - 규격 */}

                    {/* 스티커 - 도무송 */}
                    {cate1 === '0' &&
                    ca_id === '6' &&
                    thomsonType !== null &&
                    thomsonType !== '' ? (
                      <View
                        style={{
                          marginBottom: 25,
                        }}>
                        <View>
                          <Text
                            style={[
                              styles.mediumText,
                              {
                                fontSize: 15,
                                color: '#000000',
                                marginRight: 5,
                                marginBottom: 5,
                              },
                            ]}>
                            톰슨모양
                          </Text>
                          <View
                            style={[
                              styles.details,
                              {
                                flexWrap: 'wrap',
                              },
                            ]}>
                            {thomsonType !== '' && thomsonType !== null
                              ? thomsonType.map((q, idx) => (
                                  <TouchableOpacity
                                    key={idx}
                                    activeOpacity={1}
                                    hitSlop={{
                                      top: 10,
                                      bottom: 10,
                                      left: 10,
                                      right: 10,
                                    }}
                                    onPress={() => {
                                      setThomsonCur(q);
                                    }}
                                    style={[
                                      styles.details,
                                      {
                                        marginRight: 20,
                                        marginBottom: 10,
                                      },
                                    ]}>
                                    <Image
                                      source={
                                        thomsonCur === q
                                          ? require('../../src/assets/radio_on.png')
                                          : require('../../src/assets/radio_off.png')
                                      }
                                      resizeMode="contain"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 5,
                                      }}
                                    />
                                    <Text
                                      style={[
                                        styles.normalText,
                                        {fontSize: 14, color: '#000'},
                                      ]}>
                                      {q}
                                    </Text>
                                  </TouchableOpacity>
                                ))
                              : null}
                          </View>
                        </View>
                      </View>
                    ) : null}
                    {/* // 스티커 - 도무송 */}

                    {/* 목형 */}
                    {cate1 === '1' && (
                      <View style={{marginBottom: 25}}>
                        <View
                          style={[
                            styles.details,
                            {
                              marginBottom: 10,
                            },
                          ]}>
                          <Text
                            style={{
                              fontFamily: 'SCDream5',
                              fontSize: 15,
                              color: '#000000',
                              marginRight: 5,
                            }}>
                            목형
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setIsPattern(true)}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderWidth: 1,
                              borderColor: pattern ? '#275696' : '#E3E3E3',
                              borderRadius: 4,
                              backgroundColor: '#fff',
                              width: '49%',
                              paddingVertical: 15,
                            }}>
                            <Text
                              style={[
                                pattern ? styles.mediumText : styles.normalText,
                                {
                                  fontSize: 14,
                                  color: pattern ? '#275696' : '#A2A2A2',
                                },
                              ]}>
                              있음
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setIsPattern(false)}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderWidth: 1,
                              borderColor: !pattern ? '#275696' : '#E3E3E3',
                              borderRadius: 4,
                              backgroundColor: '#fff',
                              width: '49%',
                              paddingVertical: 15,
                            }}>
                            <Text
                              style={[
                                !pattern
                                  ? styles.mediumText
                                  : styles.normalText,
                                {
                                  fontSize: 14,
                                  color: !pattern ? '#275696' : '#A2A2A2',
                                },
                              ]}>
                              없음
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    {/* // 목형 */}

                    {/* 첨부파일 */}
                    {ca_id !== '9' && (
                      <View style={{marginBottom: 25}}>
                        <View
                          style={[
                            styles.details,
                            {
                              marginBottom: 10,
                            },
                          ]}>
                          <Text
                            style={{
                              fontFamily: 'SCDream5',
                              fontSize: 15,
                              color: '#000000',
                              marginRight: 5,
                            }}>
                            첨부파일
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: 20,
                          }}>
                          <TextInput
                            value={
                              fileNameCurrent
                                ? `${fileNameCurrent}.${
                                    extension === 'jpeg' ? 'jpg' : extension
                                  }`
                                : null
                            }
                            placeholder="파일을 선택해주세요."
                            placeholderTextColor="#A2A2A2"
                            style={[
                              styles.normalText,
                              {
                                flex: 1,
                                borderWidth: 1,
                                borderColor: '#E3E3E3',
                                borderRadius: 4,
                                paddingHorizontal: 10,
                                marginRight: 10,
                              },
                            ]}
                            editable={false}
                          />
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={filePicker}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#275696',
                              borderRadius: 4,
                              height: 50,
                              paddingHorizontal: 20,
                            }}>
                            <Text
                              style={[
                                styles.normalText,
                                {color: '#fff', textAlign: 'center'},
                              ]}>
                              파일 선택
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    {/* // 첨부파일 */}
                  </View>

                  <View style={{paddingHorizontal: 20}}>
                    <TouchableOpacity onPress={toggleModal} activeOpacity={0.8}>
                      <View style={[styles.submitBtn, {marginBottom: 10}]}>
                        <Text style={styles.submitBtnText}>간단 견적 제출</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/* 이전, 다음 버튼 부분 (Prev, Next) */}
                  <View style={{paddingHorizontal: 20}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        marginBottom: 35,
                      }}>
                      <View
                        style={{
                          borderWidth: 0.5,
                          height: '100%',
                          borderColor: '#E3E3E3',
                        }}
                      />
                      <TouchableWithoutFeedback
                        onPress={() => navigation.goBack()}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 15,
                          }}>
                          <Image
                            source={require('../../src/assets/prevUnActiveArrow.png')}
                            resizeMode="contain"
                            style={{width: 16, height: 16, marginRight: 7}}
                          />
                          <Text
                            style={[
                              styles.normalText,
                              {
                                fontSize: 14,
                                color: '#707070',
                                letterSpacing: -1,
                              },
                            ]}>
                            이전
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <View
                        style={{
                          borderWidth: 0.5,
                          height: '100%',
                          borderColor: '#E3E3E3',
                        }}
                      />
                      <TouchableWithoutFeedback
                        onPress={formikProps.handleSubmit}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row-reverse',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 15,
                          }}>
                          <Image
                            source={require('../../src/assets/nextActiveArrow.png')}
                            resizeMode="contain"
                            style={{width: 16, height: 16, marginLeft: 7}}
                          />
                          <Text
                            style={[
                              styles.normalText,
                              {
                                fontSize: 14,
                                letterSpacing: -1,
                              },
                            ]}>
                            세부 견적 작성
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>

                  {/* 간단 견적 제출시 안내 멘트 - 하단 */}
                  <View style={{backgroundColor: '#F5F5F5'}}>
                    <View
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 30,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      }}>
                      <Text
                        style={[
                          styles.normalText,
                          {
                            fontSize: 12,
                            color: '#707070',
                            lineHeight: 18,
                            marginRight: 5,
                          },
                        ]}>
                        -
                      </Text>
                      <Text
                        style={[
                          styles.normalText,
                          {fontSize: 12, color: '#707070', lineHeight: 18},
                        ]}>
                        간단 견적 제출 시, 최고관리자가 확인 및 추가 입력 후,
                        입찰할 파트너스 회원들을 지정합니다.
                      </Text>
                    </View>
                  </View>
                  {/* // 간단 견적 제출시 안내 멘트 - 하단 */}
                  {/* // 이전, 다음 버튼 부분 (Prev, Next) */}
                </View>
              )}
            </Formik>
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  flexRowCenter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
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
    width: 70,
    fontSize: 14,
    color: '#979797',
  },
  detailsDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000',
  },
  submitBtn: {
    borderRadius: 5,
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cancelBtn: {
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    width: '100%',
    paddingVertical: 15,
  },
  cancelBtnText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
  },
  categoryWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryItem: {
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  categoryItemImg: {
    position: 'relative',
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: '#DFE6EF',
  },
  categoryItemImgHover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  categoryItemText: {
    fontFamily: 'SCDream4',
    width: 100,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 10,
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

export default Step04;
