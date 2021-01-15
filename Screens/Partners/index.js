import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';

import Header from '../Common/Header';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: -2,
              marginBottom: 20,
            }}>
            파트너스
          </Text>
          {/* 파트너스 리스트(list) */}
          <View
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
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  삼보인쇄
                </Text>
                <View
                  style={{
                    backgroundColor: '#3CD7C8',
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
              <Text style={{ fontSize: 13, lineHeight: 18 }} numberOfLines={2}>
                카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
              </Text>
            </View>
            <View>
              <Image
                source={require('../../src/images/img05.jpg')}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </View>
          {/* // 파트너스 리스트(list) */}
          {/* 파트너스 리스트(list) */}
          <View
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
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -1,
                  }}>
                  미래엔인쇄서비스
                </Text>
                <View
                  style={{
                    backgroundColor: '#3CD7C8',
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
              <Text style={{ fontSize: 13, lineHeight: 18 }} numberOfLines={2}>
                대한민국 교육출판 No.1 다양한 지식 콘텐츠로 70년의 역사를 넘어 최고를 향해 달려...
              </Text>
            </View>
            <View>
              <Image
                source={require('../../src/images/img07.jpg')}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </View>
          {/* // 파트너스 리스트(list) */}
          {/* 파트너스 리스트(list) */}
          <View
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
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -1,
                  }}>
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
              <Text style={{ fontSize: 13, lineHeight: 18 }} numberOfLines={2}>
                국내 유일 10,000 디지털을 인쇄하는 회사입니다. 가격은 DOWN, 퀄리티는 UP시키...
              </Text>
            </View>
            <View>
              <Image
                source={require('../../src/images/img12.jpg')}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </View>
          {/* // 파트너스 리스트(list) */}
          {/* 파트너스 리스트(list) */}
          <View
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
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -1,
                  }}>
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
              <Text style={{ fontSize: 13, lineHeight: 18 }} numberOfLines={2}>
                국내 유일 10,000 디지털을 인쇄하는 회사입니다. 가격은 DOWN, 퀄리티는 UP시키...
              </Text>
            </View>
            <View>
              <Image
                source={require('../../src/images/img01.jpg')}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </View>
          {/* // 파트너스 리스트(list) */}
          {/* 파트너스 리스트(list) */}
          <View
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
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                    letterSpacing: -1,
                  }}>
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
              <Text style={{ fontSize: 13, lineHeight: 18 }} numberOfLines={2}>
                국내 유일 10,000 디지털을 인쇄하는 회사입니다. 가격은 DOWN, 퀄리티는 UP시키...
              </Text>
            </View>
            <View>
              <Image
                source={require('../../src/images/img09.jpg')}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </View>
          {/* // 파트너스 리스트(list) */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default index;
