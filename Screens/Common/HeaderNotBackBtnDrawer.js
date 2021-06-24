import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';

const HeaderNotBackBtnDrawer = (props) => {
  const navigation = props.navigation;

  const [title, setTitle] = React.useState('');
  const {container, headerCtrl, headerTitle, icons} = styles;

  React.useEffect(() => {
    switch (props.title) {
      case 'SetPwd':
        setTitle('비밀번호 변경');
        break;
      case 'Register':
        setTitle('회원가입');
        break;
      case 'FindId':
        setTitle('아이디 찾기');
        break;
      case 'FindPwd':
        setTitle('비밀번호 찾기');
        break;
      case 'SetPwdComplete':
        setTitle('비밀번호 수정 완료');
        break;
      case 'Signed':
        setTitle('회원가입 완료');
        break;
      default:
        return false;
    }
  }, [title]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={headerCtrl}>
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

            <Text style={[styles.boldText, headerTitle]}>{title}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={icons}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Search')}
            hitSlop={{top: 5, bottom: 5, left: 5, right: -15}}>
            <View>
              <Image
                source={require('../../src/assets/top_seach02.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  // marginRight: 20,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
          {/* <TouchableWithoutFeedback
            onPress={() => navigation.openDrawer('right')}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
            <View>
              <Image
                source={require('../../src/assets/menu.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </TouchableWithoutFeedback> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 3,
    // height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerCtrl: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#ffaaee',
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 50,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default HeaderNotBackBtnDrawer;
