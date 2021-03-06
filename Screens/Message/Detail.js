import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  InputAccessoryView,
  Button,
  NativeEventEmitter
} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';

import Modal from 'react-native-modal';
import AutoHeightImage from 'react-native-auto-height-image';
import FastImage from 'react-native-fast-image'; // gif 이미지 출력 패키지
import RNFetchBlob from 'rn-fetch-blob'; // 파일 다운로드 패키지
import DocumentPicker from 'react-native-document-picker'; // 파일 업로드 패키지
import ImagePicker from 'react-native-image-crop-picker'; // 이미지 업로드 패키지
import {GiftedChat, SystemMessage} from 'react-native-gifted-chat'; // 채팅 패키지

import DetailHeader from '../Common/DetailHeader';
import ChatAPI from '../../src/api/Chat';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const {chatId, pmId} = props.route.params;

  // console.log("chatId:::::", chatId);
  // console.log("pmId:::::", pmId);

  const {mb_id} = useSelector((state) => state.UserInfoReducer);

  const [isLoading, setLoading] = React.useState(false);
  const [chatHistory, setChatHistory] = React.useState([]); // 채팅 히스토리
  const [message, setMessage] = React.useState(''); // 메세지 텍스트
  const [msgFile, setMsgFile] = React.useState(''); // 채팅 파일(이미지 또는 엑셀, pdf 등) 값
  const [firstDate, setFirstDate] = React.useState(null); // 채팅 최초 시작일
  const [chatDateHistory, setChatDateHistory] = React.useState([]); // 채팅 날짜 갱신일
  
  const listRef = React.useRef(null);
  
  // 채팅방 글 히스토리 가져오기
  const getChatHistoryAPI = () => {
    setLoading(true);
    ChatAPI.getChatHistory(pmId)
      .then((res) => {
        // console.log('ㅎㅎㅎ', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setChatHistory(res.data.item);
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
            onPress={() => setModalVisible(!isModalVisible)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#fff',
              paddingHorizontal: 14,
              paddingVertical: 7,
            }}>
            <Text style={{fontFamily: SCDream4, fontSize: 13, color: '#fff'}}>
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
        text: '다운로드',
        // onPress: () => console.log(filePath, fileName),
        onPress: () => downloader(filePath, fileName),
      },
      {
        text: '취소',
      },
    ]);
  };

  // 채팅 메세지 전송
  const sendMessageAPI = (type, payload) => {

    let frmData = new FormData();

    if(type === 'msg') {      
      frmData.append('method', 'proc_my_message');
      frmData.append('mb_id', mb_id);
      frmData.append('pm_id', pmId);
      frmData.append('msg', payload);
      frmData.append('bf_file[]', '');
    } else {
      frmData.append('method', 'proc_partner_message');
      frmData.append('company_id', mb_id);
      frmData.append('pm_id', pmId);
      frmData.append('msg', '');
      frmData.append('bf_file[]', payload);
    }
    
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


  // 채팅 메세지 파일 전송
  const sendMessageFileAPI = (uri, type, name) => {

    let file = {uri, type, name};
    sendMessageAPI('file', file);

  };

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

  // 이미지 업로드
  const pickImageHandler = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      sortOrder: 'none',
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperCircleOverlay: true,
      useFrontCamera: false,
      // includeBase64: true,
      cropping: false,
    })
      .then((img) => {
        setMsgFile({
          uri: img.path,
          type: img.mime,
          name: img.path.slice(img.path.lastIndexOf('/')),
        });
        Alert.alert('이미지를 전송하시겠습니까?', '', [
          {
            text: '확인',
            onPress: () => sendMessageFileAPI(img.path, img.mime, img.path.slice(img.path.lastIndexOf('/'))),
          },
          {
            text: '취소'
          }
        ]);
      })
      .catch((err) => {
        Alert.alert(err, '이미지 업로드중 에러가 발생하였습니다.', [
          {
            text: '확인'
          }
        ]);
      });
  };

  // 파일 업로드 메소드
  const filePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setMsgFile({
        uri: res.uri,
        type: res.type,
        name: res.name,
      });
      Alert.alert('파일을 전송하시겠습니까?', '', [
        {
          text: '확인',
          onPress: () => sendMessageFileAPI(res.uri, res.type, res.name),
        },
        {
          text: '취소'
        }
      ]);
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

  // const onKeyPressHandler = ({NativeEventEmitter}) => {
  //   if (NativeEventEmitter.key === 'Enter') {
  //     sendMessageAPI('msg', message);
  //   }
  // };
 

  const renderRow = ({item, idx}) => {
    return (
      <View key={item.pc_id} style={{paddingHorizontal:20}}>
        {item.diff === 'Y' ?
          <View style={{marginTop: 50, marginBottom: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginRight: 10}}>- - - - - - - -</Text>
            <Text style={styles.normalText}>{moment(item.chat_date).locale('ko').format('YYYY.MM.DD (ddd)')}</Text>
            <Text style={{marginLeft: 10}}>- - - - - - - -</Text>
          </View>
        : null}
        {item.msg ? 
          <View
            style={{
              alignSelf: item.mb_id === mb_id ? 'flex-end' : 'flex-start',
              flexDirection: item.mb_id === mb_id ? 'row-reverse' : 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 10,
              width: '70%',
            }}>
            {item.mb_id !== mb_id ? 
            <Image
              source={{uri: `${item.mb_profile}`}}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginRight: 10,
              }}
            /> : null}
            <View style={item.mb_id === mb_id ? styles.msgBubbleP : styles.msgBubble}>
              <Text style={item.mb_id === mb_id ? styles.msgTextP : styles.msgText}>{item.msg}</Text>
            </View>
            <Text
              style={{
                fontFamily: SCDream4,
                alignSelf: 'flex-end',
                fontSize: 12,
                color: '#000000',
              }}>
              {moment(item.chat_date).format('HH:mm')}
            </Text>
          </View>
        : null }
        {
          item.bf_file && (item.bf_file_ext === 'jpg' || item.bf_file_ext === 'png') ?
          <View
            style={{
              alignSelf: item.mb_id === mb_id ? 'flex-end' : 'flex-start',
              flexDirection: item.mb_id === mb_id ? 'row-reverse' : 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 10,
              width: '70%',
            }}>
            {item.mb_id !== mb_id ? 
              <Image
                source={{uri: `${item.mb_profile}`}}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              /> : null}
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
                marginLeft: item.mb_id === mb_id ? 10 : 0,
                marginRight: item.mb_id !== mb_id ? 10 : 0,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  imageModalHandler();
                  setImgPath(item.bf_file);
                }}>
                <Image
                  source={{uri: `${item.bf_file}`}}
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
                fontFamily: SCDream4,
                alignSelf: 'flex-end',
                fontSize: 12,
                color: '#000000',
              }}>
              {moment(item.chat_date).format('HH:mm')}
            </Text>
          </View>
          : null
        }
        {
          item.bf_file && item.bf_file_ext === 'gif' ? 
          <View
            style={{
              alignSelf: item.mb_id === mb_id ? 'flex-end' : 'flex-start',
              flexDirection: item.mb_id === mb_id ? 'row-reverse' : 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 10,
              width: '70%',
            }}>
            {item.mb_id !== mb_id ? 
              <Image
                source={{uri: `${item.mb_profile}`}}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 10,
                }}
            /> : null}
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
                marginLeft: item.mb_id === mb_id ? 10 : 0,
                marginRight: item.mb_id !== mb_id ? 10 : 0,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  imageModalHandler();
                  setImgPath(item.bf_file);
                }}>
                <FastImage
                  source={{uri: `${item.bf_file}`}}
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
                fontFamily: SCDream4,
                alignSelf: 'flex-end',
                fontSize: 12,
                color: '#000000',
              }}>
              {moment(item.chat_date).format('HH:mm')}
            </Text>
          </View>
          : null
        }
        {
          item.bf_file &&
          item.bf_file_ext !== 'gif' &&
          item.bf_file_ext !== 'jpg' &&
          item.bf_file_ext !== 'png' ? 
          <View style={{flexDirection: 'row', justifyContent: item.mb_id === mb_id ? 'flex-end' : 'flex-start'}}>
            {item.mb_id !== mb_id ? 
              <Image
                source={{uri: `${item.mb_profile}`}}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 10,
                }}
            /> : null}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                fileDownloadHandler(
                  item.bf_file,
                  item.bf_file_soure,
                )
              }
              style={{
                flexDirection: item.mb_id === mb_id ? 'row-reverse' : 'row',
                paddingVertical: 10,
                width: '70%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 5,
                  marginLeft: item.mb_id === mb_id ? 10 : 0,
                  marginRight: item.mb_id !== mb_id ? 10 : 0,
                }}>
                <Image
                  source={require('../../src/assets/icon_down.png')}
                  resizeMode="cover"
                  style={{width: 30, height: 30, marginRight: 10}}
                />
                <Text style={{...styles.normalText, width: '80%'}} numberOfLines={1}>
                  {item.bf_file_soure}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: SCDream4,
                  alignSelf: 'flex-end',
                  fontSize: 12,
                  color: '#000000',
                }}>
                {moment(item.chat_date).format('HH:mm')}
              </Text>
            </TouchableOpacity>
          </View>
          : null}
      </View>
    )
  }

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

      {/* 채팅 내역 히스토리 */}
      <ImageModal
        imgPath={imgPath}
        isVisible={isModalVisible}
        toggleModal={imageModalHandler}
      />
      <FlatList
        ref={listRef}
        data={chatHistory}
        initialNumToRender={5}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        // onEndReached={onEndReached}
        persistentScrollbar={true}
        showsVerticalScrollIndicator={false}
        progressViewOffset={true}
        refreshing={true}
        onContentSizeChange={() => listRef.current.scrollToEnd( {animated : true, duration : 500})}
        ListEmptyComponent={(
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              height: Dimensions.get('window').height - 230,
            }}>
            <Text style={{fontFamily: SCDream4}}>
              채팅 내역이 없습니다.
            </Text>
          </View>
        )}
      />     

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#275696',
          paddingVertical: Platform.OS === 'android' ? 10 : 0,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
              if(Platform.OS === 'ios') {
                Alert.alert('파일과 이미지중 어느쪽을 전송하시겠습니까?', '아래 버튼 중 선택해주세요.', [
                  {
                    text: '파일선택',
                    onPress: () => filePicker()
                  },
                  {
                    text: '이미지선택',
                    onPress: () => pickImageHandler()
                  }
                ])
              } else {
                filePicker()
              }
            }
          }
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
              fontFamily: SCDream4,
              color: '#000',
              fontSize: 14,
              lineHeight: 22,
              backgroundColor: '#fff',
              borderRadius: 5,
              paddingLeft: 10,
              paddingTop: 10,
              marginHorizontal: 10,
              marginVertical: 10,
              height: 50
            }}
            onChangeText={(text) => setMessage(text)}
            multiline={true}
            autoCompleteType="off"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            // onKeyPress={() => onKeyPressHandler()}
            returnKeyType="send"
            returnKeyLabel="전송"
            blurOnSubmit={true}
            // inputAccessoryViewID="Next"
          />
          {/* <InputAccessoryView nativeID="Next">
            <TouchableOpacity onPress={() => alert("hi?")} style={styles.accessory}>
              <Text>버튼</Text>
            </TouchableOpacity>
          </InputAccessoryView> */}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => sendMessageAPI('msg', message)}
          style={{flex: 1}}>
          <Image
            source={require('../../src/assets/icon01.png')}
            resizeMode="contain"
            style={{width: 40, height: 30}}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
  },
  accessory: {
    width: Dimensions.get('window').width,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 8
  },
  msgBubble: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginRight: 5,
    marginTop: 10,
  },
  msgText: {
    fontFamily: SCDream4,
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
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginLeft: 5,
  },
  msgTextP: {
    fontFamily: SCDream4,
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
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

export default Detail;
