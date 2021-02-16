import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {TabView} from 'react-native-tab-view';

import axios from 'axios';
import qs from 'qs';

import Header from '../Common/Header';
import All from './All';
import Package from './Packages';
import General from './General';
import Etc from './Etc';

import CategoryNav from './CategoryNav';

const Partner03 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const location = props.route.params.location;

  const [isLoading, setIsLoading] = React.useState(false);

  const [partners, setPartners] = React.useState([]);
  const [partnersP, setPartnersP] = React.useState([]);
  const [partnersG, setPartnersG] = React.useState([]);
  const [partnersE, setPartnersE] = React.useState([]);

  const [allPartners, setAllPartners] = React.useState([]);
  const [localPackages, setLocalPackages] = React.useState(null);
  const [localGeneral, setLocalGeneral] = React.useState(null);

  const [isActivePackages, setIsActivePackages] = React.useState(false);
  const togglePackages = () => {
    setIsActivePackages(!isActivePackages);
  };

  const getLocalPartners = () => {
    axios({
      method: 'post',
      url: 'http://dmonster1506.cafe24.com/json/proc_json.php',
      data: qs.stringify({
        method: 'proc_partner_list',
        location,
      }),
    })
      .then((res) => {
        setIsLoading(true);
        if (res.data.result === '1') {
          setAllPartners(res.data.item);
          setIsLoading(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const getLocalPackage = (cate1, ca_id) => {
    axios({
      method: 'post',
      url: 'http://dmonster1506.cafe24.com/json/proc_json.php',
      data: qs.stringify({
        method: 'proc_partner_list',
        location,
        cate1,
        ca_id,
      }),
    })
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setLocalPackages(res.data.item);
        } else {
          setLocalPackages(null);
        }
      })
      .catch((err) => console.error(err));
  };

  const getLocalGeneral = (cate1, ca_id) => {
    axios({
      method: 'post',
      url: 'http://dmonster1506.cafe24.com/json/proc_json.php',
      data: qs.stringify({
        method: 'proc_partner_list',
        location,
        cate1,
        ca_id,
      }),
    })
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setLocalPackages(res.data.item);
        } else {
          setLocalPackages(null);
        }
      })
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    getLocalPartners();
    getLocalPackage();

    // return () => {
    //   getLocalPartners();
    //   getLocalPackage();
    // };
  }, [location]);

  // console.log('allPartners', allPartners);

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
        return (
          <All
            navigation={navigation}
            partners={allPartners}
            location={location}
          />
        );
      case 'package':
        return (
          <Package
            navigation={navigation}
            partners={localPackages}
            location={location}
          />
        );
      case 'general':
        return (
          <General
            navigation={navigation}
            partners={partnersG}
            location={location}
          />
        );
      case 'etc':
        return (
          <Etc
            navigation={navigation}
            partners={partnersE}
            location={location}
          />
        );
    }
  };

  const [tabIndex, setTabIndex] = React.useState('all');

  const TabBar = (props) => {
    const {tabIndex, jumpTo} = props;

    return (
      <>
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
              // onPress={async () => {
              //   await getLocalCate1('1');
              //   // await jumpTo('package');
              //   // await setTabIndex('package');
              // }}
              onPress={togglePackages}>
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

            {isActivePackages && (
              <View
                style={{
                  position: 'absolute',
                  top: 40,
                  left: '12%',
                  backgroundColor: '#fff',
                  zIndex: 100,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingVertical: 10,
                }}>
                <TouchableOpacity
                  style={{paddingVertical: 10, paddingHorizontal: 10}}
                  onPress={async () => {
                    await getLocalPackage('1', '9');
                    await setIsActivePackages(false);
                    await jumpTo('package');
                    await setTabIndex('package');
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>칼라박스</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingVertical: 10, paddingHorizontal: 10}}
                  onPress={async () => {
                    await getLocalPackage('1', '10');
                    await setIsActivePackages(false);
                    await jumpTo('package');
                    await setTabIndex('package');
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>골판지박스</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingVertical: 10, paddingHorizontal: 10}}
                  onPress={async () => {
                    await getLocalPackage('1', '11');
                    await setIsActivePackages(false);
                    await jumpTo('package');
                    await setTabIndex('package');
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>합지골판지박스</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingVertical: 10, paddingHorizontal: 10}}
                  onPress={async () => {
                    await getLocalPackage('1', '12');
                    await setIsActivePackages(false);
                    await jumpTo('package');
                    await setTabIndex('package');
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>싸바리박스</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingVertical: 10, paddingHorizontal: 10}}
                  onPress={async () => {
                    await getLocalPackage('1', '13');
                    await setIsActivePackages(false);
                    await jumpTo('package');
                    await setTabIndex('package');
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>식품박스</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingVertical: 10, paddingHorizontal: 10}}
                  onPress={async () => {
                    await getLocalPackage('1', '14');
                    await setIsActivePackages(false);
                    await jumpTo('package');
                    await setTabIndex('package');
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>쇼핑백</Text>
                </TouchableOpacity>
              </View>
            )}

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
        <CategoryNav navigation={navigation} />
        {/* TabView */}

        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#275696" />
          </View>
        ) : (
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
        )}
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
