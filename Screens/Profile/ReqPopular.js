import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

import DetailHeader from '../Common/DetailHeader';

const ReqPopular = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [category01, setCategory01] = React.useState(null);
  const [oneMonth, setOneMonth] = React.useState(false);

  const oneMonthToggle = () => {
    setOneMonth((prev) => !prev);
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 13, color: '#275696', marginBottom: 20}}>
            * 인기 파트너스 등록 신청 시, 아래 내용을 확인해주세요.
          </Text>
          <Text style={[styles.orderInfoContentTitle, {marginBottom: 12}]}>
            인기 파트너스 등록 비용
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <TouchableOpacity
              onPress={oneMonthToggle}
              activeOpacity={1}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '50%',
                marginBottom: 10,
              }}>
              <Image
                source={
                  oneMonth
                    ? require('../../src/assets/radio_on.png')
                    : require('../../src/assets/radio_off.png')
                }
                resizeMode="contain"
                style={{width: 20, height: 20, marginRight: 7}}
              />
              <Text style={{fontSize: 14, color: '#000'}}>
                1개월 : 50,000원
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '50%',
                marginBottom: 10,
              }}>
              <Image
                source={require('../../src/assets/radio_off.png')}
                resizeMode="contain"
                style={{width: 20, height: 20, marginRight: 7}}
              />
              <Text style={{fontSize: 14, color: '#000'}}>
                3개월 : 70,000원
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '50%',
                marginBottom: 10,
              }}>
              <Image
                source={require('../../src/assets/radio_off.png')}
                resizeMode="contain"
                style={{width: 20, height: 20, marginRight: 7}}
              />
              <Text style={{fontSize: 14, color: '#000'}}>
                6개월 : 100,000원
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '50%',
                marginBottom: 10,
              }}>
              <Image
                source={require('../../src/assets/radio_off.png')}
                resizeMode="contain"
                style={{width: 20, height: 20, marginRight: 7}}
              />
              <Text style={{fontSize: 14, color: '#000'}}>
                12개월 : 130,000원
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 경계 라인 */}
        <View
          style={{
            height: 1,
            backgroundColor: '#E3E3E3',
            width: Dimensions.get('window').width,
          }}
        />
        <View
          style={{
            height: 6,
            backgroundColor: '#F5F5F5',
            width: Dimensions.get('window').width,
            marginBottom: 20,
          }}
        />
        {/* // 경계 라인 */}

        <View style={{paddingHorizontal: 20}}>
          <Text style={[styles.orderInfoContentTitle, styles.mgB10]}>
            입금 계좌 정보
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#275696',
            paddingHorizontal: 20,
            paddingVertical: 15,
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 14, color: '#FFFFFF'}}>신한은행</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 14, color: '#FFFFFF', marginRight: 10}}>
              562-66312-4512644
            </Text>
            <Text style={{fontSize: 14, color: '#FFFFFF'}}>페이퍼공작소</Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 20}}>
          {/* 업체 소개 TextArea */}
          <Text style={[styles.orderInfoContentTitle, styles.mgB10]}>
            업체 소개
          </Text>
          <View style={styles.mgB20}>
            <TextInput
              placeholder="내용을 적어주세요"
              placeholderTextColor="#A2A2A2"
              style={{
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                height: 120,
                flex: 1,
                textAlignVertical: 'top',
                paddingLeft: 10,
                paddingVertical: 10,
              }}
              multiline={true}
            />
          </View>
          {/* 업체 소개 TextArea */}
          {/* 업체 소개 TextArea */}
          <Text style={[styles.orderInfoContentTitle, styles.mgB10]}>
            영업 품목
          </Text>
          <View style={styles.mgB40}>
            <TextInput
              placeholder="내용을 적어주세요"
              placeholderTextColor="#A2A2A2"
              style={{
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                height: 120,
                flex: 1,
                textAlignVertical: 'top',
                paddingLeft: 10,
                paddingVertical: 10,
              }}
              multiline={true}
            />
          </View>
          {/* 업체 소개 TextArea */}
        </View>

        {/* 내용안내 gray */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: '#F5F5F5',
            marginBottom: 50,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 12,
                color: '#707070',
                marginRight: 5,
              }}>
              ※
            </Text>
            <View>
              <Text style={{fontSize: 12, lineHeight: 18, color: '#707070'}}>
                인기 파트너스 등록 완료 후, 안내드린 금액을 입금 해주시면
                페이퍼공작소 매니저가 입금 확인 후, 인기 파트너스로
                등록해드립니다. 신청 후, 일반회원에게 노출될 내용들과 관련하여
                연락드리겠습니다.
              </Text>
            </View>
          </View>
        </View>
        {/* // 내용안내 gray */}
        <View style={{paddingHorizontal: 20, marginBottom: 50}}>
          <TouchableOpacity
            onPress={() => Alert.alert('등록 신청!')}
            activeOpacity={0.8}>
            <View style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>등록 신청</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  orderInfoContentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  orderInfoContentTitle: {
    fontSize: 15,
    color: '#111',
  },
  orderInfoContentDetail: {
    fontSize: 14,
    color: '#707070',
  },
  mgB10: {
    marginBottom: 10,
  },
  mgB20: {
    marginBottom: 20,
  },
  mgB30: {
    marginBottom: 30,
  },
  mgB40: {
    marginBottom: 40,
  },
  partnerInfoBox: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  partnerInfoTitle: {
    fontSize: 15,
    color: '#275696',
    marginBottom: 10,
  },
  partnerInfoDesc: {
    fontSize: 13,
    lineHeight: 20,
    color: '#000000',
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
});

export default ReqPopular;
