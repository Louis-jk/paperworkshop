import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Keyboard,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';

import {useSelector} from 'react-redux';

import Header from '../Common/Header';
import MessageAPI from '../../src/api/Messgae';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const {mb_id} = useSelector((state) => state.UserInfoReducer);

  const [category01, setCategory01] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const [isLoading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);

  const getMessageRoomAPI = () => {
    setLoading(true);
    MessageAPI.onChatList(mb_id)

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
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getMessageRoomAPI();
  }, []);

  console.log('list', list);

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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MessageDetail')}
            activeOpacity={0.8}>
            <View style={[styles.wrap, styles.msgBox]}>
              <View style={styles.flexRow}>
                <Image
                  source={require('../../src/images/person01.jpg')}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginRight: 20,
                  }}
                />
                <View style={{flex: 2}}>
                  <Text style={[styles.msgInfoName, styles.normalText]}>
                    삼보인쇄
                  </Text>
                  <Text
                    style={[styles.msgInfoContent, styles.normalText]}
                    numberOfLines={1}>
                    안녕하세요. 박스견적 문의 드릴게 있어요 ...
                  </Text>
                </View>
                <View style={{position: 'relative'}}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image
                      source={require('../../src/assets/icon_close01.png')}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        marginBottom: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MessageDetail')}
            activeOpacity={0.8}>
            <View style={[styles.wrap, styles.msgBox]}>
              <View style={styles.flexRow}>
                <Image
                  source={require('../../src/images/package02.jpg')}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginRight: 20,
                  }}
                />
                <View style={{flex: 2}}>
                  <Text style={[styles.msgInfoName, styles.normalText]}>
                    업체명
                  </Text>
                  <Text
                    style={[styles.msgInfoContent, styles.normalText]}
                    numberOfLines={1}>
                    안녕하세요. 박스견적 문의 드릴게 있어요 ...
                  </Text>
                </View>
                <View style={{position: 'relative'}}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image
                      source={require('../../src/assets/icon_close01.png')}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        marginBottom: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MessageDetail')}
            activeOpacity={0.8}>
            <View style={[styles.wrap, styles.msgBox]}>
              <View style={styles.flexRow}>
                <Image
                  source={require('../../src/images/package03.jpg')}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginRight: 20,
                  }}
                />
                <View style={{flex: 2}}>
                  <Text style={[styles.msgInfoName, styles.normalText]}>
                    업체명
                  </Text>
                  <Text
                    style={[styles.msgInfoContent, styles.normalText]}
                    numberOfLines={1}>
                    안녕하세요. 박스견적 문의 드릴게 있어요 ...
                  </Text>
                </View>
                <View style={{position: 'relative'}}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image
                      source={require('../../src/assets/icon_close01.png')}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        marginBottom: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  msgBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    marginBottom: 5,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  msgInfoName: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  msgInfoContent: {
    fontSize: 13,
    color: '#000000',
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
