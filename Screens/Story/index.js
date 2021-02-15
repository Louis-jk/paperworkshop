import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';

import Header from '../Common/Header';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [visibleStep01, setVisibleStep01] = React.useState(false);
  const [step01, setStep01] = React.useState('');

  const toggleMenu01 = () => {
    setVisibleStep01((prev) => !prev);
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
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
              고객후기
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
            onPress={() => navigation.navigate('StoryTips')}
            activeOpacity={0.8}
            hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}>
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
              유용한정보
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('StoryCreateInfo')}
            activeOpacity={0.8}
            hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}>
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
              인쇄/패키지 제작정보
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              zIndex: 2000,
              position: 'relative',
              width: '30%',
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              borderBottomRightRadius: visibleStep01 ? 0 : 4,
              borderBottomLeftRadius: visibleStep01 ? 0 : 4,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={toggleMenu01}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                value={step01}
                placeholder="인쇄종류"
                style={{
                  fontFamily: 'SCDream4',
                  width: '80%',
                  color: step01 ? '#000' : '#A2A2A2',
                }}
                editable={false}
                collapsable={true}
              />
              <Image
                source={
                  visibleStep01
                    ? require('../../src/assets/arr01_top.png')
                    : require('../../src/assets/arr01.png')
                }
                style={{width: 25, height: 25}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#DEDEDE',
              borderRadius: 5,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              width: '69%',
            }}>
            <TextInput
              placeholder="업체명을 입력해주세요."
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
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          {/* 고객후기 */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              backgroundColor: '#fff',
              width: Dimensions.get('screen').width,
            }}>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={[styles.mediumText, { fontSize: 16, marginRight: 12 }]}>고객후기</Text>
              <Text style={[styles.normalText, { fontSize: 14, color: '#275696' }]}>
                총 리뷰수 26
              </Text>
            </View> */}

            {/* 고객후기 리스트 박스 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ReviewDetail')}
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 5,
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingTop: 20,
                }}>
                <Text style={{fontFamily: 'SCDream6', marginRight: 5}}>
                  패키지나라
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
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
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 10,
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                }}>
                <ImageBackground
                  source={require('../../src/images/packages/package06.jpg')}
                  resizeMode="cover"
                  style={{width: 75, height: 70, position: 'relative'}}>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        fontSize: 10,
                        backgroundColor: 'rgba(0,0,0,0.45)',
                        color: '#fff',
                        padding: 5,
                      },
                    ]}>
                    +6
                  </Text>
                </ImageBackground>
                <View style={{flexShrink: 2, marginLeft: 20}}>
                  <Text
                    style={[styles.boldText, {fontSize: 14, marginBottom: 10}]}>
                    하나로세상(김*미 고객님)
                  </Text>
                  <Text
                    style={[styles.normalText, {fontSize: 14, lineHeight: 22}]}>
                    배송도 빠르고 프린트 퀄리티도 너무 좋아요 배송도 빠르고
                    프린트 퀄리티도 너무 좋아요
                  </Text>
                </View>
              </View>
              <View
                style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 12, color: '#707070', marginBottom: 7},
                    ]}>
                    소통만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating04.png')}
                      resizeMode="cover"
                      style={{width: 55, height: 15, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 10}]}>4.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 12, color: '#707070', marginBottom: 7},
                    ]}>
                    품질만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating.png')}
                      resizeMode="cover"
                      style={{width: 55, height: 15, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 10}]}>5.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 12, color: '#707070', marginBottom: 7},
                    ]}>
                    납기만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating.png')}
                      resizeMode="cover"
                      style={{width: 55, height: 15, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 10}]}>5.0</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* // 고객후기 리스트 박스 */}
            {/* 고객후기 리스트 박스 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ReviewDetail')}
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 5,
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingTop: 20,
                }}>
                <Text style={{fontFamily: 'SCDream6', marginRight: 5}}>
                  성원애드피아
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
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
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: 10,
                  marginTop: 10,
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                }}>
                <ImageBackground
                  source={require('../../src/images/etc/etc01.jpg')}
                  resizeMode="cover"
                  style={{width: 75, height: 70, position: 'relative'}}>
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      fontSize: 10,
                      backgroundColor: 'rgba(0,0,0,0.45)',
                      color: '#fff',
                      padding: 5,
                    }}>
                    +6
                  </Text>
                </ImageBackground>
                <View style={{flexShrink: 2, marginLeft: 20}}>
                  <Text
                    style={[styles.boldText, {fontSize: 14, marginBottom: 10}]}>
                    신세계세상(정*주 고객님)
                  </Text>
                  <Text
                    style={[styles.normalText, {fontSize: 14, lineHeight: 22}]}>
                    퀄리티 하나는 정말 끝내줍니다. 믿고 맡기는 업체로 선정한 지
                    꽤 됩니다.
                  </Text>
                </View>
              </View>
              <View
                style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 12, color: '#707070', marginBottom: 7},
                    ]}>
                    소통만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating04.png')}
                      resizeMode="cover"
                      style={{width: 55, height: 15, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 10}]}>4.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 12, color: '#707070', marginBottom: 7},
                    ]}>
                    품질만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating.png')}
                      resizeMode="cover"
                      style={{width: 55, height: 15, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 10}]}>5.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 12, color: '#707070', marginBottom: 7},
                    ]}>
                    납기만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating04.png')}
                      resizeMode="cover"
                      style={{width: 55, height: 15, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 10}]}>4.0</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* // 고객후기 리스트 박스 */}
            {/* 고객후기 리스트 박스 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ReviewDetail')}
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 5,
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingTop: 20,
                }}>
                <Text style={{fontFamily: 'SCDream6', marginRight: 5}}>
                  교보인쇄
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
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
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: 10,
                  marginTop: 10,
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                }}>
                <ImageBackground
                  source={require('../../src/images/w03.jpg')}
                  resizeMode="cover"
                  style={{width: 75, height: 70, position: 'relative'}}>
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      fontSize: 10,
                      backgroundColor: 'rgba(0,0,0,0.45)',
                      color: '#fff',
                      padding: 5,
                    }}>
                    +6
                  </Text>
                </ImageBackground>
                <View style={{flexShrink: 2, marginLeft: 20}}>
                  <Text
                    style={[styles.boldText, {fontSize: 14, marginBottom: 10}]}>
                    내안에바다(전*리 고객님)
                  </Text>
                  <Text
                    style={[styles.normalText, {fontSize: 14, lineHeight: 22}]}>
                    명함은 항상 여기서 주문해요. 고급지도 종류별로 다양하고
                    디지털로 찍어도 오프셋 뺨치게 잘나옵니다.
                  </Text>
                </View>
              </View>
              <View
                style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 12, color: '#707070', marginBottom: 7},
                    ]}>
                    소통만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating.png')}
                      resizeMode="cover"
                      style={{width: 55, height: 15, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 10}]}>5.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 12, color: '#707070', marginBottom: 7},
                    ]}>
                    품질만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating.png')}
                      resizeMode="cover"
                      style={{width: 55, height: 15, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 10}]}>5.0</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.normalText,
                      {fontSize: 12, color: '#707070', marginBottom: 7},
                    ]}>
                    납기만족도
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../src/images/rating04.png')}
                      resizeMode="cover"
                      style={{width: 55, height: 15, marginRight: 5}}
                    />
                    <Text style={[styles.normalText, {fontSize: 10}]}>4.0</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* // 고객후기 리스트 박스 */}

            {/* 고객후기 전체보기 버튼 */}
            {/* <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 5,
                marginTop: 20,
              }}>
              <Text
                style={[
                  styles.normalText,
                  { textAlign: 'center', fontSize: 16, color: '#444444', paddingVertical: 15 },
                ]}>
                고객후기 전체보기
              </Text>
            </TouchableOpacity> */}
            {/* // 고객후기 전체보기 버튼 */}
          </View>
          {/* // 고객후기 */}
        </View>
      </ScrollView>
      {visibleStep01 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{zIndex: 1000}}
          style={{
            position: 'absolute',
            top: 186,
            left: 20,
            backgroundColor: '#fff',
            width: '27.1%',
            zIndex: 1000,
            borderWidth: 1,
            borderColor: '#E3E3E3',
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('전체');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('일반인쇄');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>일반인쇄</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('패키지');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>패키지</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('기타인쇄');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 14, fontFamily: 'SCDream4'}}>기타인쇄</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
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
