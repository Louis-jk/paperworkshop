import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

import DetailHeader from '../Common/DetailHeader';
import {useDispatch} from 'react-redux';

import {
  resetState
} from '../../Modules/OrderReducer';

const OrderComplete = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const dispatch = useDispatch();  

  React.useEffect(() => {
    dispatch(resetState());
  },[])

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: '#fff',
        }}>
        <View style={{ marginTop: 50, marginBottom: 25 }}>
          <Image
            source={require('../../src/assets/icon04.png')}
            resizeMode="cover"
            style={{ width: 65, height: 65, marginBottom: 25 }}
          />
          <Text style={[styles.boldText, { fontSize: 22, color: '#000000', marginBottom: 7 }]}>
            세부 견적 신청이
          </Text>
          <Text style={[styles.boldText, { fontSize: 22, color: '#000000', marginBottom: 20 }]}>
            정상적으로 완료되었습니다.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 3,
            }}>
            <Text style={[styles.mediumText, { fontSize: 15, color: '#000000' }]}>
              파트너스 회원이 견적을 제시하면
            </Text>
            <Text style={[styles.mediumText, { fontSize: 15, color: '#275696' }]}>
              {' '}
              카카오 알림톡
            </Text>
            <Text style={[styles.mediumText, { fontSize: 15, color: '#000000' }]}>과</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={[styles.mediumText, { fontSize: 15, color: '#275696' }]}>PUSH 알림</Text>
            <Text style={[styles.mediumText, { fontSize: 15, color: '#000000' }]}>
              으로 고객님에게 알려드립니다.
            </Text>
          </View>
          <Text style={[styles.mediumText, { fontSize: 13, color: '#A2A2A2' }]}>
            신청한 내용은 "나의 견적 의뢰 건" 에서 확인하실 수 있습니다.
          </Text>
        </View>

        <View
          style={{
            width: '100%',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Stack')} activeOpacity={0.8}>
            <View style={[styles.goHomeBtn, { marginBottom: 10 }]}>
              <Text style={styles.goHomeBtnText}>홈으로</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyOrder')} activeOpacity={0.8}>
            <View style={[styles.submitBtn, { marginBottom: 10 }]}>
              <Text style={styles.submitBtnText}>나의 견적 의뢰건</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  goHomeBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#275696',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
  },
  goHomeBtnText: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#275696',
    textAlign: 'center',
  },
  submitBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#275696',
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
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

export default OrderComplete;
