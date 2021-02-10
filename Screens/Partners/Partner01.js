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
import {TabView, SceneMap} from 'react-native-tab-view';

import axios from 'axios';
import qs from 'qs';

import Header from '../Common/Header';
import Footer from '../Common/Footer';
const partnersData = require('../Common/DummyData/Partners01/Partners');
const partnersPackageData = require('../Common/DummyData/Partners01/PartnersPackage');
const partnersGeneralData = require('../Common/DummyData/Partners01/PartnersGeneral');
const partnersEtcData = require('../Common/DummyData/Partners01/PartnersEtc');

const All = (props) => {
  const navigation = props.navigation;

  const [partners, setPartners] = React.useState([]);

  React.useEffect(() => {
    setPartners(partnersData.data);
  }, [partnersData]);

  const renderRow = ({item}) => {
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
              profileImg: item.profileImg,
              mobile: item.mobile,
            },
          })
        }
        style={{
          width: '49%',
          borderRadius: 5,
          marginBottom: 25,
          height: 220,
          backgroundColor: '#fff',
          marginRight: item.id % 2 === 0 ? 0 : '1%',
          marginLeft: item.id % 2 !== 0 ? 0 : '1%',
        }}>
        <View style={{marginBottom: 10}}>
          {item.profileImg.length > 0 ? (
            <Image
              source={{uri: `${item.profileImg[0]}`}}
              resizeMode="cover"
              style={{width: '100%', height: 130, borderRadius: 5}}
            />
          ) : item.profileImg.length === 0 || item.profileImg === null ? (
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
  );
};

const Package = (props) => {
  const navigation = props.navigation;

  const [packages, setPackages] = React.useState([]);

  React.useEffect(() => {
    setPackages(partnersPackageData.data);
  }, [partnersPackageData]);

  const renderRow = ({item}) => {
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
              profileImg: item.profileImg,
              mobile: item.mobile,
            },
          })
        }
        style={{
          width: '49%',
          borderRadius: 5,
          marginBottom: 25,
          height: 220,
          backgroundColor: '#fff',
          marginRight: item.id % 2 === 0 ? 0 : '1%',
          marginLeft: item.id % 2 !== 0 ? 0 : '1%',
        }}>
        <View style={{marginBottom: 10}}>
          {item.profileImg.length > 0 ? (
            <Image
              source={{uri: `${item.profileImg[0]}`}}
              resizeMode="cover"
              style={{width: '100%', height: 130, borderRadius: 5}}
            />
          ) : item.profileImg.length === 0 || item.profileImg === null ? (
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
    <FlatList
      data={packages}
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
  );
};

const General = (props) => {
  const navigation = props.navigation;

  const [general, setGeneral] = React.useState([]);

  React.useEffect(() => {
    setGeneral(partnersGeneralData.data);
  }, [partnersGeneralData]);

  const renderRow = ({item}) => {
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
              profileImg: item.profileImg,
              mobile: item.mobile,
            },
          })
        }
        style={{
          width: '49%',
          borderRadius: 5,
          marginBottom: 25,
          height: 220,
          backgroundColor: '#fff',
          marginRight: item.id % 2 === 0 ? 0 : '1%',
          marginLeft: item.id % 2 !== 0 ? 0 : '1%',
        }}>
        <View style={{marginBottom: 10}}>
          {item.profileImg.length > 0 ? (
            <Image
              source={{uri: `${item.profileImg[0]}`}}
              resizeMode="cover"
              style={{width: '100%', height: 130, borderRadius: 5}}
            />
          ) : item.profileImg.length === 0 || item.profileImg === null ? (
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
    <FlatList
      data={general}
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
  );
};

const Etc = (props) => {
  const navigation = props.navigation;

  const [etc, setEtc] = React.useState([]);

  React.useEffect(() => {
    setEtc(partnersEtcData.data);
  }, [partnersEtcData]);

  const renderRow = ({item}) => {
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
              profileImg: item.profileImg,
              mobile: item.mobile,
            },
          })
        }
        style={{
          width: '49%',
          borderRadius: 5,
          marginBottom: 25,
          height: 220,
          backgroundColor: '#fff',
          marginRight: item.id % 2 === 0 ? 0 : '1%',
          marginLeft: item.id % 2 !== 0 ? 0 : '1%',
        }}>
        <View style={{marginBottom: 10}}>
          {item.profileImg.length > 0 ? (
            <Image
              source={{uri: `${item.profileImg[0]}`}}
              resizeMode="cover"
              style={{width: '100%', height: 130, borderRadius: 5}}
            />
          ) : item.profileImg.length === 0 || item.profileImg === null ? (
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
    <FlatList
      data={etc}
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
  );
};

const Partner01 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const initialLayout = {width: Dimensions.get('window').width};

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'all', title: '전체'},
    {key: 'package', title: '패키지'},
    {key: 'general', title: '일반인쇄'},
    {key: 'etc', title: '기타인쇄'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'all':
        return <All navigation={navigation} />;
      case 'package':
        return <Package navigation={navigation} />;
      case 'general':
        return <General navigation={navigation} />;
      case 'etc':
        return <Etc navigation={navigation} />;
    }
  };

  const [tabIndex, setTabIndex] = React.useState('all');

  const TabBar = (props) => {
    const {tabIndex, jumpTo} = props;

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
              marginRight: 10,
              paddingBottom: 10,
              paddingRight: 10,
              // backgroundColor: '#ffaaee',
            }}
            onPress={async () => {
              await jumpTo('all');
              await setTabIndex('all');
            }}>
            <Text
              style={[
                tabIndex === 'all' && index === 0
                  ? styles.boldText
                  : styles.mediumText,
                {
                  fontFamily:
                    tabIndex === 'all' && index === 0 ? 'SCDream5' : 'SCDream4',
                  paddingVertical: 12,
                  fontSize: 15,
                  color:
                    tabIndex === 'all' && index === 0 ? '#275696' : '#B5B5B5',
                },
              ]}>
              전체
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              paddingBottom: 10,
              paddingHorizontal: 10,
              // backgroundColor: '#ffeeee',
            }}
            onPress={async () => {
              await jumpTo('package');
              await setTabIndex('package');
            }}>
            <Text
              style={[
                tabIndex === 'package' || index === 1
                  ? styles.boldText
                  : styles.mediumText,
                {
                  fontFamily:
                    tabIndex === 'package' || index === 1
                      ? 'SCDream5'
                      : 'SCDream4',
                  paddingVertical: 12,
                  fontSize: 15,
                  color:
                    tabIndex === 'package' || index === 1
                      ? '#275696'
                      : '#B5B5B5',
                },
              ]}>
              패키지
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
              paddingBottom: 10,
              paddingHorizontal: 10,
              // backgroundColor: '#ffeeaa',
            }}
            onPress={async () => {
              await jumpTo('general');
              await setTabIndex('general');
            }}>
            <Text
              style={[
                tabIndex === 'general' || index === 2
                  ? styles.boldText
                  : styles.mediumText,
                {
                  fontFamily:
                    tabIndex === 'general' || index === 2
                      ? 'SCDream5'
                      : 'SCDream4',
                  paddingVertical: 12,
                  fontSize: 15,
                  color:
                    tabIndex === 'general' || index === 2
                      ? '#275696'
                      : '#B5B5B5',
                },
              ]}>
              일반인쇄
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 10,

              // backgroundColor: '#ffeeaa',
            }}
            onPress={async () => {
              await jumpTo('etc');
              await setTabIndex('etc');
            }}>
            <Text
              style={[
                tabIndex === 'etc' || index === 3
                  ? styles.boldText
                  : styles.mediumText,
                {
                  fontFamily:
                    tabIndex === 'etc' || index === 3 ? 'SCDream5' : 'SCDream4',
                  paddingVertical: 12,
                  fontSize: 15,
                  color:
                    tabIndex === 'etc' || index === 3 ? '#275696' : '#B5B5B5',
                },
              ]}>
              기타인쇄
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
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

  const [isActiveLocation, setActiveLocation] = React.useState(false);
  const toggleLocation = () => {
    setActiveLocation(!isActiveLocation);
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      {/* <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}> */}
      <View
        style={{
          position: 'relative',
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
          backgroundColor: '#fff',
        }}>
        {isActiveLocation && (
          <TouchableOpacity
            onPress={toggleLocation}
            style={{
              position: 'absolute',
              top: 50,
              flex: 1,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              backgroundColor: 'rgba(0,0,0,0.6)',
              zIndex: 50,
            }}
          />
        )}
        <View
          style={{
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Partners');
              setActiveLocation(false);
            }}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 16,
                  marginBottom: 20,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              전체
            </Text>
          </TouchableOpacity>

          <View style={{position: 'relative'}}>
            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 16,
                  marginBottom: 20,
                  marginRight: 20,
                },
              ]}>
              성실파트너스
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

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Partners02');
              setActiveLocation(false);
            }}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 16,
                  marginBottom: 20,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              인기파트너스
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleLocation} activeOpacity={0.8}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 16,
                  marginBottom: 20,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              지역파트너스
            </Text>
          </TouchableOpacity>
          {isActiveLocation && (
            <View
              style={{
                position: 'absolute',
                top: 29,
                right: -20,
                width: 130,
                borderWidth: 1,
                borderColor: '#fff',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                backgroundColor: '#fff',
                zIndex: 100,
                paddingLeft: 7,
              }}>
              <View style={{paddingVertical: 5}}>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {location: 'seoul'});
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    서울
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {location: 'busan'});
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    부산
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {location: 'daegu'});
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    대구
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {location: 'incheon'});
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    인천
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {location: 'gwangju'});
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    광주
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {location: 'sejong'});
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    세종/대전/청주
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {location: 'ulsan'});
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    울산
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {location: 'gyeongi'});
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    경기
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {location: 'gangwon'});
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    강원
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {
                      location: 'choongcheong',
                    });
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    충청
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {location: 'jeonra'});
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    전라
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {
                      location: 'gyeongsang',
                    });
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    경상
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 10, paddingVertical: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Partners03', {location: 'jeju'});
                    setActiveLocation(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 14,
                      color: '#707070',
                    }}>
                    제주
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* TabView */}

        <TabView
          renderTabBar={(props) => (
            <TabBar
              {...props}
              navigation={navigation}
              setTabIndex={setTabIndex}
              tabIndex={tabIndex}
              onIndexChange={setIndex}
            />
          )}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          swipeEnabled={false}
        />

        {/* // TabView */}
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

export default Partner01;
