import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';

const GalleryNav = (props) => {
  const navigation = props.navigation;
  const routeName = props.routeName;

  console.log('G routeName', routeName);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        {routeName === 'Gallery' ? (
          <View style={{position: 'relative'}}>
            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 15,
                  marginBottom: 10,
                  marginRight: 20,
                },
              ]}>
              전체
            </Text>
            <View
              style={{
                position: 'absolute',
                top: -1,
                right: 13,
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#275696',
              }}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Gallery', {
                screen: 'Gallery',
                name: 'All',
              });
            }}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
                  marginBottom: 10,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              전체
            </Text>
          </TouchableOpacity>
        )}

        {routeName === 'GalleryPackage' ? (
          <View style={{position: 'relative'}}>
            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 15,
                  marginBottom: 10,
                  marginRight: 20,
                },
              ]}>
              패키지
            </Text>
            <View
              style={{
                position: 'absolute',
                top: -1,
                right: 13,
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#275696',
              }}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GalleryPackage', {
                screen: 'GalleryPackage',
                name: 'All',
              });
            }}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
                  marginBottom: 10,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              패키지
            </Text>
          </TouchableOpacity>
        )}

        {routeName === 'GalleryGeneral' ? (
          <View style={{position: 'relative'}}>
            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 15,
                  marginBottom: 10,
                  marginRight: 20,
                },
              ]}>
              일반인쇄
            </Text>
            <View
              style={{
                position: 'absolute',
                top: -1,
                right: 13,
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#275696',
              }}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GalleryGeneral', {
                screen: 'GalleryGeneral',
                name: 'All',
              });
            }}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
                  marginBottom: 10,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              일반인쇄
            </Text>
          </TouchableOpacity>
        )}

        {routeName === 'GalleryEtc' ? (
          <View style={{position: 'relative'}}>
            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 15,
                  marginBottom: 10,
                  marginRight: 20,
                },
              ]}>
              기타 인쇄물
            </Text>
            <View
              style={{
                position: 'absolute',
                top: -1,
                right: 13,
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#275696',
              }}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GalleryEtc', {
                screen: 'GalleryEtc',
                name: 'All',
              });
            }}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
                  marginBottom: 10,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              기타 인쇄물
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          borderWidth: 1,
          borderColor: '#DEDEDE',
          borderRadius: 5,
          paddingHorizontal: 10,
        }}>
        <TextInput
          placeholder="키워드를 입력하세요."
          placeholderTextColor="#BEBEBE"
          autoFocus={false}
          style={[styles.normalText, {width: '80%'}]}
        />
        <TouchableOpacity>
          <Image
            source={require('../../src/assets/top_seach.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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

export default GalleryNav;
