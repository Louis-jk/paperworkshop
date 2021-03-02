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
import BoxType from '../../src/api/BoxType';
import OrderAPI from '../../src/api/OrderAPI';

const Step04 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const propsScreenName = props.route.params.screen;

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
  const [source, setSource] = React.useState({});
  const [pWidth, setPwidth] = React.useState(null);
  const [pLength, setPlength] = React.useState(null);
  const [pHeight, setPheight] = React.useState(null);

  console.log('quantity', quantity);
  console.log('quantityDirect', quantityDirect);

  const easyOrderBefore = () => {
    if (pe_file_url && pe_file_type && pe_file_name !== null) {
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
    frmdata.append('pe_file[]', source ? source : '');
    frmdata.append('memo', memo ? memo : '');
    frmdata.append('pwidth', pWidth);
    frmdata.append('plength', pLength);
    frmdata.append('pheight', pHeight);
    frmdata.append('cnt', quantity !== 'direct' ? quantity : '');
    frmdata.append('cnt_etc', quantity !== 'direct' ? quantityDirect : '');
    frmdata.append('wood_pattern', wood_pattern);

    OrderAPI.sendOrderEasy(frmdata)
      .then((res) => console.log('간편견적 response', res))
      .catch((err) => console.log(err));
  };

  const dispatch = useDispatch();

  const [type, setType] = React.useState('');

  const directRef = React.useRef(null);

  console.log('directRef?', directRef);

  const checkType = (v) => {
    setType(v);
  };

  const [getQuantity, setGetQuantity] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const getType = () => {
    setLoading(true);
    BoxType.getBoxTypeId('proc_box_list', cate1, ca_id, type_id)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setGetQuantity(res.data.item[0].making_cnt);
          setLoading(false);
        } else if (res.data.result === '1' && res.data.count <= 0) {
          setGetQuantity(null);
          setLoading(false);
        } else {
          setGetQuantity(null);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getType();
  }, []);

  const goEasyComplete = async () => {
    await setModalVisible(!isModalVisible);
    await navigation.navigate('easyOrderComplete');
  };

  const [quantity, setQuantity] = React.useState(null);
  const [quantityDirect, setQuantityDirect] = React.useState(null);
  const setOrderQuantity = (v) => {
    directRef.current.focus();
    setQuantity(v);
  };

  const [pattern, setPattern] = React.useState(true);
  const setIsPattern = (b) => {
    setPattern(b);
  };

  // 간단 견적 전 모달
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    dispatch(setUserPwidth(pWidth));
    dispatch(setUserPlength(pLength));
    dispatch(setUserPheight(pHeight));

    if (quantity !== 'direct') {
      dispatch(setUserCnt(quantity));
    } else {
      dispatch(setUserCntEtc(quantityDirect));
    }

    if (pattern) {
      dispatch(setUserWoodPattern('Y'));
    } else {
      dispatch(setUserWoodPattern('N'));
    }

    // dispatch(setUserEasyYn('Y'))

    setModalVisible(!isModalVisible);
  };

  const nextStep = (width, length, height) => {
    dispatch(setUserPwidth(width));
    dispatch(setUserPlength(length));
    dispatch(setUserPheight(height));

    if (quantity !== 'direct') {
      dispatch(setUserCnt(quantity));
    } else {
      dispatch(setUserCntEtc(quantityDirect));
    }
    if (pattern) {
      dispatch(setUserWoodPattern('Y'));
    } else {
      dispatch(setUserWoodPattern('N'));
    }

    navigation.navigate('OrderStep05', {
      screen: propsScreenName === 'DirectOrder' ? propsScreenName : null,
    });
  };

  // 유효성 체크
  const validationSchema = yup.object().shape({
    order_width: yup
      .string()
      .required('가로 규격을 입력해주세요.')
      .label('Width'),
    order_length: yup
      .string()
      .required('세로 규격을 입력해주세요.')
      .label('Length'),
    order_height: yup
      .string()
      .required('높이 규격을 입력해주세요.')
      .label('Height'),
  });

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        goEasyComplete={goEasyComplete}
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
                if (quantity && quantity !== 'direct') {
                  nextStep(
                    values.order_width,
                    values.order_length,
                    values.order_height,
                  );
                } else if (quantity === 'direct' && quantityDirect) {
                  nextStep(
                    values.order_width,
                    values.order_length,
                    values.order_height,
                  );
                } else {
                  Alert.alert('비어있는 입력란이 있습니다.', '확인해주세요.', [
                    {
                      text: '확인',
                    },
                  ]);
                }

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
                        marginBottom: 10,
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

                  {/* 가로 규격 */}
                  <View style={[styles.wrap]}>
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
                      onChangeText={(text) => {
                        formikProps.handleChange('order_width', text);
                        setPwidth(text);
                      }}
                      onBlur={formikProps.handleBlur('order_width')}
                      autoCapitalize="none"
                      keyboardType="number-pad"
                    />
                    {formikProps.touched.order_width &&
                      formikProps.errors.order_width && (
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
                      )}
                  </View>
                  {/* // 가로 규격 */}

                  {/* 세로 규격 */}
                  <View style={[styles.wrap]}>
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
                      // onChangeText={formikProps.handleChange('order_length')}
                      onChangeText={(text) => {
                        formikProps.handleChange('order_length', text);
                        setPlength(text);
                      }}
                      onBlur={formikProps.handleBlur('order_length')}
                      autoCapitalize="none"
                      keyboardType="number-pad"
                    />
                    {formikProps.touched.order_length &&
                      formikProps.errors.order_length && (
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
                      )}
                  </View>
                  {/* // 세로 규격 */}

                  {/* 높이 규격 */}
                  <View style={[styles.wrap]}>
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
                      // onChangeText={formikProps.handleChange('order_height')}
                      onChangeText={(text) => {
                        formikProps.handleChange('order_height', text);
                        setPheight(text);
                      }}
                      onBlur={formikProps.handleBlur('order_height')}
                      autoCapitalize="none"
                      keyboardType="number-pad"
                    />
                    {formikProps.touched.order_height &&
                      formikProps.errors.order_height && (
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
                      )}
                  </View>
                  {/* // 높이 규격 */}

                  {/* 수량 */}
                  <View style={[styles.wrap]}>
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
                        수량
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.details,
                        {
                          marginBottom: getQuantity ? 15 : 0,
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
                              onPress={() => setQuantity(q)}
                              style={[
                                styles.details,
                                {
                                  marginRight: 20,
                                },
                              ]}>
                              <Image
                                source={
                                  quantity === q
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
                        placeholder="직접 입력해주세요."
                        placeholderTextColor="#A2A2A2"
                        onChangeText={(text) => setQuantityDirect(text)}
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
                    </View>
                  </View>
                  {/* // 수량 */}

                  {/* 목형 */}
                  <View style={[styles.wrap, {marginBottom: 25}]}>
                    <View
                      style={[
                        styles.details,
                        {
                          marginBottom: 10,
                        },
                      ]}>
                      <Text
                        style={{
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
                            !pattern ? styles.mediumText : styles.normalText,
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
                  {/* // 목형 */}

                  <View style={{paddingHorizontal: 20}}>
                    <TouchableOpacity
                      onPress={easyOrderBefore}
                      activeOpacity={0.8}>
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
                        입찰할 파트너스 회원들을 지정
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
