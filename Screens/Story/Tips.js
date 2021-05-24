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
} from 'react-native';

import Header from '../Common/Header';
import CcenterAPI from '../../src/api/Ccenter';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const Tips = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [visibleStep01, setVisibleStep01] = React.useState(false);
  const [step01, setStep01] = React.useState('');

  const [isLoading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [keyword, setKeyword] = React.useState(null);

  const toggleMenu01 = () => {
    setVisibleStep01((prev) => !prev);
  };

  const getTipsAPI = (payload) => {
    setLoading(true);
    CcenterAPI.getTips(payload)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setList(res.data.item);
          setLoading(false);
        } else {
          setList();
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
    getTipsAPI();
  }, []);

  const renderRow = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={{paddingHorizontal: 20}}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('StoryTipsDetail', {
              item: item,
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
                  <Text style={styles.categoryBtnTxt}>{item.ca_name}</Text>
                </View>
                <Text style={styles.new}>
                  {item.new_yn === 'Y' ? 'NEW' : null}
                </Text>
              </View>
              <Text style={styles.categoryDate}>{item.datetime}</Text>
            </View>
            <Text style={styles.categoryTitle}>{item.title}</Text>
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
      <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Story')}
            activeOpacity={0.8}
            hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              고객후기
            </Text>
          </TouchableOpacity>

          <View style={{position: 'relative'}}>
            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 15,
                  marginRight: 20,
                },
              ]}>
              유용한정보
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
            onPress={() => navigation.navigate('StoryCreateInfo')}
            activeOpacity={0.8}
            hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
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
              width: '100%',
            }}>
            <TextInput
              value={keyword}
              placeholder="제목을 입력해주세요."
              placeholderTextColor="#BEBEBE"
              autoFocus={false}
              style={[styles.normalText, {width: '80%', height: 50}]}
              onChangeText={(text) => setKeyword(text)}
              onSubmitEditing={() => getTipsAPI(keyword)}
              returnKeyType="search"
              returnKeyLabel="검색"
            />
            {keyword ? 
            <TouchableOpacity
            activeOpacity={1}
              onPress={() => {
                Keyboard.dismiss();
                setKeyword(null);
                getTipsAPI(null);
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                  backgroundColor: '#EFEFEF',
                  marginRight: 7
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
            </TouchableOpacity>
            : null}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                Keyboard.dismiss();
                getTipsAPI(keyword);
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
        data={list}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
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
            <Text style={{fontFamily: SCDream4}}>리뷰가 없습니다.</Text>
          </View>
        }
      />

      {visibleStep01 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{zIndex: 1000}}
          style={{
            position: 'absolute',
            top: 164,
            left: 20,
            backgroundColor: '#fff',
            width: '27.1%',
            zIndex: 1000,
            borderWidth: 1,
            borderColor: '#E3E3E3',
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('일반인쇄');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 15, fontFamily: SCDream4}}>일반인쇄</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('패키지');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 15, fontFamily: SCDream4}}>패키지</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setStep01('기타인쇄');
              setVisibleStep01(false);
            }}>
            <Text style={{fontSize: 15, fontFamily: SCDream4}}>기타인쇄</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
  },
  categoryTitle: {
    fontFamily: SCDream5,
    fontSize: 15,
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

export default Tips;
