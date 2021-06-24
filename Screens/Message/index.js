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
import ChatAPI from '../../src/api/Chat';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const {mb_id} = useSelector((state) => state.UserInfoReducer);

  const [isLoading, setLoading] = React.useState(false);
  const [rooms, setRooms] = React.useState([]);

  // 채팅방 리스트 가져오기
  const getChatRoomListAPI = () => {
    setLoading(true);
    ChatAPI.getChatRoomList(mb_id)
      .then((res) => {
        console.log('chatList', res);
        console.log('mb_id??', mb_id);
        if (res.data.result === '1') {
          setRooms(res.data.item);
        }
        setLoading(false);
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
    const unsubscribe = navigation.addListener('focus', () => {
      getChatRoomListAPI();
    });

    return unsubscribe;
  }, [navigation]);

  // 채팅방 나가기
  const goOutChatRoomAPI = (payload) => {
    ChatAPI.goOutChatRoom(payload)
      .then((res) => {
        if (res.data.result === '1') {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
              onPress: () => getChatRoomListAPI(),
            },
          ]);
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인',
              onPress: () => getChatRoomListAPI(),
            },
          ]);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  // 채팅방 나가기전 체크
  const goOutChatRoomChecking = (payload) => {
    Alert.alert(
      '채팅방을 삭제하시겠습니까?',
      '삭제하시면 대화내용이 영구삭제됩니다.',
      [
        {
          text: '삭제하기',
          onPress: () => goOutChatRoomAPI(payload),
        },
        {
          text: '취소',
        },
      ],
    );
  };

  const renderRow = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item.pm_id}
        onPress={() =>
          navigation.navigate('MessageDetail', {
            screen: 'MessageDetail',
            params: {chatId: item.pe_id, pmId: item.pm_id},
          })
        }
        activeOpacity={0.8}>
        <View style={[styles.wrap, styles.msgBox]}>
          <View style={styles.flexRow}>
            <Image
              source={{uri: `${item.mb_profile}`}}
              resizeMode="cover"
              style={{
                width: 70,
                height: 70,
                borderRadius: 70,
                marginRight: 20,
              }}
            />
            <View style={{flex: 2}}>
              <Text
                style={{...styles.msgInfoName, width: '87%'}}
                numberOfLines={1}>
                {item.company_name}
              </Text>
              <Text
                style={{...styles.msgInfoName, width: '87%'}}
                numberOfLines={1}>
                제목 : {item.title}
              </Text>
              {item.msg ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.msgInfoContent,
                      {fontFamily: 'SCDream5', color: '#275696'},
                    ]}
                    numberOfLines={1}>
                    최신글 :
                  </Text>
                  <Text
                    style={{...styles.msgInfoContent, width: '67%'}}
                    numberOfLines={1}>
                    {' '}
                    {item.msg}
                  </Text>
                </View>
              ) : (
                <Text
                  style={[styles.msgInfoContent, {color: '#b5b5b5'}]}
                  numberOfLines={1}>
                  채팅 내역이 없습니다.
                </Text>
              )}
            </View>
            <View
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
                width: 30,
                height: 30,
              }}>
              <TouchableOpacity
                style={{position: 'absolute', top: 0, right: 0}}
                activeOpacity={0.8}
                onPress={() => goOutChatRoomChecking(item.pm_id)}>
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
      <View style={styles.container}>
        <View style={styles.wrap}>
          <FlatList
            data={rooms}
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
                  height: Dimensions.get('window').height - 200,
                }}>
                <Text style={{fontFamily: 'SCDream4'}}>
                  채팅 내역이 없습니다.
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
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
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  msgInfoContent: {
    fontFamily: 'SCDream4',
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
