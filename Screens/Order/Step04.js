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
import Modal from './orderModal';

const Step04 = (props) => {
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

  const goEasyComplete = async () => {
    await setModalVisible(!isModalVisible);
    await navigation.navigate('easyOrderComplete');
  };

  const [quantity, setQuantity] = React.useState(null);
  const [quantityDirect, setQuantityDirect] = React.useState(null);
  const setOrderQuantity = (v) => {
    setQuantity(v);
  };

  const [pattern, setPattern] = React.useState(true);
  const setIsPattern = (b) => {
    setPattern(b);
  };

  return (
    <>
      <Modal isVisible={isModalVisible} toggleModal={toggleModal} goEasyComplete={goEasyComplete} />
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{ fontSize: 16, color: '#000000' }}>제작 정보</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleModal}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={{ fontSize: 13, color: '#366DE5' }}>*이전 단계 입력 내용 자동 저장</Text>
            </TouchableOpacity>
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
            <Text style={{ fontSize: 15, color: '#000000', marginRight: 5 }}>가로 규격</Text>
            <Text style={{ fontSize: 14, color: '#000000' }}>(mm)</Text>
          </View>
          <TextInput
            value=""
            placeholder="예) 10"
            placeholderTextColor="#A2A2A2"
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              paddingHorizontal: 10,
            }}
            autoCapitalize="none"
          />
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
            <Text style={{ fontSize: 15, color: '#000000', marginRight: 5 }}>세로 규격</Text>
            <Text style={{ fontSize: 14, color: '#000000' }}>(mm)</Text>
          </View>
          <TextInput
            value=""
            placeholder="예) 10"
            placeholderTextColor="#A2A2A2"
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              paddingHorizontal: 10,
            }}
            autoCapitalize="none"
          />
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
            <Text style={{ fontSize: 15, color: '#000000', marginRight: 5 }}>높이 규격</Text>
            <Text style={{ fontSize: 14, color: '#000000' }}>(mm)</Text>
          </View>
          <TextInput
            value=""
            placeholder="예) 10"
            placeholderTextColor="#A2A2A2"
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              paddingHorizontal: 10,
            }}
            autoCapitalize="none"
          />
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
            <Text style={{ fontSize: 15, color: '#000000' }}>수량</Text>
          </View>

          <View
            style={[
              styles.details,
              {
                marginBottom: 15,
              },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => setOrderQuantity(500)}
              style={[
                styles.details,
                {
                  marginRight: 20,
                },
              ]}>
              <Image
                source={
                  quantity === 500
                    ? require('../../src/assets/radio_on.png')
                    : require('../../src/assets/radio_off.png')
                }
                resizeMode="contain"
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14, color: '#000' }}>500</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => setOrderQuantity(1000)}
              style={[
                styles.details,
                {
                  marginRight: 20,
                },
              ]}>
              <Image
                source={
                  quantity === 1000
                    ? require('../../src/assets/radio_on.png')
                    : require('../../src/assets/radio_off.png')
                }
                resizeMode="contain"
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14, color: '#000' }}>1,000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => setOrderQuantity(2000)}
              style={[
                styles.details,
                {
                  marginRight: 20,
                },
              ]}>
              <Image
                source={
                  quantity === 2000
                    ? require('../../src/assets/radio_on.png')
                    : require('../../src/assets/radio_off.png')
                }
                resizeMode="contain"
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14, color: '#000' }}>2,000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => setOrderQuantity(3000)}
              style={styles.details}>
              <Image
                source={
                  quantity === 3000
                    ? require('../../src/assets/radio_on.png')
                    : require('../../src/assets/radio_off.png')
                }
                resizeMode="contain"
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14, color: '#000' }}>3,000</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ fontSize: 14, color: '#000' }}>직접 입력</Text>
            </TouchableOpacity>
            <TextInput
              value={quantityDirect}
              placeholder="직접 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setQuantityDirect(text)}
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
              }}
              autoCapitalize="none"
              keyboardType="number-pad"
            />
          </View>
        </View>
        {/* // 수량 */}

        {/* 목형 */}
        <View style={[styles.wrap, { marginBottom: 25 }]}>
          <View
            style={[
              styles.details,
              {
                marginBottom: 10,
              },
            ]}>
            <Text style={{ fontSize: 15, color: '#000000', marginRight: 5 }}>목형</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsPattern(true)}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: pattern ? '#275696' : '#A2A2A2',
                borderRadius: 4,
                backgroundColor: '#fff',
                width: '49%',
                paddingVertical: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: pattern ? '#275696' : '#A2A2A2',
                  fontWeight: pattern ? 'bold' : 'normal',
                }}>
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
                borderColor: !pattern ? '#275696' : '#A2A2A2',
                borderRadius: 4,
                backgroundColor: '#fff',
                width: '49%',
                paddingVertical: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: !pattern ? '#275696' : '#A2A2A2',
                  fontWeight: !pattern ? 'bold' : 'normal',
                }}>
                없음
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* // 목형 */}

        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={toggleModal} activeOpacity={0.8}>
            <View style={[styles.submitBtn, { marginBottom: 10 }]}>
              <Text style={styles.submitBtnText}>간단 견적 제출</Text>
            </View>
          </TouchableOpacity>
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
                  style={{
                    fontSize: 14,
                    color: '#707070',
                    letterSpacing: -1,
                  }}>
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
                  style={{
                    fontSize: 14,
                    letterSpacing: -1,
                  }}>
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
    borderRadius: 5,
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
    width: 100,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 10,
  },
});

export default Step04;
