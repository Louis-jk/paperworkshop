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

const CreateInfo = (props) => {
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
      <View style={{ paddingHorizontal: 20, backgroundColor: '#fff' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Story')}
            activeOpacity={0.8}
            hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 16,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              고객후기
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('StoryTips')}
            activeOpacity={0.8}
            hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 16,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              유용한정보
            </Text>
          </TouchableOpacity>

          <View style={{ position: 'relative' }}>
            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 16,
                  marginRight: 20,
                },
              ]}>
              인쇄/패키지 제작정보
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
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height - 400,
          }}>
          <Text style={{ fontFamily: 'SCDream4' }}>인쇄/패키지 제작정보</Text>
        </View>
      </ScrollView>
      {visibleStep01 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ zIndex: 1000 }}
          style={{
            position: 'absolute',
            top: 164,
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
              setStep01('일반인쇄');
              setVisibleStep01(false);
            }}>
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>일반인쇄</Text>
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
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>패키지</Text>
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
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>기타인쇄</Text>
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

export default CreateInfo;
