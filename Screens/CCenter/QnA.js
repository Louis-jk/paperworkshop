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

import Header from '../Common/Header';

const QnA = (props) => {
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
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* 상단 탭 메뉴 Area */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CCenterNotice')}
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
                공지사항
              </Text>
            </TouchableOpacity>

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
            <View style={{ position: 'relative' }}>
              <Text
                style={[
                  styles.mediumText,
                  {
                    fontSize: 16,
                    marginRight: 20,
                    color: '#000000',
                  },
                ]}>
                1:1문의
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
          </View>
          {/* // 상단 탭 메뉴 Area */}

          {/* 문의 등록 Area */}
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            onPress={() => navigation.navigate('CCenterQnAwrite')}
            style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'SCDream4', fontSize: 13, color: '#275696' }}>
              문의 등록
            </Text>
            <Image
              source={require('../../src/assets/icon_plus_02.png')}
              resizeMode="contain"
              style={{ width: 18, height: 18, marginLeft: 5 }}
            />
          </TouchableOpacity>
          {/* // 문의 등록 Area */}
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
        {/* 카테고리 리스트 */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenterQnADetail', { status: 'yet' })}>
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
                  <Text style={styles.categoryBtnTxt}>미답변</Text>
                </View>
                <Text style={styles.new}>NEW</Text>
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
            <Text style={styles.categoryTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{ height: 0.5, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3' }}
        />
        {/* // 카테고리 리스트 */}
        {/* 카테고리 리스트 */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenterQnADetail', { status: 'yet' })}>
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
                  <Text style={styles.categoryBtnTxt}>미답변</Text>
                </View>
                <Text style={styles.new}>NEW</Text>
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
            <Text style={styles.categoryTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{ height: 0.5, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3' }}
        />
        {/* // 카테고리 리스트 */}
        {/* 카테고리 리스트 */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenterQnADetail', { status: 'yet' })}>
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
                  <Text style={styles.categoryBtnTxt}>미답변</Text>
                </View>
                <Text style={styles.new}>NEW</Text>
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
            <Text style={styles.categoryTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{ height: 0.5, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3' }}
        />
        {/* // 카테고리 리스트 */}

        {/* 카테고리 리스트 */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenterQnADetail', { status: 'done' })}>
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
                <View style={styles.categoryBtn02}>
                  <Text style={styles.categoryBtnTxt02}>답변완료</Text>
                </View>
                {/* <Text style={styles.new}>NEW</Text> */}
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
            <Text style={styles.categoryTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{ height: 0.5, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3' }}
        />
        {/* // 카테고리 리스트 */}
        {/* 카테고리 리스트 */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenterQnADetail', { status: 'done' })}>
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
                <View style={styles.categoryBtn02}>
                  <Text style={styles.categoryBtnTxt02}>답변완료</Text>
                </View>
                {/* <Text style={styles.new}>NEW</Text> */}
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
            <Text style={styles.categoryTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{ height: 0.5, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3' }}
        />
        {/* // 카테고리 리스트 */}
        {/* 카테고리 리스트 */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenterQnADetail', { status: 'done' })}>
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
                <View style={styles.categoryBtn02}>
                  <Text style={styles.categoryBtnTxt02}>답변완료</Text>
                </View>
                {/* <Text style={styles.new}>NEW</Text> */}
              </View>
              <Text style={styles.categoryDate}>2020.11.01</Text>
            </View>
            <Text style={styles.categoryTitle}>중소기업 선물용 쇼핑백 제작 요청합니다.</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{ height: 0.5, width: Dimensions.get('window').width, backgroundColor: '#E3E3E3' }}
        />
        {/* // 카테고리 리스트 */}
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#275696',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginRight: 7,
  },
  categoryBtnTxt: {
    fontFamily: 'SCDream4',
    fontSize: 11,
    color: '#275696',
  },
  categoryBtn02: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginRight: 7,
  },
  categoryBtnTxt02: {
    fontFamily: 'SCDream4',
    fontSize: 11,
    color: '#000000',
  },
  new: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#366DE5',
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

export default QnA;
