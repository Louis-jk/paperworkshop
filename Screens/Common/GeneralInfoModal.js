import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {WebView} from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

import Modal from 'react-native-modal';

const GeneralInfoModal = ({toggleModal, isVisible}) => {
  const sWidth = Dimensions.get('window').width;

  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
        <View
          style={{
            width: Dimensions.get('window').width - 60,
            height: 500,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          {/* <Button title="Show modal" onPress={toggleModal} /> */}
          <AutoHeightWebView
            style={{
              width: Dimensions.get('window').width - 60,
              borderRadius: 5,
            }}
            source={{
              uri: `http://dmonster1506.cafe24.com/bbs/content.php?co_id=print`,
            }}
            customScript={`document.body.style.width = '100px';`}
            customStyle={`
            * {
              margin: 0;
              padding: 0;
            }
            img{
              width: 100%;
              max-width: 480px;
            }
          `}
            scalesPageToFit={true}
            viewportContent={'width=device-width, user-scalable=no'}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  partnerInfoBox: {
    marginVertical: 15,
  },
  partnerInfoTitle: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: '#275696',
    marginBottom: 10,
  },
  partnerInfoDesc: {
    fontFamily: 'SCDream4',
    fontSize: 13,
    lineHeight: 20,
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

export default GeneralInfoModal;
