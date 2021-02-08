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

import DetailHeader from '../Common/DetailHeader';
import Footer from '../Common/Footer';

const TipsDetail = (props) => {
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
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.categoryWrap}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View style={styles.categoryBtn}>
                  <Text style={styles.categoryBtnTxt}>카테고리A</Text>
                </View>
                <Text style={styles.new}>NEW</Text>
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
            <Text style={styles.categoryTitle}>
              문의제목 문의제목 문의제목 문의제목 문의제목 문 의제목문의제목 문의제목 문의제목
              입니다.
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            width: Dimensions.get('window').width,
            backgroundColor: '#D7D7D7',
            marginBottom: 10,
          }}
        />

        <View style={{ paddingHorizontal: 20 }}>
          {/* 이벤트 내용 */}
          <View style={{ marginTop: 15 }}>
            <Text
              style={[
                styles.normalText,
                { fontSize: 15, color: '#333333', lineHeight: 28, width: '100%', marginBottom: 20 },
              ]}>
              이벤트 내용입니다 이벤트 내용입니다 이벤트 내용입니다 이벤트 내용입니다 이벤트
              내용입니다 이벤트 내용입니다 이벤트 내용...
            </Text>
            <AutoHeightImage
              source={require('../../src/images/faq_img.png')}
              width={Dimensions.get('window').width - 40}
            />
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
  categoryWrap: {
    marginTop: 20,
    paddingBottom: 10,
  },
  categoryBtn: {
    backgroundColor: '#275696',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginRight: 5,
  },
  categoryBtnTxt: {
    fontFamily: 'SCDream4',
    fontSize: 11,
    color: '#fff',
  },
  new: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#366DE5',
  },
  categoryTitle: {
    fontFamily: 'SCDream5',
    fontSize: 17,
    lineHeight: 24,
    color: '#000',
  },
  categoryDate: {
    fontFamily: 'SCDream4',
    fontSize: 13,
    color: '#A2A2A2',
  },
});

export default TipsDetail;
