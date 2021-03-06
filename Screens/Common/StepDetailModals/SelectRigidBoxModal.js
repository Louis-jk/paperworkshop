import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Modal from 'react-native-modal';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const SelectRigidBoxModal = ({
  toggleModal,
  isVisible,
  selectSabari,
  typeId,
}) => {
  return (
    <View>
      <Modal isVisible={isVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'relative',
              height: 370,
              backgroundColor: '#fff',
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                paddingVertical: 20,
                paddingHorizontal: 20,
                backgroundColor: '#275696',
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
              }}>
              <Text style={[styles.mediumText, {fontSize: 16, color: '#fff'}]}>
                싸바리 형태를 선택해주세요.
              </Text>
            </View>

            {/* 컨텐츠 */}
            <ScrollView
              style={[
                styles.container,
                {borderBottomRightRadius: 5, borderBottomLeftRadius: 5},
              ]}
              showsVerticalScrollIndicator={false}>
              {/* // 세부정보 안내 Area */}
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => selectSabari('2단 싸바리', typeId)}
                  style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>2단 싸바리</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => selectSabari('3단 싸바리', typeId)}
                  style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>3단 싸바리</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => selectSabari('표지싸바리(리본)', typeId)}
                  style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>표지싸바리(리본)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => selectSabari('표지싸바리(자석)', typeId)}
                  style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>표지싸바리(자석)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => selectSabari('커스텀싸바리', typeId)}
                  style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>커스텀싸바리</Text>
                </TouchableOpacity>
              </View>
              {/* // 세부정보 안내 Area */}
            </ScrollView>
            {/* // 컨텐츠 */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  partnerInfoBox: {
    marginVertical: 10,
  },
  partnerInfoTitle: {
    fontFamily: SCDream5,
    fontSize: 15,
    color: '#275696',
    marginBottom: 10,
  },
  partnerInfoDesc: {
    fontFamily: SCDream4,
    fontSize: 13,
    lineHeight: 20,
    color: '#000000',
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

export default SelectRigidBoxModal;
