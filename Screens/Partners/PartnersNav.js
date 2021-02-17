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

  const locations = [
    'seoul',
    'busan',
    'daegu',
    'incheon',
    'gwangju',
    'sejong',
    'ulsan',
    'gyeongi',
    'gangwon',
    'choongcheong',
    'jeonra',
    'gyeongsang',
    'jeju',
  ];

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
              name: 'All',
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
              name: 'All',
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

      {routeName === 'Partners02' ? (
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
            인기파트너스
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
            navigation.navigate('Partners02', {
              screen: 'Partners02',
              name: 'All',
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
            인기파트너스
          </Text>
        </TouchableOpacity>
      )}

      {routeName === 'Partners03' ? (
        <View style={{position: 'relative'}}>
          <TouchableOpacity onPress={toggleLocation} activeOpacity={0.8}>
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
          </TouchableOpacity>
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
      )}
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
            {locations.map((v, index) => (
              <TouchableOpacity
                key={index}
                style={{paddingHorizontal: 10, paddingVertical: 10}}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('Partners03', {
                    screen: 'Partners03',
                    name: 'All',
                    location: v,
                  });
                  setActiveLocation(false);
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 14,
                    color: '#707070',
                  }}>
                  {v === 'seoul'
                    ? '서울'
                    : v === 'busan'
                    ? '부산'
                    : v === 'daegu'
                    ? '대구'
                    : v === 'incheon'
                    ? '인천'
                    : v === 'gwangju'
                    ? '광주'
                    : v === 'sejong'
                    ? '세종/대전/청주'
                    : v === 'ulsan'
                    ? '울산'
                    : v === 'gyeongi'
                    ? '경기'
                    : v === 'gangwon'
                    ? '강원'
                    : v === 'choongcheong'
                    ? '충청'
                    : v === 'jeonra'
                    ? '전라'
                    : v === 'gyeongsang'
                    ? '경상'
                    : v === 'jeju'
                    ? '제주'
                    : null}
                </Text>
              </TouchableOpacity>
            ))}
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