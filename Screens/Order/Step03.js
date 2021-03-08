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
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import axios from 'axios';
import qs from 'qs';
import {useSelector, useDispatch} from 'react-redux';
import DetailHeader from '../Common/DetailHeader';
import Modal from '../Common/InfoModal';

import SelectRigidBoxModal from '../Common/StepDetailModals/SelectRigidBoxModal';
import CatalogModal from '../Common/StepDetailModals/CatalogModal';
import SelectLeafletModal from '../Common/StepDetailModals/LeafletModal';

import {
  selectTypeId,
  selectTypeName,
  setUserStype,
  setUserGroundMethod,
  setUserWayEdit,
} from '../../Modules/OrderReducer';
import {setOrderDetails} from '../../Modules/OrderHandlerReducer';
import LeafletModal from '../Common/StepDetailModals/LeafletModal';

import BoxType from '../../src/api/BoxType';

const Step03 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const propsScreenName = props.route.params.screen;

  console.log('Step03 props', props);

  const dispatch = useDispatch();
  const {cate1, ca_id} = useSelector((state) => state.OrderReducer);
  const [typeDetail, setTypeDetail] = React.useState([]);
  const [sabari, setSabari] = React.useState({}); // 싸바리 박스(패키지) 세부 내용 담기
  const [detail, setDetail] = React.useState({}); // 카달로그(일반인쇄) 세부 내용 담기
  const [detail02, setDetail02] = React.useState({}); // 리플렛(일반인쇄) 세부 내용 담기

  console.log('sabari', sabari);

  // 싸바리 선택
  const selectSabari = (v, type_id) => {
    setSabari({type_id: type_id, sabari: v});
    toggleSelectModal();
  };

  // 카달로그 세부 선택
  const selectDetail = (v, type_id) => {
    setDetail({type_id: type_id, detail: v});
    toggleCatalogModal();
  };

  // 리플렛 세부 선택
  const selectLeafletDetail = (v, type_id) => {
    setDetail02({type_id: type_id, detail: v});
    toggleLeafletModal();
  };

  // 박스 정보 가져오기
  const getTypeDetail = () => {
    BoxType.getBoxType(cate1, ca_id)
      .then((res) => {
        console.log('Step03 response', res);
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
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getTypeDetail();
  }, []);

  console.log('typeDetail', typeDetail);

  const [type, setType] = React.useState('');
  const [typeName, setTypeName] = React.useState('');
  const [directTypeName, setDirectTypeName] = React.useState('');
  const [typeId, setTypeId] = React.useState(''); // 타입아이디 담기
  const [wayEdit, setWayEdit] = React.useState(''); // WayEdit 담기
  const [groundMethod, setGroundMethod] = React.useState(''); // GroundMethod 담기

  const checkType = (v) => {
    setType(v);
  };

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isSelectModalVisible, setSelectModalVisible] = React.useState(false); // 싸바리 박스 디테일 선택 모달
  const [isCatalogModalVisible, setCatalogModalVisible] = React.useState(false); // 카달로그 디테일 선택 모달
  const [isLeafletModalVisible, setLeafletModalVisible] = React.useState(false); // 리플렛 디테일 선택 모달

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

  // 카달로그 박스 디테일 선택 모달
  const toggleCatalogModal = (type_id, way_edit) => {
    setCatalogModalVisible(!isCatalogModalVisible);

    if (type_id) {
      setTypeId(type_id);
    }
    if (way_edit) {
      setWayEdit(way_edit);
    }
  };

  // 리플렛 박스 디테일 선택 모달
  const toggleLeafletModal = (type_id, ground_method) => {
    setLeafletModalVisible(!isLeafletModalVisible);
    if (type_id) {
      setTypeId(type_id);
    }
    if (ground_method) {
      setGroundMethod(ground_method);
    }
  };

  const nextBtn = () => {
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

    if (ca_id === '1' && typeId === '71') {
      dispatch(setUserWayEdit(detail.detail));
    }

    if (ca_id === '1' && typeId === '73') {
      dispatch(setUserGroundMethod(detail02.detail));
    }

    navigation.navigate('OrderStep04', {
      screen: propsScreenName === 'DirectOrder' ? propsScreenName : null,
    });
  };

  const directInput = React.useRef(null);

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
      {/* 카달로그 상세 선택 모달 */}
      <CatalogModal
        isVisible={isCatalogModalVisible}
        toggleModal={toggleCatalogModal}
        selectDetail={selectDetail}
        typeId={typeId}
        wayEdit={wayEdit}
      />
      {/* 리플렛 상세 선택 모달 */}
      <LeafletModal
        isVisible={isLeafletModalVisible}
        toggleModal={toggleLeafletModal}
        selectDetail={selectLeafletDetail}
        typeId={typeId}
        groundMethod={groundMethod}
      />

      <DetailHeader
        title={propsScreenName === 'DirectOrder' ? propsScreenName : routeName}
        navigation={navigation}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
              원하는 {cate1 === '1' ? '박스' : '인쇄'}
              타입을 선택해주세요.
            </Text>
          </View>

          {/* 타입 부분 */}
          <View style={{marginBottom: 20}}>
            <View style={styles.categoryWrap}>
              {/* {console.log('TypeDetail', typeDetail)} */}
              {typeDetail
                ? typeDetail.map((t) => (
                    <TouchableOpacity
                      key={t.type_id}
                      activeOpacity={0.8}
                      onPress={() => {
                        checkType(t.type_id);
                        setTypeName(t.type_name);
                        ca_id === '12' && toggleSelectModal(t.type_id);
                        t.type_id === '71' &&
                          toggleCatalogModal(t.type_id, t.way_edit);
                        t.type_id === '73' &&
                          toggleLeafletModal(t.type_id, t.ground_method);
                        // console.log('test', t.type_id);
                      }}
                      style={styles.categoryItem}>
                      {t.box_img ? (
                        <ImageBackground
                          source={{uri: `${t.box_img}`}}
                          resizeMode="cover"
                          style={styles.categoryItemImg}>
                          {type === t.type_id && (
                            <Image
                              source={require('../../src/images/box_on.png')}
                              resizeMode="cover"
                              style={styles.categoryItemImgHover}
                            />
                          )}
                        </ImageBackground>
                      ) : (
                        <ImageBackground
                          source={require('../../src/assets/photo.png')}
                          resizeMode="cover"
                          style={[
                            styles.categoryItemImg,
                            {borderWidth: 0.5, borderColor: '#E5E5E5'},
                          ]}>
                          {type === t.type_id && (
                            <Image
                              source={require('../../src/images/box_on.png')}
                              resizeMode="cover"
                              style={styles.categoryItemImgHover}
                            />
                          )}
                        </ImageBackground>
                      )}

                      <Text
                        style={[
                          styles.categoryItemText,
                          {
                            color: type === t.type_id ? '#275696' : '#000000',
                          },
                        ]}>
                        {t.type_name}
                      </Text>
                      <Text
                        style={[
                          styles.categoryItemText02,
                          {
                            color: type === t.type_id ? '#275696' : '#000000',
                          },
                        ]}>
                        {t.type_id === sabari.type_id
                          ? sabari.sabari
                          : t.type_id === detail.type_id
                          ? detail.detail
                          : t.type_id === detail02.type_id
                          ? detail02.detail
                          : null}
                      </Text>
                    </TouchableOpacity>
                  ))
                : null}

              {/* 기타(직접인력) */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  checkType('0');
                  setTypeName(typeName);
                  directInput.current.focus();
                }}
                style={styles.categoryItem}>
                <ImageBackground
                  source={require('../../src/assets/photo.png')}
                  resizeMode="cover"
                  style={[
                    styles.categoryItemImg,
                    {borderWidth: 0.5, borderColor: '#E5E5E5'},
                  ]}>
                  {type === '0' && (
                    <Image
                      source={require('../../src/images/box_on.png')}
                      resizeMode="cover"
                      style={styles.categoryItemImgHover}
                    />
                  )}
                </ImageBackground>

                <Text
                  style={[
                    styles.categoryItemText,
                    {color: type === '0' ? '#275696' : '#000000'},
                  ]}>
                  기타
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* // 타입 부분 */}

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
            onFocus={() => setType('0')}
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
          />
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
              style={{borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3'}}
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
              style={{borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3'}}
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
    fontFamily: 'SCDream5',
    width: 120,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 10,
  },
  categoryItemText02: {
    fontFamily: 'SCDream5',
    width: 120,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 5,
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

export default Step03;
