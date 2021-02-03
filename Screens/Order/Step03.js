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
import { TabView, SceneMap } from 'react-native-tab-view';

import DetailHeader from '../Common/DetailHeader';
import Footer from '../Common/Footer';
import Modal from '../Common/InfoModal';

const Step03 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [type, setType] = React.useState('');

  const checkType = (v) => {
    setType(v);
  };

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Modal isVisible={isModalVisible} toggleModal={toggleModal} />
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[styles.boldText, { fontSize: 16, color: '#000000' }]}>
              박스 타입 선택
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
                style={{ width: 17, height: 17, marginRight: 5 }}
              />
              <Text style={[styles.normalText, { fontSize: 13, color: '#fff' }]}>
                세부 정보 안내
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.wrap, { marginBottom: 25 }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={[styles.mediumText, { fontSize: 15, color: '#000000', marginRight: 10 }]}>
              1. 선택형
            </Text>
            <Text style={[styles.normalText, { fontSize: 14, color: '#366DE5' }]}>
              원하는 박스 타입을 선택해주세요.
            </Text>
          </View>

          {/* 타입 부분 */}
          <View style={{ marginBottom: 20 }}>
            <View style={styles.categoryWrap}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => checkType(0)}
                style={styles.categoryItem}>
                <ImageBackground
                  source={require('../../src/images/icon20.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}>
                  {type === 0 && (
                    <Image
                      source={require('../../src/images/box_on.png')}
                      resizeMode="cover"
                      style={styles.categoryItemImgHover}
                    />
                  )}
                </ImageBackground>

                <Text
                  style={[styles.categoryItemText, { color: type === 0 ? '#275696' : '#000000' }]}>
                  B형 십자
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => checkType(1)}
                style={styles.categoryItem}>
                <ImageBackground
                  source={require('../../src/images/icon21.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}>
                  {type === 1 && (
                    <Image
                      source={require('../../src/images/box_on.png')}
                      resizeMode="cover"
                      style={styles.categoryItemImgHover}
                    />
                  )}
                </ImageBackground>

                <Text
                  style={[styles.categoryItemText, { color: type === 1 ? '#275696' : '#000000' }]}>
                  B형 삼면접착
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => checkType(2)}
                style={styles.categoryItem}>
                <ImageBackground
                  source={require('../../src/images/icon22.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}>
                  {type === 2 && (
                    <Image
                      source={require('../../src/images/box_on.png')}
                      resizeMode="cover"
                      style={styles.categoryItemImgHover}
                    />
                  )}
                </ImageBackground>

                <Text
                  style={[styles.categoryItemText, { color: type === 2 ? '#275696' : '#000000' }]}>
                  B형 맞뚜껑
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => checkType(3)}
                style={styles.categoryItem}>
                <ImageBackground
                  source={require('../../src/images/icon23.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}>
                  {type === 3 && (
                    <Image
                      source={require('../../src/images/box_on.png')}
                      resizeMode="cover"
                      style={styles.categoryItemImgHover}
                    />
                  )}
                </ImageBackground>

                <Text
                  style={[styles.categoryItemText, { color: type === 3 ? '#275696' : '#000000' }]}>
                  Y형 상하짝
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => checkType(4)}
                style={styles.categoryItem}>
                <ImageBackground
                  source={require('../../src/images/icon24.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}>
                  {type === 4 && (
                    <Image
                      source={require('../../src/images/box_on.png')}
                      resizeMode="cover"
                      style={styles.categoryItemImgHover}
                    />
                  )}
                </ImageBackground>

                <Text
                  style={[styles.categoryItemText, { color: type === 4 ? '#275696' : '#000000' }]}>
                  S형 슬리브, 하짝
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => checkType(5)}
                style={styles.categoryItem}>
                <ImageBackground
                  source={require('../../src/images/icon25.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}>
                  {type === 5 && (
                    <Image
                      source={require('../../src/images/box_on.png')}
                      resizeMode="cover"
                      style={styles.categoryItemImgHover}
                    />
                  )}
                </ImageBackground>

                <Text
                  style={[styles.categoryItemText, { color: type === 5 ? '#275696' : '#000000' }]}>
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
            <Text style={[styles.mediumText, { fontSize: 15, color: '#000000', marginRight: 10 }]}>
              2. 직접입력
            </Text>
          </View>
          <TextInput
            value=""
            placeholder="원하는 박스 타입을 직접 입력해주세요."
            placeholderTextColor="#A2A2A2"
            onFocus={() => setType(5)}
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
          />
        </View>

        {/* 이전, 다음 버튼 부분 (Prev, Next) */}
        <View style={{ paddingHorizontal: 20 }}>
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
            <View style={{ borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3' }} />
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
                  style={{ width: 16, height: 16, marginRight: 7 }}
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
            <View style={{ borderWidth: 0.5, height: '100%', borderColor: '#E3E3E3' }} />
            <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderStep04')}>
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
                  style={{ width: 16, height: 16, marginLeft: 7 }}
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
