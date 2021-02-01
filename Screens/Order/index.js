import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import DetailHeader from '../Common/DetailHeader';
import Footer from '../Common/Footer';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  // start 비교 견적 대상 카테고리 선택 Tab

  const FirstRoute = (props) => (
    <View>
      {/* 파트너스 리스트(list) */}
      <View style={styles.categoryWrap}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon08.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>칼라박스</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon09.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>골판지 박스</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon10.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>합지 골판지 박스</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon11.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>싸바리 박스</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon12.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>식품 박스</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon13.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>쇼핑백</Text>
        </TouchableOpacity>
      </View>
      {/* // 파트너스 리스트(list) */}
    </View>
  );

  const SecondRoute = (props) => (
    <View>
      {/* 파트너스 리스트(list) */}
      <View style={styles.categoryWrap}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon14.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>카달로그/브로슈어/팜플렛</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon15.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>책자/서적류</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon16.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>전단/포스터/안내장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon17.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>스티커/라벨</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon18.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>봉투/명함</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderStep02')}
          style={styles.categoryItem}>
          <Image
            source={require('../../src/images/icon19.png')}
            resizeMode="cover"
            style={styles.categoryItemImg}
          />
          <Text style={styles.categoryItemText}>기타 인쇄물</Text>
        </TouchableOpacity>
      </View>
      {/* // 파트너스 리스트(list) */}
    </View>
  );

  const initialLayout = { width: Dimensions.get('window').width };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '패키지' },
    { key: 'second', title: '일반 인쇄물' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
    }
  };

  const [tabIndex, setTabIndex] = React.useState('first');

  const TabBar = (props) => {
    const { tabIndex, jumpTo } = props;

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            }}
            onPress={async () => {
              await jumpTo('first');
              await setTabIndex('first');
            }}>
            <Text
              style={{
                paddingVertical: 12,
                fontSize: 14,
                fontWeight: 'bold',
                color: tabIndex === 'first' && index === 0 ? '#275696' : '#C1C1C1',
              }}>
              패키지
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={async () => {
              await jumpTo('second');
              await setTabIndex('second');
            }}>
            <Text
              style={{
                paddingVertical: 12,
                fontSize: 14,
                fontWeight: 'bold',
                color: tabIndex === 'second' || index === 1 ? '#275696' : '#C1C1C1',
              }}>
              일반 인쇄물
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // end 비교 견적 대상 카테고리 선택 Tab

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10 }}>기본 정보</Text>
          <View style={[styles.infoBox, { marginBottom: 10 }]}>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>업체명</Text>
              <Text style={styles.detailsDesc}>삼보인쇄(주)</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>담당자</Text>
              <Text style={styles.detailsDesc}>김성준</Text>
            </View>
          </View>
        </View>

        <View style={styles.wrap}>
          <Text style={{ fontSize: 16, color: '#000000', marginBottom: 10 }}>
            비교 견적 대상을 선택해주세요.
          </Text>
          <View>
            <TabView
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  navigation={navigation}
                  setTabIndex={setTabIndex}
                  tabIndex={tabIndex}
                  onIndexChange={setIndex}
                />
              )}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              swipeEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  flexRowCenter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  infoBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  infoStepDesc: {
    fontSize: 14,
    color: '#A2A2A2',
    lineHeight: 23,
  },
  infoStepTitle: {
    fontSize: 16,
    color: '#000000',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
    marginVertical: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 2.5,
  },
  detailsTitle: {
    width: 70,
    fontSize: 14,
    color: '#979797',
  },
  detailsDesc: {
    fontSize: 14,
    color: '#000',
  },
  submitBtn: {
    borderRadius: 4,
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cancelBtn: {
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    width: '100%',
    paddingVertical: 15,
  },
  cancelBtnText: {
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
  },
  categoryWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryItem: {
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  categoryItemImg: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  categoryItemText: {
    width: 100,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 10,
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
