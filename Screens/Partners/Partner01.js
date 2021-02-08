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

const Partner01 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  // 탭 - 전체/패키지/일반인쇄/기타인쇄물 start

  // 파트너스 탭 start
  const All = (props) => (
    <View>
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
              source={require('../../src/images/packages/package03.jpg')}
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
              삼보인쇄
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/etc/etc03.jpg')}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/general/general01.jpg')}
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
              삼보인쇄
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/packages/package07.jpg')}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/etc/etc07.jpg')}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/general/general07.jpg')}
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
              동천문화인쇄
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              미래엔인쇄서비스
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              동천문화인쇄
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              애드프린트
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/etc/etc01.jpg')}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/general/general05.jpg')}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
          </View>
        </TouchableOpacity>
        {/* // 파트너스 리스트(list) */}
      </View>
    </View>
  );

  const Package = (props) => (
    <View>
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
              source={require('../../src/images/packages/package03.jpg')}
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
              삼보인쇄
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              애드프린트
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              동천문화인쇄
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/packages/package07.jpg')}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
          </View>
        </TouchableOpacity>
        {/* // 파트너스 리스트(list) */}
      </View>
    </View>
  );

  const General = (props) => (
    <View>
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
              source={require('../../src/images/general/general01.jpg')}
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
              삼보인쇄
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/general/general05.jpg')}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/general/general07.jpg')}
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
              동천문화인쇄
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              미래엔인쇄서비스
            </Text>

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
          </View>
        </TouchableOpacity>
        {/* // 파트너스 리스트(list) */}
      </View>
    </View>
  );

  const Etc = (props) => (
    <View>
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
              source={require('../../src/images/etc/etc01.jpg')}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/etc/etc03.jpg')}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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
              source={require('../../src/images/etc/etc07.jpg')}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
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

            {/* <Text style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]} numberOfLines={2}>
              카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
            </Text> */}
          </View>
        </TouchableOpacity>
        {/* // 파트너스 리스트(list) */}
      </View>
    </View>
  );

  const initialLayout = { width: Dimensions.get('window').width };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'all', title: '전체' },
    { key: 'package', title: '패키지' },
    { key: 'general', title: '일반인쇄' },
    { key: 'etc', title: '기타인쇄' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'all':
        return <All />;
      case 'package':
        return <Package />;
      case 'general':
        return <General />;
      case 'etc':
        return <Etc />;
    }
  };

  const [tabIndex, setTabIndex] = React.useState('all');

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
              await jumpTo('all');
              await setTabIndex('all');
            }}>
            <Text
              style={[
                tabIndex === 'all' && index === 0 ? styles.boldText : styles.mediumText,
                {
                  fontFamily: tabIndex === 'all' && index === 0 ? 'SCDream5' : 'SCDream4',
                  paddingVertical: 12,
                  fontSize: 15,
                  color: tabIndex === 'all' && index === 0 ? '#275696' : '#B5B5B5',
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
                tabIndex === 'package' || index === 1 ? styles.boldText : styles.mediumText,
                {
                  fontFamily: tabIndex === 'package' || index === 1 ? 'SCDream5' : 'SCDream4',
                  paddingVertical: 12,
                  fontSize: 15,
                  color: tabIndex === 'package' || index === 1 ? '#275696' : '#B5B5B5',
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
                tabIndex === 'general' || index === 2 ? styles.boldText : styles.mediumText,
                {
                  fontFamily: tabIndex === 'general' || index === 2 ? 'SCDream5' : 'SCDream4',
                  paddingVertical: 12,
                  fontSize: 15,
                  color: tabIndex === 'general' || index === 2 ? '#275696' : '#B5B5B5',
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
                tabIndex === 'etc' || index === 3 ? styles.boldText : styles.mediumText,
                {
                  fontFamily: tabIndex === 'etc' || index === 3 ? 'SCDream5' : 'SCDream4',
                  paddingVertical: 12,
                  fontSize: 15,
                  color: tabIndex === 'etc' || index === 3 ? '#275696' : '#B5B5B5',
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
            <TouchableOpacity onPress={() => navigation.navigate('Partners')} activeOpacity={0.8}>
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

            <View style={{ position: 'relative' }}>
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
                  right: 15,
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: '#275696',
                }}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Partners02')} activeOpacity={0.8}>
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
            <TouchableOpacity onPress={() => navigation.navigate('Partners03')} activeOpacity={0.8}>
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
          </View>

          {/* TabView */}
          <View>
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

export default Partner01;
