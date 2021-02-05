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
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Header from '../Common/Header';
import Footer from '../Common/Footer';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  // 탭 - 전체/패키지/일반인쇄/기타인쇄물 start

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ borderRadius: 20, height: 120 }}>
        <Image
          key={index}
          source={item.image}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 7,
          }}
        />
      </View>
    );
  };

  // 파트너스 탭 start
  const FirstRoute = (props) => (
    <View>
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
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
              삼보인쇄
            </Text>
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
          </View>
          <Text style={[styles.normalText, { fontSize: 13, lineHeight: 20 }]} numberOfLines={2}>
            카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p07.jpg')}
            resizeMode="cover"
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
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
              미래엔인쇄서비스
            </Text>
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
          </View>
          <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
            대한민국 교육출판 No.1 다양한 지식 콘텐츠로 70년의 역사를 넘어 최고를 향해 달려...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p06.jpg')}
            resizeMode="cover"
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
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
              동천문화인쇄
            </Text>
            <View
              style={{
                backgroundColor: '#275696',
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 11,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}>
                일반인쇄
              </Text>
            </View>
          </View>
          <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
            국내 유일 10,000 디지털을 인쇄하는 회사입니다. 가격은 DOWN, 퀄리티는 UP시키...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p05.jpg')}
            resizeMode="cover"
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
    </View>
  );

  const SecondRoute = (props) => (
    <View>
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
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
              동천문화인쇄
            </Text>
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
          </View>
          <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
            국내 유일 10,000 디지털을 인쇄하는 회사입니다. 가격은 DOWN, 퀄리티는 UP시키...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p05.jpg')}
            resizeMode="cover"
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
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
              삼보인쇄
            </Text>
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
          </View>
          <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
            카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p07.jpg')}
            resizeMode="cover"
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
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
              미래엔인쇄서비스
            </Text>
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
          </View>
          <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
            대한민국 교육출판 No.1 다양한 지식 콘텐츠로 70년의 역사를 넘어 최고를 향해 달려...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p06.jpg')}
            resizeMode="cover"
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
    </View>
  );

  const ThirdRoute = (props) => (
    <View>
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
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
              미래엔인쇄서비스
            </Text>
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
          </View>
          <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
            대한민국 교육출판 No.1 다양한 지식 콘텐츠로 70년의 역사를 넘어 최고를 향해 달려...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p06.jpg')}
            resizeMode="cover"
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
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
              동천문화인쇄
            </Text>
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
          </View>
          <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
            국내 유일 10,000 디지털을 인쇄하는 회사입니다. 가격은 DOWN, 퀄리티는 UP시키...
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p05.jpg')}
            resizeMode="cover"
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
      {/* 파트너스 리스트(list) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PartnersDetail')}
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
              삼보인쇄
            </Text>
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
          </View>
          <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
            카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/images/p07.jpg')}
            resizeMode="cover"
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        </View>
      </TouchableOpacity>
      {/* // 파트너스 리스트(list) */}
    </View>
  );

  const initialLayout = { width: Dimensions.get('window').width };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '성실파트너스' },
    { key: 'second', title: '인기파트너스' },
    { key: 'third', title: '지역파트너스' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      case 'third':
        return <ThirdRoute />;
    }
  };

  const [tabIndex, setTabIndex] = React.useState('first');

  const TabBar = (props) => {
    const { tabIndex, jumpTo } = props;

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
              await jumpTo('first');
              await setTabIndex('first');
            }}>
            <Text
              style={[
                tabIndex === 'first' && index === 0 ? styles.boldText : styles.mediumText,
                {
                  paddingVertical: 12,
                  fontSize: 14,
                  color: tabIndex === 'first' && index === 0 ? '#275696' : '#B5B5B5',
                },
              ]}>
              성실파트너스
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
              await jumpTo('second');
              await setTabIndex('second');
            }}>
            <Text
              style={[
                tabIndex === 'second' || index === 1 ? styles.boldText : styles.mediumText,
                {
                  paddingVertical: 12,
                  fontSize: 14,
                  color: tabIndex === 'second' || index === 1 ? '#275696' : '#B5B5B5',
                },
              ]}>
              인기파트너스
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
              await jumpTo('third');
              await setTabIndex('third');
            }}>
            <Text
              style={[
                tabIndex === 'third' || index === 2 ? styles.boldText : styles.mediumText,
                {
                  paddingVertical: 12,
                  fontSize: 14,
                  color: tabIndex === 'third' || index === 2 ? '#275696' : '#B5B5B5',
                },
              ]}>
              지역파트너스
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // 탭 - 전체/패키지/일반인쇄/기타인쇄물 end

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ position: 'relative' }}>
              <Text
                style={[
                  styles.boldText,
                  {
                    fontSize: 16,
                    marginBottom: 20,
                    marginRight: 23,
                  },
                ]}>
                전체
              </Text>
              <View
                style={{
                  position: 'absolute',
                  top: -1,
                  right: 15,
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: '#275696',
                }}
              />
            </View>
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text
              style={[
                styles.boldText,
                {
                  fontSize: 14,
                  marginRight: 27,
                  color: '#275696',
                },
              ]}>
              전체
            </Text>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
                  marginRight: 27,
                  color: '#BEBEBE',
                },
              ]}>
              패키지
            </Text>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
                  marginRight: 20,
                  color: '#BEBEBE',
                },
              ]}>
              일반인쇄
            </Text>
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
              style={[styles.normalText, { width: '80%' }]}
            />
            <TouchableOpacity>
              <Image
                source={require('../../src/assets/top_seach.png')}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>

          {/* TabView */}
          <View style={{ paddingHorizontal: 20 }}>
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
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              swipeEnabled={false}
            />
          </View>
          {/* // TabView */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginVertical: 5,
            }}>
            {/* 파트너스 리스트(list) */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('PartnersDetail')}
              style={{
                width: '50%',
                borderRadius: 5,
                marginBottom: 20,
                paddingRight: 5,
              }}>
              <View style={{ marginBottom: 10 }}>
                <Image
                  source={require('../../src/images/p012.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
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
                    marginBottom: 5,
                  }}>
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
                  삼보인쇄
                </Text>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 파트너스 리스트(list) */}
            {/* 파트너스 리스트(list) */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('PartnersDetail')}
              style={{
                width: '50%',
                borderRadius: 5,
                marginBottom: 20,
                paddingLeft: 5,
              }}>
              <View style={{ marginBottom: 10 }}>
                <Image
                  source={require('../../src/images/p08.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
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
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#275696',
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
                      일반인쇄
                    </Text>
                  </View>
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
                  애드프린트
                </Text>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 파트너스 리스트(list) */}
            {/* 파트너스 리스트(list) */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('PartnersDetail')}
              style={{
                width: '50%',
                borderRadius: 5,
                marginBottom: 20,
                paddingRight: 5,
              }}>
              <View style={{ marginBottom: 10 }}>
                <Image
                  source={require('../../src/images/p05.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
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
                    marginBottom: 5,
                  }}>
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
                  동천문화인쇄
                </Text>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 파트너스 리스트(list) */}
            {/* 파트너스 리스트(list) */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('PartnersDetail')}
              style={{
                width: '50%',
                borderRadius: 5,
                marginBottom: 20,
                paddingLeft: 5,
              }}>
              <View style={{ marginBottom: 10 }}>
                <Image
                  source={require('../../src/images/p06.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
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
                    marginBottom: 5,
                  }}>
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
                  미래엔인쇄서비스
                </Text>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 파트너스 리스트(list) */}
          </View>
        </View>

        <Footer navigation={navigation} />
      </ScrollView>
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
