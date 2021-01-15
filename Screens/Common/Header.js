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

const Header = (props) => {
  const navigation = props.navigation;

  const [title, setTitle] = React.useState('');
  const { container, headerCtrl, headerTitle, icons } = styles;

  React.useEffect(() => {
    switch (props.title) {
      case 'Main':
        setTitle('페이퍼공작소');
        break;
      case 'Partners':
        setTitle('파트너스 정보');
        break;
      case 'Gallery':
        setTitle('갤러리');
        break;
      case 'Story':
        setTitle('제작스토리');
        break;
      case 'CCenter':
        setTitle('고객센터');
        break;
      case 'PaperInfo':
        setTitle('지류정보');
        break;
      case 'Estimate':
        setTitle('실시간 견적 처리 현황');
        break;
      default:
        return false;
    }
  }, [title]);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View style={container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={headerCtrl}>
            <View style={{ paddingVertical: 10, paddingRight: 10 }}>
              <Image
                source={require('../../src/images/left-chevron.png')}
                resizeMode="contain"
                style={{
                  width: 16,
                  height: 22,
                }}
              />
            </View>

            <Text style={headerTitle}>{title}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={icons}>
          <TouchableWithoutFeedback onPress={() => navigation.openDrawer('right')}>
            <View>
              <Image
                source={require('../../src/images/search_icon.png')}
                resizeMode="contain"
                style={{
                  width: 22,
                  height: 22,
                  marginRight: 28,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.openDrawer('right')}>
            <View>
              <Image
                source={require('../../src/images/menu.png')}
                resizeMode="contain"
                style={{
                  width: 22,
                  height: 22,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
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
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -1,
    lineHeight: 50,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Header;
