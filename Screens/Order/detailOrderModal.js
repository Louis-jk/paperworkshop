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

const detailOrderModal = ({ toggleModal, isVisible, goOrderComplete }) => {
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
            <Text style={[styles.boldText, { fontSize: 16, color: '#000' }]}>세부 견적 신청</Text>

            {/* 컨텐츠 */}
            <View style={styles.container}>
              <View style={{ marginBottom: 20 }}>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>
                    작성하신 내용대로 견적 신청을 하시겠습니까?
                  </Text>
                  <Text style={styles.partnerInfoDesc}>
                    "업체명 / 담당자명"에게 견적 신청 건이 노출됩니다.
                  </Text>
                  <Text style={styles.partnerInfoDesc}>
                    작성하신 내용대로 견적 신청을 하시겠습니까?
                  </Text>
                </View>
              </View>

              {/* 이전, 다음 버튼 부분 (Prev, Next) */}
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderWidth: 1,
                    // borderColor: '#E3E3E3',
                    // borderRadius: 5,
                    backgroundColor: '#fff',
                  }}>
                  <View style={{ height: '100%' }} />
                  <TouchableWithoutFeedback onPress={toggleModal}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      }}>
                      <Text
                        style={[
                          styles.normalText,
                          {
                            fontSize: 14,
                            color: '#707070',
                          },
                        ]}>
                        취소
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={goOrderComplete}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row-reverse',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,
                        backgroundColor: '#275696',
                        borderWidth: 1,
                        borderColor: '#275696',
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                      }}>
                      <Text
                        style={[
                          styles.normalText,
                          {
                            fontSize: 14,
                            color: '#fff',
                          },
                        ]}>
                        신청완료
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              {/* // 이전, 다음 버튼 부분 (Prev, Next) */}
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
    marginBottom: 10,
  },
  partnerInfoDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
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

export default detailOrderModal;
