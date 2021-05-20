import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const CategoryNav = (props) => {
  const navigation = props.navigation;
  const routeName = props.routeName;
  const cateName = props.cateName;
  const propLocation = props.location;

  const packageIds = ['9', '10', '11', '12', '13', '14'];
  const generalIds = ['1', '4', '5', '6', '7', '8'];
  const etcIds = ['15', '16', '17', '18', '19'];

  const [isActivePackages, setIsActivePackages] = React.useState(false);
  const togglePackages = () => {
    setIsActivePackages(!isActivePackages);
    setIsActiveGeneral(false);
    setIsActiveEtc(false);
  };

  const [isActiveGeneral, setIsActiveGeneral] = React.useState(false);
  const toggleGeneral = () => {
    setIsActiveGeneral(!isActiveGeneral);
    setIsActivePackages(false);
    setIsActiveEtc(false);
  };

  const [isActiveEtc, setIsActiveEtc] = React.useState(false);
  const toggleEtc = () => {
    setIsActiveEtc(!isActiveEtc);
    setIsActivePackages(false);
    setIsActiveGeneral(false);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            paddingBottom: 0,
            paddingRight: 10,
            // backgroundColor: '#ffaaee',
          }}
          onPress={() =>
            routeName === 'Partners'
              ? navigation.navigate('Partners')
              : routeName === 'Partners01'
              ? navigation.navigate('Partners01')
              : routeName === 'Partners02'
              ? navigation.navigate('Partners02')
              : navigation.navigate('Partners03')
          }>
          <Text
            style={{
              paddingVertical: 12,
              fontFamily: cateName === 'All' ? SCDream5 : SCDream4,
              fontSize: 13,
              color: cateName === 'All' ? '#275696' : '#B5B5B5',
            }}>
            전체
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            paddingBottom: 0,
            paddingHorizontal: 10,
          }}
          onPress={togglePackages}>
          <Text
            style={{
              paddingVertical: 12,
              fontFamily: cateName === 'Packages' ? SCDream5 : SCDream4,
              fontSize: 13,
              color:
                cateName === 'Packages' ||
                (cateName === 'Packages' && isActivePackages)
                  ? '#275696'
                  : isActivePackages
                  ? '#111'
                  : '#B5B5B5',
            }}>
            패키지
          </Text>
        </TouchableOpacity>

        {isActivePackages && (
          <View
            style={{
              position: 'absolute',
              top: 40,
              left: '7%',
              backgroundColor: '#fff',
              zIndex: 100,
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              paddingVertical: 10,
            }}>
            {packageIds.map((v, idx) => (
              <TouchableOpacity
                key={idx}
                style={{paddingVertical: 10, paddingHorizontal: 10}}
                onPress={() => {
                  navigation.navigate('ListPage', {
                    screen: 'ListPage',
                    name: 'Packages',
                    routeName: routeName,
                    cate1: '1',
                    ca_id: v,
                    location: propLocation ? propLocation : null,
                  });
                  setIsActivePackages(false);
                }}>
                <Text style={{fontFamily: SCDream4, fontSize: 12}}>
                  {v === '9'
                    ? '칼라박스'
                    : v === '10'
                    ? '골판지박스'
                    : v === '11'
                    ? '합지골판지박스'
                    : v === '12'
                    ? '싸바리박스'
                    : v === '13'
                    ? '식품박스'
                    : v === '14'
                    ? '쇼핑백'
                    : null}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            paddingBottom: 0,
            paddingHorizontal: 10,
          }}
          onPress={toggleGeneral}>
          <Text
            style={{
              paddingVertical: 12,
              fontFamily: cateName === 'General' ? SCDream5 : SCDream4,
              fontSize: 13,
              color:
                cateName === 'General' ||
                (cateName === 'General' && isActiveGeneral)
                  ? '#275696'
                  : isActiveGeneral
                  ? '#111'
                  : '#B5B5B5',
            }}>
            일반인쇄
          </Text>
        </TouchableOpacity>

        {isActiveGeneral && (
          <View
            style={{
              position: 'absolute',
              top: 40,
              left: '20%',
              backgroundColor: '#fff',
              zIndex: 100,
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              paddingVertical: 10,
            }}>
            {generalIds.map((v, idx) => (
              <TouchableOpacity
                key={idx}
                style={{paddingVertical: 10, paddingHorizontal: 10}}
                onPress={() => {
                  navigation.navigate('ListPage', {
                    screen: 'ListPage',
                    name: 'General',
                    routeName: routeName,
                    cate1: '0',
                    ca_id: v,
                    location: propLocation ? propLocation : null,
                  });
                  setIsActiveGeneral(false);
                }}>
                <Text style={{fontFamily: SCDream4, fontSize: 12}}>
                  {v === '1'
                    ? '카달로그,브로슈어,팜플렛'
                    : v === '4'
                    ? '책자, 서적류'
                    : v === '5'
                    ? '전단,포스터,안내장'
                    : v === '6'
                    ? '스티커,라벨'
                    : v === '7'
                    ? '봉투,명함'
                    : v === '8'
                    ? '기타인쇄물 '
                    : null}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            paddingBottom: 0,
            paddingHorizontal: 10,
          }}
          onPress={toggleEtc}>
          <Text
            style={{
              paddingVertical: 12,
              fontFamily: cateName === 'Etc' ? SCDream5 : SCDream4,
              fontSize: 13,
              color:
                cateName === 'Etc' || (cateName === 'Etc' && isActiveEtc)
                  ? '#275696'
                  : isActiveEtc
                  ? '#111'
                  : '#B5B5B5',
            }}>
            기타인쇄
          </Text>
        </TouchableOpacity>

        {isActiveEtc && (
          <View
            style={{
              position: 'absolute',
              top: 40,
              right: '30%',
              backgroundColor: '#fff',
              zIndex: 100,
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              paddingVertical: 10,
            }}>
            {etcIds.map((v, idx) => (
              <TouchableOpacity
                key={idx}
                style={{paddingVertical: 10, paddingHorizontal: 10}}
                onPress={() => {
                  navigation.navigate('ListPage', {
                    screen: 'ListPage',
                    name: 'Etc',
                    routeName: routeName,
                    cate1: '2',
                    ca_id: v,
                    location: propLocation ? propLocation : null,
                  });
                  setIsActiveEtc(false);
                }}>
                <Text style={{fontFamily: SCDream4, fontSize: 12}}>
                  {v === '15'
                    ? '상품권/티켓'
                    : v === '16'
                    ? '초대장/카드'
                    : v === '17'
                    ? '비닐 BAG'
                    : v === '18'
                    ? '감압지'
                    : v === '19'
                    ? '기타'
                    : null}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
          placeholder="업체명을 입력하세요."
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
    </View>
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

export default CategoryNav;
