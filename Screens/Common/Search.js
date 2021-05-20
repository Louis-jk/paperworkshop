import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  Alert,
  FlatList,
  Keyboard,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import moment from 'moment';
import 'moment/locale/ko';
import StarRating from 'react-native-star-rating';
import AutoHeightImage from 'react-native-auto-height-image';

import SearchAPI from '../../src/api/Search';
import {useSelector} from 'react-redux';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const Search = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const keywordRef = React.useRef(null);

  const [isLoading, setLoading] = React.useState(false);
  const [keyword, setKeyword] = React.useState(null); // 검색어 담기
  const [historyKeyword, setHistoryKeyword] = React.useState([]); // 히스토리 검색어 저장
  const [searchResult, setSearchResult] = React.useState([]); // 전체 검색 결과
  const [isVisibleResult, setVisibleResult] = React.useState(false); // 검색 결과 보이기
  const [isVisiblekeyword, setVisibleKeyword] = React.useState(true); // 히스토리 검색어 보이기

  const {mb_id} = useSelector((state) => state.UserInfoReducer);

  // 검색 결과
  const getSearchResultAPI = () => {
    setLoading(true);
    SearchAPI.getSearchResult(keyword)
      .then((res) => {
        console.log('검색 결과', res);
        if (res.data.result === '1') {
          setSearchResult(res.data.item);
          setVisibleResult(true);
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

  console.log('searchResult', searchResult);
  console.log('searchResult notice', searchResult.notice);

  // 검색어 입력 및 히스토리 저장
  const sendSearchAPI = () => {
    setLoading(true);
    if (!keyword) {
      setVisibleResult(false);
      setVisibleKeyword(true);
      getSearchHistoryAPI();
      keywordRef.current.focus();
      setLoading(false);
    } else {
      SearchAPI.getSearchHistory(mb_id, '', keyword, 'y', '')
        .then((res) => {
          if (res.data.result === '1') {
            setHistoryKeyword(res.data.item);
            setVisibleKeyword(false);
            setLoading(false);
          }
        })
        .then(() => getSearchResultAPI())
        .catch((err) => {
          Alert.alert(err, '관리자에게 문의하세요', [
            {
              text: '확인',
            },
          ]);
          setLoading(false);
        });
    }
  };

  // 검색어 삭제(히스토리)
  const delSearchKeywordAPI = (id) => {
    SearchAPI.getSearchHistory(mb_id, id, '', '', 'y')
      .then((res) => {
        if (res.data.result === '1') {
          setHistoryKeyword(res.data.item);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  // 검색어 히스토리 불어오기
  const getSearchHistoryAPI = () => {
    SearchAPI.getSearchHistory(mb_id, '', '', '', '')
      .then((res) => {
        if (res.data.result === '1') {
          setHistoryKeyword(res.data.item);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  React.useEffect(() => {
    getSearchHistoryAPI();
    setVisibleKeyword(true);
    setVisibleResult(false);
    setKeyword(null);
  }, []);

  console.log('historyKeyword', historyKeyword);

  // const resultRender = ({item, index}) => {
  //   return (
  //     <>
  //       {item.notice !== null ? (
  //         <>
  //           <TouchableOpacity
  //             key={index}
  //             style={{paddingHorizontal: 20}}
  //             activeOpacity={0.8}
  //             onPress={() =>
  //               navigation.navigate('CCenterNoticeDetail', {item: item.notice})
  //             }>
  //             <View style={styles.categoryWrap}>
  //               <View
  //                 style={{
  //                   justifyContent: 'flex-start',
  //                   alignItems: 'flex-start',
  //                 }}>
  //                 <View
  //                   style={{
  //                     flexDirection: 'row',
  //                     justifyContent: 'flex-start',
  //                     alignItems: 'center',
  //                     marginBottom: 12,
  //                   }}>
  //                   <Text style={styles.categoryTitle}>
  //                     {item.notice.title}
  //                   </Text>
  //                   {/* <Text style={styles.new}>
  //                     {item.notice.new_yn === 'Y' ? 'NEW' : null}
  //                   </Text> */}
  //                 </View>
  //                 <Text style={styles.categoryDate}>
  //                   {item.notice.datetime}
  //                 </Text>
  //               </View>
  //             </View>
  //           </TouchableOpacity>
  //           <View
  //             style={{
  //               height: 0.5,
  //               width: Dimensions.get('window').width,
  //               backgroundColor: '#E3E3E3',
  //             }}
  //           />
  //         </>
  //       ) : null}
  //     </>
  //   );
  // };

  const renderRow = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback
          onPress={() => setKeyword(item.keyword)}
          key={item.id}>
          <View
            style={[styles.fRowSBAC, styles.pdV10, {flex: 1, marginRight: 20}]}>
            <Text style={styles.searchKeyword}>{item.keyword}</Text>
            <Text style={styles.searchDate}>
              {moment(item.created_at).format('YYYY.MM.DD h:mm')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            delSearchKeywordAPI(item.id);
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 18,
              height: 18,
              borderRadius: 18,
              backgroundColor: '#EFEFEF',
            }}>
            <Image
              source={require('../../src/assets/icon_close02.png')}
              resizeMode="cover"
              style={{
                width: 10,
                height: 10,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.headerCtrl}>
            <View style={{paddingVertical: 10, paddingRight: 3}}>
              <Image
                source={require('../../src/assets/arr02.png')}
                resizeMode="cover"
                style={{
                  width: 20,
                  height: 30,
                }}
              />
            </View>

            <Image
              source={require('../../src/assets/logo02.png')}
              resizeMode="contain"
              style={{width: 125, height: 30}}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#DEDEDE',
            borderRadius: 5,
            paddingHorizontal: 10,
          }}>
          <TextInput
            ref={keywordRef}
            value={keyword}
            placeholder="검색어를 입력해주세요."
            placeholderTextColor="#BEBEBE"
            onChangeText={(text) => setKeyword(text)}
            autoFocus={false}
            style={[styles.normalText, {width: '80%'}]}
            onSubmitEditing={() => sendSearchAPI()}
            autoCapitalize="none"
          />
          {keyword ? 
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setKeyword(null);
              getSearchHistoryAPI();
              setVisibleKeyword(true);
              setVisibleResult(false);
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 23,
                height: 23,
                borderRadius: 23,
                backgroundColor: '#EFEFEF',
              }}>
              <Image
                source={require('../../src/assets/icon_close02.png')}
                resizeMode="cover"
                style={{
                  width: 15,
                  height: 15,
                }}
                fadeDuration={1000}
              />
            </View>
          </TouchableOpacity>
          : null}
          <TouchableOpacity activeOpacity={1} onPress={() => sendSearchAPI()}>
            <Image
              source={require('../../src/assets/top_seach.png')}
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          height: Dimensions.get('window').height,
        }}>
        {isVisiblekeyword && (
          <View style={{paddingHorizontal: 20, marginTop: 10}}>
            <Text style={styles.searchTitle}>검색기록</Text>
            <View style={styles.searchWrap}>
              {/* 검색어 히스토리 리스트 */}

              <FlatList
                data={historyKeyword}
                renderItem={renderRow}
                keyExtractor={(list, index) => index.toString()}
                numColumns={1}
                // pagingEnabled={true}
                persistentScrollbar={true}
                showsVerticalScrollIndicator={false}
                progressViewOffset={true}
                refreshing={true}
                style={{backgroundColor: '#fff'}}
                ListEmptyComponent={
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                      height: Dimensions.get('window').height - 300,
                    }}>
                    <Text style={{fontFamily: SCDream4}}>
                      검색하신 내역이 없습니다.
                    </Text>
                  </View>
                }
              />

              {/* // 검색어 히스토리 리스트 */}
            </View>
          </View>
        )}

        {isLoading ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              flex: 1,
              height: Dimensions.get('window').height - 200,
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
            style={styles.container02}
            showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <View>
                {/* 검색 결과 리스트 */}

                {isVisibleResult &&
                  searchResult.notice.length === 0 &&
                  searchResult.event.length === 0 &&
                  searchResult.gallery.length === 0 &&
                  searchResult.info.length === 0 &&
                  searchResult.review.length === 0 && (
                    <View
                      style={{
                        flex: 1,
                        height: Dimensions.get('window').height - 300,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.normalText}>
                        검색어에 일치하는 내용물이 없습니다.
                      </Text>
                    </View>
                  )}

                {/* 공지사항 출력 부분 */}
                {isVisibleResult && searchResult !== null ? (
                  searchResult.notice.length > 0 ? (
                    <View style={{paddingHorizontal: 20}}>
                      <Text style={[styles.searchSubTitle]}>공지사항</Text>
                    </View>
                  ) : null
                ) : null}
                {isVisibleResult &&
                searchResult !== null &&
                searchResult.notice.length > 0
                  ? searchResult.notice.map((notice, index) => (
                      <>
                        <TouchableOpacity
                          key={`${notice.id}${index}`}
                          style={{paddingHorizontal: 20}}
                          activeOpacity={0.8}
                          onPress={() =>
                            navigation.navigate('Ccenter', {
                              screen: 'CCenterNoticeDetail',
                              params: {
                                item: notice,
                              },
                            })
                          }>
                          <View style={styles.categoryWrap}>
                            <View
                              style={{
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                  marginBottom: 12,
                                }}>
                                <Text style={styles.categoryTitle}>
                                  {notice.title}
                                </Text>
                                <Text style={styles.new}>
                                  {notice.new_yn === 'Y' ? 'NEW' : null}
                                </Text>
                              </View>
                              <Text style={styles.categoryDate}>
                                {moment(notice.datetime).format('YYYY.MM.DD')}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                        <View
                          style={{
                            height: 0.5,
                            width: Dimensions.get('window').width,
                            backgroundColor: '#E3E3E3',
                          }}
                        />
                      </>
                    ))
                  : null}
                {/* // 공지사항 출력 부분 */}

                {/* 이벤트 출력 부분 */}
                {isVisibleResult && searchResult !== null ? (
                  searchResult.event.length > 0 ? (
                    <View
                      style={{
                        paddingHorizontal: 20,
                        marginTop: 20,
                        marginBottom: 15,
                      }}>
                      <Text style={styles.searchSubTitle}>이벤트</Text>
                    </View>
                  ) : null
                ) : null}
                {isVisibleResult &&
                searchResult !== null &&
                searchResult.event.length > 0
                  ? searchResult.event.map((event, index) => (
                      <TouchableOpacity
                        key={`${event.id}${index}`}
                        activeOpacity={0.8}
                        onPress={() =>
                          navigation.navigate('Event', {
                            screen: 'EventWebView',
                            params: {
                              id: event.id,
                              description: event.description,
                            },
                          })
                        }
                        style={{paddingHorizontal: 20, marginBottom: 20}}>
                        <AutoHeightImage
                          source={{uri: `${event.event_img}`}}
                          width={Dimensions.get('window').width - 40}
                          style={{marginBottom: 10}}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: 10,
                          }}>
                          <Text
                            style={[
                              styles.boldText,
                              {fontSize: 16, marginRight: 5},
                            ]}>
                            {event.title}
                          </Text>
                          <Text
                            style={[
                              styles.mediumText,
                              {fontSize: 14, color: '#366DE5'},
                            ]}>
                            NEW
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.normalText,
                            {
                              fontSize: 14,
                              lineHeight: 20,
                              width: '100%',
                              marginBottom: 5,
                            },
                          ]}>
                          {event.description}
                        </Text>
                      </TouchableOpacity>
                    ))
                  : null}
                {/* // 이벤트 출력 부분 */}

                {isVisibleResult &&
                  searchResult !== null &&
                  searchResult.event.length > 0 && (
                    <View
                      style={{
                        height: 0.5,
                        width: Dimensions.get('window').width,
                        backgroundColor: '#E3E3E3',
                      }}
                    />
                  )}

                {/* 갤러리 출력 부분 */}
                {isVisibleResult && searchResult !== null ? (
                  searchResult.gallery.length > 0 ? (
                    <View style={{paddingHorizontal: 20, marginTop: 20}}>
                      <Text style={styles.searchSubTitle}>
                        인쇄/패키지 갤러리
                      </Text>
                    </View>
                  ) : null
                ) : null}
                {isVisibleResult &&
                searchResult !== null &&
                searchResult.gallery.length > 0
                  ? searchResult.gallery.map((gallery, index) => (
                      <>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() =>
                            navigation.navigate('Gallery', {
                              screen: 'GalleryWebView',
                              params: {
                                id: gallery.id,
                                description: gallery.description,
                                businessName: gallery.company,
                              },
                            })
                          }
                          key={gallery.id}
                          style={{paddingHorizontal: 20}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              marginVertical: 10,
                            }}>
                            <View style={{flex: 1, marginRight: 20}}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                  marginBottom: 5,
                                }}>
                                <Text
                                  style={[
                                    styles.normalText,
                                    {fontSize: 12, marginRight: 5},
                                  ]}>
                                  {gallery.company}
                                </Text>
                                {gallery.new_yn === 'Y' && (
                                  <Text
                                    style={[
                                      styles.mediumText,
                                      {fontSize: 12, color: '#366DE5'},
                                    ]}>
                                    NEW
                                  </Text>
                                )}
                              </View>
                              <Text
                                style={[
                                  styles.boldText,
                                  {
                                    fontSize: 14,
                                    lineHeight: 20,
                                    width: '100%',
                                    marginBottom: 5,
                                  },
                                ]}
                                numberOfLines={1}>
                                {gallery.decription}
                              </Text>
                            </View>
                            <View>
                              <Image
                                source={{uri: `${gallery.portfolioImg}`}}
                                resizeMode="cover"
                                style={{width: 50, height: 50, borderRadius: 5}}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <View
                          style={{
                            height: 0.5,
                            width: Dimensions.get('window').width,
                            backgroundColor: '#E3E3E3',
                          }}
                        />
                      </>
                    ))
                  : null}
                {/* // 갤러리 출력 부분 */}

                {/* 유용한정보 출력 부분 */}
                {isVisibleResult && searchResult !== null ? (
                  searchResult.info.length > 0 ? (
                    <View style={{paddingHorizontal: 20, marginTop: 20}}>
                      <Text style={styles.searchSubTitle}>유용한 정보</Text>
                    </View>
                  ) : null
                ) : null}
                {isVisibleResult &&
                searchResult !== null &&
                searchResult.info.length > 0
                  ? searchResult.info.map((info, index) => (
                      <>
                        <TouchableOpacity
                          key={info.id}
                          style={{paddingHorizontal: 20}}
                          activeOpacity={0.8}
                          onPress={() =>
                            navigation.navigate('Story', {
                              screen: 'StoryTipsDetail',
                              params: {
                                item: info,
                              },
                            })
                          }>
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
                                  <Text style={styles.categoryBtnTxt}>
                                    {info.ca_name}
                                  </Text>
                                </View>
                                <Text style={styles.new}>
                                  {info.new_yn === 'Y' ? 'NEW' : null}
                                </Text>
                              </View>
                              <Text style={styles.categoryDate}>
                                {moment(info.datetime).format('YYYY.MM.DD')}
                              </Text>
                            </View>
                            <Text style={styles.categoryTitle}>
                              {info.title}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <View
                          style={{
                            height: 0.5,
                            width: Dimensions.get('window').width,
                            backgroundColor: '#E3E3E3',
                          }}
                        />
                      </>
                    ))
                  : null}
                {/* // 유용한정보 출력 부분 */}

                {/* 고객후기 출력 부분 */}
                {isVisibleResult && searchResult !== null ? (
                  searchResult.review.length > 0 ? (
                    <View style={{paddingHorizontal: 20, marginTop: 20}}>
                      <Text style={styles.searchSubTitle}>고객후기</Text>
                    </View>
                  ) : null
                ) : null}
                {isVisibleResult &&
                searchResult !== null &&
                searchResult.review.length > 0
                  ? searchResult.review.map((review, index) => (
                      <View style={{paddingHorizontal: 20}}>
                        <TouchableOpacity
                          key={review.id}
                          activeOpacity={0.8}
                          onPress={() =>
                            navigation.navigate('Review', {
                              screen: 'ReviewDetail',
                              params: {
                                reviewID: review.id,
                                companyId: review.company_id,
                              },
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
                              alignItems: 'flex-start',
                              marginBottom: 20,
                              paddingTop: 20,
                              paddingHorizontal: 20,
                              paddingBottom: 10,
                            }}>
                            <ImageBackground
                              source={{uri: `${review.bf_file[0]}`}}
                              resizeMode="cover"
                              style={{
                                width: 75,
                                height: 70,
                                position: 'relative',
                              }}>
                              {review.img_cnt !== '0' && (
                                <Text
                                  style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    fontSize: 10,
                                    backgroundColor: 'rgba(0,0,0,0.45)',
                                    color: '#fff',
                                    padding: 5,
                                  }}>
                                  {`+${review.img_cnt}`}
                                </Text>
                              )}
                            </ImageBackground>
                            <View style={{flexShrink: 2, marginLeft: 20}}>
                              <Text
                                style={[
                                  styles.boldText,
                                  {fontSize: 14, marginBottom: 10},
                                ]}>
                                {review.company_name
                                  ? `${review.company_name}(${review.mb_name} 고객님)`
                                  : `${review.mb_name} 고객님`}
                              </Text>
                              <Text
                                style={[
                                  styles.normalText,
                                  {fontSize: 14, lineHeight: 22},
                                ]}>
                                {review.content}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: '#E3E3E3',
                            }}
                          />
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
                                  {
                                    fontSize: 12,
                                    color: '#707070',
                                    marginBottom: 7,
                                  },
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
                                  rating={Math.floor(review.grade1)}
                                  starSize={12}
                                />
                                <Text
                                  style={[
                                    styles.normalText,
                                    {fontSize: 12, marginLeft: 5},
                                  ]}>
                                  {`${review.grade1}.0`}
                                </Text>
                              </View>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.normalText,
                                  {
                                    fontSize: 12,
                                    color: '#707070',
                                    marginBottom: 7,
                                  },
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
                                  rating={Math.floor(review.grade2)}
                                  starSize={12}
                                />
                                <Text
                                  style={[
                                    styles.normalText,
                                    {fontSize: 12, marginLeft: 5},
                                  ]}>
                                  {`${review.grade2}.0`}
                                </Text>
                              </View>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.normalText,
                                  {
                                    fontSize: 12,
                                    color: '#707070',
                                    marginBottom: 7,
                                  },
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
                                  rating={Math.floor(review.grade3)}
                                  starSize={12}
                                />
                                <Text
                                  style={[
                                    styles.normalText,
                                    {fontSize: 12, marginLeft: 5},
                                  ]}>
                                  {`${review.grade3}.0`}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ))
                  : null}
                {/* // 고객후기 출력 부분 */}

                {/* // 검색 결과 리스트 */}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container02: {
    backgroundColor: '#fff',
  },
  headerCtrl: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  fRowSBAC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pdV10: {
    paddingVertical: 10,
  },
  searchTitle: {
    fontFamily: SCDream6,
    fontSize: 16,
    color: '#000000',
    marginTop: 10,
  },
  searchSubTitle: {
    fontFamily: SCDream6,
    fontSize: 16,
    color: '#000000',
    marginVertical: 10,
  },
  searchWrap: {
    paddingTop: 10,
  },
  searchKeyword: {
    fontFamily: SCDream4,
    fontSize: 14,
    color: '#000000',
  },
  searchDate: {
    fontFamily: SCDream4,
    fontSize: 13,
    color: '#A2A2A2',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    paddingBottom: 150,
  },
  categoryWrap: {
    paddingVertical: 20,
  },
  categoryBtn: {
    backgroundColor: '#275696',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginRight: 5,
  },
  categoryBtnTxt: {
    fontFamily: SCDream4,
    fontSize: 11,
    color: '#fff',
  },
  new: {
    fontFamily: SCDream4,
    fontSize: 12,
    color: '#366DE5',
    marginLeft: 10,
  },
  categoryTitle: {
    fontFamily: SCDream5,
    fontSize: 14,
    color: '#000',
  },
  categoryDate: {
    fontFamily: SCDream4,
    fontSize: 13,
    color: '#A2A2A2',
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

export default Search;
