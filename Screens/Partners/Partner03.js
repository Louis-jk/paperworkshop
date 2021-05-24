import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Alert,
  Keyboard
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import Header from '../Common/Header';

import PartnersNav from './PartnersNav';
import All from './Components/Tabs/All';
import Package from './Components/Tabs/Package';
import General from './Components/Tabs/General';
import Etc from './Components/Tabs/Etc';
import PartnersApi from '../../src/api/Partners';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const Partner03 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const cateName = props.route.params.name;
  const location = props.route.params.location;

  const [partners, setPartners] = React.useState([]);
  const [pPackage, setPpackages] = React.useState([]);
  const [pGeneral, setPgeneral] = React.useState([]);
  const [pEtc, setPetc] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // 지역 파트너스 지역 리스트 출력부분 toggle
  const [isActiveLocation, setActiveLocation] = React.useState(false);
  const toggleLocation = () => {
    setActiveLocation(!isActiveLocation);
    Keyboard.dismiss();
  };

  // 업체명 검색 input 선택시 실행 메소드
  const hiddenLocationHandler = () => {
    setActiveLocation(false);
  };

  const getPartnersAll = (payload) => {
    setIsLoading(true);

    PartnersApi.getPartners(null, null, null, location, payload)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setPartners(res.data.item);
          setIsLoading(false);
        } else if (res.data.result === '1' && res.data.count === 0) {
          setPartners(null);
          setIsLoading(false);
        } else {
          setPartners(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  const getPartnersPackage = (payload) => {
    setIsLoading(true);

    PartnersApi.getPartners(null, '1', null, location, payload)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setPpackages(res.data.item);
          setIsLoading(false);
        } else {
          setPpackages(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  const getPartnersGeneral = (payload) => {
    setIsLoading(true);

    PartnersApi.getPartners(null, '0', null, location, payload)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setPgeneral(res.data.item);
          setIsLoading(false);
        } else {
          setPgeneral(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  const getPartnersEtc = (payload) => {
    setIsLoading(true);

    PartnersApi.getPartners(null, '2', null, location, payload)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setPetc(res.data.item);
          setIsLoading(false);
        } else {
          setPetc(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  React.useEffect(() => {
    getPartnersAll(null);
    getPartnersPackage(null);
    getPartnersGeneral(null);
    getPartnersEtc(null);
  }, [location]);

  const allSearchHandler = (keyword) => {
    getPartnersAll(keyword);
  }

  const packageSearchHandler = (keyword) => {
    getPartnersPackage(keyword);
  }

  const generalSearchHandler = (keyword) => {
    getPartnersGeneral(keyword);
  }

  const etcSearchHandler = (keyword) => {
    getPartnersEtc(keyword);
  }

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
        return <All navigation={navigation} partners={partners} searchHandler={allSearchHandler} hiddenLocationHandler={hiddenLocationHandler} />;
      case 'package':
        return <Package navigation={navigation} partners={pPackage} searchHandler={packageSearchHandler} hiddenLocationHandler={hiddenLocationHandler} />;
      case 'general':
        return <General navigation={navigation} partners={pGeneral} searchHandler={generalSearchHandler} hiddenLocationHandler={hiddenLocationHandler} />;
      case 'etc':
        return <Etc navigation={navigation} partners={pEtc} searchHandler={etcSearchHandler} hiddenLocationHandler={hiddenLocationHandler} />;
    }
  };

  const [tabIndex, setTabIndex] = React.useState('all');

  const TabBar = (props) => {
    const {tabIndex, jumpTo} = props;

    return (
      <View style={{paddingHorizontal: 20}}>
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
            onPress={async () => {
              await jumpTo('all');
              await setTabIndex('all');
              hiddenLocationHandler();
            }}>
            <Text
              style={[
                tabIndex === 'all' && index === 0
                  ? styles.boldText
                  : styles.mediumText,
                {
                  fontFamily:
                    tabIndex === 'all' && index === 0 ? SCDream5 : SCDream4,
                  paddingVertical: 12,
                  fontSize: 13,
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
              marginRight: 5,
              paddingBottom: 0,
              paddingHorizontal: 10,
              // backgroundColor: '#ffeeee',
            }}
            onPress={async () => {
              await jumpTo('package');
              await setTabIndex('package');
              hiddenLocationHandler();
            }}>
            <Text
              style={[
                tabIndex === 'package' || index === 1
                  ? styles.boldText
                  : styles.mediumText,
                {
                  fontFamily:
                    tabIndex === 'package' || index === 1
                      ? SCDream5
                      : SCDream4,
                  paddingVertical: 12,
                  fontSize: 13,
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
              marginRight: 5,
              paddingBottom: 0,
              paddingHorizontal: 10,
              // backgroundColor: '#ffeeaa',
            }}
            onPress={async () => {
              await jumpTo('general');
              await setTabIndex('general');
              hiddenLocationHandler();
            }}>
            <Text
              style={[
                tabIndex === 'general' || index === 2
                  ? styles.boldText
                  : styles.mediumText,
                {
                  fontFamily:
                    tabIndex === 'general' || index === 2
                      ? SCDream5
                      : SCDream4,
                  paddingVertical: 12,
                  fontSize: 13,
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
              paddingBottom: 0,
              paddingHorizontal: 10,
              // backgroundColor: '#ffeeaa',
            }}
            onPress={async () => {
              await jumpTo('etc');
              await setTabIndex('etc');
              hiddenLocationHandler();
            }}>
            <Text
              style={[
                tabIndex === 'etc' || index === 3
                  ? styles.boldText
                  : styles.mediumText,
                {
                  fontFamily:
                    tabIndex === 'etc' || index === 3 ? SCDream5 : SCDream4,
                  paddingVertical: 12,
                  fontSize: 13,
                  color:
                    tabIndex === 'etc' || index === 3 ? '#275696' : '#B5B5B5',
                },
              ]}>
              기타인쇄
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            flex: 1,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            elevation: 0,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <ActivityIndicator size="large" color="#275696" />
        </View>
      )}
      <View
        style={{
          position: 'relative',
          flex: 1,

          paddingTop: 20,
          backgroundColor: '#fff',
          // paddingBottom: 10,
        }}>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <PartnersNav navigation={navigation} routeName={routeName} toggleLocation={toggleLocation} isActiveLocation={isActiveLocation} setActiveLocation={setActiveLocation} />
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
          style={{zIndex:-1}}
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
    fontFamily: SCDream4,
  },
  mediumText: {
    fontFamily: SCDream5,
  },
  boldText: {
    fontFamily: SCDream6,
  },
});

export default Partner03;
