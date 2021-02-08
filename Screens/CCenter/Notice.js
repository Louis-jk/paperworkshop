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
} from 'react-native';

import Header from '../Common/HeaderNotSearch';

const Notice = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [visibleStep01, setVisibleStep01] = React.useState(false);
  const [step01, setStep01] = React.useState('');

  const toggleMenu01 = () => {
    setVisibleStep01((prev) => !prev);
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <View style={{ paddingHorizontal: 20, backgroundColor: '#fff' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Text
            style={[
              styles.boldText,
              {
                fontSize: 16,
                marginRight: 20,
                color: '#000000',
              },
            ]}>
            공지사항
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('CCenter')}
            activeOpacity={0.8}
            hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 16,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              FAQ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('CCenterQnA')}
            activeOpacity={0.8}
            hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 16,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              1:1문의
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
              placeholder="제목을 입력해주세요."
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
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 공지사항 리스트 */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenterNoticeDetail')}>
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
                <Text style={styles.categoryTitle}>공지사항 제목입니다.</Text>
                <Text style={styles.new}>NEW</Text>
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{ height: 0.5, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3' }}
        />
        {/* // 공지사항 리스트 */}
        {/* 공지사항 리스트 */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenterNoticeDetail')}>
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
                <Text style={styles.categoryTitle}>공지사항 제목입니다.</Text>
                <Text style={styles.new}>NEW</Text>
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{ height: 0.5, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3' }}
        />
        {/* // 공지사항 리스트 */}
        {/* 공지사항 리스트 */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenterNoticeDetail')}>
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
                <Text style={styles.categoryTitle}>공지사항 제목입니다.</Text>
                <Text style={styles.new}>NEW</Text>
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{ height: 0.5, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3' }}
        />
        {/* // 공지사항 리스트 */}
        {/* 공지사항 리스트 */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenterNoticeDetail')}>
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
                <Text style={styles.categoryTitle}>공지사항 제목입니다.</Text>
                <Text style={styles.new}>NEW</Text>
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{ height: 0.5, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3' }}
        />
        {/* // 공지사항 리스트 */}
        {/* 공지사항 리스트 */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenterNoticeDetail')}>
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
                <Text style={styles.categoryTitle}>공지사항 제목입니다.</Text>
                <Text style={styles.new}>NEW</Text>
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{ height: 0.5, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3' }}
        />
        {/* // 공지사항 리스트 */}
      </ScrollView>
      {visibleStep01 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ zIndex: 1000 }}
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
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>일반인쇄</Text>
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
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>패키지</Text>
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
            <Text style={{ fontSize: 14, fontFamily: 'SCDream4' }}>기타인쇄</Text>
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
    fontFamily: 'SCDream4',
    fontSize: 11,
    color: '#fff',
  },
  new: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#366DE5',
    marginLeft: 10,
  },
  categoryTitle: {
    fontFamily: 'SCDream5',
    fontSize: 14,
    color: '#000',
  },
  categoryDate: {
    fontFamily: 'SCDream4',
    fontSize: 13,
    color: '#A2A2A2',
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

export default Notice;
