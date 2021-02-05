import React from 'react';
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

import Header from '../Common/Header';
import Footer from '../Common/Footer';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={{ position: 'relative' }}>
              <Text
                style={[
                  styles.mediumText,
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
                  right: 16,
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: '#275696',
                }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('GalleryPackage')}>
              <Text
                style={[
                  styles.normalText,
                  {
                    fontSize: 16,
                    fontWeight: '400',
                    letterSpacing: -2,
                    marginBottom: 20,
                    marginRight: 20,
                    color: '#707070',
                  },
                ]}>
                패키지
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('GalleryGeneral')}>
              <Text
                style={[
                  styles.normalText,
                  {
                    fontSize: 16,
                    fontWeight: '400',
                    letterSpacing: -2,
                    marginBottom: 20,
                    marginRight: 20,
                    color: '#707070',
                  },
                ]}>
                일반인쇄
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('GalleryEtc')}>
              <Text
                style={[
                  styles.normalText,
                  {
                    fontSize: 16,
                    fontWeight: '400',
                    letterSpacing: -2,
                    marginBottom: 20,
                    color: '#707070',
                  },
                ]}>
                기타 인쇄물
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
              placeholder="키워드를 입력하세요."
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

          {/* 파트너스 형식 리스트 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: 5,
            }}>
            {/* 갤러리 리스트(list) 01 */}
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
                  source={require('../../src/images/general/general01.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    삼보인쇄
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [패키지] 병원/의약품/건강/케어/헬스 관련패키지
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 01 */}
            {/* 갤러리 리스트(list) 02 */}
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
                  source={require('../../src/images/general/general02.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    동천문화인쇄
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  식품, 박스, 패키지 디자인 전문입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 02 */}
            {/* 갤러리 리스트(list) 01 */}
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
                  source={require('../../src/images/packages/package01.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    삼보인쇄
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [패키지] 병원/의약품/건강/케어/헬스 관련패키지
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 01 */}
            {/* 갤러리 리스트(list) 02 */}
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
                  source={require('../../src/images/packages/package02.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    동천문화인쇄
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  식품, 박스, 패키지 디자인 전문입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 02 */}
            {/* 갤러리 리스트(list) 01 */}
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
                  source={require('../../src/images/etc/etc01.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    삼보인쇄
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [패키지] 병원/의약품/건강/케어/헬스 관련패키지
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 01 */}
            {/* 갤러리 리스트(list) 02 */}
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
                  source={require('../../src/images/etc/etc02.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    동천문화인쇄
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  식품, 박스, 패키지 디자인 전문입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 02 */}
            {/* 갤러리 리스트(list) 03 */}
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
                  source={require('../../src/images/general/general03.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    미래엔인쇄서비스
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [일반인쇄] 설 선물세트 / 선물 박스 패키지 디자인
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 03 */}
            {/* 갤러리 리스트(list) 04 */}
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
                  source={require('../../src/images/general/general04.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    성원애드피아
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  명함, 판촉물, 패키지 인쇄몰입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 04 */}
            {/* 갤러리 리스트(list) 01 */}
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
                  source={require('../../src/images/p11.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    삼보인쇄
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [패키지] 병원/의약품/건강/케어/헬스 관련패키지
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 01 */}
            {/* 갤러리 리스트(list) 02 */}
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
                  source={require('../../src/images/p13.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    동천문화인쇄
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  식품, 박스, 패키지 디자인 전문입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 02 */}

            {/* 갤러리 리스트(list) 03 */}
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
                  source={require('../../src/images/packages/package03.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    미래엔인쇄서비스
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [일반인쇄] 설 선물세트 / 선물 박스 패키지 디자인
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 03 */}
            {/* 갤러리 리스트(list) 04 */}
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
                  source={require('../../src/images/packages/package04.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    성원애드피아
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  명함, 판촉물, 패키지 인쇄몰입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 04 */}

            {/* 갤러리 리스트(list) 03 */}
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
                  source={require('../../src/images/etc/etc03.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    미래엔인쇄서비스
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [일반인쇄] 설 선물세트 / 선물 박스 패키지 디자인
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 03 */}
            {/* 갤러리 리스트(list) 04 */}
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
                  source={require('../../src/images/etc/etc04.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    성원애드피아
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  명함, 판촉물, 패키지 인쇄몰입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 04 */}

            {/* NEW 없는 카피본 */}
            {/* 갤러리 리스트(list) 01 */}
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
                  source={require('../../src/images/etc/etc05.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    삼보인쇄
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [패키지] 병원/의약품/건강/케어/헬스 관련패키지
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 01 */}
            {/* 갤러리 리스트(list) 02 */}
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
                  source={require('../../src/images/etc/etc06.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    동천문화인쇄
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  식품, 박스, 패키지 디자인 전문입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 02 */}
            {/* 갤러리 리스트(list) 01 */}
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
                  source={require('../../src/images/packages/package05.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    삼보인쇄
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [패키지] 병원/의약품/건강/케어/헬스 관련패키지
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 01 */}
            {/* 갤러리 리스트(list) 02 */}
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
                  source={require('../../src/images/packages/package06.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    동천문화인쇄
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  식품, 박스, 패키지 디자인 전문입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 02 */}
            {/* 갤러리 리스트(list) 03 */}
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
                  source={require('../../src/images/packages/package07.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    미래엔인쇄서비스
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [일반인쇄] 설 선물세트 / 선물 박스 패키지 디자인
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 03 */}
            {/* 갤러리 리스트(list) 04 */}
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
                  source={require('../../src/images/packages/package08.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    성원애드피아
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  명함, 판촉물, 패키지 인쇄몰입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 04 */}
            {/* 갤러리 리스트(list) 03 */}
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
                  source={require('../../src/images/etc/etc07.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    미래엔인쇄서비스
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [일반인쇄] 설 선물세트 / 선물 박스 패키지 디자인
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 03 */}
            {/* 갤러리 리스트(list) 04 */}
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
                  source={require('../../src/images/etc/etc08.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    성원애드피아
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  명함, 판촉물, 패키지 인쇄몰입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 04 */}
            {/* 갤러리 리스트(list) 01 */}
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
                  source={require('../../src/images/general/general05.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    삼보인쇄
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [패키지] 병원/의약품/건강/케어/헬스 관련패키지
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 01 */}
            {/* 갤러리 리스트(list) 02 */}
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
                  source={require('../../src/images/general/general06.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    동천문화인쇄
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  식품, 박스, 패키지 디자인 전문입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 02 */}
            {/* 갤러리 리스트(list) 03 */}
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
                  source={require('../../src/images/general/general07.jpg')}
                  resizeMode="cover"
                  style={{ width: '100%', height: 130, borderRadius: 5 }}
                />
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    미래엔인쇄서비스
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>

                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  [일반인쇄] 설 선물세트 / 선물 박스 패키지 디자인
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 03 */}
            {/* 갤러리 리스트(list) 04 */}
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
                  source={require('../../src/images/general/general08.jpg')}
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
                  <Text
                    style={[
                      styles.boldText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}>
                    성원애드피아
                  </Text>
                  {/* <Text
                    style={[
                      styles.normalText,
                      {
                        color: '#275696',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      },
                    ]}>
                    NEW
                  </Text> */}
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  명함, 판촉물, 패키지 인쇄몰입니다.
                </Text>
              </View>
            </TouchableOpacity>
            {/* // 갤러리 리스트(list) 04 */}

            {/* // NEW 없는 카피본 */}
          </View>

          {/* 파트너스 형식 리스트 */}
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
