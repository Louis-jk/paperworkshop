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
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useSelector} from 'react-redux';

import Header from '../../Common/Header';

import PartnersNav from './PartnersNav';
import All from './Components/Tabs/All';
import Package from './Components/Tabs/Package';
import General from './Components/Tabs/General';
import Etc from './Components/Tabs/Etc';
import PartnersApi from '../../../src/api/Partners';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  // const cateName = props.route.params.name;

  console.log('MyPartners props', props);

  const {mb_id} = useSelector((state) => state.UserInfoReducer); // 내 아이디 가져오기(redux)

  console.log('routeName', routeName);
  // console.log('favor', favor);

  const [partners, setPartners] = React.useState([]);
  const [pPackage, setPpackages] = React.useState([]);
  const [pGeneral, setPgeneral] = React.useState([]);
  const [pEtc, setPetc] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getPartnersAll = () => {
    setIsLoading(true);

    PartnersApi.getMyPartners(mb_id, null, null, null, null)
      .then((res) => {
        console.log('getPartnersAll', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setPartners(res.data.item);
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

  const getPartnersPackage = () => {
    setIsLoading(true);

    PartnersApi.getMyPartners(mb_id, null, '1', null, null)
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

  const getPartnersGeneral = () => {
    setIsLoading(true);

    PartnersApi.getMyPartners(mb_id, null, '0', null, null)
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

  const getPartnersEtc = () => {
    setIsLoading(true);

    PartnersApi.getMyPartners(mb_id, null, '2', null, null)
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
    const unsubscribe = navigation.addListener('focus', () => {
      getPartnersAll();
      getPartnersPackage();
      getPartnersGeneral();
      getPartnersEtc();
    });

    return unsubscribe;
  }, [navigation]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       getPartnersAll();
  //       getPartnersPackage();
  //       getPartnersGeneral();
  //       getPartnersEtc();
  //     });

  //     return () => unsubscribe();
  //   }, [partners])
  // );

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
        return <Package navigation={navigation} partners={pPackage} />;
      case 'general':
        return <General navigation={navigation} partners={pGeneral} />;
      case 'etc':
        return <Etc navigation={navigation} partners={pEtc} />;
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
                  fontSize: 13,
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
              source={require('../../../src/assets/top_seach.png')}
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
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
      {!isLoading && (
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
            <PartnersNav navigation={navigation} routeName={routeName} />
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
      )}

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
