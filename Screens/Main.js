import * as React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {SliderBox} from 'react-native-image-slider-box';
import Slider from '@react-native-community/slider';
import Carousel from 'react-native-snap-carousel';

const Main = () => {
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const [currentRqIndex, setCurrentRqIndex] = React.useState(1);
  const [stepPercent, setStepPercent] = React.useState(1);
  const [currentBnIndex, setCurrentBnIndex] = React.useState(1);

  const imageList = [
    require('../src/images/main_img01.jpg'),
    require('../src/images/main_img02.jpg'),
    require('../src/images/main_img03.jpg'),
  ];

  const rqImageList = [
    require('../src/images/s_img01.jpg'),
    require('../src/images/s_img02.jpg'),
    require('../src/images/s_img03.jpg'),
  ];

  const bannerList = [
    require('../src/images/img08.jpg'),
    require('../src/images/img09.jpg'),
    require('../src/images/img10.jpg'),
  ];

  const rqContent = [
    {
      id: 1,
      title: '견적요청',
      step: 'STEP 1',
      description:
        '간단견적만 작성하신다면 나머지는 페이퍼공작소가 도와드리겠습니다.',
      info: '세부견적까지 작성하신다면 견적요청은 즉시 OK!',
    },
    {
      id: 2,
      title: '견적요청',
      step: 'STEP 2',
      description:
        '간단견적만 작성하신다면 나머지는 페이퍼공작소가 도와드리겠습니다.',
      info: '세부견적까지 작성하신다면 견적요청은 즉시 OK!',
    },
    {
      id: 3,
      title: '견적요청',
      step: 'STEP 3',
      description:
        '간단견적만 작성하신다면 나머지는 페이퍼공작소가 도와드리겠습니다.',
      info: '세부견적까지 작성하신다면 견적요청은 즉시 OK!',
    },
  ];

  React.useEffect(() => {
    let initialPer = 1 / rqImageList.length;
    setStepPercent(initialPer);
    return () => {
      setStepPercent();
    };
  }, []);

  const onPress = () => {
    Alert.alert('견적바로가기', '작동완료', [
      {
        text: '확인',
      },
    ]);
  };

  return (
    <>
      <StatusBar hidden={true} />
      <ScrollView>
        {/* 메인 상단 슬라이더 section */}
        <View
          style={{
            width: Dimensions.get('window').width,
            marginBottom: 30,
          }}>
          <View style={{position: 'relative', height: 400}}>
            <SliderBox
              autoplay={true} //자동 슬라이드 넘김
              circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
              resizeMode="cover" // 이미지 사이즈 조절값
              images={imageList} // 이미지 주소 리스트
              dotColor="rgba(0,0,0,0)" // 아래 점 투명으로 안보이게 가림
              inactiveDotColor="rgba(0,0,0,0)"
              paginationBoxVerticalPadding={50}
              ImageComponentStyle={{
                width: Dimensions.get('window').width,
                opacity: 0.6,
                backgroundColor: '#fff',
              }} // 이미지 Style 적용
              sliderBoxHeight={400}
              currentImageEmitter={(index) => {
                // 이미지가 바뀔때 어떤 동작을 할지 설정
                setCurrentIndex(index + 1);
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 250,
                left: 0,
                paddingTop: 4,
                paddingRight: 6,
                paddingBottom: 4,
                paddingLeft: 10,
                borderTopRightRadius: 14,
                borderBottomRightRadius: 14,
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}>
              <Text style={{fontSize: 14, color: '#ffffff'}}>
                {/* //총 이미지 갯수중 현재 index가 몇인지를 나타낸다 */}0
                {currentIndex}/0{imageList.length}
              </Text>
            </View>
            <Text
              style={{
                position: 'absolute',
                top: 10,
                left: 20,
                fontSize: 22,
                fontWeight: 'bold',
                letterSpacing: -2,
              }}>
              페이퍼공작소
            </Text>
            <Image
              source={require('../src/images/search_icon.png')}
              resizeMode="contain"
              style={{
                position: 'absolute',
                top: 17,
                right: 80,
                width: 25,
                height: 25,
              }}
            />
            <Image
              source={require('../src/images/menu.png')}
              resizeMode="contain"
              style={{
                position: 'absolute',
                top: 17,
                right: 30,
                width: 25,
                height: 25,
              }}
            />
            <View
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: Dimensions.get('window').width - 20,
                height: 100,
                backgroundColor: '#275696',
                borderTopLeftRadius: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 25,
                  paddingHorizontal: 20,
                }}>
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                    }}>
                    총 누적 견적
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginRight: 5,
                      }}>
                      252,154
                    </Text>
                    <Text
                      style={{color: '#fff', fontSize: 20, fontWeight: '100'}}>
                      건
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      borderWidth: 2,
                      borderColor: '#fff',
                      borderRadius: 30,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                      }}>
                      <Image
                        source={require('../src/images/clipboard.png')}
                        resizeMode="contain"
                        style={{
                          width: 19,
                          height: 19,
                          marginRight: 5,
                          marginTop: 3,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#fff',
                        }}>
                        견적받기
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 40,
              paddingHorizontal: 40,
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 140,
                  backgroundColor: '#F5F5F5',
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../src/images/shopping-bag.png')}
                  resizeMode="contain"
                  style={{
                    position: 'absolute',
                    width: 60,
                    height: 65,
                    zIndex: 1,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  letterSpacing: -2,
                  marginBottom: 3,
                }}>
                패키지
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#979797',
                  letterSpacing: -1,
                  marginBottom: 10,
                }}>
                단상자/싸바리/쇼핑백 등
              </Text>
              <TouchableWithoutFeedback onPress={onPress}>
                <View style={{backgroundColor: '#275696', borderRadius: 20}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      paddingVertical: 7,
                      paddingHorizontal: 13,
                    }}>
                    견적 바로가기
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 140,
                  backgroundColor: '#F5F5F5',
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../src/images/flyer.png')}
                  resizeMode="contain"
                  style={{
                    position: 'absolute',
                    width: 60,
                    height: 65,
                    zIndex: 1,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  letterSpacing: -2,
                  marginBottom: 3,
                }}>
                일반인쇄
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#979797',
                  letterSpacing: -1,
                  marginBottom: 10,
                }}>
                리플렛/브로슈어/포스터 등
              </Text>
              <TouchableWithoutFeedback onPress={onPress}>
                <View style={{backgroundColor: '#275696', borderRadius: 20}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      paddingVertical: 7,
                      paddingHorizontal: 13,
                    }}>
                    견적 바로가기
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        {/* // 메인 상단 슬라이더 section */}
        {/* 페이퍼 공작소 제작 과정 section */}
        <View
          style={{
            paddingTop: 50,
            paddingBottom: 30,
            backgroundColor: '#F5F5F5',
            position: 'relative',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 30,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                letterSpacing: -2,
              }}>
              페이퍼공작소의 제작 과정
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#275696'}}>
                0{currentRqIndex}
                {/* //총 이미지 갯수중 현재 index가 몇인지를 나타낸다 */}
              </Text>
              <View
                style={{
                  width: 65,
                  height: 2,
                  backgroundColor: '#C1C1C1',
                  marginHorizontal: 5,
                  position: 'relative',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: stepPercent === 1 ? '100%' : `${stepPercent * 100}%`,
                    height: 2,
                    backgroundColor: '#275696',
                  }}
                />
              </View>
              {/* <Slider
                style={{width: 80, height: 40}}
                minimumValue={0}
                maximumValue={1}
                value={stepPercent}
                minimumTrackTintColor="#275696"
                maximumTrackTintColor="#C1C1C1"
              /> */}
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#C1C1C1'}}>
                0{imageList.length}
              </Text>
            </View>
          </View>
          <View>
            <SliderBox
              autoplay={false} //자동 슬라이드 넘김
              circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
              resizeMode="cover" // 이미지 사이즈 조절값
              images={rqImageList} // 이미지 주소 리스트
              dotColor="rgba(0,0,0,0)" // 아래 점 투명으로 안보이게 가림
              inactiveDotColor="rgba(0,0,0,0)"
              ImageComponentStyle={{
                width: Dimensions.get('window').width - 40,
                height: 350,
                backgroundColor: '#fff',
              }} // 이미지 Style 적용
              currentImageEmitter={(index) => {
                // 이미지가 바뀔때 어떤 동작을 할지 설정
                console.log('index ? ', index);
                setCurrentRqIndex(index + 1);
                let stp = (currentRqIndex + 1) / rqImageList.length;
                console.log('stp', stp);
                if (stp > 1) {
                  stp = 1 / rqImageList.length;
                }
                setStepPercent(stp);
              }}
            />
          </View>
        </View>
        {/* // 페이퍼 공작소 제작 과정 section */}
        {/* 배너 광고 section */}
        <View
          style={{
            paddingVertical: 30,
            backgroundColor: '#FFF',
            position: 'relative',
          }}>
          <View>
            <SliderBox
              autoplay={true} //자동 슬라이드 넘김
              circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
              resizeMode="cover" // 이미지 사이즈 조절값
              images={bannerList} // 이미지 주소 리스트
              dotColor="rgba(39, 86, 150, 1)"
              inactiveDotColor="rgba(200, 200, 200, 1)"
              ImageComponentStyle={{
                width: Dimensions.get('window').width - 40,
                borderRadius: 7,
                backgroundColor: '#fff',
              }} // 이미지 Style 적용
              sliderBoxHeight={120}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: 'rgba(200, 200, 200, 1)',
              }}
            />
          </View>
        </View>
        {/* // 배너 광고 section */}
        {/* 파트너스 section */}
        <View
          style={{
            paddingVertical: 30,
            backgroundColor: '#F5F5F5',
            position: 'relative',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 30,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                letterSpacing: -2,
              }}>
              파트너스
            </Text>
            <Image
              source={require('../src/images/next.png')}
              resizeMode="contain"
              style={{width: 17, height: 20}}
            />
          </View>
          <View>
            <Text>성실파트너스</Text>
          </View>
        </View>
        {/* // 파트너스 section */}
      </ScrollView>
    </>
  );
};

export default Main;
