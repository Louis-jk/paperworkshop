import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import StarRating from 'react-native-star-rating';
import ImagePicker from 'react-native-image-crop-picker';

import DetailHeader from '../Common/DetailHeader';
import PartnersAPI from '../../src/api/Partners';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const {partnerId, userId} = props.route.params;

  const [isLoading, setLoading] = React.useState(false);
  const [partnerInfo, setPartnerInfo] = React.useState(null);

  // 별점
  const [rating01, setRating01] = React.useState(''); // 소통만족도
  const [rating02, setRating02] = React.useState(''); // 품질만족도
  const [rating03, setRating03] = React.useState(''); // 납기만족도

  const [reviewText, setReviewText] = React.useState(''); // 후기 내용
  const [source, setSource] = React.useState(null);
  const [reviewUploadImg, setReviewUploadImg] = React.useState([]);

  const getPartnerInfoHandler = () => {
    setLoading(true);
    PartnersAPI.getPartnerChoise(partnerId, userId)
      .then(res => {
        if(res.data.result === '1' && res.data.count > 0) {
          setPartnerInfo(res.data.item[0]);
          setLoading(false);
        } else {
          setLoading(false);
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인'
            }
          ])
        }
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인'
          }
        ])
    })
  }

  React.useEffect(() => {
    getPartnerInfoHandler();
  },[])


  // 리뷰 등록하기
  const sendReviewHandler = () => {

     if((rating01 === '' || rating01 === null) || (rating02 === '' || rating02 === null) || (rating03 === '' || rating03 === null)) {
      Alert.alert("평점을 입력해주세요.", "", [
        {
          text: '확인'
        }
      ])
    } else if(reviewText === '' || reviewText === null) {
      Alert.alert("후기 내용을 입력해주세요.", "", [
        {
          text: '확인'
        }
      ])
    } else if(reviewUploadImg.length === 0) {
      Alert.alert("후기 사진을 첨부해주세요.", "", [
        {
          text: '확인'
        }
      ])
    } else {
      let frmData = new FormData();
  
      frmData.append('method', 'proc_review_add');
      frmData.append('mb_id', userId);
      frmData.append('company_id', partnerId);
      frmData.append('review_content', reviewText);
      frmData.append('grade1', rating01);
      frmData.append('grade2', rating02);
      frmData.append('grade3', rating03);
      
      if(reviewUploadImg.length > 0) {
        reviewUploadImg.map(r => {
          frmData.append('bf_file[]', r);
        })
      } else {
        frmData.append('bf_file[]',reviewUploadImg);
      }

      console.log("frmData", frmData);
  
      PartnersAPI.sendReview(frmData).then(res => {
        console.log("등록여부", res);
        if(res.data.result === '1' && res.data.count > 0) {
          Alert.alert("후기가 등록되었습니다.", "홈으로 이동합니다.", [
            {
              text: '확인',
              onPress: () => navigation.navigate('Stack')
            }
          ])
        } else {
          Alert.alert(res.data.message, "관리자에게 문의하세요.", [
            {
              text: '확인',
              onPress: () => navigation.navigate('Stack')
            }
          ])  
        }
      }).catch(err => {
        Alert.alert(err, "관리자에게 문의하세요.", [
          {
            text: '확인',
            onPress: () => navigation.navigate('Home')
          }
        ])
      })
    }
  }

  // 후기 사진첨부
  const pickImageHandler = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      sortOrder: 'none',
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperCircleOverlay: true,
      useFrontCamera: false,
      // includeBase64: true,
      cropping: false,
    })
      .then((img) => {
        setSource({
          uri: img.path,
          type: img.mime,
          name: img.path.slice(img.path.lastIndexOf('/')),
        });
        setReviewUploadImg(prev => ([...prev, {uri: img.path, type: img.mime, name: img.path.slice(img.path.lastIndexOf('/'))}]));
      })
      .catch((e) => console.log(e));
  };

  console.log("source", source);
  console.log("reviewUploadImg", reviewUploadImg);

  const deleteReviewImg = (name) => {
    let filteredImg =  reviewUploadImg.filter(img => img.uri !== name);
    console.log("filteredImg", filteredImg);
    setReviewUploadImg(filteredImg);
  }

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      {isLoading && (
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
      )}
      { partnerInfo && 
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.wrap, { marginTop: 20 }]}>
          <Text style={[styles.boldText, { fontSize: 22, color: '#000000', marginBottom: 7 }]}>
            고객님의 소중한 후기를
          </Text>
          <Text style={[styles.boldText, { fontSize: 22, color: '#000000', marginBottom: 20 }]}>
            남겨주세요.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#F5F5F5',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
              marginBottom: 20,
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
                  style={[
                    styles.mediumText,
                    {
                      color: '#000',
                      fontSize: 14,
                    },
                  ]}>
                  {partnerInfo.mb_2}
                </Text>
                {partnerInfo.cate1.includes('1') ? 
                <View
                  style={{
                    backgroundColor: '#3CD7C8',
                    borderRadius: 2,
                    marginLeft: 5,
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
                : null }
                {partnerInfo.cate1.includes('0') ? 
                <View
                  style={{
                    backgroundColor: '#275696',
                    borderRadius: 2,
                    marginLeft: 5,
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
                : null }
                {partnerInfo.cate1.includes('2') ? 
                <View
                  style={{
                    backgroundColor: '#B5B5B5',
                    borderRadius: 2,
                    marginLeft: 5,
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
                : null }
              </View>
              <View style={{ width: '100%' }}>
                <Text
                  style={[styles.normalText, { fontSize: 13, lineHeight: 18 }]}
                  numberOfLines={2}>
                  {partnerInfo.description}
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={{uri: `${partnerInfo.portfolioImg[0]}`}}
                resizeMode="cover"
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
          </View>
        </View>

        {/* 만족도 */}
        <View>
          <View style={{ height: 1, width: '100%', backgroundColor: '#F1F1F1' }} />
          <View style={styles.wrap}>
            <View style={{ marginVertical: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Text style={[styles.orderInfoTitle, { marginTop: 0, marginRight: 10 }]}>
                  소통 만족도
                </Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <StarRating
                      disabled={false}
                      emptyStar={require('../../src/assets/star_off.png')}
                      fullStar={require('../../src/assets/star_on.png')}
                      maxStars={5}
                      rating={rating01}
                      starSize={20}
                      selectedStar={(rating) => setRating01(rating)}
                    />                 
                  <Text style={[styles.normalText, { fontSize: 14, color: '#000', marginLeft: 5 }]}>
                    {rating01 ? rating01 : 0}.0
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Text style={[styles.orderInfoTitle, { marginTop: 0, marginRight: 10 }]}>
                  품질 만족도
                </Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <StarRating
                      disabled={false}
                      emptyStar={require('../../src/assets/star_off.png')}
                      fullStar={require('../../src/assets/star_on.png')}
                      maxStars={5}
                      rating={rating02}
                      starSize={20}
                      selectedStar={(rating) => setRating02(rating)}
                    />                 
                  <Text style={[styles.normalText, { fontSize: 14, color: '#000', marginLeft: 5 }]}>
                    {rating02 ? rating02 : 0}.0
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Text style={[styles.orderInfoTitle, { marginTop: 0, marginRight: 10 }]}>
                  납기 만족도
                </Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <StarRating
                      disabled={false}
                      emptyStar={require('../../src/assets/star_off.png')}
                      fullStar={require('../../src/assets/star_on.png')}
                      maxStars={5}
                      rating={rating03}
                      starSize={20}
                      selectedStar={(rating) => setRating03(rating)}
                    />                 
                  <Text style={[styles.normalText, { fontSize: 14, color: '#000', marginLeft: 5 }]}>
                    {rating03 ? rating03 : 0}.0
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ height: 1, width: '100%', backgroundColor: '#F1F1F1' }} />
        </View>
        {/* // 만족도 */}

        {/* 후기 내용 */}
        <View style={styles.wrap}>
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text style={[styles.orderInfoTitle, { marginRight: 10 }]}>후기 내용</Text>
              {/* <Text style={[styles.orderInfoTitleRow, { color: '#275696' }]}>총 견적 3</Text> */}
            </View>
            <TextInput
              value={reviewText}
              placeholder="후기 내용을 입력해주세요"
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setReviewText(text)}
              style={[
                styles.normalText,
                {
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  height: 120,
                  flex: 1,
                  textAlignVertical: 'top',
                  paddingLeft: 10,
                  paddingVertical: 10,
                  lineHeight: 22
                },
              ]}
              multiline={true}
              autoCapitalize="none"
            />
          </View>
        </View>
        {/* // 후기 내용 */}

        {/* 사진 첨부 */}
        <View style={styles.wrap}>
          <View
            style={{
              marginBottom: 30,
              backgroundColor: '#fff',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <Text style={[styles.orderInfoTitle, { marginTop: 0, marginRight: 10 }]}>
                  사진 첨부
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => pickImageHandler()}
                  style={[
                    styles.normalText,
                    {
                      borderWidth: 1,
                      borderColor: '#275696',
                      borderRadius: 4,
                      backgroundColor: '#fff',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                    },
                  ]}>
                  <Text style={[styles.normalText, { color: '#275696' }]}>사진 선택</Text>
                </TouchableOpacity>
              </View>

              {/* 사진 Area */}
              {source && reviewUploadImg.length > 0 ? 
              reviewUploadImg.map((reviewImg, idx) => 
                <View
                  key={idx}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                      <Image
                        source={{uri: `${reviewImg.uri}`}}
                        resizeMode="cover"
                        style={{ width: 50, height: 50, borderRadius: 4, marginRight: 10 }}
                      />
                      <Text style={[styles.normalText, { fontSize: 14, color: '#000', width: '75%', alignItems: 'flex-start'}]} numberOfLines={1} >
                        {source.name}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => deleteReviewImg(reviewImg.uri)}
                  >
                    <Image
                      source={require('../../src/assets/icon_close03.png')}
                      resizeMode="cover"
                      style={{ width: 24, height: 24 }}
                    />
                  </TouchableOpacity>
                </View>
              )
              : null }
              {/* // 사진 Area */}
            </View>
          </View>
        </View>
        {/* // 사진 첨부 */}

        {/* 버튼 */}
        <View style={styles.wrap}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 50,
            }}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      color: '#000000',
                    },
                  ]}>
                  작성 취소
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => sendReviewHandler()}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 15,
                  backgroundColor: '#275696',
                  borderWidth: 1,
                  borderColor: '#275696',
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      color: '#fff',
                    },
                  ]}>
                  작성 완료
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* // 버튼 */}
      </ScrollView>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  infoBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  infoStepDesc: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#275696',
    lineHeight: 23,
  },
  infoStepTitle: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#000000',
  },
  bankInfoTitle: {
    fontFamily: 'SCDream5',
    fontSize: 14,
    marginBottom: 15,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
    marginVertical: 20,
  },
  details: {
    fontFamily: 'SCDream4',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailsTitle: {
    fontFamily: 'SCDream4',
    width: 100,
    fontSize: 14,
    color: '#A2A2A2',
  },
  detailsDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000',
  },
  detailsEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfoTitle: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#000000',
    marginTop: 20,
  },
  orderInfoTitleRow: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    marginTop: 20,
  },
  orderInfoDesc: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    color: '#000',
    marginBottom: 10,
  },
  textInput: {
    fontFamily: 'SCDream4',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginRight: 5,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  wd50per: {
    width: '50%',
  },
  mgB10: {
    marginBottom: 10,
  },
  mgB20: {
    marginBottom: 20,
  },
  mgB30: {
    marginBottom: 30,
  },
  mgB40: {
    marginBottom: 40,
  },
  orderInfoContentRow: {
    fontFamily: 'SCDream4',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  orderInfoContentTitle: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    color: '#111',
  },
  orderInfoContentDetail: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#707070',
  },
  goHomeBtn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#275696',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
  },
  goHomeBtnText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#275696',
    textAlign: 'center',
  },
  submitBtn: {
    borderRadius: 5,
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  submitBtnBorder: {
    borderWidth: 1,
    borderColor: '#275696',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnBorderText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#275696',
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
