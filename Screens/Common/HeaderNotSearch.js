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

const HeaderNotSearch = (props) => {
  const navigation = props.navigation;

  const [title, setTitle] = React.useState('');
  const { container, headerCtrl, headerTitle, icons } = styles;

  React.useEffect(() => {
    switch (props.title) {
      case 'CCenter':
        setTitle('FAQ');
        break;
      case 'CCenterNotice':
        setTitle('공지사항');
        break;
      case 'CCenterQnA':
        setTitle('1:1문의');
        break;
      default:
        return false;
    }
  }, [title]);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View style={container}>
        <View style={headerCtrl}>
          <Text style={[styles.boldText, headerTitle]}>{title}</Text>
        </View>

        <View style={icons}>
          <TouchableWithoutFeedback
            onPress={() => navigation.openDrawer('right')}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
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

export default HeaderNotSearch;
