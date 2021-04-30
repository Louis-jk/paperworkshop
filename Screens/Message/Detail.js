import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';

import Modal from 'react-native-modal';
import AutoHeightImage from 'react-native-auto-height-image';
import FastImage from 'react-native-fast-image'; // gif 이미지 출력 패키지
import RNFetchBlob from 'rn-fetch-blob'; // 파일 다운로드 패키지
import DocumentPicker from 'react-native-document-picker'; // 파일 업로드 패키지
import {GiftedChat, SystemMessage} from 'react-native-gifted-chat'; // 채팅 패키지

import DetailHeader from '../Common/DetailHeader';
import ChatAPI from '../../src/api/Chat';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const {chatId, pmId} = props.route.params;

  console.log("chatId:::::", chatId);
  console.log("pmId:::::", pmId);

  const {mb_id} = useSelector((state) => state.UserInfoReducer);

  const [isLoading, setLoading] = React.useState(false);
  const [chatHistory, setChatHistory] = React.useState([]); // 채팅 히스토리
  const [message, setMessage] = React.useState(''); // 메세지 텍스트
  const [msgFile, setMsgFile] = React.useState(''); // 채팅 파일(이미지 또는 엑셀, pdf 등) 값
  const [firstDate, setFirstDate] = React.useState(null); // 채팅 최초 시작일
  const [chatDateHistory, setChatDateHistory] = React.useState([]); // 채팅 날짜 갱신일

  // 채팅방 글 히스토리 가져오기
  const getChatHistoryAPI = () => {
    setLoading(true);
    ChatAPI.getChatHistory(pmId)
      .then((res) => {
        console.log('ㅎㅎㅎ', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setChatHistory(res.data.item);
          setChatDateHistory((prev) => [...prev, res.data.item[0].chat_date]);

          setLoading(false);
        } else if (res.data.result === '1' && res.data.count === 0) {
          setLoading(false);
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인',
            },
          ]);
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
    const unsubscribe = navigation.addListener('focus', () => {
      getChatHistoryAPI();
    });

    return unsubscribe;
  }, [navigation]);

  console.log('chatHistory', chatHistory);
  console.log('chatDateHistory', chatDateHistory);

  // 이미지 모달창
  const ImageModal = ({toggleModal, isVisible, imgPath}) => {
    let extension = '';
    if (imgPath !== null) {
      extension = imgPath.slice(imgPath.lastIndexOf('.'));
    }

    return (
      <View>
        <Modal
          isVisible={isVisible}
          // onBackdropPress={toggleModal}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginBottom: 20}}>
            {extension !== '.gif' ? (
              <AutoHeightImage
                width={Dimensions.get('window').width - 40}
                source={{uri: `${imgPath}`}}
                maxHeight={600}
                resizeMode="contain"
              />
            ) : (
              <FastImage
                source={{uri: `${imgPath}`}}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Dimensions.get('window').width - 40,
                  height: 250,
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleModal}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#fff',
              paddingHorizontal: 14,
              paddingVertical: 7,
            }}>
            <Text style={{fontFamily: 'SCDream4', fontSize: 13, color: '#fff'}}>
              닫기
            </Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [imgPath, setImgPath] = React.useState(null);

  // 이미지 모달 핸들러
  const imageModalHandler = () => {
    setModalVisible(!isModalVisible);
  };

  // 파일 다운로드 핸들러
  const fileDownloadHandler = (filePath, fileName) => {
    Alert.alert('파일을 다운로드 하시겠습니까?', '', [
      {
        text: '다운드로',
        // onPress: () => console.log(filePath, fileName),
        onPress: () => downloader(filePath, fileName),
      },
      {
        text: '취소',
      },
    ]);
  };

  // 채팅 메세지 전송
  const sendMessageAPI = () => {
    let frmData = new FormData();
    frmData.append('method', 'proc_my_message');
    frmData.append('mb_id', mb_id);
    frmData.append('pm_id', pmId);
    frmData.append('msg', message);
    frmData.append('bf_file[]', msgFile);

    console.log('frmData', frmData);
    ChatAPI.sendMessage(frmData)
      .then((res) => {
        if (res.data.result === '1') {
          setMessage('');
          setMsgFile('');
          getChatHistoryAPI();
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인',
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

  console.log('msgFile', msgFile);

  // 파일 다운로드 메소드
  const downloader = async (filePath, fileName) => {
    await RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        trusty: false,
        path: `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`,
      },
    })
      .fetch('GET', filePath, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        Alert.alert('다운로드 되었습니다.', '내파일에서 확인해주세요.', [
          {
            text: '확인',
          },
        ]);
        console.log('The file saved to ', res.path());
      });
  };

  const [source, setSource] = React.useState({});

  // 파일 업로드 메소드
  const filePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      // setMsgFile({
      //   uri: res.uri,
      //   type: res.type,
      //   name: res.name,
      // });
      setSource({
        uri: res.uri,
        type: res.type,
        name: res.name,
      });
      console.log('size:', res.size);
      if (res.size > 150000) {
        Alert.alert(
          '이미지 사이즈가 너무 큽니다.',
          '사이즈를 줄이시거나 확인해주세요',
          [
            {
              text: '확인',
              onPress: () => setSource({}),
            },
          ],
        );
      } else {
        onChatFileUploadHandler();
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  // 파일만 따로 업로드
  const onChatFileUploadHandler = () => {
    // let file = {url: url, type: type, name: name};
    console.log('넘어오는지', source);
    let uploadFile = JSON.stringify(source);
    // console.log(('uploadFile', file));

    let frmData = new FormData();
    frmData.append('method', 'proc_my_message');
    frmData.append('mb_id', mb_id);
    frmData.append('pm_id', chatId);
    frmData.append('bf_file[]', source);

    console.log('frmData', frmData);
    ChatAPI.sendMessage(frmData)
      .then((res) => {
        console.log('파일업로드시', res);
        if (res.data.result === '1') {
          setMessage('');
          setMsgFile('');
          getChatHistoryAPI();
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인',
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

  // 채팅방 나가기
  const goOutChatRoomAPI = (payload) => {
    ChatAPI.goOutChatRoom(payload)
      .then((res) => {
        if (res.data.result === '1') {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
              onPress: () => navigation.navigate('Message'),
            },
          ]);
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인',
              onPress: () => navigation.navigate('Message'),
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
      '채팅방을 나가시겠습니까?',
      '채팅방과 대화내용이 영구삭제됩니다.',
      [
        {
          text: '나가기',
          onPress: () => goOutChatRoomAPI(payload),
        },
        {
          text: '취소',
        },
      ],
    );
  };
  // 비교 함수
  const some_check = (item) => {
    chatHistory.some((element) => {
      console.log('chek111 ::::', item);
      console.log('chek222 ::::', element.chat_date);

      console.log(
        'elem,ent  :::',
        moment(element.chat_date).format('YYYY-MM-DD') ===
          moment(item).format('YYYY-MM-DD'),
      );

      let result =
        moment(element.chat_date).format('YYYY-MM-DD') ===
        moment(item).format('YYYY-MM-DD');

      return result;

      // if (
      //   moment(element.chat_date).format('YYYY-MM-DD') ===
      //   moment(item).format('YYYY-MM-DD')
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
    });
  };
  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
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
          <ActivityIndicator size="large" color="#00A170" />
        </View>
      )}
      {/* <View style={{flex: 1}}>
        <GiftedChat
          onPress={() => Keyboard.dismiss()}
          messages={messages}
          text={text}
          onInputTextChanged={setText}
          onSend={onSend}
          user={{
            _id: mb_id,
          }}
          placeholder="메세지를 입력하세요."
          alignTop
          alwaysShowSend
          scrollToBottom
          autoCapitalize="none"
          locale={'ko'}
          timeFormat={'LT'}
          dateFormat={moment(props.createdAt).locale('ko').format('ll')}
          renderAvatarOnTop
          renderUsernameOnMessage={false}
          // renderInputToolbar={renderInputToolbar}
          // renderComposer={renderComposer}
          // renderSend={renderSend}
          // renderSystemMessage={renderSystemMessage}
          // renderMessageText={renderMessageText}
          // renderTime={(props)=>console.log(props)}
          // renderMessage={renderMessage}
          // renderAvatar={null}
          renderAvatarOnTop={true}
          imageProps={messages.image}
          renderMessageImage={() => (
            <Image source={{uri: `${messages.image}`}} />
          )}
          // renderBubble={renderBubble}
          // renderLoading={renderLoading}
          messagesContainerStyle={{backgroundColor: '#FFFFFF'}}
          // onPressAvatar={console.log}
          textInputProps={{autoCapitalize: 'none'}}
          parsePatterns={(linkStyle) => [
            {
              pattern: /#(\w+)/,
              style: linkStyle,
              onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
            },
          ]}
        />
      </View> */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageModal
          imgPath={imgPath}
          isVisible={isModalVisible}
          toggleModal={imageModalHandler}
        />

        <View>
          <View
            style={{
              // height: Dimensions.get('window').height - 300,
              justifyContent: 'flex-start',
              paddingHorizontal: 20,
            }}>
            {/* 시작 */}
            {chatHistory && chatHistory.length > 0 && chatDateHistory ? (
              <View
                style={{
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{marginRight: 10}}>- - - - - - - -</Text>
                <Text style={styles.normalText}>
                  {moment(chatDateHistory[0])
                    .locale('kr')
                    .format('YYYY.MM.DD (ddd)')}
                </Text>
                {/* <Text style={styles.normalText}>2021.01.28 (목)</Text> */}
                <Text style={{marginLeft: 10}}>- - - - - - - -</Text>
              </View>
            ) : null}
           {chatHistory && chatHistory.length > 0
              ? chatHistory.map((history, idx) =>
                  history.mb_id === mb_id ? (
                    <View key={`p${history.pc_id}${idx}`}>
                      {history.diff === 'Y' ? 
                      <View
                        style={{
                          marginVertical: 20,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{marginRight: 10}}>- - - - - - - -</Text>
                        <Text style={styles.normalText}>
                          {moment(history.chat_date)
                            .locale('kr')
                            .format('YYYY.MM.DD (ddd)')}
                        </Text>
                        {/* <Text style={styles.normalText}>2021.01.28 (목)</Text> */}
                        <Text style={{marginLeft: 10}}>- - - - - - - -</Text>
                      </View>
                      : null}
                      {history.msg ? (
                        <View
                          style={{
                            alignSelf: 'flex-end',
                            flexDirection: 'row-reverse',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingVertical: 10,
                            width: '70%',
                          }}>
                          <View style={styles.msgBubbleP}>
                            <Text style={styles.msgTextP}>{history.msg}</Text>
                          </View>
                          <Text
                            style={{
                              fontFamily: 'SCDream4',
                              alignSelf: 'flex-end',
                              fontSize: 12,
                              color: '#000000',
                            }}>
                            {moment(history.chat_date).format('HH:mm')}
                          </Text>
                        </View>
                      ) : null}
                      {history.bf_file &&
                      (history.bf_file_ext === 'jpg' ||
                        history.bf_file_ext === 'png') ? (
                        <View
                          style={{
                            alignSelf: 'flex-end',
                            flexDirection: 'row-reverse',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingVertical: 10,
                            width: '70%',
                          }}>
                          <View
                            style={{
                              backgroundColor: '#fff',
                              padding: 10,
                              borderRadius: 5,
                              marginLeft: 10,
                            }}>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => {
                                imageModalHandler();
                                setImgPath(history.bf_file);
                              }}>
                              <Image
                                source={{uri: `${history.bf_file}`}}
                                resizeMode="cover"
                                style={{
                                  width: 120,
                                  height: 120,
                                  borderRadius: 5,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                          <Text
                            style={{
                              fontFamily: 'SCDream4',
                              alignSelf: 'flex-end',
                              fontSize: 12,
                              color: '#000000',
                            }}>
                            {moment(history.chat_date).format('HH:mm')}
                          </Text>
                        </View>
                      ) : history.bf_file && history.bf_file_ext === 'gif' ? (
                        <View
                          style={{
                            alignSelf: 'flex-end',
                            flexDirection: 'row-reverse',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingVertical: 10,
                            width: '70%',
                          }}>
                          <View
                            style={{
                              backgroundColor: '#fff',
                              padding: 10,
                              borderRadius: 5,
                              marginLeft: 10,
                            }}>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => {
                                imageModalHandler();
                                setImgPath(history.bf_file);
                              }}>
                              <FastImage
                                source={{uri: `${history.bf_file}`}}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{
                                  width: 120,
                                  height: 120,
                                  borderRadius: 5,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                          <Text
                            style={{
                              fontFamily: 'SCDream4',
                              alignSelf: 'flex-end',
                              fontSize: 12,
                              color: '#000000',
                            }}>
                            {moment(history.chat_date).format('HH:mm')}
                          </Text>
                        </View>
                      ) : history.bf_file &&
                        history.bf_file_ext !== 'gif' &&
                        history.bf_file_ext !== 'jpg' &&
                        history.bf_file_ext !== 'png' ? (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() =>
                            fileDownloadHandler(
                              history.bf_file,
                              history.bf_file_soure,
                            )
                          }
                          style={{
                            alignSelf: 'flex-end',
                            flexDirection: 'row-reverse',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingVertical: 10,
                            width: '70%',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              backgroundColor: '#fff',
                              padding: 10,
                              borderRadius: 5,
                              marginLeft: 10,
                            }}>
                            <Image
                              source={require('../../src/assets/icon_down.png')}
                              resizeMode="cover"
                              style={{width: 30, height: 30, marginRight: 10}}
                            />
                            <Text style={styles.normalText}>
                              {history.bf_file_soure}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontFamily: 'SCDream4',
                              alignSelf: 'flex-end',
                              fontSize: 12,
                              color: '#000000',
                            }}>
                            {moment(history.chat_date).format('HH:mm')}
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  ) : 
                  (
                    history.diff === 'Y' ? 
                      <View
                        style={{
                          marginVertical: 20,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{marginRight: 10}}>- - - - - - - -</Text>
                        <Text style={styles.normalText}>
                          {moment(history.chat_date)
                            .locale('kr')
                            .format('YYYY.MM.DD (ddd)')}
                        </Text>
                        {/* <Text style={styles.normalText}>2021.01.28 (목)</Text> */}
                        <Text style={{marginLeft: 10}}>- - - - - - - -</Text>
                      </View>
                      : 
                    history.msg ? (
                      <View
                        key={`u${history.pc_id}${idx}`}
                        style={{
                          alignSelf: 'flex-start',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingVertical: 5,
                          width: '70%',
                          marginBottom: 10,
                        }}>
                        <Image
                          source={{uri: `${history.mb_profile}`}}
                          resizeMode="cover"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            marginRight: 10,
                          }}
                        />
                        <View style={styles.msgBubble}>
                          <Text style={styles.msgText}>{history.msg}</Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: 'SCDream4',
                            alignSelf: 'flex-end',
                            fontSize: 12,
                            color: '#000000',
                          }}>
                          {moment(history.chat_date).format('HH:mm')}
                        </Text>
                      </View>
                    ) : history.bf_file &&
                      (history.bf_file_ext === 'jpg' ||
                        history.bf_file_ext === 'png') ? (
                      <View
                        key={`u${history.pc_id}${idx}`}
                        style={{
                          alignSelf: 'flex-start',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingVertical: 10,
                          width: '70%',
                        }}>
                        <Image
                          source={{uri: `${history.mb_profile}`}}
                          resizeMode="cover"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            marginRight: 10,
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: '#fff',
                            padding: 10,
                            borderRadius: 5,
                            marginRight: 10,
                          }}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                              imageModalHandler();
                              setImgPath(history.bf_file);
                            }}>
                            <Image
                              source={{uri: `${history.bf_file}`}}
                              resizeMode="cover"
                              style={{
                                width: 120,
                                height: 120,
                                borderRadius: 5,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={{
                            fontFamily: 'SCDream4',
                            alignSelf: 'flex-end',
                            fontSize: 12,
                            color: '#000000',
                          }}>
                          {moment(history.chat_date).format('HH:mm')}
                        </Text>
                      </View>
                    ) : history.bf_file && history.bf_file_ext === 'gif' ? (
                      <View
                        key={`u${history.pc_id}${idx}`}
                        style={{
                          alignSelf: 'flex-start',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingVertical: 10,
                          width: '70%',
                        }}>
                        <Image
                          source={{uri: `${history.mb_profile}`}}
                          resizeMode="cover"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 5,
                            marginRight: 10,
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: '#fff',
                            padding: 10,
                            borderRadius: 5,
                            marginRight: 10,
                          }}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                              imageModalHandler();
                              setImgPath(history.bf_file);
                            }}>
                            <FastImage
                              source={{uri: `${history.bf_file}`}}
                              resizeMode={FastImage.resizeMode.cover}
                              style={{
                                width: 120,
                                height: 120,
                                borderRadius: 5,
                                marginRight: 10,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={{
                            fontFamily: 'SCDream4',
                            alignSelf: 'flex-end',
                            fontSize: 12,
                            color: '#000000',
                          }}>
                          {moment(history.chat_date).format('HH:mm')}
                        </Text>
                      </View>
                    ) : history.bf_file &&
                      history.bf_file_ext !== 'gif' &&
                      history.bf_file_ext !== 'jpg' &&
                      history.bf_file_ext !== 'png' ? (
                      <View
                        key={`u${history.pc_id}${idx}`}
                        style={{
                          alignSelf: 'flex-start',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingVertical: 10,
                          width: '70%',
                        }}>
                        <Image
                          source={{uri: `${history.mb_profile}`}}
                          resizeMode="cover"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            marginRight: 10,
                          }}
                        />
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() =>
                            fileDownloadHandler(
                              history.bf_file,
                              history.bf_file_soure,
                            )
                          }
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            padding: 10,
                            borderRadius: 5,
                            marginRight: 10,
                          }}>
                          <Image
                            source={require('../../src/assets/icon_down.png')}
                            resizeMode="cover"
                            style={{width: 30, height: 30, marginRight: 10}}
                          />
                          <Text style={styles.normalText}>
                            {history.bf_file_soure}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: 'SCDream4',
                            alignSelf: 'flex-end',
                            fontSize: 12,
                            color: '#000000',
                          }}>
                          {moment(history.chat_date).format('HH:mm')}
                        </Text>
                      </View>
                    ) : null
                  ))
              : null}

            {/* 끝 */}
          </View>

          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              marginTop: 80,
              marginBottom: 50,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => goOutChatRoomChecking(chatId)}>
              <View
                style={{
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: 'rgba(68, 68, 68, 0.2)',
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 14,
                      color: '#000',
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                    },
                  ]}>
                  채팅방 나가기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#275696',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => filePicker()}
          style={{flex: 1}}>
          <Image
            source={require('../../src/assets/chat_fileupload.png')}
            resizeMode="contain"
            style={{width: 22, height: 22}}
          />
        </TouchableOpacity>
        <View style={{flex: 10}}>
          <TextInput
            value={message}
            placeholder="메세지 글적기..."
            placeholderTextColor="#275696"
            autoCapitalize="none"
            style={{
              textAlignVertical: 'center',
              fontFamily: 'SCDream4',
              color: '#000',
              fontSize: 14,
              lineHeight: 22,
              backgroundColor: '#fff',
              borderRadius: 5,
              paddingLeft: 10,
              marginHorizontal: 10,
            }}
            onChangeText={(text) => setMessage(text)}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => sendMessageAPI()}
          style={{flex: 1}}>
          <Image
            source={require('../../src/assets/icon01.png')}
            resizeMode="contain"
            style={{width: 40, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
  },
  msgBubble: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    marginRight: 5,
    marginTop: 10,
  },
  msgText: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
  },
  msgBubbleP: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#275696',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    marginLeft: 5,
  },
  msgTextP: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
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

export default Detail;
