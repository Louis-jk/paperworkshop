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
} from 'react-native';

import moment from 'moment';
import 'moment/locale/ko';
import SearchAPI from '../../src/api/Search';
import {useSelector} from 'react-redux';

const Search = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [keyword, setKeyword] = React.useState(null);
  const [historyKeyword, setHistoryKeyword] = React.useState([]);

  const {mb_id} = useSelector((state) => state.UserInfoReducer);

  // 검색어 입력 및 히스토리 저장
  const sendSearchAPI = () => {
    SearchAPI.getSearchHistory(mb_id, '', keyword, 'y', '')
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
  }, []);

  console.log('historyKeyword', historyKeyword);

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
          key={index}>
          <View
            style={[styles.fRowSBAC, styles.pdV10, {flex: 1, marginRight: 20}]}>
            <Text style={styles.searchKeyword}>{item.keyword}</Text>
            <Text style={styles.searchDate}>
              {moment(item.created_at).format('YYYY.MM.DD h:mm')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => delSearchKeywordAPI(item.id)}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 18,
              height: 18,
              borderRadius: 18,
              backgroundColor: '#E5E5E5',
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

      <ScrollView
        style={styles.container02}
        showsVerticalScrollIndicator={false}>
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
              style={[styles.normalText, {width: '80%'}]}
            />
            <TouchableOpacity activeOpacity={1} onPress={() => sendSearchAPI()}>
              <Image
                source={require('../../src/assets/top_seach.png')}
                resizeMode="contain"
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
          <View>
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
                    <Text style={{fontFamily: 'SCDream4'}}>
                      검색하신 내역이 없습니다.
                    </Text>
                  </View>
                }
              />
              {/* // 검색어 히스토리 리스트 */}
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
