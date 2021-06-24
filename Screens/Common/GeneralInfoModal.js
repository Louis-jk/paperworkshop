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

// 0610 : (Changed lib)AutoHeightWebView -> WebView
const GeneralInfoModal = ({toggleModal, isVisible}) => {
  const sWidth = Dimensions.get('window').width;

  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            // width: Dimensions.get('window').width,
            // height: 430,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Button title="Show modal" onPress={toggleModal} /> */}
          <WebView
            style={{
              flex: 0.6,
              // width: Dimensions.get('window').width,
            }}
            source={{
              uri: `http://dmonster1506.cafe24.com/bbs/content.php?co_id=print`,
            }}
            injectedJavaScript={`document.querySelector('img').style.width='100%'`}
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
