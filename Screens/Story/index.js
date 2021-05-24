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
  Alert,
  FlatList,
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import DropDownPicker from 'react-native-dropdown-picker';

import Header from '../Common/Header';
import CcenterAPI from '../../src/api/Ccenter';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [visibleStep01, setVisibleStep01] = React.useState(false);
  const [cate1, setCate1] = React.useState(null);
  const [keyword, setKeyword] = React.useState(null);

  const [isLoading, setLoading] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);

  const category = ['전체', '패키지', '일반인쇄', '기타인쇄'];

  const toggleMenu01 = () => {
    setVisibleStep01((prev) => !prev);
  };

  const getReviewsAPI = () => {
    setLoading(true);
    CcenterAPI.getReviews(cate1, keyword)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setReviews(res.data.item);
          setLoading(false);
        } else {
          setReviews();
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
    getReviewsAPI();
  }, [cate1]);

  const setCategoryFn = (c) => {
    if (c === '전체') {
      setCate1(null);
    } else if (c === '패키지') {
      setCate1('1');
    } else if (c === '일반인쇄') {
      setCate1('0');
    } else {
      setCate1('2');
    }
  };

  const renderRow = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('ReviewDetail', {
            screen: 'ReviewDetail',
            params: {reviewID: item.pr_id, companyId: item.company_id},
          })
        }
        style={{
          borderWidth: 1,
          borderColor: '#E3E3E3',
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 20,
          }}>
          <Text style={{fontFamily: SCDream6, marginRight: 5}}>
            {item.ccompany_name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            {item.cate1.includes('1') ? (
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
            ) : item.cate1.includes('0') ? (
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
            ) : item.cate1.includes('2') ? (
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
            ) : null}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: 10,
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}>
          <ImageBackground
            source={{uri: `${item.bf_file[0]}`}}
            resizeMode="cover"
            style={{width: 75, height: 70, position: 'relative'}}>
            <Text
              style={[
                styles.normalText,
                {
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  fontSize: 10,
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  color: '#fff',
                  padding: 5,
                },
              ]}>
              +6
            </Text>
          </ImageBackground>
          <View style={{flexShrink: 2, marginLeft: 20}}>
            <Text style={[styles.boldText, {fontSize: 15, marginBottom: 10}]}>
              {item.ccompany_name
                ? `${item.ccompany_name} (${item.mb_name} 고객님)`
                : `${item.mb_name} 고객님`}
            </Text>
            <Text style={[styles.normalText, {fontSize: 15, lineHeight: 22}]}>
              {item.review_content}
            </Text>
          </View>
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: '#E3E3E3'}} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <View>
            <Text
              style={[
                styles.normalText,
                {fontSize: 12, color: '#707070', marginBottom: 7},
              ]}>
              소통만족도
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <StarRating
                disabled={false}
                emptyStar={require('../../src/assets/star_off.png')}
                fullStar={require('../../src/assets/star_on.png')}
                maxStars={5}
                rating={Math.floor(item.grade1)}
                starSize={12}
              />
              <Text style={[styles.normalText, {fontSize: 12, marginLeft: 5}]}>
                {`${item.grade1}.0`}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.normalText,
                {fontSize: 12, color: '#707070', marginBottom: 7},
              ]}>
              품질만족도
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <StarRating
                disabled={false}
                emptyStar={require('../../src/assets/star_off.png')}
                fullStar={require('../../src/assets/star_on.png')}
                maxStars={5}
                rating={Math.floor(item.grade2)}
                starSize={12}
              />
              <Text style={[styles.normalText, {fontSize: 12, marginLeft: 5}]}>
                {`${item.grade2}.0`}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.normalText,
                {fontSize: 12, color: '#707070', marginBottom: 7},
              ]}>
              납기만족도
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <StarRating
                disabled={false}
                emptyStar={require('../../src/assets/star_off.png')}
                fullStar={require('../../src/assets/star_on.png')}
                maxStars={5}
                rating={Math.floor(item.grade3)}
                starSize={12}
              />
              <Text style={[styles.normalText, {fontSize: 12, marginLeft: 5}]}>
                {`${item.grade3}.0`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
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
      <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <View style={{position: 'relative'}}>
            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 15,
                  marginBottom: 20,
                  marginRight: 20,
                },
              ]}>
              고객후기
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
          <TouchableOpacity
            onPress={() => navigation.navigate('StoryTips')}
            activeOpacity={0.8}
            hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
                  marginBottom: 20,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              유용한정보
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('StoryCreateInfo')}
            activeOpacity={0.8}
            hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
                  marginBottom: 20,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              인쇄/패키지 제작정보
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            backgroundColor: '#fff',
          }}>
          {Platform.OS === 'android' ? (
          <View
            style={{
              zIndex: 2000,
              position: 'relative',
              width: '30%',
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              borderBottomRightRadius: visibleStep01 ? 0 : 4,
              borderBottomLeftRadius: visibleStep01 ? 0 : 4,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={toggleMenu01}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                value={
                  cate1 === '1'
                    ? '패키지'
                    : cate1 === '0'
                    ? '일반인쇄'
                    : cate1 === '2'
                    ? '기타인쇄'
                    : '전체'
                }
                placeholder="인쇄종류"
                style={{
                  fontFamily: SCDream4,
                  width: '80%',
                  color: cate1 ? '#000' : '#A2A2A2',
                  height: 50
                }}
                editable={false}
                collapsable={true}
              />
              <Image
                source={
                  visibleStep01
                    ? require('../../src/assets/arr01_top.png')
                    : require('../../src/assets/arr01.png')
                }
                style={{width: 25, height: 25}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          ) : 
          Platform.OS === 'ios' ? (
            <View style={{width:110, zIndex: 3000}}>
              <DropDownPicker
                placeholder={'전체'}
                placeholderStyle={{
                  fontFamily: SCDream4,
                  fontSize: 14,
                  color: '#000'
                }}
                value={category}
                activeLabelStyle={{color: '#000'}}
                activeItemStyle={{color: '#000'}}
                selectedLabelStyle={{color: '#000'}}
                items={category.map((v, _i) => {
                  return {value: v, label: v};
                })}
                dropDownMaxHeight={300}
                zIndex={3000}
                containerStyle={{height: 52, marginRight: 5}}
                style={{
                  backgroundColor: '#fff',
                  borderTopRightRadius: 4,
                  borderTopLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  borderBottomLeftRadius: 4,
                }}
                itemStyle={{
                  justifyContent: 'flex-start',
                  paddingVertical: 10,
                }}
                labelStyle={{fontFamily: SCDream4, color: '#A2A2A2'}}
                dropDownStyle={{backgroundColor: '#fff'}}
                onChangeItem={(item) => {
                  setCategoryFn(item.value);
                  setVisibleStep01(false);
                }}
                autoCapitalize="none"            
                customArrowDown={() => (
                  <Image
                    source={require('../../src/assets/arr01.png')}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                )}
                customArrowUp={() => (
                  <Image
                    source={require('../../src/assets/arr01_top.png')}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                )}
              />
            </View>
          ) : null
          }
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#DEDEDE',
              borderRadius: 5,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              width: '69%',
            }}>
            <TextInput
              value={keyword}
              placeholder="업체명을 입력해주세요."
              placeholderTextColor="#BEBEBE"
              autoFocus={false}
              style={[styles.normalText, {width: '80%', height: 50}]}
              onChangeText={(text) => setKeyword(text)}
              onSubmitEditing={() => getReviewsAPI()}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                Keyboard.dismiss();
                getReviewsAPI();
              }}>
              <Image
                source={require('../../src/assets/top_seach.png')}
                resizeMode="contain"
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={reviews}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        persistentScrollbar={true}
        showsVerticalScrollIndicator={false}
        progressViewOffset={true}
        refreshing={true}
        style={{backgroundColor: '#fff', paddingHorizontal: 20, zIndex: -1}}
        ListEmptyComponent={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              height: Dimensions.get('window').height - 300,
            }}>
            <Text style={{fontFamily: SCDream4}}>리뷰가 없습니다.</Text>
          </View>
        }
      />

      {Platform.OS === 'android' && visibleStep01 && (
        <View
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{zIndex: 1000}}
          style={{
            position: 'absolute',
            top: 166,
            left: 20,
            backgroundColor: '#fff',
            width: '27.1%',
            zIndex: 1000,
            borderWidth: 1,
            borderColor: '#E3E3E3',
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
          }}>
          {category.map((c, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={1}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
              onPress={() => {
                setCategoryFn(c);
                setVisibleStep01(false);
              }}>
              <Text style={{fontSize: 14, fontFamily: SCDream4}}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  normalText: {
    fontFamily: SCDream4,
  },
  mediumText: {
    fontFamily: SCDream5,
  },
  boldText: {
    fontFamily: SCDream6,
  },
});

export default index;
