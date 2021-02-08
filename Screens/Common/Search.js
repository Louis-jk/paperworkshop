import React from 'react';
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
} from 'react-native';

import DetailHeader from '../Common/DetailHeader';
import Footer from '../Common/Footer';

// import { WebView } from 'react-native-webview';

const Search = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [keyword, setKeyword] = React.useState(null);

  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.headerCtrl}>
            <View style={{ paddingVertical: 10, paddingRight: 3 }}>
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
              style={{ width: 125, height: 30 }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <ScrollView style={styles.container02} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* <WebView source={{ uri: 'https://reactnative.dev/' }} /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              borderRadius: 5,
              paddingHorizontal: 10,
            }}>
            <TextInput
              value={keyword}
              placeholder="검색어를 입력해주세요."
              placeholderTextColor="#BEBEBE"
              onChangeText={(text) => setKeyword(text)}
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
          <View>
            <Text style={styles.searchTitle}>검색기록</Text>

            <View style={styles.searchWrap}>
              {/* 검색 키워드 */}
              <TouchableWithoutFeedback onPress={() => setKeyword('2단접지')}>
                <View style={[styles.fRowSBAC, styles.pdV10]}>
                  <Text style={styles.searchKeyword}>2단접지</Text>
                  <Text style={styles.searchDate}>2020.02.05 02:55</Text>
                </View>
              </TouchableWithoutFeedback>
              {/* // 검색 키워드 */}
              {/* 검색 키워드 */}
              <TouchableWithoutFeedback onPress={() => setKeyword('3단접지')}>
                <View style={[styles.fRowSBAC, styles.pdV10]}>
                  <Text style={styles.searchKeyword}>3단접지</Text>
                  <Text style={styles.searchDate}>2020.02.05 02:55</Text>
                </View>
              </TouchableWithoutFeedback>
              {/* // 검색 키워드 */}
              {/* 검색 키워드 */}
              <TouchableWithoutFeedback onPress={() => setKeyword('에어간판')}>
                <View style={[styles.fRowSBAC, styles.pdV10]}>
                  <Text style={styles.searchKeyword}>에어간판</Text>
                  <Text style={styles.searchDate}>2020.02.05 02:55</Text>
                </View>
              </TouchableWithoutFeedback>
              {/* // 검색 키워드 */}
              {/* 검색 키워드 */}
              <TouchableWithoutFeedback onPress={() => setKeyword('명함인쇄')}>
                <View style={[styles.fRowSBAC, styles.pdV10]}>
                  <Text style={styles.searchKeyword}>명함인쇄</Text>
                  <Text style={styles.searchDate}>2020.02.05 02:55</Text>
                </View>
              </TouchableWithoutFeedback>
              {/* // 검색 키워드 */}
              {/* 검색 키워드 */}
              <TouchableWithoutFeedback onPress={() => setKeyword('디지털인쇄')}>
                <View style={[styles.fRowSBAC, styles.pdV10]}>
                  <Text style={styles.searchKeyword}>디지털인쇄</Text>
                  <Text style={styles.searchDate}>2020.02.05 02:55</Text>
                </View>
              </TouchableWithoutFeedback>
              {/* // 검색 키워드 */}
              {/* 검색 키워드 */}
              <TouchableWithoutFeedback onPress={() => setKeyword('오프셋인쇄')}>
                <View style={[styles.fRowSBAC, styles.pdV10]}>
                  <Text style={styles.searchKeyword}>오프셋인쇄</Text>
                  <Text style={styles.searchDate}>2020.02.05 02:55</Text>
                </View>
              </TouchableWithoutFeedback>
              {/* // 검색 키워드 */}
            </View>
          </View>
        </View>
      </ScrollView>
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
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#000000',
    marginTop: 10,
  },
  searchWrap: {
    paddingTop: 10,
  },
  searchKeyword: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000000',
  },
  searchDate: {
    fontFamily: 'SCDream4',
    fontSize: 13,
    color: '#A2A2A2',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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

export default Search;
