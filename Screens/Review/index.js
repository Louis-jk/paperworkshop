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
} from 'react-native';
import DetailHeader from '../Common/DetailHeader';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.wrap, { marginTop: 20 }]}>
          <Text style={{ fontSize: 22, color: '#000000', fontWeight: 'bold', marginBottom: 2 }}>
            고객님의 소중한 후기를
          </Text>
          <Text style={{ fontSize: 22, color: '#000000', fontWeight: 'bold', marginBottom: 20 }}>
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
              <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 13, lineHeight: 18 }} numberOfLines={2}>
                  카타로그제작부터 후가공까지 삼보인쇄에서 함께하세요!
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={require('../../src/images/p07.jpg')}
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
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_off.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={{ fontSize: 14, color: '#000', marginLeft: 5 }}>4.0</Text>
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
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_off.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={{ fontSize: 14, color: '#000', marginLeft: 5 }}>4.0</Text>
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
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_on.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={require('../../src/assets/star_off.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={{ fontSize: 14, color: '#000', marginLeft: 5 }}>4.0</Text>
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
              placeholder="후기 내용을 입력해주세요"
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 5,
                backgroundColor: '#fff',
                height: 120,
                flex: 1,
                textAlignVertical: 'top',
                paddingLeft: 10,
                paddingVertical: 10,
              }}
              multiline={true}
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
                  style={{
                    borderWidth: 1,
                    borderColor: '#275696',
                    borderRadius: 4,
                    backgroundColor: '#fff',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                  }}>
                  <Text style={{ color: '#275696' }}>사진 선택</Text>
                </TouchableOpacity>
              </View>

              {/* 사진 Area */}
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Image
                    source={require('../../src/images/p05.jpg')}
                    resizeMode="cover"
                    style={{ width: 50, height: 50, borderRadius: 4, marginRight: 10 }}
                  />
                  <Text style={{ fontSize: 14, color: '#000' }}>paper12456.jpg</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                  <Image
                    source={require('../../src/assets/icon_close03.png')}
                    resizeMode="cover"
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
              </View>
              {/* // 사진 Area */}
              {/* 사진 Area */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../src/images/p05.jpg')}
                    resizeMode="cover"
                    style={{ width: 50, height: 50, borderRadius: 4, marginRight: 10 }}
                  />
                  <Text style={{ fontSize: 14, color: '#000' }}>paper12456.jpg</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                  <Image
                    source={require('../../src/assets/icon_close03.png')}
                    resizeMode="cover"
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
              </View>
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
              marginBottom: 10,
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
                  style={{
                    fontSize: 14,
                    color: '#000000',
                  }}>
                  작성 취소
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => Alert.alert('후기 작성완료')}>
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
                  style={{
                    fontSize: 14,
                    color: '#fff',
                  }}>
                  작성 완료
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* // 버튼 */}
      </ScrollView>
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
    fontSize: 12,
    color: '#275696',
    lineHeight: 23,
  },
  infoStepTitle: {
    fontSize: 16,
    color: '#000000',
  },
  bankInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
    marginVertical: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailsTitle: {
    width: 100,
    fontSize: 14,
    color: '#A2A2A2',
  },
  detailsDesc: {
    fontSize: 14,
    color: '#000',
  },
  detailsEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
  },
  orderInfoTitleRow: {
    fontSize: 14,
    marginTop: 20,
  },
  orderInfoDesc: {
    fontSize: 15,
    color: '#000',
    marginBottom: 10,
  },
  textInput: {
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  orderInfoContentTitle: {
    fontSize: 15,
    color: '#111',
  },
  orderInfoContentDetail: {
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
    fontSize: 16,
    color: '#275696',
    textAlign: 'center',
  },
});

export default index;
