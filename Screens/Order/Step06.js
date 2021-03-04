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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import DetailHeader from '../Common/DetailHeader';
import Footer from '../Common/Footer';
import Modal from './detailOrderModal';
import InfoModal from '../Common/infoModal02';
import OrderAPI from '../../src/api/OrderAPI';

const Step06 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const propsScreenName = props.route.params.screen;

  const {type_details} = useSelector((state) => state.OrderHandlerReducer);
  const {
    cate1,
    ca_id,
    type_id,
    type_name,
    pf_id,
    pd_id,
    pn_id,
    paper_name2,
    mb_id,
    company_id,
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
    pwidth,
    plength,
    pheight,
    cnt,
    cnt_etc,
    wood_pattern,
    easy_yn,
    paper_weight,
    paper_weight_etc,
    paper_goal,
    paper_goal_etc,
    paper_color,
    paper_color_etc,
    print_frequency,
    proof_printing,
    print_supervision,
    park_processing,
    press_design,
    partial_silk,
    coating,
    outside,
    status,
  } = useSelector((state) => state.OrderReducer);

  const sendOrder = () => {
    const frmdata = new FormData();
    frmdata.append('method', 'proc_estimate');
    frmdata.append('cate1', cate1);
    frmdata.append('ca_id', ca_id);
    frmdata.append('type_id', type_id);
    frmdata.append('pf_id', pf_id);
    frmdata.append('pf_id2', pf_id2); // 내지 부눈 필수값?
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

    OrderAPI.sendOrder(frmdata)
      .then((res) => console.log('간편견적 response', res))
      .catch((err) => console.log(err));
  };

  //  박가공 유무
  const [foil, setFoil] = React.useState('Y');

  const setFoilChoise = (v) => {
    setFoil(v);
  };

  //  형압 유무
  const [press, setPress] = React.useState('Y');

  const setPressChoise = (v) => {
    setPress(v);
  };

  //  부분 실크 유무
  const [silk, setSilk] = React.useState('Y');

  const setSilkChoise = (v) => {
    setSilk(v);
  };

  //  코팅 선택
  const [laminate, setLaminate] = React.useState('none');

  const setLaminateChoise = (v) => {
    setLaminate(v);
  };

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goOrderComplete = async () => {
    await setModalVisible(!isModalVisible);
    await navigation.navigate('OrderComplete');
  };

  const [isInfoModalVisible, setInfoModalVisible] = React.useState(false);

  const toggleInfoModal = () => {
    setInfoModalVisible(!isInfoModalVisible);
  };

  console.log('foil', foil);

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        goOrderComplete={goOrderComplete}
      />
      <InfoModal isVisible={isInfoModalVisible} toggleModal={toggleInfoModal} />
      <DetailHeader
        title={propsScreenName === 'DirectOrder' ? propsScreenName : routeName}
        navigation={navigation}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={[styles.boldText, {fontSize: 16, color: '#000000'}]}>
            후가공
          </Text>

          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleInfoModal}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#275696',
                paddingVertical: 6,
                paddingHorizontal: 8,
                borderRadius: 50,
              }}>
              <Image
                source={require('../../src/assets/icon_bikkuri.png')}
                resizeMode="contain"
                style={{width: 17, height: 17, marginRight: 5}}
              />
              <Text style={[styles.normalText, {fontSize: 13, color: '#fff'}]}>
                세부 정보 안내
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={styles.wrap}></View>

          <View style={styles.wrap}>
            {/* 박가공  */}
            {type_details[0].park_processing &&
              type_details[0].park_processing.length > 1 && (
                <View style={{marginBottom: 25}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Text style={[styles.profileTitle, {marginRight: 5}]}>
                      박가공
                    </Text>
                    {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    {type_details[0].park_processing.map((p) => (
                      <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={() => setFoilChoise(p)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 20,
                        }}>
                        <Image
                          source={
                            foil === p
                              ? require('../../src/assets/radio_on.png')
                              : require('../../src/assets/radio_off.png')
                          }
                          resizeMode="contain"
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                        <Text style={[styles.normalText, {fontSize: 14}]}>
                          {p === 'Y' ? '있음' : '없음'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            {/* // 박가공  */}

            {/* 형압  */}
            {type_details[0].press_design &&
              type_details[0].press_design.length > 1 && (
                <View style={{marginBottom: 25}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Text style={[styles.profileTitle, {marginRight: 5}]}>
                      형압
                    </Text>
                    {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    {type_details[0].press_design.map((p) => (
                      <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={() => setPressChoise(p)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 20,
                        }}>
                        <Image
                          source={
                            press === p
                              ? require('../../src/assets/radio_on.png')
                              : require('../../src/assets/radio_off.png')
                          }
                          resizeMode="contain"
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                        <Text style={[styles.normalText, {fontSize: 14}]}>
                          {p === 'Y' ? '있음' : '없음'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            {/* // 형압  */}

            {/* 부분 실크  */}
            {type_details[0].partial_silk &&
              type_details[0].partial_silk.length > 1 && (
                <View style={{marginBottom: 25}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Text style={[styles.profileTitle, {marginRight: 5}]}>
                      부분 실크
                    </Text>
                    {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    {type_details[0].partial_silk.map((p) => (
                      <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={() => setSilkChoise(p)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 20,
                        }}>
                        <Image
                          source={
                            silk === p
                              ? require('../../src/assets/radio_on.png')
                              : require('../../src/assets/radio_off.png')
                          }
                          resizeMode="contain"
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                        <Text style={[styles.normalText, {fontSize: 14}]}>
                          {p === 'Y' ? '있음' : '없음'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            {/* // 부분 실크  */}

            {/* 코팅  */}
            {type_details[0].coating && type_details[0].coating.length > 0 && (
              <View style={{marginBottom: 25}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    코팅
                  </Text>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {type_details[0].coating.map((c) => (
                    <TouchableOpacity
                      activeOpacity={1}
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                      onPress={() => setLaminateChoise(c)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginRight: 20,
                        marginBottom: 10,
                      }}>
                      <Image
                        source={
                          laminate === c
                            ? require('../../src/assets/radio_on.png')
                            : require('../../src/assets/radio_off.png')
                        }
                        resizeMode="contain"
                        style={{width: 20, height: 20, marginRight: 5}}
                      />
                      <Text style={[styles.normalText, {fontSize: 14}]}>
                        {c}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            {/* // 코팅  */}
          </View>
        </ScrollView>

        <View style={{width: '100%'}}>
          {/* 이전, 다음 버튼 부분 (Prev, Next) */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 0,
            }}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
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

            <TouchableWithoutFeedback onPress={toggleModal}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                  borderWidth: 1,
                  borderColor: '#275696',
                  backgroundColor: '#275696',
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}>
                <Text
                  style={[
                    styles.mediumText,
                    {
                      fontSize: 14,
                      letterSpacing: -1,
                      color: '#fff',
                    },
                  ]}>
                  세부 견적 제출
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* // 이전, 다음 버튼 부분 (Prev, Next) */}
      </View>
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
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  profileBox: {
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
  profileDesc: {
    fontSize: 15,
    lineHeight: 16,
    color: '#111',
  },
  prevNextBtn: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  prevNextBtnText: {
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
  },
  submitBtn: {
    borderRadius: 4,
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
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
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
  },
  picker: {
    width: 180,
  },
  listWrap: {
    paddingVertical: 20,
  },
  listTitle: {
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 5,
  },
  listDesc: {
    fontSize: 12,
    lineHeight: 16,
    color: '#A2A2A2',
  },
  listStep: {
    fontSize: 14,
    color: '#275696',
  },
  listDday: {
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#A2A2A2',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
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

export default Step06;
