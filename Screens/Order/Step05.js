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
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import qs from 'qs';
import {useSelector, useDispatch} from 'react-redux';

import DropDownPicker from 'react-native-dropdown-picker';

import DetailHeader from '../Common/DetailHeader';
import {
  selectPfId,
  selectPdId,
  selectPnId,
  selectPaperName,
  setUserWeight,
  setUserWeightEtc,
  setUserGoal,
  setUserGoalEtc,
  setUserColor,
  setUserColorEtc,
  setUserFrequency,
  setUserPrinting,
  setUserPrintSup,
  setUserBoardTk,
} from '../../Modules/OrderReducer';
import {setOrderDetails} from '../../Modules/OrderHandlerReducer';

const baseUrl = 'http://dmonster1506.cafe24.com/json/proc_json.php/';

const Step05 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const propsScreenName = props.route.params.screen;

  console.log('Step05 props:', props);
  const dispatch = useDispatch();

  //////////////////////////
  /////// STATES ///////
  /////////////////////////

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoading01, setIsLoading01] = React.useState(false);
  const [isLoading02, setIsLoading02] = React.useState(true); // 평량 로딩
  const [isLoading03, setIsLoading03] = React.useState(true); // 직접 입력 로딩
  const [isLoading04, setIsLoading04] = React.useState(true); // 색상 입력 로딩
  const [isLoading05, setIsLoading05] = React.useState(true); // 골 입력 로딩

  const {cate1, ca_id, type_id} = useSelector((state) => state.OrderReducer);
  const {type_details} = useSelector((state) => state.OrderHandlerReducer);

  const [boardTk, setBoardTk] = React.useState(''); // 속지 판지 두께 담기 (ca_id === 12 : 싸바리 박스일 경우)
  const [paper, setPaper] = React.useState(null); // 지류 선택 (pf_id 지류아이디)
  const [typeDetail, setTypeDetail] = React.useState([]); // 지류 정보 담기
  const [paperType, setPaperType] = React.useState(null); // 지종 선택
  const [paperDetail, setPaperDetail] = React.useState([]); // 지종 정보 담기
  const [paperDetail2, setPaperDetail2] = React.useState([]); // 지종 2차 정보 담기
  const [isDirect01, setIsDirect01] = React.useState('n'); // 지종 2차 정보 중 "직접입력" 란 유무 담기
  const [paperTypeDetail, setPaperTypeDetail] = React.useState(null); //  지종 2차 정보 담기
  const [paperDetail3, setPaperDetail3] = React.useState([]); // 지종 2차 세부 내용 정보 담기
  const [getWeight, setGetWeight] = React.useState(null); // 지종 1차 Response 평량 값 및 유무 (paper_weight)
  const [getGoal, setGetGoal] = React.useState(null); // 지종 1차 Response 골 값 및 유무 (paper_goal)
  const [weight, setWeight] = React.useState(null); //  평량 정보 담기
  const [goal, setGoal] = React.useState(null); //  골 정보 담기
  const [isDirect, setIsDirect] = React.useState(null); // 지종 2차 직접 입력 선택 유무
  const [directPaperName, setDirectPaperName] = React.useState(null); // 지종 1차 또는 2차 직접 입력란 선택시 지종 직접 입력 값 담기
  const [directWeight, setDirectWeight] = React.useState(null); // 지종 1차 또는 2차 직접 입력란 선택시 평량 직접 입력 값 담기
  const [directGoal, setDirectGoal] = React.useState(null); // 지종 1차 또는 2차 직접 입력란 선택시 골 직접 입력 값 담기
  const [directColor, setDirectColor] = React.useState(null); // 지종 1차 또는 2차 직접 입력란 선택시 골 직접 입력 값 담기
  const [print, setPrint] = React.useState(null); //  인쇄도수
  const [color, setColor] = React.useState('Y'); //  인쇄교정
  const [check, setCheck] = React.useState('Y'); //  인쇄감리
  const [getPaperColors, setGetPaperColors] = React.useState([]); //  색상
  const [getPrtFrequency, setGetPrtFrequency] = React.useState([]); //  수량
  const [getProofPrinting, setGetProofPrinting] = React.useState(null); //  인쇄교정 API 가져온 값 담기
  const [getPrtSupervision, setGetPrtSupervision] = React.useState(null); //  인쇄감리 API 가져온 값 담기
  const [paperColor, setPaperColor] = React.useState(null); //  색상 지정 index
  const [paperColorName, setPaperColorName] = React.useState(null); //  색상 지정 색상명(API 받아온 그대로)

  // console.log('paperColor', paperColor);
  // console.log('paperColorName', paperColorName);
  // console.log('paperDetail', paperDetail);
  // console.log('paperDetail2', paperDetail2);
  // console.log('paper', paper);
  // console.log('isDirect01', isDirect01);
  // console.log('isDirect', isDirect);
  // console.log('directPaperName', directPaperName);
  // console.log('getPaperColors', getPaperColors);
  // console.log('paperColor', paperColor);
  // console.log('인쇄도수 print', print);

  //////////////////////////
  /////// FUNCTIONS ///////
  /////////////////////////

  const nextBtn = () => {
    if (paper === null || paper === '') {
      Alert.alert('지류를 선택해주세요.', '', [
        {
          text: '확인',
        },
      ]);
    } else if (paperType === null || paperType === '') {
      Alert.alert('지종을 선택해주세요.', '', [
        {
          text: '확인',
        },
      ]);
    } else if (isDirect01 === 'y' || isDirect === '직접입력') {
      if (
        directPaperName === null ||
        directPaperName === '' ||
        directPaperName === null ||
        directPaperName === ''
      ) {
        Alert.alert('지종을 직접 입력해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else if (directWeight === '' && ca_id !== '10') {
        Alert.alert('평량을 직접 입력해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else if (
        directGoal === null &&
        cate1 === '1' &&
        ca_id !== '9' &&
        ca_id !== '12' &&
        ca_id !== '13' &&
        ca_id !== '14'
      ) {
        Alert.alert('골을 직접 입력해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else if (directColor === null || directColor === '') {
        Alert.alert('색상을 직접 입력해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else if (print === null || print === '') {
        Alert.alert('인쇄도수를 선택해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else if (color === null || color === '') {
        Alert.alert('인쇄교정을 선택해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else if (check === null || check === '') {
        Alert.alert('인쇄감리를 선택해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else {
        dispatch(selectPfId(paper));
        dispatch(selectPdId(paperType));
        dispatch(selectPnId(paperTypeDetail));
        dispatch(selectPaperName(directPaperName));
        dispatch(setUserWeightEtc(directWeight));
        dispatch(setUserGoalEtc(directGoal));
        dispatch(setUserColorEtc(directColor));
        dispatch(setUserFrequency(print));
        dispatch(setUserPrinting(color));
        dispatch(setUserPrintSup(check));
        dispatch(setOrderDetails(paperDetail2));

        navigation.navigate('OrderStep06', {
          screen: propsScreenName === 'DirectOrder' ? propsScreenName : null,
        });
      }
    } else if (isDirect01 === 'n' || isDirect !== '직접입력') {
      if (weight === null && ca_id !== '10') {
        Alert.alert('평량을 선택해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else if (
        goal === null &&
        cate1 === '1' &&
        ca_id !== '9' &&
        ca_id !== '12' &&
        ca_id !== '13' &&
        ca_id !== '14'
      ) {
        Alert.alert('골을 선택해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else if (paperColor === null || paperColor === '') {
        Alert.alert('색상을 선택해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else if (print === null || print === '') {
        Alert.alert('인쇄도수를 선택해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else if (color === null || color === '') {
        Alert.alert('인쇄교정을 선택해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else if (check === null || check === '') {
        Alert.alert('인쇄감리를 선택해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } else {
        dispatch(selectPfId(paper));
        dispatch(selectPdId(paperType));
        dispatch(selectPnId(paperTypeDetail));
        dispatch(setUserWeight(weight));
        dispatch(setUserGoal(goal));
        dispatch(setUserColor(paperColor));
        dispatch(setUserFrequency(print));
        dispatch(setUserPrinting(color));
        dispatch(setUserPrintSup(check));
        dispatch(setOrderDetails(paperDetail2));
        dispatch(setUserBoardTk(boardTk));

        navigation.navigate('OrderStep06', {
          screen: propsScreenName === 'DirectOrder' ? propsScreenName : null,
        });
      }
    }
  };

  // 지류 정보 가져오기 (분류아이디: cate1, 1차분류아이디: ca_id, 박스타입아이디: type_id(선택) 필요)
  const getTypeDetail = () => {
    axios({
      url: `${baseUrl}`,
      method: 'post',
      data: qs.stringify({
        method: 'proc_feeder_list',
        cate1,
        ca_id,
        type_id,
      }),
    })
      .then((res) => {
        console.log('지류 정보 step05', res);
        if (res.data.result === '1') {
          setTypeDetail(res.data.item);
          // setPaperChoise(res.data.item[0].pf_id); // 최조 지종 지정
          // dispatch(setOrderDetails(res.data.item));
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  };

  // 지류 정보 가져오기 (지류 아이디 필요 : pf_id)
  const getPaperDetail = (pf_id) => {
    setIsLoading(true);
    setIsLoading01(true);
    setIsLoading02(true);

    axios({
      url: `${baseUrl}`,
      method: 'post',
      data: qs.stringify({
        method: 'proc_paper_list',
        cate1,
        ca_id,
        pf_id,
      }),
    })
      .then((res) => {
        console.log('지류 정보', res);
        if (res.data.result === '1') {
          setIsLoading(false);
          setPaperDetail(res.data.item);
          // setPaperType(res.data.item[0].paper_name);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  };

  const setPaperChoise = (v) => {
    setPaper(v);
    getPaperDetail(v);
    setIsLoading02(true); // 평량 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading03(true); // 지종 직접 입력 TextInput 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading04(true); // 색상 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading05(true); // 골 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setWeight(null);
    setGoal(null);
    setDirectPaperName(null);
    setDirectWeight(null);
    setDirectGoal(null);
    setIsDirect01('n'); // 지종 1차 선택시 직접 유무 초기화
    setIsDirect(null); // 지종 2차 선택시 직접 유무 초기화
    setPaperType(null); // 지종 초기화
  };

  // 지종 1차(pd_id) 선택 및 가져오기 (지종 아이디 필요 : pd_id)
  const getPaperDetailStep01 = (pd_id) => {
    setIsLoading01(true);
    setIsLoading02(true); // 평량 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading03(true); // 지종 직접 입력 TextInput 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading04(true); // 색상 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading05(true); // 골 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setPaperColor(null);
    setPaperColorName(null);
    axios({
      url: `${baseUrl}`,
      method: 'post',
      data: qs.stringify({
        method: 'proc_paper_list',
        cate1, // 분류아이디
        ca_id, // 1차 분류 아이디
        pf_id: paper, // 지류아이디
        pd_id, // 지종아이디
      }),
    })
      .then((res) => {
        console.log('지종1 차 결과 res', res);
        if (res.data.result === '1') {
          if (res.data.item[0].paper_name !== '직접입력') {
            setPaperDetail2(res.data.item); // 상세 지종 API 가져온 값 담기
            setIsDirect01('n'); // 지종 1차에서 직접 입력이 아니란 값 담기
          } else {
            setIsDirect01('y'); // 지종 1차에서 직접 입력이란 값 담기
            setIsLoading03(false); // 지종 직접 입력 TextInput 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
          }
          setGetWeight(res.data.item[0].paper_weight); // 상세 지종 평량 API 가져온 값 담기
          setGetGoal(res.data.item[0].paper_goal); // 상세 지종 골 API 가져온 값 담기
          setGetPaperColors(res.data.item[0].paper_color); // 상세 지종 색상 API 가져온 값 담기
          setGetPrtFrequency(res.data.item[0].print_frequency); // 상세 지종 인쇄도수 API 가져온 값 담기
          setGetProofPrinting(res.data.item[0].proof_printing); // 상세 지종 인쇄교정 API 가져온 값 담기
          setGetPrtSupervision(res.data.item[0].print_supervision); // 상세 지종 인쇄감리 API 가져온 값 담기

          setIsLoading01(false);
          setIsLoading02(false); // 평량 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
          setIsLoading04(false); // 색상 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
          setIsLoading05(false); // 골 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  };

  // 평량 정보 가져오기
  const getPaperDetailStep02 = (pn_id) => {
    setIsLoading02(true);
    setPaperColor(null);
    setPaperColorName(null);
    axios({
      url: `${baseUrl}`,
      method: 'post',
      data: qs.stringify({
        method: 'proc_paper_list',
        cate1, // 분류아이디('일반','패키지','기타')
        ca_id, // 1차 분류 아이디
        pf_id: paper, // 지류 아이디
        pd_id: paperType, // 지종 아이디
        pn_id, // 지종 상세 아이디
      }),
    })
      .then((res) => {
        console.log('지종 상세', res);
        if (res.data.result === '1') {
          setPaperDetail3(res.data.item);
          setGetWeight(res.data.item[0].paper_weight); // 상세 지종 평량 API 가져온 값 담기
          setGetGoal(res.data.item[0].paper_goal); // 상세 지종 골 API 가져온 값 담기
          setGetPaperColors(res.data.item[0].paper_color); // 상세 지종 색상 API 가져온 값 담기
          setGetPrtFrequency(res.data.item[0].print_frequency); // 상세 지종 인쇄도수 API 가져온 값 담기
          setGetProofPrinting(res.data.item[0].proof_printing); // 상세 지종 인쇄교정 API 가져온 값 담기
          setGetPrtSupervision(res.data.item[0].print_supervision); // 상세 지종 인쇄감리 API 가져온 값 담기
          setIsLoading02(false);
          setIsLoading04(false);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getTypeDetail();
    setPaperType(null);
    setPaper(null);
  }, []);

  console.log('pf_id', paper);
  console.log('getWeight', typeof getWeight);

  // 직접입력시
  const setPaperTypeName02 = (v) => {
    if (v === '직접입력') {
      setIsDirect(v);
      setIsLoading03(false);
    }
  };

  // 지종 1차 선택
  const setPaperType01 = (v) => {
    setPaperType(v); // 지종 선택 지종 아이디
    getPaperDetailStep01(v);
    setIsLoading01(false);
    setIsLoading02(false);
    setIsLoading03(true);
    setIsDirect01('n'); // 지종 1차 선택시 직접 유무 초기화
    setIsDirect(null); // 지종 2차 선택시 직접 유무 초기화
  };

  // 지종 2차 선택
  const setPaperType02 = (v) => {
    console.log('지종2차', v);
    setPaperTypeDetail(v);
    getPaperDetailStep02(v);
    setIsLoading03(true);
    setIsDirect01('n'); // 지종 1차 선택시 직접 유무 초기화
    setIsDirect(null); // 지종 2차 선택시 직접 유무 초기화
  };

  // 평량 넣기
  const setWeightChoise = (v) => {
    setWeight(v);
  };

  // 골 넣기
  const setGoalChoise = (v) => {
    setGoal(v);
  };

  //  인쇄도수
  const setPrintColor = (v) => {
    setPrint(v);
  };

  //  인쇄교정
  const setColorChoise = (v) => {
    setColor(v);
    console.log('setColorChoise v', v);
  };

  //  인쇄감리
  const setCheckChoise = (v) => {
    setCheck(v);
    console.log('setCheckChoise v', v);
  };

  const onSelectPaperColor = (name) => {
    console.log('컬러 네임', name);
    setPaperColorName(name);
    setPaperColor(name);
  };

  console.log('getGoal', getGoal);
  console.log('getWeight', getWeight);
  console.log('getPrtSupervision', getPrtSupervision);

  return (
    <>
      {isLoading && (
        <>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100,
              elevation: 0,
              backgroundColor: 'transparent',
            }}>
            <ActivityIndicator size="large" color="#275696" />
          </View>
          {/* 지류 선택  */}
          <View style={{marginBottom: paper === 'normal' ? 40 : 25}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={[styles.profileTitle, {marginRight: 5}]}>구분</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {typeDetail
                ? typeDetail.map((t) => (
                    <TouchableOpacity
                      key={t.pf_id}
                      activeOpacity={1}
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                      onPress={() => setPaperChoise(t.pf_id)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginRight: 20,
                        marginBottom: 20,
                        width: '100%',
                      }}>
                      <Image
                        source={
                          paper === t.pf_id
                            ? require('../../src/assets/radio_on.png')
                            : require('../../src/assets/radio_off.png')
                        }
                        resizeMode="contain"
                        style={{width: 20, height: 20, marginRight: 5}}
                      />
                      <Text style={[styles.normalText, {fontSize: 14}]}>
                        {t.feeder_name}
                      </Text>
                    </TouchableOpacity>
                  ))
                : null}
            </View>
          </View>
          {/* // 지류 선택  */}
        </>
      )}
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
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {ca_id === '12' && ( //type_details
            <>
              <View style={styles.wrap}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[styles.boldText, {fontSize: 16, color: '#000000'}]}>
                    속지 판지 두께
                  </Text>
                </View>
              </View>
              {/* 지류 선택  */}
              <View style={{marginBottom: paper === 'normal' ? 40 : 25}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {type_details[0].board_tk ? (
                    <View style={{width: '49%'}}>
                      <DropDownPicker
                        value={paperType}
                        placeholder="속지 두께 선택"
                        placeholderStyle={{
                          fontSize: 14,
                          color: '#A2A2A2',
                          fontWeight: '400',
                        }}
                        activeLabelStyle={{color: '#000'}}
                        activeItemStyle={{color: '#000'}}
                        selectedLabelStyle={{color: '#000'}}
                        value={paperType}
                        dropDownMaxHeight={300}
                        items={type_details[0].board_tk.map((v, _i) => {
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
                        // onOpen={() => {
                        //   setDirectPaperName(null);
                        //   setWeight(null);
                        //   setDirectWeight(null);
                        //   setDirectGoal(null);
                        //   setIsLoading02(true);
                        //   setIsLoading03(true);
                        //   setIsLoading04(true);
                        //   setIsLoading05(true);
                        // }}
                        labelStyle={{fontFamily: 'SCDream4', color: '#A2A2A2'}}
                        dropDownStyle={{backgroundColor: '#fff'}}
                        onChangeItem={(item) => {
                          setBoardTk(item.value);
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

                  {/* 라디오 타입 */}
                  {/* {type_details[0].board_tk
                    ? type_details[0].board_tk.map((t) => (
                        <TouchableOpacity
                          key={t.pf_id}
                          activeOpacity={1}
                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                          onPress={() => setPaperChoise(t)}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginRight: 20,
                            marginBottom: 20,
                            width: '100%',
                          }}>
                          <Image
                            source={
                              paper === t
                                ? require('../../src/assets/radio_on.png')
                                : require('../../src/assets/radio_off.png')
                            }
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 5}}
                          />
                          <Text style={[styles.normalText, {fontSize: 14}]}>
                            {t}
                          </Text>
                        </TouchableOpacity>
                      ))
                    : null} */}
                  {/* // 라디오 타입 */}
                </View>
              </View>
              {/* // 지류 선택  */}
            </>
          )}
          <View style={styles.wrap}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.boldText, {fontSize: 16, color: '#000000'}]}>
                지류 선택
              </Text>
            </View>
          </View>

          <View style={styles.wrap}>
            {/* 지류 선택  */}
            <View style={{marginBottom: paper === 'normal' ? 40 : 25}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.profileTitle, {marginRight: 5}]}>
                  구분
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                {typeDetail
                  ? typeDetail.map((t) => (
                      <TouchableOpacity
                        key={t.pf_id}
                        activeOpacity={1}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={() => setPaperChoise(t.pf_id)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 20,
                          marginBottom: 20,
                          width: '100%',
                        }}>
                        <Image
                          source={
                            paper === t.pf_id
                              ? require('../../src/assets/radio_on.png')
                              : require('../../src/assets/radio_off.png')
                          }
                          resizeMode="contain"
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                        <Text style={[styles.normalText, {fontSize: 14}]}>
                          {t.feeder_name}
                        </Text>
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
            </View>
            {/* // 지류 선택  */}

            {/* 지종 선택 */}

            <View style={{marginBottom: 25}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text style={[styles.profileTitle, {marginRight: 5}]}>
                  지종
                </Text>
                {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom:
                    !isLoading03 && isDirect === '직접입력'
                      ? 5
                      : !isLoading03 && isDirect01 === 'y'
                      ? 5
                      : 20,
                }}>
                {/* 지종 1차 */}
                {!isLoading && paperDetail ? (
                  <View style={{width: '49%'}}>
                    <DropDownPicker
                      value={paperType}
                      placeholder="지종 선택"
                      placeholderStyle={{
                        fontSize: 14,
                        color: '#A2A2A2',
                        fontWeight: '400',
                      }}
                      activeLabelStyle={{color: '#000'}}
                      activeItemStyle={{color: '#000'}}
                      selectedLabelStyle={{color: '#000'}}
                      value={paperType}
                      dropDownMaxHeight={300}
                      items={paperDetail.map((v, _i) => {
                        // setPfId(v.pf_id);
                        return {value: v.pd_id, label: v.paper_name};
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
                      onOpen={() => {
                        setDirectPaperName(null);
                        setWeight(null);
                        setDirectWeight(null);
                        setDirectGoal(null);
                        setIsLoading02(true);
                        setIsLoading03(true);
                        setIsLoading04(true);
                        setIsLoading05(true);
                      }}
                      labelStyle={{fontFamily: 'SCDream4', color: '#A2A2A2'}}
                      dropDownStyle={{backgroundColor: '#fff'}}
                      onChangeItem={(item) => {
                        setPaperType01(item.value);
                        setIsLoading01(true);

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
                {/* // 지종 1차 */}

                {/* 지종 2차 */}
                {!isLoading01 && paperDetail2 && isDirect01 !== 'y'
                  ? paperDetail2.map((pd, idx) =>
                      pd.paper_name2 ? (
                        <View style={{width: '49%'}} key={idx}>
                          <DropDownPicker
                            placeholder="세부 선택"
                            placeholderStyle={{
                              fontSize: 14,
                              color: '#A2A2A2',
                              fontWeight: '400',
                            }}
                            activeLabelStyle={{color: '#000'}}
                            activeItemStyle={{color: '#000'}}
                            selectedLabelStyle={{color: '#000'}}
                            value={
                              paperType === '직접입력'
                                ? '없음'
                                : paperTypeDetail
                            }
                            dropDownMaxHeight={300}
                            items={pd.paper_name2.map((v, _i) => {
                              return {value: v.pn_id, label: v.name};
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
                              setPaperType02(item.value);
                              setPaperTypeName02(item.label);
                              setIsLoading02(true);
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
                      ) : null,
                    )
                  : null}
                {/* // 지종 2차 */}
              </View>
              {!isLoading03 && isDirect === '직접입력' ? (
                <TextInput
                  value={directPaperName}
                  placeholder="지종을 직접 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      marginBottom: 20,
                    },
                  ]}
                  onChangeText={(text) => setDirectPaperName(text)}
                  autoCapitalize="none"
                />
              ) : !isLoading03 && isDirect01 === 'y' ? (
                <TextInput
                  value={directPaperName}
                  placeholder="지종을 직접 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      marginBottom: 20,
                    },
                  ]}
                  onChangeText={(text) => setDirectPaperName(text)}
                  autoCapitalize="none"
                />
              ) : null}
              {/* 평량 선택 또는 입력 */}
              {!isLoading02 &&
              getWeight !== null &&
              getWeight !== '' &&
              ca_id !== '10' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      평량
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : !isLoading02 && isDirect01 === 'y' && ca_id !== '10' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      평량
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : !isLoading02 && isDirect === '직접입력' && ca_id !== '10' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      평량
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : null}
              {/* paperDetail2 && paperDetail2[0].paper_name === '직접입력' */}
              {!isLoading03 &&
              isDirect === '직접입력' &&
              getWeight === '' &&
              ca_id !== '10' ? (
                <TextInput
                  value={directWeight}
                  placeholder="평량을 직접 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      marginBottom: 20,
                    },
                  ]}
                  onChangeText={(text) => setDirectWeight(text)}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                />
              ) : !isLoading02 &&
                isDirect01 === 'y' &&
                getWeight === '' &&
                ca_id !== '10' ? (
                <TextInput
                  value={directWeight}
                  placeholder="평량을 직접 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      marginBottom: 20,
                    },
                  ]}
                  onChangeText={(text) => setDirectWeight(text)}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                />
              ) : null}

              {!isLoading02 &&
                getWeight !== null &&
                getWeight.length > 0 &&
                ca_id !== '10' && (
                  <View style={{width: '49%', marginBottom: 20}}>
                    <DropDownPicker
                      placeholder="평량 선택"
                      placeholderStyle={{
                        fontSize: 14,
                        color: '#A2A2A2',
                        fontWeight: '400',
                      }}
                      activeLabelStyle={{color: '#000'}}
                      activeItemStyle={{color: '#000'}}
                      selectedLabelStyle={{color: '#000'}}
                      value={weight}
                      items={getWeight.map((v) => {
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
                      dropDownMaxHeight={300}
                      itemStyle={{
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                      }}
                      labelStyle={{
                        fontFamily: 'SCDream4',
                        color: '#A2A2A2',
                      }}
                      dropDownStyle={{backgroundColor: '#fff'}}
                      onChangeItem={(item) => setWeightChoise(item.value)}
                      onOpen={() => {
                        setDirectPaperName(null);
                        setWeight(null);
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
                )}
              {/* // 평량 선택 또는 입력 */}

              {/* 골 선택 또는 입력 */}
              {!isLoading05 &&
              getGoal !== null &&
              getGoal !== '' &&
              cate1 === '1' &&
              ca_id !== '9' &&
              ca_id !== '12' &&
              ca_id !== '13' &&
              ca_id !== '14' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      골
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : !isLoading05 &&
                isDirect01 === 'y' &&
                cate1 === '1' &&
                ca_id !== '9' &&
                ca_id !== '12' &&
                ca_id !== '13' &&
                ca_id !== '14' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      골
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : !isLoading05 &&
                isDirect === '직접입력' &&
                cate1 === '1' &&
                ca_id !== '9' &&
                ca_id !== '12' &&
                ca_id !== '13' &&
                ca_id !== '14' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      골
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : null}

              {!isLoading05 &&
                getGoal !== null &&
                getGoal !== '' &&
                getGoal.length > 0 && (
                  <View style={{width: '49%', marginBottom: 20}}>
                    <DropDownPicker
                      placeholder="골 선택"
                      placeholderStyle={{
                        fontSize: 14,
                        color: '#A2A2A2',
                        fontWeight: '400',
                      }}
                      activeLabelStyle={{color: '#000'}}
                      activeItemStyle={{color: '#000'}}
                      selectedLabelStyle={{color: '#000'}}
                      value={goal}
                      items={getGoal.map((v) => {
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
                      dropDownMaxHeight={300}
                      itemStyle={{
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                      }}
                      labelStyle={{
                        fontFamily: 'SCDream4',
                        color: '#A2A2A2',
                      }}
                      dropDownStyle={{backgroundColor: '#fff'}}
                      onChangeItem={(item) => setGoalChoise(item.value)}
                      onOpen={() => {
                        setDirectPaperName(null);
                        setGoal(null);
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
                )}
              {!isLoading05 &&
              isDirect === '직접입력' &&
              getGoal === '' &&
              cate1 === '1' &&
              ca_id !== '9' &&
              ca_id !== '12' &&
              ca_id !== '13' &&
              ca_id !== '14' ? (
                <TextInput
                  value={directGoal}
                  placeholder="골을 직접 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      marginBottom: 20,
                    },
                  ]}
                  onChangeText={(text) => setDirectGoal(text)}
                  autoCapitalize="none"
                  keyboardType="default"
                />
              ) : !isLoading05 &&
                isDirect01 === 'y' &&
                getGoal === '' &&
                cate1 === '1' &&
                ca_id !== '9' &&
                ca_id !== '12' &&
                ca_id !== '13' &&
                ca_id !== '14' ? (
                <TextInput
                  value={directGoal}
                  placeholder="골을 직접 입력해주세요."
                  placeholderTextColor="#A2A2A2"
                  style={[
                    styles.normalText,
                    {
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      marginBottom: 20,
                    },
                  ]}
                  onChangeText={(text) => setDirectGoal(text)}
                  autoCapitalize="none"
                  keyboardType="default"
                />
              ) : null}
              {/* // 골 선택 또는 입력 */}
              {/* 색상 선택  */}
              {!isLoading04 &&
              getPaperColors !== null &&
              getPaperColors !== '' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      색상
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : !isLoading04 && isDirect01 === 'y' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      색상
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : !isLoading04 && isDirect === '직접입력' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      색상
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : null}

              {!isLoading04 &&
                getPaperColors !== null &&
                getPaperColors.length > 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}>
                    {getPaperColors.map((t, idx) => (
                      <TouchableOpacity
                        key={idx}
                        activeOpacity={1}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={() => onSelectPaperColor(t)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 20,
                          marginBottom: 20,
                          width: '100%',
                        }}>
                        <Image
                          source={
                            paperColor === t
                              ? require('../../src/assets/radio_on.png')
                              : require('../../src/assets/radio_off.png')
                          }
                          resizeMode="contain"
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                        <Text style={[styles.normalText, {fontSize: 14}]}>
                          {t}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              {!isLoading04 &&
              isDirect === '직접입력' &&
              getPaperColors === '' ? (
                <TextInput
                  value={directColor}
                  placeholder="색상을 직접 입력해주세요."
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
                  onChangeText={(text) => setDirectColor(text)}
                  autoCapitalize="none"
                  keyboardType="default"
                />
              ) : !isLoading05 &&
                isDirect01 === 'y' &&
                getPaperColors === '' ? (
                <TextInput
                  value={directColor}
                  placeholder="색상을 직접 입력해주세요."
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
                  onChangeText={(text) => setDirectColor(text)}
                  autoCapitalize="none"
                  keyboardType="default"
                />
              ) : null}
              {/* // 색상 선택  */}
            </View>

            {/* 인쇄 도수  */}

            <View style={{marginBottom: 20}}>
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
                    {fontSize: 16, color: '#000000', marginBottom: 10},
                  ]}>
                  인쇄도수/교정/감리 선택
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.profileTitle, {marginRight: 5}]}>
                  인쇄도수
                </Text>
                {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
              </View>
              {getPrtFrequency.length > 0 ? (
                <DropDownPicker
                  placeholder={'도수 선택'}
                  placeholderStyle={{
                    fontSize: 14,
                    color: '#A2A2A2',
                    fontWeight: '400',
                  }}
                  activeLabelStyle={{color: '#000'}}
                  activeItemStyle={{color: '#000'}}
                  selectedLabelStyle={{color: '#000'}}
                  value={print}
                  items={getPrtFrequency.map((v, _i) => {
                    return {value: v, label: v};
                  })}
                  dropDownMaxHeight={200}
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
                  labelStyle={{fontFamily: 'SCDream4', color: '#A2A2A2'}}
                  dropDownStyle={{backgroundColor: '#fff'}}
                  onChangeItem={(item) => setPrintColor(item.value)}
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
              ) : (
                <View>
                  <Text style={{fontFamily: 'SCDream4'}}>없음</Text>
                </View>
              )}
            </View>
            {/* // 인쇄 도수  */}

            {/* 인쇄 교정  */}
            <View style={{marginBottom: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                    인쇄교정
                  </Text>
                </View>

                {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
              </View>
              <View>
                {getProofPrinting !== null ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}>
                    {getProofPrinting.map((t, idx) => (
                      <TouchableOpacity
                        key={idx}
                        activeOpacity={1}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={() => setColorChoise(t)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 20,
                          marginBottom: 10,
                        }}>
                        <Image
                          source={
                            color === t
                              ? require('../../src/assets/radio_on.png')
                              : require('../../src/assets/radio_off.png')
                          }
                          resizeMode="contain"
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                        <Text style={[styles.normalText, {fontSize: 14}]}>
                          {t === 'Y' ? '있음' : '없음'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <View>
                    <Text style={{fontFamily: 'SCDream4'}}>없음</Text>
                  </View>
                )}
              </View>
            </View>
            {/* // 인쇄 교정  */}

            {/* 인쇄 감리  */}
            <View style={{marginBottom: 25}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                    인쇄감리
                  </Text>
                </View>

                {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
              </View>
              <View>
                {getPrtSupervision !== null ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}>
                    {getPrtSupervision.map((t, idx) => (
                      <TouchableOpacity
                        key={idx}
                        activeOpacity={1}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={() => setCheckChoise(t)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 20,
                          marginBottom: 10,
                        }}>
                        <Image
                          source={
                            check === t
                              ? require('../../src/assets/radio_on.png')
                              : require('../../src/assets/radio_off.png')
                          }
                          resizeMode="contain"
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                        <Text style={[styles.normalText, {fontSize: 14}]}>
                          {t === 'Y' ? '있음' : '없음'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <View>
                    <Text style={{fontFamily: 'SCDream4'}}>없음</Text>
                  </View>
                )}
              </View>
            </View>
            {/* // 인쇄 감리  */}
          </View>
        </ScrollView>

        <View style={{width: '100%'}}>
          {/* 이전, 다음 버튼 부분 (Prev, Next) */}
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 5,
                backgroundColor: '#fff',
                marginBottom: 0,
              }}>
              <View
                style={{
                  borderWidth: 0.5,
                  height: '100%',
                  borderColor: '#E3E3E3',
                }}
              />
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
              <TouchableWithoutFeedback onPress={() => nextBtn()}>
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
                    다음
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          {/* // 이전, 다음 버튼 부분 (Prev, Next) */}
        </View>
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

export default Step05;
