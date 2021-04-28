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
import Modal from './detailOrderModal';
import InfoModal from '../Common/infoModal02';
import OrderAPI from '../../src/api/OrderAPI';


import {
  setUserParkProc,
  setUserParkProc2,
  setUserPressDgn,
  setUserPressDgn2,
  setUserPartialSilk,
  setUserPartialSilk2,
  setUserCoating,
  setUserCoating2,
} from '../../Modules/OrderReducer';

import BoxTypeAPI from '../../src/api/BoxType';


const Step06 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const propsScreenName = props.route.params.screen;

  const dispatch = useDispatch();


  const {
    cate1,
    ca_id,
    type_id,
    type_name,
    pf_id,
    pf_id2,
    pd_id,
    pd_id2,
    pn_id,
    pn_id2,
    paper_name2,
    paper_name2_02,
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
    memo,
    pwidth,
    plength,
    pheight,
    cnt,
    cnt_etc,
    wood_pattern,
    stype,
    board_tk,
    easy_yn,
    page_cnt,
    page_cnt2,
    bind_type,
    standard,
    thomson_type,
    writeing_paper,
    cover_color,
    section_color,
    back_side,
    geomancer,
    pe_file02_url,
    pe_file02_type,
    pe_file02_name,
    paper_weight,
    paper_weight2,
    paper_weight_etc,
    paper_weight_etc2,
    paper_goal,
    paper_goal_etc,
    paper_color,
    paper_color2,
    paper_color_etc,
    paper_color_etc2,
    print_frequency,
    print_frequency2,
    proof_printing,
    proof_printing2,
    print_supervision,
    print_supervision2,
    outside,
    status,
  } = useSelector((state) => state.OrderReducer);


  const [getFoil, setGetFoil] = React.useState([]); // 박가공 정보
  const [getPress, setGetPress] = React.useState([]); // 형압 정보
  const [getSilk, setGetSilk] = React.useState([]); // 실크 정보
  const [getLaminate, setGetLaminate] = React.useState([]); // 코팅 정보

  const [getFoil2, setGetFoil2] = React.useState([]); // 박가공 정보 - 내지용
  const [getPress2, setGetPress2] = React.useState([]); // 형압 정보 - 내지용
  const [getSilk2, setGetSilk2] = React.useState([]); // 실크 정보 - 내지용
  const [getLaminate2, setGetLaminate2] = React.useState([]); // 코팅 정보 - 내지용


  const postProcessAPIHandler = () => {
   
    BoxTypeAPI.getPostProcess(cate1, ca_id)
      .then(res => {
        if(res.data.result === '1' && res.data.count > 0) {
          setGetFoil(res.data.item[0].park_processing);
          setGetPress(res.data.item[0].press_design);
          setGetSilk(res.data.item[0].partial_silk);
          setGetLaminate(res.data.item[0].coating);
          if(cate1 === '0' && (ca_id ==='1' || ca_id === '4')) {
            setGetFoil2(res.data.item[0].park_processing2);
            setGetPress2(res.data.item[0].press_design2);
            setGetSilk2(res.data.item[0].partial_silk2);
            setGetLaminate2(res.data.item[0].coating2);
          }
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인'
            }
          ])  
        }
      })
      .catch(err => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인'
          }
        ])
      });
  }

  React.useEffect(() => {
    postProcessAPIHandler();
  },[cate1, ca_id])

  //  박가공 유무
  const [foil, setFoil] = React.useState('Y');

  const setFoilChoise = (v) => {
    setFoil(v);
    dispatch(setUserParkProc(v));
  };

  //  박가공 유무 - 내지
  const [foil02, setFoil02] = React.useState('Y');

  const setFoilChoise02 = (v) => {
    setFoil02(v);
    dispatch(setUserParkProc2(v));
  };

  //  형압 유무
  const [press, setPress] = React.useState('Y');

  const setPressChoise = (v) => {
    setPress(v);
    dispatch(setUserPressDgn(v));
  };

  //  형압 유무 - 내지
  const [press02, setPress02] = React.useState('Y');

  const setPressChoise02 = (v) => {
    setPress02(v);
    dispatch(setUserPressDgn2(v));
  };

  //  부분 실크 유무
  const [silk, setSilk] = React.useState('Y');

  const setSilkChoise = (v) => {
    setSilk(v);
    dispatch(setUserPartialSilk(v));
  };

  //  부분 실크 유무 - 내지
  const [silk02, setSilk02] = React.useState('Y');

  const setSilkChoise02 = (v) => {
    setSilk02(v);
    dispatch(setUserPartialSilk2(v));
  };

  //  코팅 선택
  const [laminate, setLaminate] = React.useState('');
  const [laminateError, setLaminateError] = React.useState(false);

  const setLaminateChoise = (v) => {
    setLaminate(v);
    dispatch(setUserCoating(v));
  };

  //  코팅 선택 - 내지
  const [laminate02, setLaminate02] = React.useState('');
  const [laminateError02, setLaminateError02] = React.useState(false);

  const setLaminateChoise02 = (v) => {
    setLaminate02(v);
    dispatch(setUserCoating2(v));
  };

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    if (ca_id !== '10' && laminate === '') {
      setLaminateError(true);
    } 
    else if (ca_id !== '10' && (ca_id === '1' || ca_id === '4') && laminate02 === '') {
      setLaminateError02(true);
    } else {
      setModalVisible(!isModalVisible);
    }
  };

  const [isInfoModalVisible, setInfoModalVisible] = React.useState(false);

  const toggleInfoModal = () => {
    setInfoModalVisible(!isInfoModalVisible);
  };

  const [source, setSource] = React.useState('');
  const [source02, setSource02] = React.useState('');

  const sendOrderBefore = () => {
    if (pe_file_url && pe_file_type && pe_file_name !== null) {
      setSource({
        uri: pe_file_url,
        type: pe_file_type,
        name: pe_file_name,
      });
    }

    if (pe_file02_url && pe_file02_type && pe_file02_name !== null) {
      setSource02({
        uri: pe_file02_url,
        type: pe_file02_type,
        name: pe_file02_name,
      });
    }
    sendOrderAPI();
  };

  const sendOrderAPI = () => {
    const frmdata = new FormData();
    frmdata.append('method', 'proc_estimate');
    frmdata.append('cate1', cate1);
    frmdata.append('ca_id', ca_id);
    frmdata.append('type_id', type_id);
    frmdata.append('type_name', type_name);
    frmdata.append('pf_id', pf_id);
    frmdata.append('pf_id2', pf_id2);
    frmdata.append('pd_id', pd_id);
    frmdata.append('pd_id2', pd_id2);
    frmdata.append('pn_id', pn_id);
    frmdata.append('pn_id2', pn_id2);
    frmdata.append('paper_name2', paper_name2 ? paper_name2 : '');
    frmdata.append('paper_name2_02', paper_name2_02 ? paper_name2_02 : '');
    frmdata.append('mb_id', mb_id);
    frmdata.append('company_id', company_id);
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
    frmdata.append('pwidth', pwidth);
    frmdata.append('plength', plength);
    frmdata.append('pheight', pheight);
    frmdata.append('cnt', cnt);
    frmdata.append('cnt_etc', cnt_etc);
    frmdata.append('easy_yn', easy_yn);
    frmdata.append('page_cnt', page_cnt);
    frmdata.append('page_cnt2', page_cnt2);
    frmdata.append('bind_type', bind_type);
    frmdata.append('standard', standard);
    frmdata.append('thomson_type', thomson_type);
    frmdata.append('writeing_paper', writeing_paper);
    frmdata.append('cover_color', cover_color);
    frmdata.append('section_color', section_color);
    frmdata.append('back_side', back_side);
    frmdata.append('geomancer', geomancer);
    frmdata.append('pe_file2[]', source02);
    frmdata.append('wood_pattern', wood_pattern);
    frmdata.append('stype', stype);
    frmdata.append('board_tk', board_tk);
    frmdata.append('paper_weight', paper_weight);
    frmdata.append('paper_weight2', paper_weight2);
    frmdata.append('paper_weight_etc', paper_weight_etc);
    frmdata.append('paper_weight_etc2', paper_weight_etc2);
    frmdata.append('paper_goal', paper_goal ? paper_goal : '');
    frmdata.append('paper_goal_etc', paper_goal_etc ? paper_goal_etc : '');
    frmdata.append('paper_color', paper_color);
    frmdata.append('paper_color2', paper_color2);
    frmdata.append('paper_color_etc', paper_color_etc);
    frmdata.append('paper_color_etc2', paper_color_etc2);
    frmdata.append('print_frequency', print_frequency);
    frmdata.append('print_frequency2', print_frequency2);
    frmdata.append('proof_printing', proof_printing);
    frmdata.append('proof_printing2', proof_printing2);
    frmdata.append('print_supervision', print_supervision);
    frmdata.append('print_supervision2', print_supervision2);
    frmdata.append('park_processing', foil);
    frmdata.append('press_design', press);
    frmdata.append('partial_silk', silk);
    frmdata.append('coating', laminate);
    frmdata.append('park_processing2', foil02);
    frmdata.append('press_design2', press02);
    frmdata.append('partial_silk2', silk02);
    frmdata.append('coating2', laminate02);
    frmdata.append('outside', outside);
    frmdata.append('status', status);

    OrderAPI.sendOrder(frmdata)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
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
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        goOrderComplete={sendOrderBefore}
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
            {getFoil &&
              getFoil.length > 1 && (
                <View style={{marginBottom: 25}}>
                  {cate1 === '0' && (ca_id === '1' || ca_id === '4') ? (
                    <Text
                      style={{
                        fontFamily: 'SCDream5',
                        fontSize: 15,
                        marginBottom: 20,
                      }}>
                      {'<표지>'}
                    </Text>
                  ) : null}

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
                    {getFoil.map((p, idx) => (
                      <TouchableOpacity
                        key={idx}
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
            {getPress &&
              getPress.length > 1 && (
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
                    {getPress.map((p, idx) => (
                      <TouchableOpacity
                        key={idx}
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
            {getSilk &&
              getSilk.length > 1 && (
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
                    {getSilk.map((p, idx) => (
                      <TouchableOpacity
                        key={idx}
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
            {getLaminate && getLaminate.length > 0 ? (
              <View style={{marginBottom: 25}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    코팅 {ca_id === '13' || ca_id === '14' ? '<바깥면>' : null}
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
                  {getLaminate.map((c, idx) => (
                    <TouchableOpacity
                      key={idx}
                      activeOpacity={1}
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                      onPress={() => {
                        setLaminateError(false);
                        setLaminateChoise(c);
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginRight: 20,
                        marginBottom: 15,
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
                {laminateError ? (
                  <Text
                    style={{
                      width: '100%',
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#366DE5',
                      marginVertical: 5,
                    }}>
                    코팅을 선택해주세요.
                  </Text>
                ) : null}
              </View>
            ) : null}
            {/* // 코팅  */}
          </View>

          {cate1 === '0' && (ca_id === '1' || ca_id === '4') ? (
            <View style={styles.wrap}>
              <Text
                style={{
                  fontFamily: 'SCDream5',
                  fontSize: 15,
                  marginBottom: 20,
                }}>
                {'<내지>'}
              </Text>
              {/* 박가공  */}
              {getFoil2 &&
                getFoil2.length > 1 && (
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
                      {getFoil2.map((p, idx) => (
                        <TouchableOpacity
                          key={idx}
                          activeOpacity={1}
                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                          onPress={() => setFoilChoise02(p)}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginRight: 20,
                          }}>
                          <Image
                            source={
                              foil02 === p
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
              {getPress2 &&
                getPress2.length > 1 && (
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
                      {getPress2.map((p, idx) => (
                        <TouchableOpacity
                          key={idx}
                          activeOpacity={1}
                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                          onPress={() => setPressChoise02(p)}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginRight: 20,
                          }}>
                          <Image
                            source={
                              press02 === p
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
              {getSilk2 &&
                getSilk2.length > 1 && (
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
                      {getSilk2.map((p, idx) => (
                        <TouchableOpacity
                          key={idx}
                          activeOpacity={1}
                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                          onPress={() => setSilkChoise02(p)}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginRight: 20,
                          }}>
                          <Image
                            source={
                              silk02 === p
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
              {getLaminate2 && getLaminate2.length > 0 ? (
                <View style={{marginBottom: 25}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Text style={[styles.profileTitle, {marginRight: 5}]}>
                      코팅{' '}
                      {ca_id === '13' || ca_id === '14' ? '<바깥면>' : null}
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
                    {getLaminate2.map((c, idx) => (
                      <TouchableOpacity
                        key={idx}
                        activeOpacity={1}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={() => {
                          setLaminateError02(false);
                          setLaminateChoise02(c);
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 20,
                          marginBottom: 15,
                        }}>
                        <Image
                          source={
                            laminate02 === c
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
                  {laminateError02 ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#366DE5',
                        marginVertical: 5,
                      }}>
                      코팅을 선택해주세요.
                    </Text>
                  ) : null}
                </View>
              ) : null}
              {/* // 코팅  */}
            </View>
          ) : null}
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
