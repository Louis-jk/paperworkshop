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
  const {container, headerCtrl, headerTitle, icons} = styles;

  React.useEffect(() => {
    switch (props.title) {
      case 'Main':
        setTitle('페이퍼공작소');
        break;
      case 'CompanyInfo':
        setTitle('회사소개');
        break;
      case 'Event':
        setTitle('이벤트');
        break;
      case 'Partners':
        setTitle('파트너스');
        break;
      case 'Partners01':
        setTitle('성실파트너스');
        break;
      case 'Partners02':
        setTitle('인기파트너스');
        break;
      case 'Partners03':
        setTitle('지역파트너스');
        break;
      case 'MyPartners':
        setTitle('나의파트너스');
        break;
      case 'Gallery':
        setTitle('인쇄/패키지 갤러리');
        break;
      case 'GalleryPackage':
        setTitle('인쇄/패키지 갤러리');
        break;
      case 'GalleryGeneral':
        setTitle('인쇄/패키지 갤러리');
        break;
      case 'GalleryEtc':
        setTitle('인쇄/패키지 갤러리');
        break;
      case 'Story':
        setTitle('고객후기');
        break;
      case 'StoryTips':
        setTitle('유용한정보');
        break;
      case 'StoryCreateInfo':
        setTitle('인쇄/패키지 제작정보');
        break;
      case 'CCenter':
        setTitle('FAQ');
        break;
      case 'CCenterNotice':
        setTitle('공지사항');
        break;
      case 'CCenterQnA':
        setTitle('1:1문의');
        break;
      case 'CCenterDetail':
        setTitle('FAQ');
        break;
      case 'PaperInfo':
        setTitle('지류정보');
        break;
      case 'PaperPrice':
        setTitle('지류고시가');
        break;
      case 'Estimate':
        setTitle('실시간 견적 처리 현황');
        break;
      case 'Terms':
        setTitle('이용약관');
        break;
      case 'Privacy':
        setTitle('개인정보 처리방침');
        break;
      case 'PartnersDetail':
        setTitle('파트너스 정보');
        break;
      case 'ProfileEdit':
        setTitle('회원 정보 수정');
        break;
      case 'Signed':
        setTitle('회원가입 완료');
        break;
      case 'Message':
        setTitle('페이퍼공작소');
        break;
      default:
        return false;
    }
  }, [title]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={container}>
        <View style={headerCtrl}>
          <Text style={[styles.boldText, headerTitle]}>{title}</Text>
        </View>

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
                  marginRight: 20,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
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

export default Header;
