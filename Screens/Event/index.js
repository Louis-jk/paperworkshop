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
  TextInput,
  Linking,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';

import Header from './Header';
import Footer from '../Common/Footer';

const index = (props) => {
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
      <View style={{ paddingHorizontal: 20, backgroundColor: '#fff' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#DEDEDE',
            borderRadius: 5,
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            marginTop: 20,
            marginBottom: 10,
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

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 이벤트 리스트 */}
        {/* 이벤트01 */}
        <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail')}
          activeOpacity={0.8}
          style={{ marginVertical: 20 }}>
          <View
            style={{
              position: 'relative',
              backgroundColor: '#fff',
              justifyContent: 'flex-start',
            }}>
            <Carousel
              ref={carouselRef}
              data={entries}
              renderItem={renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              loop={true}
            />

            {/* Swipe Prev,Next 버튼 Custom */}
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: 111,
                height: 67,
                backgroundColor: '#275696',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  carouselRef.current.snapToPrev();
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}>
                  <Image
                    source={require('../../src/assets/slide_arr02.png')}
                    resizeMode="contain"
                    style={{ width: 22, height: 20 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <View style={{ borderWidth: 0.2, height: 15, borderColor: '#D4D4D4' }} />
              <TouchableWithoutFeedback
                onPress={() => {
                  carouselRef.current.snapToNext();
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}>
                  <Image
                    source={require('../../src/assets/slide_arr01.png')}
                    resizeMode="contain"
                    style={{ width: 22, height: 20 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            {/* // Swipe Prev,Next 버튼 Custom */}
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            {/* 이벤트 내용 */}
            <View style={{ marginTop: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.boldText, { fontSize: 16, marginRight: 5 }]}>제목입니다</Text>
                <Text style={[styles.mediumText, { fontSize: 14, color: '#366DE5' }]}>NEW</Text>
              </View>
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
        </TouchableOpacity>
        {/* // 이벤트01 */}
        {/* 이벤트02 */}
        <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail')}
          activeOpacity={0.8}
          style={{ marginVertical: 20 }}>
          <View
            style={{
              position: 'relative',
              backgroundColor: '#fff',
              justifyContent: 'flex-start',
            }}>
            <Carousel
              ref={carouselRef}
              data={entries}
              renderItem={renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              loop={true}
            />

            {/* Swipe Prev,Next 버튼 Custom */}
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: 111,
                height: 67,
                backgroundColor: '#275696',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  carouselRef.current.snapToPrev();
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}>
                  <Image
                    source={require('../../src/assets/slide_arr02.png')}
                    resizeMode="contain"
                    style={{ width: 22, height: 20 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <View style={{ borderWidth: 0.2, height: 15, borderColor: '#D4D4D4' }} />
              <TouchableWithoutFeedback
                onPress={() => {
                  carouselRef.current.snapToNext();
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}>
                  <Image
                    source={require('../../src/assets/slide_arr01.png')}
                    resizeMode="contain"
                    style={{ width: 22, height: 20 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            {/* // Swipe Prev,Next 버튼 Custom */}
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            {/* 이벤트 내용 */}
            <View style={{ marginTop: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.boldText, { fontSize: 16, marginRight: 5 }]}>제목입니다</Text>
                <Text style={[styles.mediumText, { fontSize: 14, color: '#366DE5' }]}>NEW</Text>
              </View>
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
        </TouchableOpacity>
        {/* // 이벤트02 */}
        {/* // 이벤트 리스트 */}
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

export default index;
