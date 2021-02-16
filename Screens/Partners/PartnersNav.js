import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const PartnersNav = (props) => {
  const navigation = props.navigation;
  const routeName = props.routeName;

  const [isActiveLocation, setActiveLocation] = React.useState(false);
  const toggleLocation = () => {
    setActiveLocation(!isActiveLocation);
  };

  return (
    <View
      style={{
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {routeName === 'Partners' ? (
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
            전체
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
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Partners', {
              screen: 'Partners',
              params: {name: 'All'},
            });
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
      )}

      {routeName === 'Partners01' ? (
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
            성실파트너스
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
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Partners01', {
              screen: 'Partners01',
              params: {name: 'All'},
            });
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
      )}

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
      <TouchableOpacity onPress={toggleLocation} activeOpacity={0.8}>
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

export default PartnersNav;
