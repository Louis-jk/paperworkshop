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
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const Etc = (props) => {
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

  return (
    <>
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
            {propsScreenName === 'DirectOrder' ? '' : '비교'} 견적 대상을
            선택해주세요.
          </Text>
          <View>
            {/* 기타인쇄물 1차 카테고리 리스트(list) */}
            <View style={styles.categoryWrap}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCaId('15'));
                  navigation.navigate('OrderStep02', {
                    screen:
                      propsScreenName === 'DirectOrder'
                        ? propsScreenName
                        : null,
                  });
                }}
                style={styles.categoryItem}>
                <Image
                  source={require('../../src/images/icon28.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}
                />
                <Text style={styles.categoryItemText}>상품권/티켓</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCaId('16'));
                  navigation.navigate('OrderStep02', {
                    screen:
                      propsScreenName === 'DirectOrder'
                        ? propsScreenName
                        : null,
                  });
                }}
                style={styles.categoryItem}>
                <Image
                  source={require('../../src/images/icon26.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}
                />
                <Text style={styles.categoryItemText}>초대장/카드</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCaId('17'));
                  navigation.navigate('OrderStep02', {
                    screen:
                      propsScreenName === 'DirectOrder'
                        ? propsScreenName
                        : null,
                  });
                }}
                style={styles.categoryItem}>
                <Image
                  source={require('../../src/images/icon27.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}
                />
                <Text style={styles.categoryItemText}>비닐 BAG</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCaId('18'));
                  navigation.navigate('OrderStep02', {
                    screen:
                      propsScreenName === 'DirectOrder'
                        ? propsScreenName
                        : null,
                  });
                }}
                style={styles.categoryItem}>
                <Image
                  source={require('../../src/images/icon29.png')}
                  resizeMode="cover"
                  style={styles.categoryItemImg}
                />
                <Text style={styles.categoryItemText}>감압지</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCaId('19'));
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
                <Text style={styles.categoryItemText}>기타</Text>
              </TouchableOpacity>
            </View>
            {/* // 기타인쇄물 1차 카테고리 리스트(list) */}
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
    fontFamily: SCDream5,
    width: 120,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 10,
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

export default Etc;
