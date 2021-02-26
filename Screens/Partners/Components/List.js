import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const List = ({item, index, navigation}) => {
  // console.log('List item', item);

  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('PartnersDetail', {
          screen: 'PartnersDetail',
          params: {
            bName: item.businessName,
            name: item.name,
            rating: item.rating,
            portfolioImg: item.portfolioImg,
            mobile: item.mobile,
            description: item.description,
            openingTime: item.mb_7,
            closedDay: item.mb_8,
            used: item.used,
            cate1: item.cate1,
          },
        })
      }
      style={{
        width: '50%',
        borderRadius: 5,
        marginBottom: 25,
        height: 220,
        backgroundColor: '#fff',
        paddingHorizontal: 2,
        // marginRight: index % 2 === 0 ? '1%' : 0,
        // marginLeft: index % 2 !== 0 ? '1%' : 0,
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
          marginRight: 35,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          {item.cate1.includes('1') ? (
            <View
              style={{
                backgroundColor: '#3CD7C8',
                borderRadius: 2,
                marginRight: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 10,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                패키지
              </Text>
            </View>
          ) : null}
          {item.cate1.includes('0') ? (
            <View
              style={{
                backgroundColor: '#275696',
                borderRadius: 2,
                marginRight: 5,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 10,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                일반인쇄
              </Text>
            </View>
          ) : null}
          {item.cate1.includes('2') ? (
            <View
              style={{
                backgroundColor: '#ACACAC',
                borderRadius: 2,
              }}>
              <Text
                style={[
                  styles.normalText,
                  {
                    color: '#fff',
                    fontSize: 10,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  },
                ]}>
                기타인쇄
              </Text>
            </View>
          ) : null}
        </View>
        <Text
          style={[
            styles.boldText,
            {
              color: '#000',
              fontSize: 13,
              marginBottom: 5,
            },
          ]}>
          {item.businessName}
        </Text>

        <Text
          style={[
            styles.normalText,
            {fontSize: 12, lineHeight: 18, width: '100%'},
          ]}
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
    fontFamily: 'SCDream4',
  },
  mediumText: {
    fontFamily: 'SCDream5',
  },
  boldText: {
    fontFamily: 'SCDream6',
  },
});

export default List;
