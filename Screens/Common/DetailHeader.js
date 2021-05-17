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

const DetailHeader = (props) => {
  const navigation = props.navigation;

  const [title, setTitle] = React.useState('');
  const {container, headerCtrl, headerTitle, icons} = styles;

  React.useEffect(() => {
    switch (props.title) {
      case 'Main':
        setTitle('페이퍼공작소');
        break;
      case 'Partners':
        setTitle('파트너스');
        break;
      case 'Gallery':
        setTitle('인쇄/패키지 갤러리');
        break;
      case 'GalleryDetail':
        setTitle('게시물 상세');
        break;
      case 'GalleryWebView':
        setTitle('인쇄/패키지 갤러리');
        break;
      case 'Story':
        setTitle('제작스토리');
        break;
      case 'StoryTipsDetail':
        setTitle('유용한 정보');
        break;
      case 'CCenter':
        setTitle('고객센터');
        break;
      case 'CCenterDetail':
        setTitle('FAQ');
        break;
      case 'CCenterNoticeDetail':
        setTitle('공지사항');
        break;
      case 'CCenterQnADetail':
        setTitle('1:1문의');
        break;
      case 'PaperInfo':
        setTitle('지류정보');
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
      case 'MessageDetail':
        setTitle('메세지');
        break;
      case 'Order':
        setTitle('비교견적');
        break;
      case 'DirectOrder':
        setTitle('직접견적');
        break;
      case 'OrderPackage':
        setTitle('비교견적');
        break;
      case 'OrderGeneral':
        setTitle('비교견적');
        break;
      case 'OrderEtc':
        setTitle('비교견적');
        break;
      case 'OrderStep02':
        setTitle('비교견적');
        break;
      case 'OrderStep03':
        setTitle('비교견적');
        break;
      case 'OrderStep04':
        setTitle('비교견적');
        break;
      case 'easyOrderComplete':
        setTitle('비교견적');
        break;
      case 'OrderStep05':
        setTitle('세부 견적 작성');
        break;
      case 'OrderStep05After':
        setTitle('세부 견적 작성');
        break;
      case 'OrderStep06':
        setTitle('세부 견적 작성');
        break;
      case 'OrderComplete':
        setTitle('세부 견적 신청');
        break;
      case 'MyOrder':
        setTitle('나의 견적 의뢰');
        break;
      case 'MyOrderReqDetailList':
        setTitle('나의 견적 의뢰');
        break;
      case 'SelectPartnerStep01':
        setTitle('나의 견적 의뢰');
        break;
      case 'SelectPartnerStep02':
        setTitle('나의 견적 의뢰');
        break;
      case 'SelectPartnerStep03':
        setTitle('나의 견적 의뢰');
        break;
      case 'Receive':
        setTitle('나의 견적 의뢰');
        break;
      case 'Done':
        setTitle('나의 견적 의뢰');
        break;
      case 'CancelOrder':
        setTitle('최종 선택 포기');
        break;
      case 'CopyOrder':
        setTitle('복사 후 재등록');
        break;
      case 'OrderDetail':
        setTitle('견적의뢰 상세보기');
        break;
      case 'FeedBack':
        setTitle('견적의뢰 피드백');
        break;
      case 'Review':
        setTitle('후기작성');
        break;
      case 'ReviewDetail':
        setTitle('고객후기');
        break;
      case 'Event':
        setTitle('이벤트');
        break;
      case 'EventWebView':
        setTitle('이벤트');
        break;
      case 'Terms':
        setTitle('이용약관');
        break;
      case 'Privacy':
        setTitle('개인정보 처리방침');
        break;
      case 'ProfileEdit':
        setTitle('회원 정보 수정');
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

export default DetailHeader;
