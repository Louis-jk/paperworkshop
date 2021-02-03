import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import Modal from 'react-native-modal';

const CancelModal = ({ toggleModal, isVisible, goCopyOrder, goCancelOrder }) => {
  return (
    <View>
      <Modal isVisible={isVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Button title="Show modal" onPress={toggleModal} /> */}

          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 5,
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                height: 30,
              }}>
              <Text style={[styles.mediumText, { fontSize: 16, color: '#000' }]}>
                계약 포기 요청
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={toggleModal}
                hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                style={{ position: 'absolute', top: -5, right: -5 }}>
                <Image
                  source={require('../../../src/assets/icon_close01.png')}
                  resizeMode="cover"
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* 컨텐츠 */}
            <View style={styles.container}>
              <View style={{ marginBottom: 10 }}>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>
                    선택하신 파트너스와의 계약을 포기 하시겠습니까?
                  </Text>
                  <Text style={styles.partnerInfoDesc}>
                    계약 포기 시, 해당 파트너스 회원에게 메세지가 발송됩니다. 계약금 및 견적 금액에
                    대해서는 파트너스 회원과 직접 상의 하셔야 합니다.
                  </Text>
                </View>
              </View>

              {/* 버튼 */}
              <View
                style={{
                  width: '100%',
                }}>
                <TouchableOpacity onPress={goCopyOrder} activeOpacity={0.8}>
                  <View style={[styles.goHomeBtn, { marginBottom: 5 }]}>
                    <Text style={styles.goHomeBtnText}>복사 후 재등록</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={goCancelOrder} activeOpacity={0.8}>
                  <View style={[styles.submitBtn, { marginBottom: 10 }]}>
                    <Text style={styles.submitBtnText}>최종 선택 포기</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* // 버튼 */}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
  },
  partnerInfoBox: {
    marginVertical: 15,
  },
  partnerInfoTitle: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#366DE5',
    marginBottom: 15,
  },
  partnerInfoDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    lineHeight: 22,
    color: '#000000',
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
    fontFamily: 'SCDream4',
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
    fontFamily: 'SCDream4',
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

export default CancelModal;
