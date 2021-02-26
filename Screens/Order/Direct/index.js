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

import {
  selectCate1,
  selectCaId,
  setUserId,
} from '../../../Modules/OrderReducer';
import DetailHeader from '../../Common/DetailHeader';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const cate1 = props.route.params.cate1;
  const bName = props.route.params.bName;
  const name = props.route.params.name;

  console.log('Direct props', props);

  const dispatch = useDispatch();

  // Redux 에서 유저 정보 가져오기
  const {mb_id, mb_email, mb_name, mb_hp, mb_1, mb_2, mb_img} = useSelector(
    (state) => state.UserInfoReducer,
  );

  const [cate1Type, setCate1Type] = React.useState([]);

  React.useEffect(() => {
    dispatch(setUserId(mb_id));

    const type = cate1.split(',');
    setCate1Type(type);
  }, []);

  console.log('cate1Type', cate1Type);

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <Text
            style={[
              styles.boldText,
              {fontSize: 16, color: '#000000', marginBottom: 10},
            ]}>
            신청 대상 업체
          </Text>
          <View style={[styles.infoBox, {marginBottom: 10}]}>
            <View style={styles.details}>
              <Text style={[styles.normalText, styles.detailsTitle]}>
                업체명
              </Text>
              <Text style={[styles.mediumText, styles.detailsDesc]}>
                {bName}
              </Text>
            </View>

            <View style={styles.details}>
              <Text style={[styles.normalText, styles.detailsTitle]}>
                담당자
              </Text>
              <Text style={[styles.mediumText, styles.detailsDesc]}>
                {name}
              </Text>
            </View>

            {/* <View style={styles.details}>
              <Text style={[styles.normalText, styles.detailsTitle]}>
                영업품목
              </Text>
              <Text style={[styles.normalText, styles.detailsDesc]}>
                {cate1Type.includes('1') ? '패키지' : null}
                {cate1Type.includes('0') ? '일반인쇄' : null}
                {cate1Type.includes('2') ? '기타인쇄' : null}
              </Text>
            </View> */}
          </View>
        </View>

        <View style={{paddingHorizontal: 20, marginBottom: 20}}>
          <Text
            style={[
              styles.boldText,
              {fontSize: 16, color: '#000000', marginBottom: 10},
            ]}>
            신청자 정보
          </Text>
          <View style={[styles.infoBox, {marginBottom: 10}]}>
            {mb_2 ? (
              <View style={styles.details}>
                <Text style={[styles.normalText, styles.detailsTitle]}>
                  업체명
                </Text>
                <Text style={[styles.mediumText, styles.detailsDesc]}>
                  {mb_2}
                </Text>
              </View>
            ) : null}
            <View style={styles.details}>
              <Text style={[styles.normalText, styles.detailsTitle]}>
                담당자
              </Text>
              <Text style={[styles.mediumText, styles.detailsDesc]}>
                {mb_name}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.wrap}>
          <Text
            style={[
              styles.boldText,
              {fontSize: 16, color: '#000000', marginBottom: 10},
            ]}>
            카테고리를 선택해주세요.
          </Text>

          {/* 패키지 */}
          {cate1Type.includes('1') && (
            <View style={{marginBottom: 10}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCate1('1'));
                  navigation.navigate('OrderPackage', {
                    screen: 'DirectOrder',
                  });
                }}>
                <View
                  style={[
                    styles.flexRowCenter,
                    {
                      backgroundColor: '#rgba(216, 229, 245, 0.5)',
                      borderRadius: 5,
                      height: 130,
                      paddingHorizontal: 20,
                    },
                  ]}>
                  <View style={{marginRight: 30}}>
                    <Image
                      source={require('../../../src/images/box01.png')}
                      resizeMode="contain"
                      style={{width: 100, height: 100}}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={styles.infoStepTitle}>패키지</Text>
                    <Text style={styles.infoStepDesc}>
                      단상자/싸바리/쇼핑백 등
                    </Text>
                    <View
                      style={{backgroundColor: '#275696', borderRadius: 20}}>
                      <Text
                        style={[
                          styles.normalText,
                          {
                            fontSize: 13,
                            color: '#fff',
                            paddingVertical: 7,
                            paddingHorizontal: 13,
                          },
                        ]}>
                        견적 바로가기
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {/* // 패키지 */}

          {/* 일반인쇄 */}
          {cate1Type.includes('0') && (
            <View style={{marginBottom: 10}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCate1('0'));
                  navigation.navigate('OrderGeneral', {
                    screen: 'DirectOrder',
                  });
                }}>
                <View
                  style={[
                    styles.flexRowCenter,
                    {
                      backgroundColor: '#rgba(216, 229, 245, 0.5)',
                      borderRadius: 5,
                      height: 130,
                      paddingHorizontal: 20,
                    },
                  ]}>
                  <View style={{marginRight: 30}}>
                    <Image
                      source={require('../../../src/images/box02.png')}
                      resizeMode="contain"
                      style={{width: 100, height: 100}}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={styles.infoStepTitle}>일반인쇄</Text>
                    <Text style={styles.infoStepDesc}>
                      리플렛/브로슈어/포스터 등
                    </Text>
                    <View
                      style={{backgroundColor: '#275696', borderRadius: 20}}>
                      <Text
                        style={[
                          styles.normalText,
                          {
                            fontSize: 13,
                            color: '#fff',
                            paddingVertical: 7,
                            paddingHorizontal: 13,
                          },
                        ]}>
                        견적 바로가기
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {/* // 일반인쇄 */}

          {/* 기타인쇄 */}
          {cate1Type.includes('2') && (
            <View style={{marginBottom: 10}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(selectCate1('2'));
                  navigation.navigate('OrderEtc', {
                    screen: 'DirectOrder',
                  });
                }}>
                <View
                  style={[
                    styles.flexRowCenter,
                    {
                      backgroundColor: '#rgba(216, 229, 245, 0.5)',
                      borderRadius: 5,
                      height: 130,
                      paddingHorizontal: 20,
                    },
                  ]}>
                  <View style={{marginRight: 30}}>
                    <Image
                      source={require('../../../src/images/box03.png')}
                      resizeMode="contain"
                      style={{width: 100, height: 100}}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={styles.infoStepTitle}>기타인쇄물</Text>
                    <Text style={styles.infoStepDesc}>
                      카렌다/상품권/티겟/비닐 BAG 등
                    </Text>
                    <View
                      style={{backgroundColor: '#275696', borderRadius: 20}}>
                      <Text
                        style={[
                          styles.normalText,
                          {
                            fontSize: 13,
                            color: '#fff',
                            paddingVertical: 7,
                            paddingHorizontal: 13,
                          },
                        ]}>
                        견적 바로가기
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {/* // 기타인쇄 */}
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
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#484848',
    marginBottom: 10,
  },
  infoStepTitle: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#000000',
    marginBottom: 7,
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

export default index;
