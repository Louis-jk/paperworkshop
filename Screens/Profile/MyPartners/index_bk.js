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
} from 'react-native';

import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      {/* <ScrollView style={styles.container} showsVerticalScrollIndicator={false}> */}
      <View style={[styles.container, {paddingHorizontal: 20, paddingTop: 20}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{position: 'relative'}}>
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
          <Text
            style={[
              styles.normalText,
              {
                fontSize: 15,
                marginRight: 20,
                color: '#BEBEBE',
              },
            ]}>
            기타인쇄
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5,
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{padding: 0, margin: 0, marginBottom: 200}}>
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
              <View style={{marginBottom: 10}}>
                <Image
                  source={require('../../../src/images/general/general03.jpg')}
                  resizeMode="cover"
                  style={{width: '100%', height: 130, borderRadius: 5}}
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
                  style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
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
              <View style={{marginBottom: 10}}>
                <Image
                  source={require('../../../src/images/general/general08.jpg')}
                  resizeMode="cover"
                  style={{width: '100%', height: 130, borderRadius: 5}}
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
                  style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
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
              <View style={{marginBottom: 10}}>
                <Image
                  source={require('../../../src/images/packages/package01.jpg')}
                  resizeMode="cover"
                  style={{width: '100%', height: 130, borderRadius: 5}}
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
                  style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
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
              <View style={{marginBottom: 10}}>
                <Image
                  source={require('../../../src/images/packages/package06.jpg')}
                  resizeMode="cover"
                  style={{width: '100%', height: 130, borderRadius: 5}}
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
                  style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
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
              <View style={{marginBottom: 10}}>
                <Image
                  source={require('../../../src/images/general/general07.jpg')}
                  resizeMode="cover"
                  style={{width: '100%', height: 130, borderRadius: 5}}
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
                  {/* <View
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
                  </View> */}
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
                  삼보인쇄
                </Text>

                <Text
                  style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
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
              <View style={{marginBottom: 10}}>
                <Image
                  source={require('../../../src/images/p08.jpg')}
                  resizeMode="cover"
                  style={{width: '100%', height: 130, borderRadius: 5}}
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
                  style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
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
              <View style={{marginBottom: 10}}>
                <Image
                  source={require('../../../src/images/etc/etc01.jpg')}
                  resizeMode="cover"
                  style={{width: '100%', height: 130, borderRadius: 5}}
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
                      backgroundColor: '#ACACAC',
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
                      기타인쇄
                    </Text>
                  </View>
                  {/* <View
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
                  </View> */}
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
                  style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
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
              <View style={{marginBottom: 10}}>
                <Image
                  source={require('../../../src/images/packages/package08.jpg')}
                  resizeMode="cover"
                  style={{width: '100%', height: 130, borderRadius: 5}}
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
                  style={[styles.normalText, {fontSize: 13, lineHeight: 18}]}
                  numberOfLines={2}>
                  카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 파트너스 리스트(list) */}
          </View>
        </ScrollView>
      </View>

      <Footer navigation={navigation} />
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

export default index;
