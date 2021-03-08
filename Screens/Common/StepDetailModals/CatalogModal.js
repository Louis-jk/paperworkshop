import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Modal from 'react-native-modal';

const CatalogModal = ({
  toggleModal,
  isVisible,
  selectDetail,
  typeId,
  wayEdit,
}) => {
  const [detailMenu, setDetailMenu] = React.useState([]);

  React.useEffect(() => {
    if (wayEdit) {
      const menu = wayEdit.split(',');
      setDetailMenu(menu);
    }
  }, [wayEdit]);

  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Button title="Show modal" onPress={toggleModal} /> */}

          <View
            style={{
              position: 'relative',
              height: 310,
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
                카달로그 형태를 선택해주세요.
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={toggleModal}
                hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                style={{
                  backgroundColor: '#E5E5E5',
                  padding: 7,
                  borderRadius: 30,
                  position: 'absolute',
                  top: -15,
                  right: -15,
                  zIndex: 1,
                  elevation: 1,
                }}>
                <Image
                  source={require('../../../src/assets/icon_close03.png')}
                  resizeMode="contain"
                  style={{
                    width: 22,
                    height: 22,
                  }}
                />
              </TouchableOpacity>
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
                {detailMenu
                  ? detailMenu.map((menu) => (
                      <TouchableOpacity
                        key={menu}
                        activeOpacity={0.8}
                        onPress={() => selectDetail(menu, typeId)}
                        style={styles.partnerInfoBox}>
                        <Text style={styles.partnerInfoTitle}>{menu}</Text>
                      </TouchableOpacity>
                    ))
                  : null}
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
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: '#275696',
    marginBottom: 10,
  },
  partnerInfoDesc: {
    fontFamily: 'SCDream4',
    fontSize: 13,
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

export default CatalogModal;
