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
  FlatList,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import axios from 'axios';
import qs from 'qs';
import {useSelector, useDispatch} from 'react-redux';
import DetailHeader from '../Common/DetailHeader';
import Modal from '../Common/InfoModal';

import SelectRigidBoxModal from '../Common/StepDetailModals/SelectRigidBoxModal';
import SelectDetailModal from '../Common/StepDetailModals/SelectDetailModal';

import {
  selectTypeId,
  selectTypeName,
  setUserStype,
  setUserGroundMethod,
  setUserWayEdit,
} from '../../Modules/OrderReducer';
import {setOrderDetails} from '../../Modules/OrderHandlerReducer';

import BoxType from '../../src/api/BoxType';
import List from './Components/List';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const Step03 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const propsScreenName = props.route.params.screen;

  const dispatch = useDispatch();
  const {cate1, ca_id} = useSelector((state) => state.OrderReducer);
  const [typeDetail, setTypeDetail] = React.useState([]);
  const [sabari, setSabari] = React.useState({}); // 싸바리 박스(패키지) 세부 내용 담기
  const [detail, setDetail] = React.useState({}); // 일반인쇄 타입 세부 내용 담기
  const [detail02, setDetail02] = React.useState({}); // 일반인쇄 타입 세부 내용 담기

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isSelectModalVisible, setSelectModalVisible] = React.useState(false); // 싸바리 박스 디테일 선택 모달
  const [
    isSelectDetailModalVisible,
    setSelectDetailModalVisible,
  ] = React.useState(false); // 타입 디테일 선택 모달
  const [bindFix, setBindFix] = React.useState(''); // 리플렛 디테일 선택 모달

  const [type, setType] = React.useState('');
  const [typeName, setTypeName] = React.useState('');
  const [directTypeName, setDirectTypeName] = React.useState('');
  const [typeId, setTypeId] = React.useState(''); // 타입 아이디(type_id) 담기
  const [options, setOptions] = React.useState(''); // 타입 옵션(way_edit, back_side, standard 등) 담기

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 싸바리 박스 디테일 선택 모달
  const toggleSelectModal = (type_id) => {
    setSelectModalVisible(!isSelectModalVisible);
    if (type_id) {
      setTypeId(type_id);
    }
  };

  // 싸바리 선택
  const selectSabari = (v, type_id) => {
    setSabari({type_id: type_id, sabari: v});
    toggleSelectModal();
  };

  // 일반인쇄 디테일 선택 모달
  const toggleSelectDetailModal = (type_id, payload) => {
    setSelectDetailModalVisible(!isSelectDetailModalVisible);
    if (type_id) {
      setTypeId(type_id);
    }
    if (payload) {
      setOptions(payload);
    }
  };

  // 일반인쇄 세부 선택
  const selectDetail = (v, type_id) => {
    setDetail({type_id: type_id, detail: v});
    toggleSelectDetailModal();
    setBindFix('');
  };

  // 박스 정보 가져오기
  const getTypeDetail = () => {
    BoxType.getBoxType(cate1, ca_id)
      .then((res) => {
        if (res.data.result === '1') {
          setTypeDetail(res.data.item);
          dispatch(setOrderDetails(res.data.item));
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
    getTypeDetail();
  }, []);

  const checkType = (v) => {
    setType(v);
    setDetail({});
    setDetail02({});
    setBindFix('');
  };

  const nextBtn = () => {
    if(type === '' || type === null) {
      
      Alert.alert('타입을 선택해주세요.','',[
        {
          text: '확인'
        }
      ])
      
    } else {
      if (type === '0') {
        dispatch(selectTypeId(type));
        dispatch(selectTypeName(directTypeName));
      } else {
        dispatch(selectTypeId(type));
        dispatch(selectTypeName(typeName));
      }
  
      if (ca_id === '12') {
        dispatch(setUserStype(sabari.sabari));
      }
  
      if ((ca_id === '1' && typeId === '71') || ca_id === '6') {
        dispatch(setUserWayEdit(detail.detail));
        dispatch(setUserGroundMethod(''));
      }
  
      if (ca_id === '1' && typeId === '73') {
        dispatch(setUserGroundMethod(detail02.detail));
        dispatch(setUserWayEdit(''));
      }
  
      navigation.navigate('OrderStep04', {
        screen: propsScreenName === 'DirectOrder' ? propsScreenName : null,
      });
    }    
  };

  const directInput = React.useRef(null);

  const renderRow = ({item, index}) => {
    return (
      <List
        item={item}
        index={index}
        navigation={navigation}
        ca_id={ca_id}
        sabari={sabari}
        detail={detail}
        detail02={detail02}
        bindFix={bindFix}
        checkType={checkType}
        type={type}
        setTypeName={setTypeName}
        toggleSelectModal={toggleSelectModal}
        toggleSelectDetailModal={toggleSelectDetailModal}
        setBindFix={setBindFix}
      />
    );
  };

  return (
    <>
      <Modal isVisible={isModalVisible} toggleModal={toggleModal} />
      {/* 싸바리 박스 상세 선택 모달 */}
      <SelectRigidBoxModal
        isVisible={isSelectModalVisible}
        toggleModal={toggleSelectModal}
        selectSabari={selectSabari}
        typeId={typeId}
      />

      {/* 일반인쇄 상세 선택 모달 */}
      <SelectDetailModal
        isVisible={isSelectDetailModalVisible}
        toggleModal={toggleSelectDetailModal}
        selectDetail={selectDetail}
        typeId={typeId}
        options={options}
      />

      <DetailHeader
        title={propsScreenName === 'DirectOrder' ? propsScreenName : routeName}
        navigation={navigation}
      />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <View style={styles.wrap}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[styles.boldText, {fontSize: 16, color: '#000000'}]}>
              {cate1 === '1' ? '박스' : '인쇄'} 타입 선택
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleModal}
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

        <View style={[styles.wrap, {marginBottom: 25}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 15, color: '#000000', marginRight: 10},
              ]}>
              1. 선택형
            </Text>
            <Text style={[styles.normalText, {fontSize: 14, color: '#366DE5'}]}>
              원하시는 세부 {cate1 === '1' ? '박스' : '인쇄'}
              타입을 선택해주세요.
            </Text>            
          </View>

          {/* 타입 부분 */}
          <View style={{marginBottom: 20}}>
            <View style={styles.categoryWrap}>
              <FlatList
                data={typeDetail}
                renderItem={renderRow}
                keyExtractor={(list, index) => index.toString()}
                numColumns={2}
                nestedScrollEnabled={true}
                persistentScrollbar={true}
                showsVerticalScrollIndicator={false}
                progressViewOffset={true}
                refreshing={true}
                contentContainerStyle={{
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
                ListEmptyComponent={
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                      height: Dimensions.get('window').height - 300,
                    }}>
                    <Text style={{fontFamily: SCDream4}}>
                      해당 인쇄 타입이 없습니다.
                    </Text>
                  </View>
                }
              />
            </View>
          </View>
          {/* // 타입 부분 */}

          {/* 직접 입력 부분 <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={[
                styles.mediumText,
                {fontSize: 15, color: '#000000', marginRight: 10},
              ]}>
              2. 직접입력
            </Text>
          </View>
          <TextInput
            ref={directInput}
            value={directTypeName}
            placeholder={
              cate1 === '1'
                ? '원하는 박스 타입을 직접 입력해주세요.'
                : '원하는 인쇄 타입을 직접 입력해주세요.'
            }
            placeholderTextColor="#A2A2A2"
            onFocus={() => {
              setType('0');
              setDetail({});
              setDetail02({});
              setBindFix(null);
            }}
            style={[
              styles.normalText,
              {
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 50,
              },
            ]}
            onChangeText={(text) => setDirectTypeName(text)}
            autoCapitalize="none"
            // isFocused={true}
          /> */}
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
              marginBottom: 20,
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
      </ScrollView>
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
  infoBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  infoStepDesc: {
    fontSize: 14,
    color: '#A2A2A2',
    lineHeight: 23,
  },
  infoStepTitle: {
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 2.5,
  },
  detailsTitle: {
    width: 70,
    fontSize: 14,
    color: '#979797',
  },
  detailsDesc: {
    fontSize: 14,
    color: '#000',
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
  categoryWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryItem: {
    height: 170,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  categoryItemImg: {
    position: 'relative',
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    borderRadius: 100,
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
    fontFamily: SCDream5,
    width: 120,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 10,
  },
  categoryItemText02: {
    fontFamily: SCDream5,
    width: 120,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 5,
  },
  normalText: {
    fontFamily: SCDream4,
  },
  mediumText: {
    fontFamily: SCDream5,
  },
  boldText: {
    fontFamily: SCDream6,
  },
});

export default Step03;
