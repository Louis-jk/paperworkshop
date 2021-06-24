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
  Alert,
  ActivityIndicator,
} from 'react-native';

import {useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal';
import AutoHeightImage from 'react-native-auto-height-image';
import FastImage from 'react-native-fast-image';

import DetailHeader from '../Common/DetailHeader';
import PartnersAPI from '../../src/api/Partners';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const {reviewID, companyId} = props.route.params;

  const {mb_id} = useSelector((state) => state.UserInfoReducer); // 내 아이디 가져오기(redux)

  const carouselRef = React.useRef(null);

  const [isLoading, setLoading] = React.useState(false);
  const [detail, setDetail] = React.useState({});
  const [review, setReview] = React.useState({});

  // 파트너 상세 가져오기
  const getPartnerDetail = () => {
    setLoading(true);
    PartnersAPI.getPartnerChoise(companyId, mb_id)
      .then((res) => {
        if (res.data.result === '1') {
          setDetail(res.data.item[0]);
          setLoading(false);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  // 리뷰 상세 가져오기
  const getReviewDetailAPI = () => {
    setLoading(true);
    PartnersAPI.getReviewDetail(reviewID)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setReview(res.data.item[0]);
          setLoading(false);
        } else {
          setReview(null);
          Alert.alert(
            '잘못된 경로로 들어오셨습니다.',
            '관리자에게 문의하세요.',
            [
              {
                text: '확인',
              },
            ],
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getPartnerDetail();
    getReviewDetailAPI();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <Image
        key={index}
        source={{uri: `${item}`}}
        resizeMode="cover"
        style={{width: Dimensions.get('window').width, height: 400}}
      />
    );
  };

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = Dimensions.get('window').width;

  // 이미지 모달창
  const ImageModal = ({toggleModal, isVisible, imgPath}) => {
    let extension = '';
    if (imgPath !== null) {
      extension = imgPath.slice(imgPath.lastIndexOf('.'));
    }

    return (
      <View>
        <Modal
          isVisible={isVisible}
          // onBackdropPress={toggleModal}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginBottom: 20}}>
            {extension !== '.gif' ? (
              <AutoHeightImage
                width={Dimensions.get('window').width - 40}
                source={{uri: `${imgPath}`}}
                maxHeight={600}
                resizeMode="contain"
              />
            ) : (
              <FastImage
                source={{uri: `${imgPath}`}}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Dimensions.get('window').width - 40,
                  height: 250,
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleModal}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#fff',
              paddingHorizontal: 14,
              paddingVertical: 7,
            }}>
            <Text style={{fontFamily: 'SCDream4', fontSize: 13, color: '#fff'}}>
              닫기
            </Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [imgPath, setImgPath] = React.useState(null);

  // 이미지 모달 핸들러
  const imageModalHandler = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            flex: 1,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            elevation: 0,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <ActivityIndicator size="large" color="#275696" />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <ImageModal
            imgPath={imgPath}
            isVisible={isModalVisible}
            toggleModal={imageModalHandler}
          />
          <View
            style={{
              position: 'relative',
              backgroundColor: '#fff',
              justifyContent: 'flex-start',
              marginBottom: 20,
            }}>
            {detail && detail.portfolioImg && detail.portfolioImg.length > 1 ? (
              <Carousel
                ref={carouselRef}
                data={detail.portfolioImg}
                renderItem={renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                loop={true}
              />
            ) : (
              <Image
                source={require('../../src/assets/noImg.png')}
                resizeMode="cover"
                style={{width: '100%'}}
              />
            )}

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
                    style={{width: 22, height: 20}}
                  />
                </View>
              </TouchableWithoutFeedback>
              <View
                style={{borderWidth: 0.2, height: 15, borderColor: '#D4D4D4'}}
              />
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
                    style={{width: 22, height: 20}}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            {/* // Swipe Prev,Next 버튼 Custom */}

            {/* 회사정보 상단 fix */}
            <View
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                justifyContent: 'center',
                alignItems: 'center',
                width: 156,
                height: 156,
                backgroundColor: '#fff',
              }}>
              <View style={{justifyContent: 'flex-start'}}>
                {/* Partner_logo.png */}
                <Image
                  source={require('../../src/images/Partner_logo.png')}
                  resizeMode="cover"
                  style={{width: 55, height: 15, marginBottom: 5}}
                />
                <Text
                  style={[styles.mediumText, {fontSize: 20, marginBottom: 5}]}>
                  {detail.businessName}
                </Text>
                <Text
                  style={[
                    styles.mediumText,
                    {fontSize: 12, marginBottom: 12, color: '#707070'},
                  ]}>
                  담당자 {detail.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <StarRating
                    disabled={false}
                    emptyStar={require('../../src/assets/star_off.png')}
                    fullStar={require('../../src/assets/star_on.png')}
                    maxStars={5}
                    rating={Math.floor(detail.rate)}
                    starSize={13}
                  />
                  <Text
                    style={[styles.normalText, {fontSize: 12, marginLeft: 5}]}>
                    {detail.rate}
                  </Text>
                </View>
              </View>
            </View>
            {/* // 회사정보 상단 fix */}
          </View>
          <View style={{paddingHorizontal: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 5,
                backgroundColor: '#fff',
                marginBottom: 10,
              }}>
              <TouchableWithoutFeedback>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 20,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        fontSize: 14,
                        marginBottom: 5,
                      },
                    ]}>
                    소통 만족도
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        fontSize: 14,
                        marginBottom: 5,
                      },
                    ]}>
                    {`${review.grade1}.0`}
                  </Text>
                  <StarRating
                    disabled={false}
                    emptyStar={require('../../src/assets/star_off.png')}
                    fullStar={require('../../src/assets/star_on.png')}
                    maxStars={5}
                    rating={Math.floor(review.grade1)}
                    starSize={16}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 20,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        fontSize: 14,
                        marginBottom: 5,
                      },
                    ]}>
                    품질 만족도
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        fontSize: 14,
                        marginBottom: 5,
                      },
                    ]}>
                    {`${review.grade2}.0`}
                  </Text>
                  <StarRating
                    disabled={false}
                    emptyStar={require('../../src/assets/star_off.png')}
                    fullStar={require('../../src/assets/star_on.png')}
                    maxStars={5}
                    rating={Math.floor(review.grade2)}
                    starSize={16}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 20,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        fontSize: 14,
                        marginBottom: 5,
                      },
                    ]}>
                    납기 만족도
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {
                        fontSize: 14,
                        marginBottom: 5,
                      },
                    ]}>
                    {`${review.grade3}.0`}
                  </Text>
                  <StarRating
                    disabled={false}
                    emptyStar={require('../../src/assets/star_off.png')}
                    fullStar={require('../../src/assets/star_on.png')}
                    maxStars={5}
                    rating={Math.floor(review.grade3)}
                    starSize={16}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>

            {/* 고객후기 */}
            <View style={{marginVertical: 20}}>
              <Text
                style={[styles.mediumText, {fontSize: 16, marginBottom: 15}]}>
                고객후기
              </Text>
              <Text
                style={[
                  styles.normalText,
                  {fontSize: 14, lineHeight: 22, marginBottom: 5},
                ]}>
                {review.review_content}
              </Text>
            </View>
            {/* // 고객후기 */}

            {/* 첨부 사진 */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              {review.bf_file &&
                review.bf_file.map((img, idx) => (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.8}
                    onPress={() => {
                      imageModalHandler();
                      setImgPath(img);
                    }}
                    style={{flex: review.bf_file.length > 3 ? 1 : 0}}>
                    <Image
                      source={{uri: `${img}`}}
                      style={{
                        width: Dimensions.get('window').width / 5 - 15,
                        height: Dimensions.get('window').width / 5 - 15,
                        marginRight: review.bf_file.length <= 3 ? 10 : 0,
                        borderRadius: 4,
                      }}
                    />
                  </TouchableOpacity>
                ))}
            </View>

            {/* // 첨부 사진 */}
          </View>

          {/* <Footer navigation={navigation} /> */}
          <View style={{marginBottom: 50}} />
        </ScrollView>
      )}
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
