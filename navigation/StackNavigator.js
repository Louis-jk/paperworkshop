import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from '../Screens/Main';
import EstimateScreen from '../Screens/Main/Estimate';

// 갤러리 SCREEN
import GalleryScreen from '../Screens/Gallery';
import GalleryDetailScreen from '../Screens/Gallery/Detail';
import GalleryPackageScreen from '../Screens/Gallery/Package';
import GalleryGeneralScreen from '../Screens/Gallery/General';
import GalleryEtcScreen from '../Screens/Gallery/Etc';
import GalleryWebViewScreen from '../Screens/Gallery/WebViewPage';

// 파트너스(성실,인기,지역) SCREEN
// 메인
import PartnersScreen from '../Screens/Partners';
import PartnersListPageScreen from '../Screens/Partners/ListPage';
// 성실 파트너스 SCREEN
import Partners01Screen from '../Screens/Partners/Partner01';
// 인기 파트너스 SCREEN
import Partners02Screen from '../Screens/Partners/Partner02';
// 지역 파트너스 SCREEN
import Partners03Screen from '../Screens/Partners/Partner03';
// 파트너스 페이지 상세 SCREEN
import PartnersDetailScreen from '../Screens/Partners/Detail';

// 제작스토리 SCREEN
// 제작스토리 메인(고객후기)
import StoryScreen from '../Screens/Story';
// 제작스토리 - 유용한 정보
import StoryTipsScreen from '../Screens/Story/Tips';
// 제작스토리 - 유용한 정보 상세
import StoryTipsDetailScreen from '../Screens/Story/TipsDetail';
// 제작스토리 - 인쇄/제작 안내
import StoryCreateInfoScreen from '../Screens/Story/CreateInfo';

// 고객센터 SCREEN
// 고객센터 메인(FAQ) & 상세
import CCenterScreen from '../Screens/CCenter';
import CCenterDetailScreen from '../Screens/CCenter/Detail';
// 고객센터 공지사항 & 상세
import CCenterNoticeScreen from '../Screens/CCenter/Notice';
import CCenterNoticeDetailScreen from '../Screens/CCenter/NoticeDetail';
// 고객센터 1:1문의 & 상세, 글쓰기
import CCenterQnAScreen from '../Screens/CCenter/QnA';
import CCenterQnADetailScreen from '../Screens/CCenter/QnADetail';
import CCenterQnAwriteScreen from '../Screens/CCenter/QnAwrite';

// 지류정보 SCREEN
// 지류정보
import PaperInfoScreen from '../Screens/PaperInfo';
// 지류고시가
import PaperPriceScreen from '../Screens/PaperInfo/Price';

// 이용약관 및 개인정보 처리방침 SCREEN
import TermsScreen from '../Screens/Common/Terms';
import PrivacyScreen from '../Screens/Common/Terms/Privacy';

// 통합검색 SCREEN
import SearchScreen from '../Screens/Common/Search';

// 로그인 관련 SCREEN
import LoginScreen from '../Screens/Profile/Auth/Login';
import CheckScreen from '../Screens/Profile/Auth/Check';
import EntryBeforeScreen from '../Screens/Profile/Auth/EntryBefore';
import RegisterScreen from '../Screens/Profile/Auth/Register';
import SignedScreen from '../Screens/Profile/Auth/Signed';
import FindIdScreen from '../Screens/Profile/Auth/FindId';
import FindPwdScreen from '../Screens/Profile/Auth/FindPwd';
import SetPwdScreen from '../Screens/Profile/Auth/SetPwd';
import SetPwdCompleteScreen from '../Screens/Profile/Auth/SetPwdComplete';

// 정보 수정 SCREEN
import ProfileEditScreen from '../Screens/Profile/Edit';

// 나의 파트너스 SCREEN
import MyPartnersScreen from '../Screens/Profile/MyPartners';
import MyPartnersSincereScreen from '../Screens/Profile/MyPartners/Partner01';
import MyPartnersPopularScreen from '../Screens/Profile/MyPartners/Partner02';
import MyPartnersLocalScreen from '../Screens/Profile/MyPartners/Partner03';

// 내 견적 SCREEN
// 내 견적 메인
import MyOrderScreen from '../Screens/Profile/MyOrder';
// 내 견적 입찰중 상세
import ReqDetailListScreen from '../Screens/Profile/MyOrder/ReqDetailList';
// 내 견적 파트너선정 - 계약금(선금)입금 대기 상세
import SelectPartnerStep01Screen from '../Screens/Profile/MyOrder/SelectPartnerStep01';
// 내 견적 파트너선정 - 계약금(선금)입금완료 상세
import SelectPartnerStep02Screen from '../Screens/Profile/MyOrder/SelectPartnerStep02';
import SelectPartnerStep03Screen from '../Screens/Profile/MyOrder/SelectPartnerStep03';
import ReceiveScreen from '../Screens/Profile/MyOrder/Receive';
import DoneScreen from '../Screens/Profile/MyOrder/Done';
import CopyOrderScreen from '../Screens/Profile/MyOrder/CopyOrder';
import OrderDetailScreen from '../Screens/Profile/MyOrder/OrderDetail';
import FeedBackScreen from '../Screens/Profile/MyOrder/FeedBack';

// 메세지 SCREEN (채팅)
import MessageScreen from '../Screens/Message';
import MessageDetailScreen from '../Screens/Message/Detail';

// 견적 SCREEN
// 비교견적 신청 스텝
import OrderStep01Screen from '../Screens/Order';
import DirectOrderScreen from '../Screens/Order/Direct';
import OrderPackageScreen from '../Screens/Order/Package';
import OrderGeneralScreen from '../Screens/Order/General';
import OrderEtcScreen from '../Screens/Order/Etc';
import OrderStep02Screen from '../Screens/Order/Step02';
import OrderStep03Screen from '../Screens/Order/Step03';
import OrderStep04Screen from '../Screens/Order/Step04';
import OrderStep05Screen from '../Screens/Order/Step05';
import OrderStep05AfterScreen from '../Screens/Order/Step05After';
import OrderStep06Screen from '../Screens/Order/Step06';
// 비교 견적 간단 견적 완료
import easyOrderCompleteScreen from '../Screens/Order/easyOrderComplete';
// 비교 견적 견적 취소
import CancelOrderScreen from '../Screens/Order/CancelOrder';

// 세부 견적 완료
import OrderCompleteScreen from '../Screens/Order/OrderComplete';

// 리뷰 SCREEN
import ReviewScreen from '../Screens/Review';
import ReviewDetailScreen from '../Screens/Review/Detail';

// 회사소개 SCREEN
import CompanyInfoScreen from '../Screens/Common/CompanyInfo';

// 이벤트 SCREEN
import EventScreen from '../Screens/Event';
import EventDetailScreen from '../Screens/Event/Detail';
import EventWebViewScreen from '../Screens/Event/WebViewPage';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9AC4F8',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen name="Estimate" component={EstimateScreen} />
    </Stack.Navigator>
  );
};

export const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export const CompanyInfoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CompanyInfo" component={CompanyInfoScreen} />
    </Stack.Navigator>
  );
};

export const EventStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="EventWebView" component={EventWebViewScreen} />
    </Stack.Navigator>
  );
};

export const GalleryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="GalleryDetail" component={GalleryDetailScreen} />
      <Stack.Screen name="GalleryPackage" component={GalleryPackageScreen} />
      <Stack.Screen name="GalleryGeneral" component={GalleryGeneralScreen} />
      <Stack.Screen name="GalleryEtc" component={GalleryEtcScreen} />
      <Stack.Screen name="GalleryWebView" component={GalleryWebViewScreen} />
    </Stack.Navigator>
  );
};

export const PartnersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Partners" component={PartnersScreen} />
      <Stack.Screen name="ListPage" component={PartnersListPageScreen} />
      <Stack.Screen name="Partners01" component={Partners01Screen} />
      <Stack.Screen name="Partners02" component={Partners02Screen} />
      <Stack.Screen name="Partners03" component={Partners03Screen} />
    </Stack.Navigator>
  );
};

export const MyPartnersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyPartners" component={MyPartnersScreen} />
      <Stack.Screen
        name="MyPartnersSincere"
        component={MyPartnersSincereScreen}
      />
      <Stack.Screen
        name="MyPartnersPopular"
        component={MyPartnersPopularScreen}
      />
      <Stack.Screen name="MyPartnersLocal" component={MyPartnersLocalScreen} />
    </Stack.Navigator>
  );
};

export const PartnersDetailStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PartnersDetail" component={PartnersDetailScreen} />
    </Stack.Navigator>
  );
};
export const StoryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Story" component={StoryScreen} />
      <Stack.Screen name="StoryTips" component={StoryTipsScreen} />
      <Stack.Screen name="StoryTipsDetail" component={StoryTipsDetailScreen} />
      <Stack.Screen name="StoryCreateInfo" component={StoryCreateInfoScreen} />
    </Stack.Navigator>
  );
};
export const CCenterStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CCenter" component={CCenterScreen} />
      <Stack.Screen name="CCenterNotice" component={CCenterNoticeScreen} />
      <Stack.Screen name="CCenterQnA" component={CCenterQnAScreen} />
      <Stack.Screen name="CCenterDetail" component={CCenterDetailScreen} />
      <Stack.Screen
        name="CCenterNoticeDetail"
        component={CCenterNoticeDetailScreen}
      />
      <Stack.Screen
        name="CCenterQnADetail"
        component={CCenterQnADetailScreen}
      />
      <Stack.Screen name="CCenterQnAwrite" component={CCenterQnAwriteScreen} />
    </Stack.Navigator>
  );
};
export const PaperInfoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PaperInfo" component={PaperInfoScreen} />
      <Stack.Screen name="PaperPrice" component={PaperPriceScreen} />
    </Stack.Navigator>
  );
};

export const ProfileEditStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};

export const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Check" component={CheckScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="EntryBefore" component={EntryBeforeScreen} />
    </Stack.Navigator>
  );
};

export const RegisterStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export const SignedStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signed" component={SignedScreen} />
    </Stack.Navigator>
  );
};

export const FindIdStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FindId" component={FindIdScreen} />
    </Stack.Navigator>
  );
};

export const FindPwdStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FindPwd" component={FindPwdScreen} />
      <Stack.Screen name="SetPwd" component={SetPwdScreen} />
      <Stack.Screen name="SetPwdComplete" component={SetPwdCompleteScreen} />
    </Stack.Navigator>
  );
};

export const MessageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Message" component={MessageScreen} />
    </Stack.Navigator>
  );
};

export const MessageDetailStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
    </Stack.Navigator>
  );
};

export const OrderStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Order" component={OrderStep01Screen} />
      <Stack.Screen name="DirectOrder" component={DirectOrderScreen} />
      <Stack.Screen name="OrderPackage" component={OrderPackageScreen} />
      <Stack.Screen name="OrderGeneral" component={OrderGeneralScreen} />
      <Stack.Screen name="OrderEtc" component={OrderEtcScreen} />
      <Stack.Screen name="OrderStep02" component={OrderStep02Screen} />
      <Stack.Screen name="OrderStep03" component={OrderStep03Screen} />
      <Stack.Screen name="OrderStep04" component={OrderStep04Screen} />
      <Stack.Screen name="OrderStep05" component={OrderStep05Screen} />
      <Stack.Screen name="OrderStep05After" component={OrderStep05AfterScreen} />
      <Stack.Screen name="OrderStep06" component={OrderStep06Screen} />
      <Stack.Screen
        name="easyOrderComplete"
        component={easyOrderCompleteScreen}
      />
      <Stack.Screen name="OrderComplete" component={OrderCompleteScreen} />
    </Stack.Navigator>
  );
};

export const MyOrderStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyOrder" component={MyOrderScreen} />
      <Stack.Screen
        name="MyOrderReqDetailList"
        component={ReqDetailListScreen}
      />
      <Stack.Screen
        name="SelectPartnerStep01"
        component={SelectPartnerStep01Screen}
      />
      <Stack.Screen
        name="SelectPartnerStep02"
        component={SelectPartnerStep02Screen}
      />
      <Stack.Screen
        name="SelectPartnerStep03"
        component={SelectPartnerStep03Screen}
      />
      <Stack.Screen name="Receive" component={ReceiveScreen} />
      <Stack.Screen name="Done" component={DoneScreen} />
      <Stack.Screen name="CancelOrder" component={CancelOrderScreen} />
      <Stack.Screen name="CopyOrder" component={CopyOrderScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="FeedBack" component={FeedBackScreen} />
    </Stack.Navigator>
  );
};

export const ReviewStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="ReviewDetail" component={ReviewDetailScreen} />
    </Stack.Navigator>
  );
};

export const ReviewDetailStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ReviewDetail" component={ReviewDetailScreen} />
    </Stack.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default StackNavigation;
