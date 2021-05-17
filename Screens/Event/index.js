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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';

import Header from './Header';
import Footer from '../Common/Footer';
import EventAPI from '../../src/api/Event';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [isLoading, setLoading] = React.useState(false);
  const [like, setLike] = React.useState(false);
  const [search, setSearch] = React.useState(null);
  const [list, setList] = React.useState([]);
  const onLikeBtn = () => {
    setLike((prev) => !prev);
  };

  const carouselRef = React.useRef(null);

  // 검색 삭제 버튼
  const onSearchCleanHandler = () => {
    setSearch(null);
    getEventListAPI(null);
  };

  // 이벤트 리스트 불러오기
  const getEventListAPI = (payload) => {
    setLoading(true);
    EventAPI.getEvent(payload).then((res) => {
      if (res.data.result === '1') {
        setList(res.data.item);
        setLoading(false);
        console.log('이벤트 res', res);
      }
    });
  };

  React.useEffect(() => {
    getEventListAPI();
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

  const renderRow = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate('EventWebView', {
              id: item.id,
              description: item.description,
            })
          }
          activeOpacity={0.8}
          style={{marginVertical: 20}}>
          <View
            style={{
              position: 'relative',
              backgroundColor: '#fff',
              justifyContent: 'flex-start',
            }}>
            {item.event_img.length > 1 ? (
              <Carousel
                ref={carouselRef}
                data={item.event_img}
                renderItem={renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                loop={true}
              />
            ) : (
              <Image
                key={index}
                source={{uri: `${item.event_img}`}}
                resizeMode="cover"
                style={{width: Dimensions.get('window').width, height: 400}}
              />
            )}

            {/* Swipe Prev,Next 버튼 Custom */}
            {item.event_img.length > 1 && (
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
            )}
            {/* // Swipe Prev,Next 버튼 Custom */}
          </View>
          <View style={{paddingHorizontal: 20}}>
            {/* 이벤트 내용 */}
            <View style={{marginTop: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={[styles.boldText, {fontSize: 16, marginRight: 5}]}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.mediumText, {fontSize: 14, color: '#366DE5'}]}>
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
                {item.description}
              </Text>
            </View>
            {/* // 이벤트 내용 */}
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
            height: Dimensions.get('window').height - 200,
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
            value={search}
            placeholder="이벤트 제목 또는 내용을 입력하세요."
            placeholderTextColor="#BEBEBE"
            autoFocus={false}
            style={[styles.normalText, {width: '80%'}]}
            onChangeText={(text) => setSearch(text)}
            onSubmitEditing={() => getEventListAPI(search)}
            autoCapitalize="none"
          />
          {search ? 
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              onSearchCleanHandler();
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
          : null }
          <TouchableOpacity activeOpacity={1} onPress={() => getEventListAPI()}>
            <Image
              source={require('../../src/assets/top_seach.png')}
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={list}
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
            <Text style={{fontFamily: 'SCDream4'}}>이벤트가 없습니다.</Text>
          </View>
        }
      />
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
