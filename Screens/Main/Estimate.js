import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import Dash from 'react-native-dash';
import Header from '../Common/Header';
import OrderAPI from '../../src/api/OrderAPI';

const Estimate = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  // 실시간 견적 처리 현황 전체
  const [allOrders, setAllOrders] = React.useState([]);
  const getAllOrderList = () => {
    OrderAPI.getAllOrders('2')
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setAllOrders(res.data.item);
        } else {
          setAllOrders(null);
        }
      })
      .catch((err) =>
        Alert.alert('문제가 있습니다.', err, [
          {
            text: '확인',
          },
        ]),
      );
  };

  React.useEffect(() => {
    getAllOrderList();
  }, []);

  const renderRow = ({item, index}) => {
    return (
      <>
        <View
          key={index}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFF',
            marginVertical: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(54, 109, 229, 0.07)',
                borderRadius: 5,
                marginRight: 15,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Text
                  style={[styles.normalText, {fontSize: 12, color: '#366DE5'}]}>
                  입찰중
                </Text>
                <Text
                  style={[styles.normalText, {fontSize: 12, color: '#366DE5'}]}>
                  {item.ecnt}건
                </Text>
              </View>
            </View>
            <View
              style={{
                flexShrink: 2,
                marginRight: 35,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text
                  style={[
                    styles.mediumText,
                    {
                      color: '#000',
                      fontSize: 14,
                    },
                  ]}
                  numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
              <Text
                style={[styles.normalText, {fontSize: 13, color: '#979797'}]}
                numberOfLines={1}>
                {item.ca_name}
              </Text>
            </View>
          </View>

          <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text
              style={[
                styles.normalText,
                {fontSize: 13, color: '#979797', marginBottom: 5},
              ]}>
              {item.mb_name}
            </Text>
            <Text style={[styles.normalText, {fontSize: 13, color: '#979797'}]}>
              {item.edate}
            </Text>
          </View>
        </View>
        <Dash
          style={{width: '100%', height: 0.25}}
          dashLength={1}
          dashColor="#ccc"
          dashGap={2}
          dashThickness={1}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <Header title={routeName} navigation={navigation} />
      <View
        style={{
          position: 'relative',
          paddingHorizontal: 20,
          height: Dimensions.get('window').height - 126,
          backgroundColor: '#fff',
        }}>
        {/* 실시간 견적현황 리스트(list) */}

        <FlatList
          data={allOrders}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
          persistentScrollbar={true}
          showsVerticalScrollIndicator={false}
          progressViewOffset={true}
          refreshing={true}
          style={{
            paddingBottom: 50,
            backgroundColor: '#fff',
          }}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text style={{fontFamily: 'SCDream4'}}>
                실시간 견적 처리 현황 리스트가 없습니다.
              </Text>
            </View>
          }
        />

        {/* // 실시간 견적현황 리스트(list) */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Order')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#275696',
            borderRadius: 5,
            marginTop: 10,
            marginBottom: 20,
          }}>
          <Text
            style={[
              styles.mediumText,
              {
                textAlign: 'center',
                fontSize: 16,
                color: '#fff',
                paddingVertical: 15,
              },
            ]}>
            견적 신청하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollviewArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff00aa',
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

export default Estimate;
