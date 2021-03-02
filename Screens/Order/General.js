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
import {TabView, SceneMap} from 'react-native-tab-view';
import {useSelector, useDispatch} from 'react-redux';

import {selectCate1, selectCaId, setUserId} from '../../Modules/OrderReducer';
import DetailHeader from '../Common/DetailHeader';
import Modal from '../Common/InfoModal';

const General = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const propsScreenName = props.route.params.screen;

  const dispatch = useDispatch();

  // Redux 에서 유저 정보 가져오기
  const {mb_id, mb_email, mb_name, mb_hp, mb_1, mb_2, mb_img} = useSelector(
    (state) => state.UserInfoReducer,
  );

  React.useEffect(() => {
    dispatch(setUserId(mb_id));
  }, []);

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Modal isVisible={isModalVisible} toggleModal={toggleModal} />
      <DetailHeader
        title={propsScreenName === 'DirectOrder' ? propsScreenName : routeName}
        navigation={navigation}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <Text
            style={[
              styles.boldText,
              {fontSize: 16, color: '#000000', marginBottom: 20},
            ]}>
            {propsScreenName === 'DirectOrder' ? '' : '비교 '}견적 대상을
            선택해주세요.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginBottom: 10,
            }}>
            <View>
              <Text style={[styles.boldText, {fontSize: 16, color: '#000000'}]}>
                인쇄 타입 선택
              </Text>
            </View>
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

          <View>
            {/* 일반인쇄물 1차 카테고리 리스트(list) */}
            <View style={styles.categoryWrap}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCaId('1'));
                  navigation.navigate('OrderStep02', {
                    screen:
                      propsScreenName === 'DirectOrder'
                        ? propsScreenName
                        : null,
                  });
                }}
                style={styles.categoryItem}>
                <Image
                  source={require('../../src/images/icon14.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}
                />
                <Text style={styles.categoryItemText}>
                  카달로그/브로슈어/팜플렛
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCaId('4'));
                  navigation.navigate('OrderStep02', {
                    screen:
                      propsScreenName === 'DirectOrder'
                        ? propsScreenName
                        : null,
                  });
                }}
                style={styles.categoryItem}>
                <Image
                  source={require('../../src/images/icon15.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}
                />
                <Text style={styles.categoryItemText}>책자/서적류</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCaId('5'));
                  navigation.navigate('OrderStep02', {
                    screen:
                      propsScreenName === 'DirectOrder'
                        ? propsScreenName
                        : null,
                  });
                }}
                style={styles.categoryItem}>
                <Image
                  source={require('../../src/images/icon16.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}
                />
                <Text style={styles.categoryItemText}>전단/포스터/안내장</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCaId('6'));
                  navigation.navigate('OrderStep02', {
                    screen:
                      propsScreenName === 'DirectOrder'
                        ? propsScreenName
                        : null,
                  });
                }}
                style={styles.categoryItem}>
                <Image
                  source={require('../../src/images/icon17.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}
                />
                <Text style={styles.categoryItemText}>스티커/라벨</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCaId('7'));
                  navigation.navigate('OrderStep02', {
                    screen:
                      propsScreenName === 'DirectOrder'
                        ? propsScreenName
                        : null,
                  });
                }}
                style={styles.categoryItem}>
                <Image
                  source={require('../../src/images/icon18.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}
                />
                <Text style={styles.categoryItemText}>봉투/명함</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCaId('8'));
                  navigation.navigate('OrderStep02', {
                    screen:
                      propsScreenName === 'DirectOrder'
                        ? propsScreenName
                        : null,
                  });
                }}
                style={styles.categoryItem}>
                <Image
                  source={require('../../src/assets/photo.png')}
                  resizeMode="cover"
                  style={[
                    styles.categoryItemImg,
                    {borderWidth: 0.5, borderColor: '#E5E5E5'},
                  ]}
                />
                <Text style={styles.categoryItemText}>기타 인쇄물</Text>
              </TouchableOpacity>
            </View>
            {/* // 일반인쇄물 1차 카테고리 리스트(list) */}
          </View>
        </View>
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
    flex: 1,
    height: Dimensions.get('window').height - 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
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

export default General;
