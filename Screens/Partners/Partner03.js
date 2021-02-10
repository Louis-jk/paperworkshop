import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {TabView} from 'react-native-tab-view';

import axios from 'axios';
import qs from 'qs';

import Header from '../Common/Header';
import All from './All';
import Package from './Packages';
import General from './General';
import Etc from './Etc';

const partnersDataSeoul = require('../Common/DummyData/Partners03/Seoul/Partners');
const partnersPackageDataSeoul = require('../Common/DummyData/Partners03/Seoul/PartnersPackage');
const partnersGeneralDataSeoul = require('../Common/DummyData/Partners03/Seoul/PartnersGeneral');
const partnersEtcDataSeoul = require('../Common/DummyData/Partners03/Seoul/PartnersEtc');
const partnersDataBusan = require('../Common/DummyData/Partners03/Busan/Partners');
const partnersDataDaegu = require('../Common/DummyData/Partners03/Daegu/Partners');
const partnersDataIncheon = require('../Common/DummyData/Partners03/Incheon/Partners');
const partnersDataGwangju = require('../Common/DummyData/Partners03/Gwangju/Partners');
const partnersDataSejong = require('../Common/DummyData/Partners03/Sejong/Partners');
const partnersDataUlsan = require('../Common/DummyData/Partners03/Ulsan/Partners');
const partnersDataGyeongi = require('../Common/DummyData/Partners03/Gyeongi/Partners');
const partnersDataGangwon = require('../Common/DummyData/Partners03/Gangwon/Partners');
const partnersDataChoongcheong = require('../Common/DummyData/Partners03/Choongcheong/Partners');
const partnersDataJeonra = require('../Common/DummyData/Partners03/Jeonra/Partners');
const partnersDataGyeongsang = require('../Common/DummyData/Partners03/Gyeongsang/Partners');
const partnersDataJeju = require('../Common/DummyData/Partners03/Jeju/Partners');

const partnersAllData = require('../Common/DummyData/Partners02/Partners');
// const partnersPackageData = require('../Common/DummyData/Partners02/PartnersPackage');
// const partnersGeneralData = require('../Common/DummyData/Partners02/PartnersGeneral');
// const partnersEtcData = require('../Common/DummyData/Partners02/PartnersEtc');

const Partner03 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const location = props.route.params.location;

  const [partners, setPartners] = React.useState([]);
  const [partnersP, setPartnersP] = React.useState([]);
  const [partnersG, setPartnersG] = React.useState([]);
  const [partnersE, setPartnersE] = React.useState([]);

  React.useEffect(() => {
    if (location === 'seoul') {
      setPartners(partnersDataSeoul.data);
      setPartnersP(partnersPackageDataSeoul.data);
      setPartnersG(partnersGeneralDataSeoul.data);
      setPartnersE(partnersEtcDataSeoul.data);
    } else if (location === 'busan') {
      setPartners(partnersDataBusan.data);
    } else if (location === 'daegu') {
      setPartners(partnersDataDaegu.data);
    } else if (location === 'incheon') {
      setPartners(partnersDataIncheon.data);
    } else if (location === 'gwangju') {
      setPartners(partnersDataGwangju.data);
    } else if (location === 'sejong') {
      setPartners(partnersDataSejong.data);
    } else if (location === 'ulsan') {
      setPartners(partnersDataUlsan.data);
    } else if (location === 'gyeongi') {
      setPartners(partnersDataGyeongi.data);
    } else if (location === 'gangwon') {
      setPartners(partnersDataGangwon.data);
    } else if (location === 'choongcheong') {
      setPartners(partnersDataChoongcheong.data);
    } else if (location === 'jeonra') {
      setPartners(partnersDataJeonra.data);
    } else if (location === 'gyeongsang') {
      setPartners(partnersDataGyeongsang.data);
    } else {
      setPartners(partnersDataJeju.data);
    }
  }, [location]);

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
        return <All navigation={navigation} partners={partners} />;
      case 'package':
        return <Package navigation={navigation} partners={partnersP} />;
      case 'general':
        return <General navigation={navigation} partners={partnersG} />;
      case 'etc':
        return <Etc navigation={navigation} partners={partnersE} />;
    }
  };

  const [tabIndex, setTabIndex] = React.useState('all');

  const TabBar = (props) => {
    const {tabIndex, jumpTo} = props;

    return (
      <>
        <View>
          {/* <View
            style={{
              position: 'absolute',
              flex: 1,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 1,
            }}
          /> */}
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
                      tabIndex === 'all' && index === 0
                        ? 'SCDream5'
                        : 'SCDream4',
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
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 20,
                paddingBottom: 10,
                paddingHorizontal: 10,
                zIndex: 100,
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

              <View
                style={{
                  position: 'absolute',
                  top: 29,
                  left: 0,
                  width: 180,
                  borderWidth: 1,
                  borderColor: '#fff',
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  backgroundColor: '#fff',
                  zIndex: 100,
                  paddingLeft: 7,
                }}>
                <TouchableOpacity
                  hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                  style={{
                    paddingVertical: 10,
                  }}
                  onPress={() => console.log('hey')}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'SCDream4',
                      paddingVertical: 10,
                      backgroundColor: '#ffaeea',
                    }}>
                    카달로그,브로슈어,팜플렛
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>책자, 서적류</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>전단,포스터,안내장</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>스티커,라벨</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>봉투, 명함</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>기타인쇄물</Text>
                </TouchableOpacity>
              </View>
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
                      tabIndex === 'etc' || index === 3
                        ? 'SCDream5'
                        : 'SCDream4',
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
      </>
    );
  };

  const [isActiveLocation, setActiveLocation] = React.useState(false);
  const toggleLocation = () => {
    setActiveLocation(!isActiveLocation);
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

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Partners01');
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
              성실파트너스
            </Text>
          </TouchableOpacity>

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

          <TouchableOpacity
            onPress={toggleLocation}
            activeOpacity={0.8}
            style={{position: 'relative'}}>
            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 16,
                  marginBottom: 20,
                  marginRight: 20,
                },
              ]}>
              지역파트너스
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

export default Partner03;
