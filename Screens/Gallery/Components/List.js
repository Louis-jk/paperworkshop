import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const List = ({item, index, navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('GalleryWebView', {
          id: item.id,
          description: item.description,
          businessName: item.businessName,
        })
      }
      style={{
        width: '50%',
        borderRadius: 5,
        marginBottom: 20,
        paddingRight: 5,
      }}>
      <View style={{marginBottom: 10}}>
        {item.portfolioImg.length > 0 ? (
          <Image
            source={{uri: `${item.portfolioImg[0]}`}}
            resizeMode="cover"
            style={{width: '100%', height: 130, borderRadius: 5}}
          />
        ) : item.portfolioImg.length === 0 || item.portfolioImg === null ? (
          <Image
            source={require('../../../src/assets/noImg.png')}
            resizeMode="cover"
            style={{width: '100%', height: 130, borderRadius: 5}}
          />
        ) : null}
      </View>
      <View
        style={{
          flexShrink: 2,
          marginRight: 35,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <Text
            style={[
              styles.boldText,
              {
                color: '#000',
                fontSize: 14,
              },
            ]}>
            {item.businessName}
          </Text>
          {item.new_yn === 'Y' && (
            <Text
              style={[
                styles.normalText,
                {
                  color: '#275696',
                  fontSize: 14,
                  paddingHorizontal: 5,
                },
              ]}>
              NEW
            </Text>
          )}
        </View>

        <Text
          style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
          numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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

export default List;
