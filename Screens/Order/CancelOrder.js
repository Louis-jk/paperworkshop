import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

import DetailHeader from '../Common/DetailHeader';

const CancelOrder = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

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
        <View style={{ marginTop: 60, marginBottom: 25 }}>
          <Image
            source={require('../../src/assets/icon04.png')}
            resizeMode="cover"
            style={{ width: 65, height: 65, marginBottom: 25 }}
          />
          <Text style={{ fontSize: 22, color: '#000000', fontWeight: 'bold', marginBottom: 20 }}>
            견적 요청이 종료되었습니다.
          </Text>

          <Text style={{ fontSize: 15, color: '#111111', marginBottom: 2 }}>
            기존 정보는 모두 삭제되었으므로
          </Text>
          <Text style={{ fontSize: 15, color: '#111111' }}>
            견적 요청을 원하신다면 신규로 작성해주세요.
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
          <TouchableOpacity onPress={() => navigation.navigate('Order')} activeOpacity={0.8}>
            <View style={[styles.submitBtn, { marginBottom: 10 }]}>
              <Text style={styles.submitBtnText}>비교 견적 신청</Text>
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
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default CancelOrder;
