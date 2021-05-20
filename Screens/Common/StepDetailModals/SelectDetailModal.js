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
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const SelectDetailModal = ({
  toggleModal,
  isVisible,
  selectDetail,
  typeId,
  options,
}) => {
  const [detailMenu, setDetailMenu] = React.useState([]);

  React.useEffect(() => {
    if (options) {
      // const menu = options.split(',');
      setDetailMenu(options);
    }
  }, [options]);

  return (
    <View>
      <Modal isVisible={isVisible}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Button title="Show modal" onPress={toggleModal} /> */}

          <View>
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
                {typeId === '81'
                  ? '재단형태를'
                  : typeId === '73'
                  ? '접지방법을'
                  : typeId === '71' ||
                    typeId === '74' ||
                    typeId === '75' ||
                    typeId === '90'
                  ? '제본방향을'
                  : typeId === '83' || typeId === '84'
                  ? '지관크기(내경기준)를'
                  : null}{' '}
                선택해주세요.
              </Text>
            </View>

            {/* 컨텐츠 */}

            {/* // 세부정보 안내 Area */}
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                backgroundColor: '#fff',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
              }}>
              {detailMenu
                ? detailMenu.map((menu, idx) => (
                    <TouchableOpacity
                      key={idx}
                      activeOpacity={0.8}
                      onPress={() => selectDetail(menu, typeId)}
                      style={styles.partnerInfoBox}>
                      <Text style={styles.partnerInfoTitle}>{menu}</Text>
                    </TouchableOpacity>
                  ))
                : null}
            </View>
            {/* // 세부정보 안내 Area */}

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

export default SelectDetailModal;
