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
} from 'react-native';

import Modal from 'react-native-modal';

const InfoModal = ({ toggleModal, isVisible }) => {
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
              height: 500,
              backgroundColor: '#fff',
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                height: 35,
                marginBottom: 20,
              }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
                세부 정보 안내
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={toggleModal}
                hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                style={{ position: 'absolute', top: 0, right: -5 }}>
                <Image
                  source={require('../../src/assets/icon_close01.png')}
                  resizeMode="cover"
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* 컨텐츠 */}
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
              {/* // 세부정보 안내 Area */}
              <View style={{ marginBottom: 20 }}>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>세부 정보 안내</Text>
                  <Text style={styles.partnerInfoDesc}>
                    세부 정보 안내 내용입니다. 세부 정보 안내 내용입니다. 세부 정보 안내 내용입니다.
                  </Text>
                </View>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>세부 정보 안내</Text>
                  <Text style={styles.partnerInfoDesc}>
                    세부 정보 안내 내용입니다. 세부 정보 안내 내용입니다. 세부 정보 안내 내용입니다.
                  </Text>
                </View>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>세부 정보 안내</Text>
                  <Text style={styles.partnerInfoDesc}>
                    세부 정보 안내 내용입니다. 세부 정보 안내 내용입니다. 세부 정보 안내 내용입니다.
                  </Text>
                </View>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>세부 정보 안내</Text>
                  <Text style={styles.partnerInfoDesc}>
                    세부 정보 안내 내용입니다. 세부 정보 안내 내용입니다. 세부 정보 안내 내용입니다.
                  </Text>
                </View>
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
});

export default InfoModal;
