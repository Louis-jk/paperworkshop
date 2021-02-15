import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';

const index = (props) => {
  const navigation = props.navigation;
  const partners = props.partners;
  const location = props.location;

  const [partnersAll, setPartnersAll] = React.useState([]);

  React.useEffect(() => {
    setPartnersAll(partners);
  }, [partners, location]);

  console.log('partnersAll Package: ', partnersAll);

  const renderRow = ({item, idx}) => {
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
              used: item.used,
            },
          })
        }
        style={{
          width: '49%',
          borderRadius: 5,
          marginBottom: 25,
          height: 220,
          backgroundColor: '#fff',
          marginRight: idx % 2 === 0 ? 0 : '1%',
          marginLeft: idx % 2 !== 0 ? 0 : '1%',
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
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#fff',
                      fontSize: 11,
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
                  marginLeft: item.cate1.indexOf('0') !== 0 ? 5 : 0,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#fff',
                      fontSize: 11,
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
                  marginLeft: item.cate1.indexOf('2') !== 0 ? 5 : 0,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      color: '#fff',
                      fontSize: 11,
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
                fontSize: 14,
                marginBottom: 5,
              },
            ]}>
            {item.businessName}
          </Text>

          <Text
            style={[
              styles.normalText,
              {fontSize: 13, lineHeight: 18, width: '100%'},
            ]}
            numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return partnersAll ? (
    <FlatList
      data={partnersAll}
      renderItem={renderRow}
      keyExtractor={(list, index) => index.toString()}
      numColumns={2}
      pagingEnabled={true}
      persistentScrollbar={true}
      showsVerticalScrollIndicator={false}
      progressViewOffset={true}
      refreshing={true}
      // onEndReached={handleLoadMore}
    />
  ) : (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{fontFamily: 'SCDream4'}}>해당 업체가 없습니다.</Text>
    </View>
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

export default index;
