import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const List = (props) => {
  const {
    item,
    index,
    navigation,
    ca_id,
    sabari,
    detail,
    detail02,
    bindFix,
    checkType,
    type,
    setTypeName,
    toggleSelectModal,
    toggleSelectDetailModal,
    setBindFix,
  } = props;
  return (
    <TouchableOpacity
      key={item.type_id}
      activeOpacity={0.8}
      onPress={() => {
        checkType(item.type_id);
        setTypeName(item.type_name);
        ca_id === '12' && toggleSelectModal(item.type_id);
        item.type_id === '71' ||
        item.type_id === '74' ||
        item.type_id === '75' ||
        item.type_id === '90'
          ? toggleSelectDetailModal(item.type_id, item.way_edit)
          : null;
        item.type_id === '73' &&
          toggleSelectDetailModal(item.type_id, item.ground_method);
        item.type_id === '76' && setBindFix(item.way_edit);
        item.type_id === '81' &&
          toggleSelectDetailModal(item.type_id, item.back_side);
        item.type_id === '83' || item.type_id === '84'
          ? toggleSelectDetailModal(item.type_id, item.geomancer)
          : null;
      }}
      style={[styles.categoryItem, {paddingHorizontal: 20}]}>
      {item.box_img ? (
        <ImageBackground
          source={{uri: `${item.box_img}`}}
          resizeMode="cover"
          style={styles.categoryItemImg}>
          {type === item.type_id && (
            <Image
              source={require('../../../src/images/box_on.png')}
              resizeMode="cover"
              style={styles.categoryItemImgHover}
            />
          )}
        </ImageBackground>
      ) : (
        <ImageBackground
          source={require('../../../src/assets/photo.png')}
          resizeMode="cover"
          style={[
            styles.categoryItemImg,
            {borderWidth: 0.5, borderColor: '#E5E5E5'},
          ]}>
          {type === item.type_id && (
            <Image
              source={require('../../../src/images/box_on.png')}
              resizeMode="cover"
              style={styles.categoryItemImgHover}
            />
          )}
        </ImageBackground>
      )}

      <Text
        style={[
          styles.categoryItemText,
          {
            lineHeight: 22,
            color: type === item.type_id ? '#275696' : '#000000',
          },
        ]}>
        {item.type_name}
      </Text>
      <Text
        style={[
          styles.categoryItemText02,
          {
            color: type === item.type_id ? '#275696' : '#000000',
          },
        ]}>
        {item.type_id === sabari.type_id
          ? sabari.sabari
          : item.type_id === detail.type_id
          ? detail.detail
          : item.type_id === detail02.type_id
          ? detail02.detail
          : item.type_id === '76'
          ? bindFix
          : null}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    // height: 170,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  categoryItemImg: {
    position: 'relative',
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  categoryItemImgHover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  categoryItemText: {
    fontFamily: SCDream5,
    width: 120,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 10,
  },
  categoryItemText02: {
    fontFamily: SCDream5,
    width: 120,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 5,
  },
});

export default List;
