import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';

import axios from 'axios';
import qs from 'qs';

import Header from '../Common/Header';

import CategoryNav from './CategoryNav';
import PartnersNav from './PartnersNav';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const cateName = props.route.params.name;

  console.log('파트너스 전체 props', props);

  const [partners, setPartners] = React.useState([]);

  const getApi = () => {
    axios({
      method: 'post',
      url: 'http://dmonster1506.cafe24.com/json/proc_json.php',
      data: qs.stringify({
        method: 'proc_partner_list',
      }),
    })
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setPartners(res.data.item);
        } else {
          setPartners(null);
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getApi();
    return () => getApi();
  }, []);

  console.log('partners:', partners);

  const renderRow = ({item, index}) => {
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
          marginRight: index % 2 === 0 ? '1%' : 0,
          marginLeft: index % 2 !== 0 ? '1%' : 0,
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
              source={require('../../src/assets/noImg.png')}
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
  return (
    <>
      <Header title={routeName} navigation={navigation} />

      <View
        style={{
          position: 'relative',
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
          backgroundColor: '#fff',
        }}>
        <PartnersNav navigation={navigation} routeName={routeName} />
        <CategoryNav
          navigation={navigation}
          routeName={routeName}
          cateName={cateName}
        />

        {partners ? (
          <FlatList
            data={partners}
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
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontFamily: 'SCDream4'}}>해당 업체가 없습니다.</Text>
          </View>
        )}
      </View>

      {/* <Footer navigation={navigation} /> */}
      {/* </ScrollView> */}
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

export default index;
