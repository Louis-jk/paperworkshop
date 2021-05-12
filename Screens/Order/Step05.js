import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import axios from 'axios';
import qs from 'qs';
import {useSelector, useDispatch} from 'react-redux';

import DropDownPicker from 'react-native-dropdown-picker';

import DetailHeader from '../Common/DetailHeader';
import {
  selectPfId,
  selectPfId02,
  selectPdId,
  selectPdId02,
  selectPnId,
  selectPnId02,
  selectPaperName,
  selectPaperName02,
  setUserWeight,
  setUserWeight2,
  setUserWeightEtc,
  setUserWeightEtc02,
  setUserGoal,
  setUserGoalEtc,
  setUserColor,
  setUserColor02,
  setUserColorEtc,
  setUserColorEtc02,
  setUserBoardTk,
  selectPfDirectName,
  selectPfDirectName2
} from '../../Modules/OrderReducer';
import {setOrderDetails} from '../../Modules/OrderHandlerReducer';

const baseUrl = 'http://dmonster1506.cafe24.com/json/proc_json.php/';

import BoxTypeAPI from '../../src/api/BoxType';


const Step05 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const propsScreenName = props.route.params.screen;

  const dispatch = useDispatch();

  //////////////////////////
  /////// STATES ///////
  /////////////////////////

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingPrev, setIsLoadingPrev] = React.useState(true); // 지종 값 출력 여부 전 로딩 값 - 경우에 따라 표지용
  const [isLoading01, setIsLoading01] = React.useState(true); // 지류 선택시 - 경우에 따라 표지용
  const [isLoading02, setIsLoading02] = React.useState(true); // 평량 로딩 - 경우에 따라 표지용
  const [isLoading03, setIsLoading03] = React.useState(true); // 직접 입력 로딩 - 경우에 따라 표지용
  const [isLoading04, setIsLoading04] = React.useState(true); // 색상 입력 로딩 - 경우에 따라 표지용
  const [isLoading05, setIsLoading05] = React.useState(true); // 골 입력 로딩 - 경우에 따라 표지용

  const [isLoadingInner, setIsLoadingInner] = React.useState(false);
  const [isLoadingPrevInner, setIsLoadingPrevInner] = React.useState(true); // 지종 값 출력 여부 전 로딩 값 - 내지용
  const [isLoading01Inner, setIsLoading01Inner] = React.useState(true); // 지류 선택시 - 내지용
  const [isLoading02Inner, setIsLoading02Inner] = React.useState(true); // 평량 로딩 - 내지용
  const [isLoading03Inner, setIsLoading03Inner] = React.useState(true); // 직접 입력 로딩 - 내지용
  const [isLoading04Inner, setIsLoading04Inner] = React.useState(true); // 색상 입력 로딩 - 내지용
  const [isLoading05Inner, setIsLoading05Inner] = React.useState(true); // 골 입력 로딩 - 내지용

  const {cate1, ca_id, type_id} = useSelector((state) => state.OrderReducer);
  const {type_details} = useSelector((state) => state.OrderHandlerReducer);

  const [boardTk, setBoardTk] = React.useState(''); // 속지 판지 두께 담기 (ca_id === 12 : 싸바리 박스일 경우)

  // ca_id 1, ca_id 4 일반인쇄 '카달로그/브로슈어/판플렛' 또는 '책자/서적류' 일 경우 표지 내지로 분류됨
  const [paper, setPaper] = React.useState(''); // 지류 선택 (pf_id 지류아이디) - 경우에 따라 표지용
  const [paperInner, setPaperInner] = React.useState(''); // 지류 선택 (pf_id 지류아이디) - 내지 용

  const [paperName, setPaperName] = React.useState(''); // 지류 선택 시 지류 명 담기 - 경우에 따라 표지용
  const [paperNameInner, setPaperNameInner] = React.useState(''); // 지류 선택 시 지류 명 담기 - 내지 용

  const [typeDetail, setTypeDetail] = React.useState([]); // 지류 상세 정보 담기 - 경우에 따라 표지용
  const [typeDetailInner, setTypeDetailInner] = React.useState([]); // 지류 상세 정보 담기 - 내지 용

  const [paperType, setPaperType] = React.useState(''); // 지종 선택 - 경우에 따라 표지용
  const [paperTypeInner, setPaperTypeInner] = React.useState(''); // 지종 선택 - 내지용

  const [isDirect01, setIsDirect01] = React.useState('n'); // 지종 2차 정보 중 "직접입력" 란 유무 담기 - 경우에 따라 표지용
  const [isDirect01Inner, setIsDirect01Inner] = React.useState('n'); // 지종 2차 정보 중 "직접입력" 란 유무 담기 - 내지 용

  const [paperTypeDetail, setPaperTypeDetail] = React.useState(''); //  지종 2차 정보 담기 - 경우에 따라 표지용
  const [paperTypeDetailInner, setPaperTypeDetailInner] = React.useState(''); //  지종 2차 정보 담기 - 내지용

  const [weight, setWeight] = React.useState(''); //  평량 정보 담기  - 경우에 따라 표지용
  const [weightInner, setWeightInner] = React.useState(''); //  평량 정보 담기  - 내지 용

  // API 호출시 Response값
  const [paperDetail, setPaperDetail] = React.useState([]); // 지종 정보 담기 - 경우에 따라 표지용
  const [paperDetailInner, setPaperDetailInner] = React.useState([]); // 지종 정보 담기 - 내지용

  const [paperDetail2, setPaperDetail2] = React.useState([]); // 지종 2차 정보 담기 - 경우에 따라 표지용
  const [paperDetail2Inner, setPaperDetail2Inner] = React.useState([]); // 지종 2차 정보 담기 - 내지용

  const [paperDetail2More, setPaperDetail2More] = React.useState([]); // 지종 2차 지종세부 정보 담기 - 경우에 따라 표지용
  const [paperDetail2MoreInner, setPaperDetail2MoreInner] = React.useState([]); // 지종 2차 지종세부 정보 담기 - 내지용

  const [getGoal, setGetGoal] = React.useState([]); // 지종 1차 Response 골 값 및 유무 (paper_goal)

  const [getWeight, setGetWeight] = React.useState([]); // 지종 1차 Response 평량 값 및 유무 (paper_weight) - 경우에 따라 표지용
  const [getWeightInner, setGetWeightInner] = React.useState([]); // 지종 1차 Response 평량 값 및 유무 (paper_weight) - 내지용

  const [goal, setGoal] = React.useState(''); //  골 정보 담기

  const [isDirect, setIsDirect] = React.useState(''); // 지종 2차 직접 입력 선택 유무 - 경우에 따라 표지용
  const [isDirectInner, setIsDirectInner] = React.useState(''); // 지종 2차 직접 입력 선택 유무 - 내지용

  const [directPaperName, setDirectPaperName] = React.useState(''); // 지종 1차 또는 2차 직접 입력란 선택시 지종 직접 입력 값 담기 - 경우에 따라 표지용
  const [directPaperNameInner, setDirectPaperNameInner] = React.useState(''); // 지종 1차 또는 2차 직접 입력란 선택시 지종 직접 입력 값 담기 - 내지용

  const [directWeight, setDirectWeight] = React.useState(''); // 지종 1차 또는 2차 직접 입력란 선택시 평량 직접 입력 값 담기 - 경우에 따라 표지용
  const [directWeightInner, setDirectWeightInner] = React.useState(''); // 지종 1차 또는 2차 직접 입력란 선택시 평량 직접 입력 값 담기 - 내지용

  const [directGoal, setDirectGoal] = React.useState(''); // 지종 1차 또는 2차 직접 입력란 선택시 골 직접 입력 값 담기

  const [directColor, setDirectColor] = React.useState(''); // 지종 1차 또는 2차 직접 입력란 선택시 색상 직접 입력 값 담기 - 경우에 따라 표지용
  const [directColorInner, setDirectColorInner] = React.useState(''); // 지종 1차 또는 2차 직접 입력란 선택시 색상 직접 입력 값 담기 - 내지용

  const [getPaperColors, setGetPaperColors] = React.useState([]); //  색상 - 경우에 따라 표지용
  const [getPaperColorsInner, setGetPaperColorsInner] = React.useState([]); //  색상 - 내지용

  const [paperColor, setPaperColor] = React.useState(''); //  색상 지정 index - 경우에 따라 표지용
  const [paperColorInner, setPaperColorInner] = React.useState(''); //  색상 지정 index - 내지용

  const [paperColorName, setPaperColorName] = React.useState(''); //  색상 지정 색상명(API 받아온 그대로) - 경우에 따라 표지용
  const [paperColorNameInner, setPaperColorNameInner] = React.useState(''); //  색상 지정 색상명(API 받아온 그대로) - 내지용

  // 2차 지종 유무
  const [isPaperType02, setIsPaperType02] = React.useState(false);

  // 에러일 경우
  const [paperTypeError, setPaperTypeError] = React.useState(false); // 지류 선택 안했을 경우 - 경우에 따라 표지용
  const [paperTypeInnerError, setPaperTypeInnerError] = React.useState(false); // 지류 선택 안했을 경우 - 내지용
  
  const [directPaperTypeInnerError, setDirectPaperTypeInnerError] = React.useState(false); // 지류 직접 입력 란 입력 안했을 경우 - 내지용

  const [paperError, setPaperError] = React.useState(false); // 지종 선택 안했을 경우 - 경우에 따라 표지용
  const [paperError01, setPaperError01] = React.useState(false); // 지종 1차 선택 안했을 경우 - 경우에 따라 표지용
  const [paperInnerError, setPaperInnerError] = React.useState(false); // 지종 선택 안했을 경우 - 내지용
  const [paperInnerError02, setPaperInnerError02] = React.useState(false); // 지종 상세 선택 안했을 경우 - 내지용

  const [directFirstPaperError, setDirectFirstPaperError] = React.useState(false); // 지류 직접입력 선택시 입력 안했을 경우 - 경우에 따라 표지용
  const [directFirstPaperInnerError, setDirectFirstPaperInnerError] = React.useState(false); // 지류 직접입력 선택시 입력 안했을 경우 - 내지용
  const [directPaperError, setDirectPaperError] = React.useState(false); // 지종 직접입력 선택시 입력 안했을 경우 - 경우에 따라 표지용
  const [directPaperInnerError, setDirectPaperInnerError] = React.useState(
    false,
  ); // 지종 직접입력 선택시 입력 안했을 경우 - 내지용

  const [weightError, setWeightError] = React.useState(false); // 평량 선택 안했을 경우 - 경우에 따라 표지용
  const [weightInnerError, setWeightInnerError] = React.useState(false); // 평량 선택 안했을 경우 - 내지용

  const [directWeightError, setDirectWeightError] = React.useState(false); // 평량 직접입력 입력없을 경우 - 경우에 따라 표지용
  const [directWeightInnerError, setDirectWeightInnerError] = React.useState(
    false,
  ); // 평량 직접입력 입력없을 경우 - 내지용

  const [goalError, setGoalError] = React.useState(false); // 골 선택 안했을 경우
  const [directGoalError, setDirectGoalError] = React.useState(false); // 골 직접입력 입력없을 경우

  const [colorError, setColorError] = React.useState(false); // 색상 선택 안했을 경우 - 경우에 따라 표지용
  const [colorInnerError, setColorInnerError] = React.useState(false); // 색상 선택 안했을 경우 - 내지용

  const [directColorError, setDirectColorError] = React.useState(false); // 색상 직접 입력 선택시 입력 안했을 경우 - 경우에 따라 표지용
  const [directColorInnerError, setDirectColorInnerError] = React.useState(
    false,
  ); // 색상 직접 입력 선택시 입력 안했을 경우 - 내지용


  const [paperDetailName, setPaperDetailName] = React.useState(''); // 지종세부 이름 입력
  const [innerPaperDetailName, setInnerPaperDetailName] = React.useState(''); // 지종세부 이름 입력 - 내지용
  const [pdId, setPdId] = React.useState(''); // 지종 pd_id 입력  
  const [pdIdInner, setPdIdInner] = React.useState(''); // 지종 pd_id 입력 - 내지용
  const [pnId, setPnId] = React.useState(''); // 지종세부 pn_id 입력  
  const [pnIdInner, setPnIdInner] = React.useState(''); // 지종세부 pn_id 입력 - 내지용


  // 직접입력란 TextInput Ref
  const directPaperRef = React.useRef(null); // 경우에 따라 표지용
  const directPaperInnerRef = React.useRef(null); // 내지용
  const directGoalRef = React.useRef(null);
  const directColorRef = React.useRef(null); // 경우에 따라 표지용
  const directColorInnerRef = React.useRef(null); // 내지용
  const directWeightRef = React.useRef(null); // 경우에 따라 표지용
  const directWeightInnerRef = React.useRef(null); // 내지용

  const [detailPaperYn, setDetailPaperYn] = React.useState(''); // 지종세부 여부 ('y' or 'n') - 표지용
  const [detailInnerPaperYn, setDetailInnerPaperYn] = React.useState(''); // 지종세부 여부 ('y' or 'n') - 내지용

  const [boardTkError, setBoardTkError] = React.useState(false);
  const [notWeight, setNotWeight] = React.useState('n');

  console.log("detailPaperYn",detailPaperYn);
  console.log("pnId",pnId);
  //////////////////////////
  /////// FUNCTIONS ///////
  /////////////////////////

  const nextBtn = () => {

      if (ca_id === '12' && (boardTk === null || boardTk === '')) {
        setBoardTkError(true);
        Alert.alert('속지 판지 두께를 선택해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else if (paperName === '직접입력' && (directPaperName === null || directPaperName === '')) {
        setDirectFirstPaperError(true);
        Alert.alert('지류를 입력해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } 
      else if (paperName === '직접입력' && (directWeight === null || directWeight === '')) {        
        setDirectWeightError(true);
        Alert.alert('평량을 입력해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } 
      else if (paperName === '직접입력' && cate1 === '1' && ca_id !== '9' && ca_id !== '12' && ca_id !== '13' && ca_id !== '14' && (directGoal === null || directGoal === '')) {
        setDirectGoalError(true);
        Alert.alert('골을 입력해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      }
      else if (paperName === '직접입력' && (directColor === null || directColor === '')) {
        setDirectColorError(true);
        Alert.alert('색상을 입력해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      }
      else if (paperName !== '직접입력' && (paper === null || paper === '')) {
        setPaperTypeError(true);
        Alert.alert('지류를 선택해주세요.', '', [
          {
            text: '확인',
          },
        ]);
      } 
      else if (paperName !== '직접입력' && (paperType === null || paperType === '')) {
      setPaperError01(true);
        Alert.alert('지종을 선택해주세요.', '', [
          {
          text: '확인',
          },
        ]);
      } 
      else if (paperName !== '직접입력' && detailPaperYn === 'y' && pnId === '') {
        setPaperError(true);
        Alert.alert('상세 지종을 선택해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      } 
      else if ((paperName !== '직접입력') && (isDirect01 === 'n' && isDirect !== '직접입력') && (goal === null || goal === '') && cate1 === '1' && ca_id !== '9' && ca_id !== '12' && ca_id !== '13' && ca_id !== '14') {
        setGoalError(true);
        Alert.alert('골을 선택해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else if ((paperName !== '직접입력') && (isDirect01 === 'n' && isDirect !== '직접입력') && notWeight === 'n' && (weight === null || weight === '') && ca_id !== '10') {
        setWeightError(true);
        Alert.alert('평량을 선택해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else if ((paperName !== '직접입력') && (isDirect01 === 'n' && isDirect !== '직접입력') && ca_id !== '11' && ca_id !== '6' && (paperColor === null || paperColor === ''))
       {
        setColorError(true);
        Alert.alert('색상을 선택해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else if ((paperName !== '직접입력') && (isDirect01 === 'y' || isDirect === '직접입력') && (directPaperName === null || directPaperName === '')) {
        // 지종 직접 입력란이 공백일 경우
        setDirectPaperError(true);
        Alert.alert('지종을 직접 입력해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else if ((isDirect01 === 'y' || isDirect === '직접입력') && (directGoal === null || directGoal === '') && cate1 === '1' && ca_id !== '9' && ca_id !== '12' && ca_id !== '13' && ca_id !== '14') {
        // 골 직접 입력란이 공백일 경우
        setDirectGoalError(true);
        Alert.alert('골을 직접 입력해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else if ((isDirect01 === 'y' || isDirect === '직접입력') && (directWeight === null || directWeight === '') && ca_id !== '10') {
        // 평량 직접 입력란이 공백일 경우
        setDirectWeightError(true);
        Alert.alert('평량을 직접 입력해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else if ((isDirect01 === 'y' || isDirect === '직접입력') && (ca_id !== '11' && ca_id !== '6') && (directColor === null || directColor === '')) {
         // 색상 직접 입력란이 공백일 경우
         setDirectColorError(true);
         Alert.alert('색상을 직접 입력해주세요.', '', [
          {
              text: '확인',
          },
         ]);
      }       
      else if (cate1 === '0' && (ca_id === '1' || ca_id === '4') && paperNameInner !== '직접입력' && (paperInner === null || paperInner === '')) {
        setPaperTypeInnerError(true);
        Alert.alert('내지 지류를 선택해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      } 
      else if (cate1 === '0' && (ca_id === '1' || ca_id === '4') && paperNameInner === '직접입력' && (directPaperNameInner === null || directPaperNameInner === '')) {
        setDirectFirstPaperInnerError(true);
        Alert.alert('내지 지류를 입력해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else if (cate1 === '0' && (ca_id === '1' || ca_id === '4') && paperNameInner !== '직접입력' && (paperTypeInner === null || paperTypeInner === '')) {        
        setPaperInnerError(true);
        Alert.alert('내지 지종을 선택해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else if (cate1 === '0' && (ca_id === '1' || ca_id === '4') && paperNameInner !== '직접입력' && detailInnerPaperYn === 'y' && pnIdInner === '') {
        setPaperInnerError02(true);
          Alert.alert('내지 상세 지종을 선택해주세요.', '', [
            {
                text: '확인',
            },
          ]);
        } 
      else if (cate1 === '0' && (ca_id === '1' || ca_id === '4') && paperNameInner !== '직접입력' && getWeightInner && getWeightInner.length > 0 && (weightInner === null || weightInner === '')) {        
        setWeightInnerError(true);
          Alert.alert('내지 평량을 선택해주세요.', '', [
            {
                text: '확인',
            },
          ]);
        } 
      else if (cate1 === '0' && (ca_id === '1' || ca_id === '4') && paperNameInner !== '직접입력' && getPaperColorsInner && getPaperColorsInner.length > 0 && (paperColorInner === null || paperColorInner === '')) {        
        setColorInnerError(true);
          Alert.alert('내지 색상을 선택해주세요.', '', [
            {
                text: '확인',
            },
          ]);
        } 
      else if (cate1 === '0' && (ca_id === '1' || ca_id === '4') && paperNameInner === '직접입력' && (directPaperNameInner === '' || directPaperNameInner === null)) {
        setDirectPaperTypeInnerError(true);
        Alert.alert('내지 지류 또는 지종을 입력해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else if (cate1 === '0' && (ca_id === '1' || ca_id === '4') && paperNameInner === '직접입력' && (directWeightInner === '' || directWeightInner === null)) {
        setDirectWeightInnerError(true);
        Alert.alert('내지 평량을 입력해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else if (cate1 === '0' && (ca_id === '1' || ca_id === '4') && paperNameInner === '직접입력' && (directColorInner === '' || directColorInner === null)) {
        setDirectColorInnerError(true);
        Alert.alert('내지 색상을 입력해주세요.', '', [
          {
              text: '확인',
          },
        ]);
      }
      else {
        
        dispatch(selectPfId(paper));
        dispatch(selectPdId(pdId));    
        dispatch(setUserBoardTk(boardTk));

        if(directPaperName !== '' || directPaperName !== null) {
          dispatch(selectPaperName(directPaperName));
          dispatch(selectPnId(paperTypeDetail.pn_id));
        } 
      
        if(isDirect01 === 'y' || isDirect === '직접입력') {
          dispatch(setUserGoalEtc(directGoal));
          dispatch(setUserWeightEtc(directWeight));
          dispatch(setUserColorEtc(directColor));
          dispatch(setUserGoal(''));
          dispatch(setUserWeight(''));
          dispatch(setUserColor(''));
          dispatch(selectPnId(''));    
        } else {
          dispatch(setUserGoal(goal));
          dispatch(setUserWeight(weight));
          dispatch(setUserColor(paperColor));
          dispatch(setUserGoalEtc(''));
          dispatch(setUserWeightEtc(''));
          dispatch(setUserColorEtc(''));
        }

        // if((isDirect01 === 'y' || isDirect === '직접입력') && directWeight !== '' || directWeight !== null) {
        //   dispatch(setUserWeightEtc(directWeight));
        //   dispatch(setUserWeight(''));
        // } 

        // if ((isDirect01 === 'n' || isDirect !== '직접입력') && (weight !== null || weight !== '') && ca_id !== '10') {
        //   dispatch(setUserWeightEtc(''));
        //   dispatch(setUserWeight(weight));
        // }   
      
        // if((isDirect01 === 'y' || isDirect === '직접입력') && directGoal !== '' || directGoal !== null) {
        //   dispatch(setUserGoalEtc(directGoal));
        //   dispatch(setUserGoal(''));
        // } 

        // if((isDirect01 === 'n' || isDirect !== '직접입력') && (goal !== null || goal !== '') && cate1 === '1' && ca_id !== '9' && ca_id !== '12' && ca_id !== '13' && ca_id !== '14') {
        //   dispatch(setUserGoalEtc(''));
        //   dispatch(setUserGoal(goal));
        // } 

        // if((isDirect01 === 'y' || isDirect === '직접입력') && directColor !== '' || directColor !== null) {
        //   dispatch(setUserColorEtc(directColor));
        //   dispatch(setUserColor(''));
        // } 

        // if ((isDirect01 === 'n' || isDirect !== '직접입력') && ca_id !== '11' && ca_id !== '6' && (paperColor !== null || paperColor !== '')) {
        //   dispatch(setUserColorEtc(''));
        //   dispatch(setUserColor(paperColor));
        // }

        if (paperName === '직접입력') {
          dispatch(selectPfDirectName(directPaperName));  
          dispatch(selectPaperName(''));
          dispatch(setUserGoalEtc(directGoal));
          dispatch(setUserWeightEtc(directWeight));
          dispatch(setUserColorEtc(directColor));
          dispatch(setUserWeight(''));  
          dispatch(setUserColor(''));
        }
        
        if (cate1 === '0' && (ca_id === '1' || ca_id === '4')) {
          dispatch(selectPfId02(paperInner));
          dispatch(selectPdId02(pdIdInner));  
          dispatch(selectPnId02(pnIdInner));  
        
          if (paperNameInner === '직접입력') {
            dispatch(selectPfDirectName2(directPaperNameInner));  
            dispatch(selectPaperName02(''));
            dispatch(setUserWeightEtc02(directWeightInner));
            dispatch(setUserColorEtc02(directColorInner));
            dispatch(setUserWeight2(''));  
            dispatch(setUserColor02(''));
          } else {
            dispatch(selectPaperName02(''));  
            dispatch(setUserWeightEtc02(''));
            dispatch(setUserColorEtc02(''));
            dispatch(setUserWeight2(weightInner));  
            dispatch(setUserColor02(paperColorInner));
          }

          
        }

        navigation.navigate('OrderStep05After', {
          screen: propsScreenName === 'DirectOrder' ? propsScreenName : null,
        });
      } 
    
  };

  // 구분 지류 정보 가져오기 (분류아이디: cate1, 1차분류아이디: ca_id, 박스타입아이디: type_id(선택) 필요)
  const getTypeDetailAPIHandler = () => {
    setIsLoading(true);

    BoxTypeAPI.getPaperInitialInfo(cate1, ca_id, type_id)
      .then((res) => {
        if (res.data.result === '1') {
          console.log("최초 지류", res);
          setTypeDetail(res.data.item);
          if(cate1 === '0' && (ca_id === '1' || ca_id === '4')) {
            setPaperTypeInner('');
            setPaperInner('');
            setTypeDetailInner(res.data.item);
            setIsLoadingInner(false);
          }
          setIsLoading(false);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
        setIsLoading(false);
      });
  };

  // 지류 해당 상세 정보 가져오기 (지류 아이디 필요 : pf_id) - 경우에 따라 표지용
  const getPaperDetail = (pf_id) => {
    setIsLoading(true);
    setIsLoading01(true);
    setIsLoading02(true);

    BoxTypeAPI.getPaper1DepthInfo(cate1, ca_id, pf_id, type_id)
      .then((res) => {     
        if (res.data.result === '1') {
          setIsLoading(false);
          setPaperDetail(res.data.item);
          setIsLoadingPrev(false);         
          // setPaperType(res.data.item[0].paper_name);
        } else {
          Alert.alert(res.data.message, '', [
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
  
  // 지류 해당 상세 정보 가져오기 (지류 아이디 필요 : pf_id) - 내지용
  const getPaperInnerDetail = (pf_id) => {
    setIsLoadingInner(true);
    setIsLoading01Inner(true);
    setIsLoading02Inner(true);
    setPaperInnerError(false);
    setPaperInnerError02(false);

    BoxTypeAPI.getPaper1DepthInfo(cate1, ca_id, pf_id, type_id)
      .then((res) => {
        
        if (res.data.result === '1') {
          setIsLoadingInner(false);
          setPaperDetailInner(res.data.item);
          setIsLoadingPrevInner(false);        
          // setPaperType(res.data.item[0].paper_name);
        } else {
          Alert.alert(res.data.message, '', [
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

  // 에러 초기화
  const errorClearHandler = () => {    
    setPaperTypeError(false);
    setPaperError(false);
    setGoalError(false);
    setWeightError(false);
    setColorError(false);
    setDirectFirstPaperError(false);
    setDirectPaperError(false);
    setDirectGoalError(false);
    setDirectWeightError(false);
    setDirectColorError(false);
    setPaperError01(false);
  }

  // 에러 초기화 - 내지용
  const errorClearHandlerInner = () => {        
    setPaperTypeInnerError(false);
    setPaperInnerError(false);
    setWeightInnerError(false);
    setColorInnerError(false);
    setDirectFirstPaperInnerError(false);
    setDirectPaperInnerError(false);
    setDirectWeightInnerError(false);
    setDirectColorInnerError(false);
    setPaperInnerError02(false);
  }

  // 지류 선택시 실행될 기능 - 경우에 따라 표지 지류 선택이 됨
  const setPaperChoise = (v) => {
      setPaper(v);
      getPaperDetail(v);
      setIsLoading02(true); // 평량 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
      setIsLoading03(true); // 지종 직접 입력 TextInput 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
      setIsLoading04(true); // 색상 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
      setIsLoading05(true); // 골 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
      setWeight(''); // 평량 초기화
      setGoal(''); // 골 초기화
      setDirectPaperName(''); // 지종 직접 입력값 초기화
      setDirectWeight(''); // 평량 직접 입력값 초기화
      setDirectGoal(''); // 골 직접 입력값 초기화
      setIsDirect01('n'); // 지종 1차 선택시 직접 유무 초기화
      setIsDirect(''); // 지종 2차 선택시 직접 유무 초기화
      setPaperType(''); // 지종 초기화
  };

  // 지류 선택시 실행될 기능 - 내지용
  const setPaperInnerChoise = (v) => {
      setPaperInner(v);
      getPaperInnerDetail(v);    
      setIsLoading02Inner(true); // 평량 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
      setIsLoading03Inner(true); // 지종 직접 입력 TextInput 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
      setIsLoading04Inner(true); // 색상 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
      setIsLoading05Inner(true); // 골 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
      setWeightInner(''); // 평량 초기화
      setDirectPaperNameInner(''); // 지종 직접 입력값 초기화
      setDirectWeightInner(''); // 평량 직접 입력값 초기화
      setIsDirect01Inner('n'); // 지종 1차 선택시 직접 유무 초기화
      setIsDirectInner(''); // 지종 2차 선택시 직접 유무 초기화
      setPaperTypeInner(''); // 지종 초기화
  };


  // ca_id 1 또는 ca_id 4 (카달로그/브로슈어/리플렛 또는 책자/서적류) - 표지용
  const getPaperDetailMore = (pd_id) => {
    
    setDetailPaperYn('y');
    setPaperDetail2('');
    BoxTypeAPI.getPaperDetailInfo(ca_id, pd_id, 'Y')
      .then((res) => {
        if (res.data.result === '1') {
          if (res.data.item[0].paper_name !== '직접입력') {
            setPaperDetail2More(res.data.item[0].paper_name2); // 상세 지종 API 가져온 값 담기
            setIsDirect01('n'); // 지종 1차에서 직접 입력이 아니란 값 담기
          } else {
            setIsDirect01('y'); // 지종 1차에서 직접 입력이란 값 담기
            setIsLoading03(false); // 지종 직접 입력 TextInput 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
          }
          setGetWeight(res.data.item[0].paper_weight); // 상세 지종 평량 API 가져온 값 담기
          setGetGoal(res.data.item[0].paper_goal); // 상세 지종 골 API 가져온 값 담기
          setGetPaperColors(res.data.item[0].paper_color); // 상세 지종 색상 API 가져온 값 담기
        

          setIsLoading01(false); 
          setIsLoading05(false); // 골 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))

          // if (res.data.item[0].paper_name2 !== null) {
          //   setIsPaperType02(true); // 지종 1차에서 2차 지종이 있으면 true
          // }
        } else {
          Alert.alert(res.data.message, '', [
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
  }

  // 내지용 
  const getInnerPaperDetailMore = (pd_id) => {
    
    setDetailInnerPaperYn('y');
    BoxTypeAPI.getPaperDetailInfo(ca_id, pd_id, 'N')
      .then((res) => {
        if (res.data.result === '1') {
          console.log("반환 내지", res);
          if (res.data.item[0].paper_name !== '직접입력') {
            setPaperDetail2MoreInner(res.data.item[0].paper_name2); // 상세 지종 API 가져온 값 담기
            setIsDirect01Inner('n'); // 지종 1차에서 직접 입력이 아니란 값 담기
          } else {
            setIsDirect01Inner('y'); // 지종 1차에서 직접 입력이란 값 담기
            setIsLoading03Inner(false); // 지종 직접 입력 TextInput 활성화 여부 (false: 활성(표시) / true: 비활성활성(표시) / true: 비활성(숨김))
          }
          setIsLoading01Inner(false); 
          setIsLoading05Inner(false); // 골 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
        } else {
          Alert.alert(res.data.message, '', [
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
  }

  // 지종 1차(pd_id) 선택 및 가져오기 (지종 아이디 필요 : pd_id)
  // 지류 선택 후에 지종 출력된 값들 중에 선택했을 시 호출될 Fn
  const getPaperDetailStep01 = (pd_id, paper_name) => {
    
    setDetailPaperYn('n');
    setIsLoading01(true);
    setIsLoading02(true); // 평량 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading03(true); // 지종 직접 입력 TextInput 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading04(true); // 색상 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading05(true); // 골 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setPaperColor('');
    setPaperColorName('');
    
    
    BoxTypeAPI.getPaperNoDetailInfo(cate1, ca_id, paper, pd_id, paper_name)
      .then((res) => {
        console.log("1차 선택 :: ", res);
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
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  console.log('====================================');
  console.log("paperDetail2", paperDetail2[0]);
  console.log('====================================');

  // 지종 1차(pd_id) 선택 및 가져오기 (지종 아이디 필요 : pd_id) - 내지용
  // 지류 선택 후에 지종 출력된 값들 중에 선택했을 시 호출될 Fn
  const getPaperDetailStep01Inner = (pd_id, paper_name) => {

    setDetailInnerPaperYn('n');
    setIsLoading01Inner(true);
    setIsLoading02Inner(true); // 평량 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading03Inner(true); // 지종 직접 입력 TextInput 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading04Inner(true); // 색상 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setIsLoading05Inner(true); // 골 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
    setPaperColorInner('');
    setPaperColorNameInner('');

    BoxTypeAPI.getPaperNoDetailInfo(cate1, ca_id, paperInner, pd_id, paper_name)
      .then((res) => {
        console.log("hey", res);
        if (res.data.result === '1') {
          if (res.data.item[0].paper_name !== '직접입력') {
            setPaperDetail2Inner(res.data.item); // 상세 지종 API 가져온 값 담기
            setIsDirect01Inner('n'); // 지종 1차에서 직접 입력이 아니란 값 담기
          } else {
            setIsDirect01Inner('y'); // 지종 1차에서 직접 입력이란 값 담기
            setIsLoading03Inner(false); // 지종 직접 입력 TextInput 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
          }
          setGetWeightInner(res.data.item[0].paper_weight2); // 상세 지종 평량 API 가져온 값 담기
          setGetPaperColorsInner(res.data.item[0].paper_color2); // 상세 지종 색상 API 가져온 값 담기
          
          setIsLoading02Inner(false); // 평량 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
          setIsLoading04Inner(false); // 색상 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))
          setIsLoading05Inner(false); // 골 활성화 여부 (false: 활성(표시) / true: 비활성(숨김))

          // if (res.data.item[0].paper_name2 !== null) {
          //   setIsPaperType02(true); // 지종 1차에서 2차 지종이 있으면 true
          // }
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  const weightRef = React.useRef(null);

  // 지종세부일 경우 평량 정보 가져오기 - 경우에 따라 표지용
  const getPaperDetailStep02More = (pd_id, name) => {
    console.log("??? pd_id", pd_id);
    console.log("??? name", name);

    setIsLoading02(true);
    setNotWeight('n');
    setPaperColor('');
    setPaperColorName('');
    
    if(name === '팔각박스' || name === '사각박스') {
      getColorInfoHandler(pd_id, '');
      setNotWeight('y');
    } else {
      axios({
        url: `${baseUrl}`,
        method: 'post',
        data: qs.stringify({
          method: 'proc_paper_weight_list',
          pd_id, // 지종 아이디        
          paper_name2: name, // 세부지종명
          in_yn: 'N', // 내지 여부
        }),
      })
        .then((res) => {        
          if (res.data.result === '1' && res.data.count > 0) {
            console.log("지종세부 res", res);
            // setPaperDetail3(res.data.item);
            setGetWeight(res.data.item); // 상세 지종 평량 API 가져온 값 담기
            // setGetGoal(res.data.item[0].paper_goal); // 상세 지종 골 API 가져온 값 담기       
            setIsLoading02(false);
            weightRef.current.focus();
          } else {
            Alert.alert(res.data.message, '', [
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
    }
  };

    // 지종세부일 경우 평량 정보 가져오기 - 내지용
    const getPaperDetailStep02MoreInner = (pd_id, name) => {
      setIsLoading02Inner(true);
      setPaperColorInner('');
      setPaperColorNameInner('');
      axios({
        url: `${baseUrl}`,
        method: 'post',
        data: qs.stringify({
          method: 'proc_paper_weight_list',
          pd_id, // 지종 아이디        
          paper_name2: name, // 세부지종명
          in_yn: 'Y', // 내지 여부
        }),
      })
        .then((res) => {
          console.log("평량 정보는?", res);
          if (res.data.result === '1' && res.data.count > 0) {
            // setPaperDetail3(res.data.item);
            setGetWeightInner(res.data.item); // 상세 지종 평량 API 가져온 값 담기
            // setGetGoal(res.data.item[0].paper_goal); // 상세 지종 골 API 가져온 값 담기       
            setIsLoading02Inner(false);
          } else {
            Alert.alert(res.data.message, '', [
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

  React.useEffect(() => {
    getTypeDetailAPIHandler();
  }, [cate1, ca_id]);


  // 직접입력시 - 경우에 따라 표지용
  const setPaperTypeName02 = (v) => {
    if (v === '직접입력') {
      setIsDirect(v);
      setWeight('');
      setPaperColor('');
      setIsLoading03(false);
    } else {
      setPaperDetailName(v);
      setDirectPaperName(v);
    }
  };

  // 직접입력시 - 내지용
  const setPaperTypeName02Inner = (v) => {
    if (v === '직접입력') {
      setIsDirectInner(v);
      setWeightInner('');
      setPaperColorInner('');
      setIsLoading03Inner(false);
    } else {
      setInnerPaperDetailName(v);
      setDirectPaperNameInner(v);
    }
  };

  // 지종 1차 선택 - 경우에 따라 표지용
  const setPaperType01 = (pd_id) => {
    setPaperType(pd_id); // 지종 선택 지종 아이디
    getPaperDetailMore(pd_id);
    setIsLoading01(false);
    setIsLoading02(false);
    setIsLoading03(true);
    setIsDirect01('n'); // 지종 1차 선택시 직접 유무 초기화
    setIsDirect(''); // 지종 2차 선택시 직접 유무 초기화
  };

  // 지종 1차 선택 - 내지용
  const setPaperType01Inner = (pd_id) => {
    setPaperTypeInner(pd_id); // 지종 선택 지종 아이디
    getInnerPaperDetailMore(pd_id);
    setIsLoading01Inner(false);
    setIsLoading02Inner(false);
    setIsLoading03Inner(true);
    setIsDirect01Inner('n'); // 지종 1차 선택시 직접 유무 초기화
    setIsDirectInner(''); // 지종 2차 선택시 직접 유무 초기화
  };

  // 지종 1차 선택(지종 2차(지종세부)없을 시) - 경우에 따라 표지용
  const setPaperType01NotDetail = (pd_id, paper_name) => {
    setPaperType(pd_id); // 지종 선택 지종 아이디
    getPaperDetailStep01(pd_id, paper_name);
    setIsLoading01(false);
    setIsLoading02(false);
    setIsLoading03(true);
    setWeightError(false);
    setColorError(false);
    setIsDirect01('n'); // 지종 1차 선택시 직접 유무 초기화
    setIsDirect(''); // 지종 2차 선택시 직접 유무 초기화
  };

  // 지종 1차 선택(지종 2차(지종세부)없을 시) - 내지용
  const setPaperType01NotDetailInner = (pd_id, paper_name) => {
    setPaperTypeInner(pd_id); // 지종 선택 지종 아이디
    getPaperDetailStep01Inner(pd_id, paper_name);
    setIsLoading01Inner(false);
    setIsLoading02Inner(false);
    setIsLoading03Inner(true);
    setWeightInnerError(false);
    setColorInnerError(false);
    setIsDirect01Inner('n'); // 지종 1차 선택시 직접 유무 초기화
    setIsDirectInner(''); // 지종 2차 선택시 직접 유무 초기화
  };

  // 지종 2차 선택 - 경우에 따라 표지용
  const setPaperType02 = (pd_id, pn_id, name) => {
    setPaperTypeDetail({pd_id: pd_id, pn_id: pn_id, name: name});
    setIsLoading03(true);
    setIsLoading04(true);   
    setWeightError(false);
    setColorError(false);
    if(name !== '직접입력') {
      getPaperDetailStep02More(pd_id, name);
      setIsDirect01('n'); // 지종 1차 선택시 직접 유무 초기화
      setIsDirect(''); // 지종 2차 선택시 직접 유무 초기화 
    } else {
      setIsLoading02(false);
      setIsLoading03(false);
      setIsLoading04(false);  
      setIsDirect01('y');
      setWeight('');
      setPaperColor('');
    }        
  };

  // 지종 2차 선택 - 내지용
  const setPaperType02Inner = (pd_id, pn_id, name) => {
    setPaperTypeDetailInner({pd_id: pd_id, pn_id: pn_id, name: name});
    if(name !== '직접입력') {
      getPaperDetailStep02MoreInner(pd_id, name);
      setIsDirect01Inner('n'); // 지종 1차 선택시 직접 유무 초기화
      setIsDirectInner(''); // 지종 2차 선택시 직접 유무 초기화  
    } else {
      setIsDirect01Inner('y');
      setWeightInner('');      
      setPaperColorInner('');
    }    
    setIsLoading03Inner(true);
    setIsLoading04Inner(true);    
    setWeightInnerError(false);
    setColorInnerError(false);
  };

  // 색상 정보 가져오기 API
  const getColorInfoHandler = (pdId, payload) => { 
    BoxTypeAPI.getColorInfo(pdId, paperDetailName, payload, 'N')
    .then(res => {      
      if(res.data.result === '1' && res.data.count > 0) {
        setIsLoading04(false);
        setGetPaperColors(res.data.item);
      }
    })
    .catch(err => {
      Alert.alert(err, '관리자에게 문의하세요.', [
        {
          text: '확인',
        }
      ])
    })
  }

  // 색상 정보 가져오기 API - 내지용
  const getInnerColorInfoHandler = (payload) => {
     
    BoxTypeAPI.getColorInfo(pdIdInner, innerPaperDetailName, payload, 'Y')
    .then(res => {      
      if(res.data.result === '1' && res.data.count > 0) {
        setIsLoading04Inner(false);        
        setGetPaperColorsInner(res.data.item);
      }
    })
    .catch(err => {
      Alert.alert(err, '관리자에게 문의하세요.', [
        {
          text: '확인',
        }
      ])
    })
  }

  // 색상 선택 - 경우에 따라 표지용
  const onSelectPaperColor = (name) => {
    setPaperColorName(name);
    setPaperColor(name);
    setDirectColor('');
  };

  // 색상 선택 - 내지용
  const onSelectPaperColorInner = (name) => {
    setPaperColorNameInner(name);
    setPaperColorInner(name);
    setDirectColorInner('');
  };

  
  // 평량 넣기 - 경우에 따라 표지용
  const setWeightChoise = (v) => {
    setWeight(v);
    setDirectWeight('');
  };

  // 평량 넣기 - 내지용
  const setWeightChoiseInner = (v) => {
      setWeightInner(v);
      setDirectWeightInner('');
  };

  // 골 넣기
  const setGoalChoise = (v) => {
      setGoal(v);
      setDirectGoal('');
  };

  console.log("getPaperColors", getPaperColors);
  console.log("==============================");
  console.log("paperName", paperName);
  console.log("==============================");

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
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            elevation: 0,
            backgroundColor: 'transparent',
          }}>
          <ActivityIndicator size="large" color="#275696" />
        </View>
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

              {/* 속지 판지 두께 선택  */}
              <View style={{marginBottom: boardTkError ? 5 : 25}}>
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
                        labelStyle={{fontFamily: 'SCDream4', color: '#A2A2A2'}}
                        dropDownStyle={{backgroundColor: '#fff'}}
                        onChangeItem={(item) => {
                          setBoardTk(item.value);
                          setBoardTkError(false);
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
                </View>
              </View>
              {boardTkError && 
                <Text
                 style={{
                   fontFamily: 'SCDream4',
                   fontSize: 12,
                   color: '#366DE5',
                   marginBottom: 20,
                 }}>
                 속지 판지 두께를 선택해주세요.
               </Text>
              }
              {/* // 속지 판지 두께 선택  */}
            </>
          )}
          {/* 경우에 따라 표지가 됨 */}
          <View style={styles.wrap}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.boldText, {fontSize: 16, color: '#275696'}]}>
                지류 선택 {ca_id === '1' || ca_id === '4' ? '(표지)' : null}
              </Text>
            </View>
          </View>

          <View style={styles.wrap}>
            {/* 지류 선택  */}
            <View style={{width:Dimensions.get('window').width - 40, marginBottom: paper === 'normal' ? 40 : 25}}>
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
                {typeDetail && typeDetail.length > 0
                  ? typeDetail.map((t, idx) => (
                      <TouchableOpacity
                        key={`${t.pf_id}${idx}`}
                        activeOpacity={1}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={() => {
                          setPaperChoise(t.pf_id);
                          setPaperName(t.feeder_name);
                          errorClearHandler();
                        }}
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
              {paperTypeError ? (
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: '#366DE5',
                    marginVertical: 5,
                  }}>
                  지류를 선택해주세요.
                </Text>
              ) : null}
              {/* 구분 - 지류선택 - 직접입력 선택시 */}
              {paperName === '직접입력' ? (
                <TextInput
                  ref={directPaperRef}
                  value={directPaperName}
                  placeholder="지류를 직접 입력해주세요."
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
                    setDirectFirstPaperError(false);
                    setDirectPaperName(text);
                  }}
                  autoCapitalize="none"
                  onSubmitEditing={() => { 
                    if(cate1 === '1' && ca_id !== '9' && ca_id !== '12' && ca_id !== '13' && ca_id !== '14') {
                      directGoalRef.current.focus();                      
                    } else {
                      directWeightRef.current.focus();
                    }
                  }}
                />
              ) : null}
              {directFirstPaperError ?
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: '#366DE5',
                    marginVertical: 5,                    
                  }}>
                  지류를 입력해주세요.
                </Text>
              : null}
              {/* // 구분 - 지류선택 - 직접입력 선택시 */}
            </View>
            {/* // 지류 선택  */}

            {/* 지종 선택 */}
            <View style={{width:Dimensions.get('window').width - 40, marginBottom: 10}}>
              {!isLoading && !isLoadingPrev && paperDetail && paperDetail.length > 0 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    지종
                  </Text>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : null}
              <View
                style={{
                  marginBottom:
                    !isLoading03 && isDirect === '직접입력'
                      ? 5
                      : !isLoading03 && isDirect01 === 'y'
                      ? 5
                      : paperError
                      ? 5
                      : 0,
                }}>
                {/* 지종 1차 */}
                {!isLoading && paperDetail && paperDetail.length > 0 ? (
                  <View style={{marginBottom: paperError01 ? 5 : 0}}>
                    {paperDetail.map((paper, idx) => (
                      <TouchableOpacity
                        key={`${paper.pd_id}${idx}`}
                        activeOpacity={1}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={() => {
                          paper.include_detail === 'Y' ? setPaperType01(paper.pd_id) : setPaperType01NotDetail(paper.pd_id, paper.paper_name);
                          setIsLoading01(true);
                          setPaperError01(false);
                          setPaperError(false);
                          setPdId(paper.pd_id);
                          setPnId('');
                          setWeight('');
                          setDirectPaperName('');
                          setDirectWeight('');
                          setDirectGoal('');
                          setDirectColor('');
                          setDirectPaperError(false);
                          setDirectWeightError(false); 
                          setDirectColorError(false);
                          setIsLoading02(true);
                          setIsLoading03(true);
                          setIsLoading04(true);
                          setIsLoading05(true);
                        }}
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
                            paperType === paper.pd_id
                              ? require('../../src/assets/radio_on.png')
                              : require('../../src/assets/radio_off.png')
                          }
                          resizeMode="contain"
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                        <Text style={[styles.normalText, {fontSize: 14}]}>
                          {paper.paper_name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}
                {/* // 지종 1차 */}
                {paperError01 ? (
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: '#366DE5',
                    marginBottom: 5,                    
                  }}>
                  지종을 선택해주세요.
                </Text>
              ) : null}

                {/* 지종 2차 */}
                {!isLoading01 && paperDetail2More && paperDetail2More.length > 0 && isDirect01 !== 'y'
                  ? (
                      <View style={{marginTop: 20, marginBottom: paperError ? 5 : 0}}>
                        <View                            
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: 20,
                          }}>
                          <Text
                            style={[styles.profileTitle, {marginRight: 5}]}>
                            지종 세부
                          </Text>
                          {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                        </View>       
                        {paperDetail2More.map((v, idx) => (
                          <TouchableOpacity
                            key={`${v.pn_id}${idx}`}
                            activeOpacity={1}
                            hitSlop={{
                              top: 10,
                              bottom: 10,
                              left: 10,
                              right: 10,
                            }}
                            onPress={() => {                                
                              setPaperType02(v.pd_id, v.pn_id, v.name);
                              setPaperTypeName02(v.name);
                              setPdId(v.pd_id);
                              setPnId(v.pn_id);
                              setIsLoading02(true);
                              setDirectPaperName('');
                              setDirectWeight('');
                              setDirectGoal('');
                              setDirectColor('');
                              setPaperError(false);
                              setDirectPaperError(false);                                
                              setDirectWeightError(false); 
                              setDirectColorError(false);
                            }}
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
                                paperTypeDetail.pn_id === v.pn_id
                                  ? require('../../src/assets/radio_on.png')
                                  : require('../../src/assets/radio_off.png')
                              }
                              resizeMode="contain"
                              style={{width: 20, height: 20, marginRight: 5}}
                            />
                            <Text style={[styles.normalText, {fontSize: 14}]}>
                              {v.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : null                    
                  }
                {/* // 지종 2차  */}

              </View>
              {paperError ? (
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: '#366DE5',
                    marginVertical: 5,
                  }}>
                  상세 지종을 선택해주세요.
                </Text>
              ) : null}
              {!isLoading03 &&
              (isDirect === '직접입력' || isDirect01 === 'y') ? (
                <>
                <Text style={[styles.profileTitle, {marginBottom: 5}]}>지종 직접입력</Text>
                <TextInput
                  ref={directPaperRef}
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
                      marginBottom: directPaperError ? 5 : 20,
                    },
                  ]}
                  onChangeText={(text) => {
                    setDirectPaperError(false);
                    setDirectPaperName(text);
                  }}
                  autoCapitalize="none"
                  onSubmitEditing={() => { 
                    if(cate1 === '1' && ca_id !== '9' && ca_id !== '12' && ca_id !== '13' && ca_id !== '14') {
                      directGoalRef.current.focus();                      
                    } else {
                      directWeightRef.current.focus();
                    }
                  }}
                />
                </>
              ) : null}
              {directPaperError ? (
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: '#366DE5',
                    marginBottom: directPaperError ? 20 : 5,
                  }}>
                  세부 지종을 직접 입력해주세요.
                </Text>
              ) : null}


            {/* 골 선택 또는 입력 */}
            {!isLoading05 &&
              getGoal !== null &&
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
                    <Text style={[styles.profileTitle, {marginTop: 20, marginBottom: (isDirect === '직접입력' || isDirect01 === 'y') ? 5 : 20}]}>
                      골
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : !isLoading05 &&
                (isDirect === '직접입력' || isDirect01 === 'y') &&
                cate1 === '1' &&
                ca_id !== '9' &&
                ca_id !== '12' &&
                ca_id !== '13' &&
                ca_id !== '14' ? (
                  <>
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
                
                </>
              ) : null}
              {!isLoading05 && getGoal !== null && getGoal.length > 0 && (
                 
                <View>
                 {getGoal.map((v, idx) => (
                  // <Text key={v}>{v}</Text>
                  <TouchableOpacity
                    key={`${v}${idx}`}
                    activeOpacity={1}
                    hitSlop={{
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    }}
                    onPress={() => {                      
                      setGoalError(false);                      
                      setGoalChoise(v);
                    }}
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
                        goal === v
                          ? require('../../src/assets/radio_on.png')
                          : require('../../src/assets/radio_off.png')
                      }
                      resizeMode="contain"
                      style={{width: 20, height: 20, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 14}]}>
                      {v}
                    </Text>
                  </TouchableOpacity>
                ))}
                  {goalError ? (
                    <Text
                      style={{
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        color: '#366DE5',
                        marginVertical: 5,
                      }}>
                      골을 선택해주세요.
                    </Text>
                  ) : null}
                </View>
              )}

              {!isLoading05 &&
              (isDirect === '직접입력' || isDirect01 === 'y') &&
              cate1 === '1' &&
              ca_id !== '9' &&
              ca_id !== '12' &&
              ca_id !== '13' &&
              ca_id !== '14' ? (
                <TextInput
                  ref={directGoalRef}
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
                  onChangeText={(text) => {
                    setDirectGoalError(false);
                    setDirectGoal(text);
                  }}
                  autoCapitalize="none"
                  keyboardType="default"
                  onSubmitEditing={() => directWeightRef.current.focus()}
                />
              ) : null}
              {directGoalError ? (
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: '#366DE5',
                    marginVertical: 5,
                  }}>
                  골을 직접 입력해주세요.
                </Text>
              ) : null}
              {/* // 골 선택 또는 입력 */}


              {/* 평량 선택 또는 입력 */}
              {!isLoading02 && getWeight !== null && getWeight.length > 0 && ca_id !== '10' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 20,
                    marginBottom: 10,
                  }}>
                  <View ref={weightRef}>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      평량
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : !isLoading03 &&
                (isDirect === '직접입력' || isDirect01 === 'y') &&
                ca_id !== '10' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 0,
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
              (isDirect01 === '직접입력' || isDirect01 === 'y') &&
              ca_id !== '10' ? (                
                <TextInput
                  ref={directWeightRef}
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
                      marginBottom: directWeightError ? 5 : 20,
                    },
                  ]}
                  onChangeText={(text) => {
                    setDirectWeightError(false);
                    setDirectWeight(text);
                  }}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onSubmitEditing={() => directColorRef.current.focus()}
                />
              ) : null}

              {paperName === '직접입력' &&
              ca_id !== '10' ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 0,
                    }}>
                    <View>
                      <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                        평량
                      </Text>
                    </View>
                    {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                  </View>
                  <TextInput
                    ref={directWeightRef}
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
                        marginBottom: directWeightError ? 5 : 20,
                      },
                    ]}
                    onChangeText={(text) => {
                      setDirectWeightError(false);
                      setDirectWeight(text);
                    }}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    onSubmitEditing={() => directColorRef.current.focus()}
                  />
                </>
              ) : null}
              {directWeightError ? (
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: '#366DE5',
                    marginBottom: directWeightError? 20 : 5,
                  }}>
                  평량을 직접 입력해주세요.
                </Text>
              ) : null}
              {!isLoading02 &&
                getWeight !== null &&
                getWeight.length > 0 &&
                ca_id !== '10' && (
                  <View
                    style={{                      
                      marginBottom: weightError ? 0 : 20,
                    }}>
                    {getWeight.map((v, idx) => (
                      // <Text key={v}>{v}</Text>
                      <TouchableOpacity
                        key={`${v}${idx}`}
                        activeOpacity={1}
                        hitSlop={{
                          top: 10,
                          bottom: 10,
                          left: 10,
                          right: 10,
                        }}
                        onPress={() => {
                          setWeightError(false);
                          setWeightChoise(v);
                          getColorInfoHandler(pdId, v);
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 20,
                          marginVertical: 10,
                          width: '100%',
                        }}>
                        <Image
                          source={
                            weight === v
                              ? require('../../src/assets/radio_on.png')
                              : require('../../src/assets/radio_off.png')
                          }
                          resizeMode="contain"
                          style={{width: 20, height: 20, marginRight: 5}}
                        />
                        <Text style={[styles.normalText, {fontSize: 14}]}>
                          {v}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                {weightError ? (
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      color: '#366DE5',
                      marginVertical: 5,
                    }}>
                    평량을 선택해주세요.
                  </Text>
                ) : null}

              {/* // 평량 선택 또는 입력 */}
             

              {/* 색상 선택  */}
              {!isLoading04 && ca_id !== '11' && ca_id !== '6' && (getPaperColors && getPaperColors.length > 0) && (getPaperColors !== null || getPaperColors !== '') ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 20
                  }}>
                  <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      색상
                    </Text>
                  </View>
                  {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
              ) : !isLoading04 && ca_id !== '11' && ca_id !== '6' && isDirect01 === 'y' ? (
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
              ) : !isLoading04 && ca_id !== '11' && ca_id !== '6' && isDirect === '직접입력' ? (
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
              {!isLoading04 && ca_id !== '11' && ca_id !== '6' && (getPaperColors !== null || getPaperColors !== '') && getPaperColors.length > 0 && (
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
                        onPress={() => {
                          setColorError(false);
                          onSelectPaperColor(t);
                        }}
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
              {ca_id !== '11' && ca_id !== '6' && colorError ? (
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: '#366DE5',
                    marginVertical: 5,
                  }}>
                  색상을 선택해주세요.
                </Text>
              ) : null}
              {!isLoading04 && ca_id !== '11' && ca_id !== '6' && (isDirect === '직접입력' || isDirect01 === 'y') && getPaperColors === '' ? (
                <TextInput
                  ref={directColorRef}
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
                      marginBottom: directColorError ? 5 : 20,
                    },
                  ]}
                  onChangeText={(text) =>  { 
                    setDirectColor(text); 
                    setDirectColorError(false);
                  }}
                  autoCapitalize="none"
                  keyboardType="default"
                />
              ) : null}
               {paperName === '직접입력' &&
                ca_id !== '11' && ca_id !== '6' ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 0,
                    }}>
                    <View>
                      <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                        색상
                      </Text>
                    </View>
                    {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                  </View>
                  <TextInput
                    ref={directColorRef}
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
                        marginBottom: directColorError ? 5 : 20,
                      },
                    ]}
                    onChangeText={(text) =>  { 
                      setDirectColor(text); 
                      setDirectColorError(false);
                    }}
                    autoCapitalize="none"
                    keyboardType="default"
                  />
                </>
              ) : null}
              {directColorError ? (
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: '#366DE5',
                    marginBottom: directColorError ? 20 : 5,
                  }}>
                  색상을 직접 입력해주세요.
                </Text>
              ) : null}
              {/* // 색상 선택  */}
            </View>
          </View>
          {/* // 경우에 따라 표지가 됨 */}

          {/* 내지 부분 */}
          {cate1 === '0' && (ca_id === '1' || ca_id === '4') ? (
          <View style={{height: 1, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3', marginBottom: 35}} />
          ) : null }

          {cate1 === '0' && (ca_id === '1' || ca_id === '4') ? (
            <View style={[styles.wrap, {zIndex: -100}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={[styles.boldText, {fontSize: 16, color: '#275696'}]}>
                  지류 선택 (내지)
                </Text>
              </View>
            </View>
          ) : null}
          {cate1 === '0' && (ca_id === '1' || ca_id === '4') ? (
            <View style={[styles.wrap, {zIndex: -100}]}>
              {/* 내지 지류 선택  */}
              <View style={{width:Dimensions.get('window').width - 40, marginBottom: paperInner === 'normal' ? 40 : paperNameInner === '직접입력' ? 10 : 25}}>
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
                  {typeDetailInner
                    ? typeDetailInner.map((t) => (
                        <TouchableOpacity
                          key={t.pf_id}
                          activeOpacity={1}
                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                          onPress={() => {
                            setPaperInnerChoise(t.pf_id);
                            setPaperNameInner(t.feeder_name);
                            errorClearHandlerInner();
                          }}
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
                              paperInner === t.pf_id
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
                {paperTypeInnerError ? (
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      color: '#366DE5',
                      marginVertical: 5,
                    }}>
                    내지 지류를 선택해주세요.
                  </Text>
                ) : null}
                {/* 구분 - 내지 지류선택 - 직접입력 선택시 */}
                {paperNameInner === '직접입력' ? (
                  <TextInput
                    ref={directPaperInnerRef}
                    value={directPaperNameInner}
                    placeholder="내지 지류를 직접 입력해주세요."
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
                      setDirectPaperInnerError(false);
                      setDirectFirstPaperInnerError(false);
                      setDirectPaperNameInner(text);
                    }}
                    autoCapitalize="none"
                    onSubmitEditing={() => directWeightInnerRef.current.focus()}
                  />
                ) : null}
                {directFirstPaperInnerError ? (
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      color: '#366DE5',
                      marginVertical: 5,
                    }}>
                    내지 지류를 입력해주세요.
                  </Text>
                ) : null}
                {/* // 구분 - 내지 지류선택 - 직접입력 선택시 */}
              </View>
              {/* // 내지 지류 선택  */}

              {/* 내지 지종 선택 */}
              <View style={{width:Dimensions.get('window').width - 40, marginBottom: 10, marginTop: 10}}>
                {!isLoadingInner && !isLoadingPrevInner && paperDetailInner ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Text style={[styles.profileTitle, {marginRight: 5}]}>
                      지종
                    </Text>
                    {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                  </View>
                ) : null}

                <View
                  style={{
                    marginBottom:
                      !isLoading03Inner && isDirectInner === '직접입력'
                        ? 5
                        : !isLoading03Inner && isDirect01Inner === 'y'
                        ? 5
                        : paperInnerError
                        ? 5
                        : 0,
                  }}>

                  {/* 내지 지종 1차 */}
                  {!isLoadingInner && paperDetailInner ? (
                    <View style={{marginBottom: paperInnerError ? 0 : 20}}>
                      {paperDetailInner.map((paper, idx) => (
                        <TouchableOpacity
                          key={`${paper.pd_id}${idx}`}
                          activeOpacity={1}
                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                          onPress={() => {
                            // setPaperType01Inner(paper.pd_id);
                            paper.include_detail === 'Y' ? setPaperType01Inner(paper.pd_id) : setPaperType01NotDetailInner(paper.pd_id, paper.paper_name);
                            setIsLoading01Inner(true);
                            setPaperInnerError(false);
                            setWeightInnerError(false);
                            setColorInnerError(false);
                            setDirectPaperNameInner('');
                            setPdIdInner(paper.pd_id);
                            setWeightInner('');
                            setDirectWeightInner('');
                            setIsLoading02Inner(true);
                            setIsLoading03Inner(true);
                            setIsLoading04Inner(true);
                            setIsLoading05Inner(true);
                          }}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginRight: 20,
                            marginVertical: 10,
                            width: '100%',
                          }}>
                          <Image
                            source={
                              paperTypeInner === paper.pd_id
                                ? require('../../src/assets/radio_on.png')
                                : require('../../src/assets/radio_off.png')
                            }
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 5}}
                          />
                          <Text style={[styles.normalText, {fontSize: 14}]}>
                            {paper.paper_name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : null}
                  {/* // 내지 지종 1차 */}
                  {paperInnerError ? (
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      color: '#366DE5',
                      marginVertical: 5,
                    }}>
                    내지 지종을 선택해주세요.
                  </Text>
                ) : null}

                  {/* 내지 지종 2차 */}
                  {!isLoading01Inner && paperDetail2MoreInner && paperDetail2MoreInner.length > 0 && isDirect01 !== 'y'
                    ?  (
                        <View style={{marginTop: 20, marginBottom: paperInnerError02 ? 0 : 10}}>
                          <View                            
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              marginBottom: 10,
                            }}>
                            <Text
                              style={[styles.profileTitle, {marginRight: 5}]}>
                              지종 세부
                            </Text>
                            {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                          </View>       
                          {paperDetail2MoreInner.map((v, idx) => (
                            <TouchableOpacity
                              key={`${v.pn_id}${idx}`}
                              activeOpacity={1}
                              hitSlop={{
                                top: 10,
                                bottom: 10,
                                left: 10,
                                right: 10,
                              }}
                              onPress={() => {                                
                                setPaperType02Inner(v.pd_id, v.pn_id, v.name);
                                setPaperTypeName02Inner(v.name);
                                setPdIdInner(v.pd_id);
                                setPnIdInner(v.pn_id);
                                setIsLoading02Inner(true);
                                setPaperInnerError02(false);
                                setPaperInnerError(false);
                                setDirectWeightInnerError(false); 
                              }}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginRight: 20,
                                marginVertical: 10,
                                width: '100%',
                              }}>
                              <Image
                                source={
                                  paperTypeDetailInner.pn_id === v.pn_id
                                    ? require('../../src/assets/radio_on.png')
                                    : require('../../src/assets/radio_off.png')
                                }
                                resizeMode="contain"
                                style={{width: 20, height: 20, marginRight: 5}}
                              />
                              <Text style={[styles.normalText, {fontSize: 14}]}>
                                {v.name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      ) : null                    
                    }
                  {/* // 내지 지종 2차  */}
                </View>
                {paperInnerError02 ? (
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      color: '#366DE5',
                      marginVertical: 5,
                    }}>
                    내지 상세 지종을 선택해주세요.
                  </Text>
                ) : null}

                {!isLoading03Inner &&
                (isDirectInner === '직접입력' || isDirect01Inner === 'y') ? (
                  <TextInput
                    ref={directPaperInnerRef}
                    value={directPaperNameInner}
                    placeholder="내지 지종을 직접 입력해주세요."
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
                    onChangeText={(text) => {
                      setDirectPaperInnerError(false);
                      setDirectPaperNameInner(text);
                    }}
                    autoCapitalize="none"
                    onSubmitEditing={() => directWeightInnerRef.current.focus()}
                  />
                ) : null}
                {directPaperInnerError ? (
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      color: '#366DE5',
                      marginVertical: 5,
                    }}>
                    지종을 직접 입력해주세요.
                  </Text>
                ) : null}
                
                {/* 평량 선택 또는 입력 - 내지용 */}
                {!isLoading02Inner &&
                getWeightInner !== null &&
                ca_id !== '10' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginTop: 20,
                      marginBottom: 10,
                    }}>
                    <View>
                      <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                        평량
                      </Text>
                    </View>
                  </View>
                ) : !isLoading02Inner &&
                  (isDirectInner === '직접입력' || isDirect01Inner === 'y') &&
                  ca_id !== '10' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                      marginTop: 0
                    }}>
                    <View>
                      <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                        평량
                      </Text>
                    </View>                   
                  </View>
                ) : null}
                

                {!isLoading03Inner &&
                (isDirectInner === '직접입력' || isDirect01Inner === 'y') && 
                (getWeightInner === null || getWeightInner === '') &&
                ca_id !== '10' ? (
                  <TextInput
                    ref={directWeightInnerRef}
                    value={directWeightInner}
                    placeholder="내지 평량을 직접 입력해주세요."
                    placeholderTextColor="#A2A2A2"
                    style={[
                      styles.normalText,
                      {
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        marginVertical: 10,
                      },
                    ]}
                    onChangeText={(text) => {
                      setDirectWeightInnerError(false);
                      setDirectWeightInner(text);
                    }}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    onSubmitEditing={() => directColorInnerRef.current.focus()}
                  />
                ) : null}

                {paperNameInner === '직접입력' && ca_id !== '10' ? 
                  <>
                    <View>
                      <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                        평량
                      </Text>
                    </View> 
                    <TextInput
                      ref={directWeightInnerRef}
                      value={directWeightInner}
                      placeholder="내지 평량을 직접 입력해주세요."
                      placeholderTextColor="#A2A2A2"
                      style={[
                        styles.normalText,
                        {
                          borderWidth: 1,
                          borderColor: '#E3E3E3',
                          borderRadius: 4,
                          paddingHorizontal: 10,
                          marginBottom: directWeightInnerError ? 0 : 20,
                        },
                      ]}
                      onChangeText={(text) => {
                        setDirectWeightInnerError(false);
                        setDirectWeightInner(text);
                      }}
                      autoCapitalize="none"
                      keyboardType="number-pad"
                      onSubmitEditing={() => directColorInnerRef.current.focus()}
                    />
                  </>
                : null }

                {directWeightInnerError ? (
                  <Text style={{fontFamily: 'SCDream4', fontSize: 12, color: '#366DE5', marginTop: 5, marginBottom: directWeightInnerError ? 20 : 0}}>
                    내지 평량을 직접 입력해주세요.
                  </Text>
                ) : null}

                {!isLoading02Inner && getWeightInner !== null && getWeightInner.length > 0 && ca_id !== '10' && (
                    <View
                      style={{
                        marginBottom: weightInnerError ? 0 : 10,
                      }}>
                      {getWeightInner.map((v, idx) => (
                        <TouchableOpacity
                          key={`${v}${idx}`}
                          activeOpacity={1}
                          hitSlop={{
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 10,
                          }}
                          onPress={() => {
                            setWeightInnerError(false);
                            setWeightChoiseInner(v);
                          }}
                          onPress={() => {
                            setWeightInnerError(false);
                            setWeightChoiseInner(v);
                            getInnerColorInfoHandler(v);
                          }}
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
                              weightInner === v
                                ? require('../../src/assets/radio_on.png')
                                : require('../../src/assets/radio_off.png')
                            }
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 5}}
                          />
                          <Text style={[styles.normalText, {fontSize: 14}]}>
                            {v}
                          </Text>
                        </TouchableOpacity>
                      ))}                      
                    </View>                   
                  )}
                   {weightInnerError ? (
                      <Text
                        style={{
                          fontFamily: 'SCDream4',
                          fontSize: 12,
                          color: '#366DE5',
                          marginVertical: 5,
                        }}>
                        평량을 선택해주세요.
                      </Text>
                    ) : null}

                {/* // 평량 선택 또는 입력 - 내지용 */}

                {/* 색상 선택 - 내지용 */}
                {!isLoading04Inner && (getPaperColorsInner !== null || getPaperColorsInner !== '') ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginTop: 20
                    }}>
                    <View>
                      <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                        색상
                      </Text>
                    </View>
                    {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                  </View>
                ) : !isLoading04Inner && isDirect01Inner === 'y' ? (
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
                ) : !isLoading04Inner && isDirectInner === '직접입력' ? (
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
                {!isLoading04Inner && (getPaperColorsInner !== null || getPaperColorsInner !== '') && getPaperColorsInner.length > 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}>
                      {getPaperColorsInner.map((t, idx) => (
                        <TouchableOpacity
                          key={idx}
                          activeOpacity={1}
                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                          onPress={() => {
                            setColorInnerError(false);
                            onSelectPaperColorInner(t);
                          }}
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
                              paperColorInner === t
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
                {colorInnerError ? (
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      color: '#366DE5',
                      marginVertical: 5,
                    }}>
                    색상을 선택해주세요.
                  </Text>
                ) : null}
                {!isLoading04Inner && (isDirectInner === '직접입력' || isDirect01Inner === 'y') && getPaperColorsInner === '' ? (
                  <TextInput
                    ref={directColorInnerRef}
                    value={directColorInner}
                    placeholder="내지 색상을 직접 입력해주세요."
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
                    onChangeText={(text) => setDirectColorInner(text)}
                    autoCapitalize="none"
                    keyboardType="default"
                  />
                ) : null}
                {paperNameInner === '직접입력' && ca_id !== '10' ? 
                  <>
                    <View>
                      <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                      색상
                      </Text>
                    </View> 
                    <TextInput
                      ref={directColorInnerRef}
                      value={directColorInner}
                      placeholder="내지 색상을 직접 입력해주세요."
                      placeholderTextColor="#A2A2A2"
                      style={[
                        styles.normalText,
                        {
                          borderWidth: 1,
                          borderColor: '#E3E3E3',
                          borderRadius: 4,
                          paddingHorizontal: 10,
                          marginBottom: directColorInnerError ? 0 : 20,
                        },
                      ]}
                      onChangeText={(text) => {
                        setDirectColorInnerError(false);
                        setDirectColorInner(text);
                      }}
                      autoCapitalize="none"
                    />
                  </>
                : null }
                {directColorInnerError ? (
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      color: '#366DE5',
                      marginVertical: 5,
                    }}>
                    내지 색상을 직접 입력해주세요.
                  </Text>
                ) : null}
                {/* // 색상 선택 - 내지용  */}
              </View>
            </View>
          ) : null}
          {/* // 내지 부분 */}
        
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
