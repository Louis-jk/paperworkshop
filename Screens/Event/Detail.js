import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';

import AutoHeightImage from 'react-native-auto-height-image';

import Header from './Header';
import Footer from '../Common/Footer';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [like, setLike] = React.useState(false);
  const onLikeBtn = () => {
    setLike((prev) => !prev);
  };

  const phoneNumber = '01012345678';
  const emailAddress = 'paper_workshop@paperworkshop.com';

  const carouselRef = React.useRef(null);

  const entries = [
    {
      id: 1,
      image: require('../../src/images/event_img.png'),
    },
    {
      id: 2,
      image: require('../../src/images/event_img.png'),
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <Image
        key={index}
        source={item.image}
        resizeMode="cover"
        style={{ width: Dimensions.get('window').width, height: 400 }}
      />
    );
  };

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = Dimensions.get('window').width;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            position: 'relative',
            backgroundColor: '#fff',
            justifyContent: 'flex-start',
          }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={[styles.boldText, { fontSize: 18, marginVertical: 10 }]}>제목입니다</Text>
          </View>
          <AutoHeightImage
            source={require('../../src/images/event_img.png')}
            width={Dimensions.get('window').width}
            style={{ marginBottom: 5 }}
          />
          <AutoHeightImage
            source={require('../../src/images/event_img.png')}
            width={Dimensions.get('window').width}
          />
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* 이벤트 내용 */}
          <View style={{ marginTop: 15 }}>
            <Text
              style={[
                styles.normalText,
                { fontSize: 14, lineHeight: 20, width: '100%', marginBottom: 5 },
              ]}>
              이벤트 내용입니다 이벤트 내용입니다 이벤트 내용입니다 이벤트 내용입니다 이벤트
              내용입니다 이벤트 내용입니다 이벤트 내용...
            </Text>
          </View>
          {/* // 이벤트 내용 */}
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
  submitBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#275696',
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
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

export default Detail;
