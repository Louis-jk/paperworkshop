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
  const { container, headerCtrl, headerTitle, icons } = styles;

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
      case 'Terms':
        setTitle('이용약관');
        break;
      case 'Privacy':
        setTitle('개인정보 처리방침');
        break;
      case 'PartnersDetail':
        setTitle('파트너스 정보');
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
      case 'MessageDetail':
        setTitle('메세지');
        break;
      case 'Order':
        setTitle('비교 견적 신청');
        break;
      case 'OrderStep02':
        setTitle('비교 견적 신청');
        break;
      case 'OrderStep03':
        setTitle('비교 견적 신청');
        break;
      case 'OrderStep04':
        setTitle('비교 견적 신청');
        break;
      case 'easyOrderComplete':
        setTitle('비교 견적 신청');
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
      case 'Review':
        setTitle('후기작성');
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
          <TouchableWithoutFeedback
            onPress={() => navigation.openDrawer('right')}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
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
    fontWeight: 'bold',
    letterSpacing: -1,
    lineHeight: 50,
    marginBottom: 2,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DetailHeader;
