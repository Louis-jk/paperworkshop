import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

import Header from '../Common/Header';
import Footer from '../Common/Footer';

// import { WebView } from 'react-native-webview';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* <WebView source={{ uri: 'https://reactnative.dev/' }} /> */}
          <Text>이벤트</Text>
        </View>
        <Footer navigation={navigation} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    height: Dimensions.get('window').height - 300,
    justifyContent: 'center',
    alignItems: 'center',
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
