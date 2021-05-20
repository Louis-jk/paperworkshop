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
import AutoHeightImage from 'react-native-auto-height-image';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const InfoModal02 = ({ toggleModal, isVisible }) => {
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
              height: Dimensions.get('window').height - 200,
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
                marginBottom: 15,
                marginTop: 10,
              }}>
              <Text style={[styles.boldText, { fontSize: 16, color: '#000' }]}>
                후가공 정보 안내
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
                  <Text style={styles.partnerInfoTitle}>후가공 정보 안내</Text>
                  <Text style={[styles.partnerInfoDesc, { marginBottom: 20 }]}>
                    후가공 정보 안내 내용입니다. 후가공 정보 안내 내용입니다. 후가공 정보 안내
                    내용입니다.
                  </Text>
                  <AutoHeightImage
                    source={require('../../src/images/foil01.jpg')}
                    width={Dimensions.get('window').width - 40}
                    height={200}
                    style={{ marginBottom: 10 }}
                  />
                  <AutoHeightImage
                    source={require('../../src/images/foil02.jpg')}
                    width={Dimensions.get('window').width - 40}
                    height={200}
                    style={{ marginBottom: 10 }}
                  />
                </View>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>후가공 정보 안내</Text>
                  <Text style={[styles.partnerInfoDesc, { marginBottom: 20 }]}>
                    후가공 정보 안내 내용입니다. 후가공 정보 안내 내용입니다. 후가공 정보 안내
                    내용입니다.
                  </Text>
                  <AutoHeightImage
                    source={require('../../src/images/foil03.jpg')}
                    width={Dimensions.get('window').width - 40}
                    height={200}
                    style={{ marginBottom: 10 }}
                  />
                </View>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>후가공 정보 안내</Text>
                  <Text style={styles.partnerInfoDesc}>
                    후가공 정보 안내 내용입니다. 후가공 정보 안내 내용입니다. 후가공 정보 안내
                    내용입니다.
                  </Text>
                </View>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>후가공 정보 안내</Text>
                  <Text style={styles.partnerInfoDesc}>
                    후가공 정보 안내 내용입니다. 후가공 정보 안내 내용입니다. 후가공 정보 안내
                    내용입니다.
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

export default InfoModal02;
