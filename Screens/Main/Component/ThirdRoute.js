import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';

import PartnersAPI from '../../../src/api/Partners';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const ThirdRoute = (props) => {
  const {navigation} = props;

  const [list, setList] = React.useState([]);

  const getSincerePartner = () => {
    PartnersAPI.getPartnerMain('local')
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setList(res.data.item);
        } else {
          setList(null);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  React.useEffect(() => {
    getSincerePartner();
  }, []);

  const renderRow = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('PartnersDetail', {
            screen: 'PartnersDetail',
            params: {companyId: item.company_id},
          })
        }
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexShrink: 2,
            marginRight: 35,
            // backgroundColor: '#ffeeaa',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 7,
            }}>
            <Text
              style={[
                styles.mediumText,
                {
                  color: '#000',
                  fontSize: 14,
                },
              ]}>
              {item.businessName}
            </Text>
            {item.cate1.includes('1') && (
              <View
                style={{
                  backgroundColor: '#3CD7C8',
                  borderRadius: 2,
                  marginLeft: 5,
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
            )}
            {item.cate1.includes('0') && (
              <View
                style={{
                  backgroundColor: '#275696',
                  borderRadius: 2,
                  marginLeft: 5,
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
            )}
            {item.cate1.includes('2') && (
              <View
                style={{
                  backgroundColor: '#B5B5B5',
                  borderRadius: 2,
                  marginLeft: 5,
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
            )}
          </View>
          <Text
            style={[styles.normalText, {fontSize: 13, lineHeight: 20}]}
            numberOfLines={2}>
            {item.description ? item.description : '회사소개가 없습니다.'}
          </Text>
        </View>
        <View>
          <Image
            source={{uri: `${item.portfolioImg}`}}
            resizeMode="cover"
            style={{width: 70, height: 70, borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      nestedScrollEnabled={true}
      data={list}
      renderItem={renderRow}
      keyExtractor={(list, index) => index.toString()}
      // numColumns={1}
      // pagingEnabled={true}
      persistentScrollbar={true}
      showsVerticalScrollIndicator={false}
      progressViewOffset={true}
      refreshing={true}
      ListEmptyComponent={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: 200,
          }}>
          <Text style={{fontFamily: SCDream4}}>
            실시간 견적 처리 현황 리스트가 없습니다.
          </Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
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

export default ThirdRoute;
