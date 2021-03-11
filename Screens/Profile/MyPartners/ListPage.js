import * as React from 'react';
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
  FlatList,
} from 'react-native';

import axios from 'axios';
import qs from 'qs';

import Header from '../Common/Header';

import CategoryNav from './CategoryNav';
import PartnersNav from './PartnersNav';
import List from './Components/List';

const Packages = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.params.routeName;
  const cateName = props.route.params.name;
  const cate1 = props.route.params.cate1;
  const ca_id = props.route.params.ca_id;
  const propLocation = props.route.params.location;

  console.log('List Page Props', props);
  console.log('List Page propLocation', propLocation);

  console.log('ListPage props', props);
  console.log();

  const [partners, setPartners] = React.useState([]);

  // useMemo || useCallback 필요
  const getApi = () => {
    axios({
      method: 'post',
      url: 'http://dmonster1506.cafe24.com/json/proc_json.php',
      data: qs.stringify({
        method: 'proc_partner_list',
        cate1,
        ca_id,
        ptype:
          routeName === 'Partners01'
            ? 'sincere'
            : routeName === 'Partners02'
            ? 'popular'
            : null,
        location: propLocation ? propLocation : null,
      }),
    })
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setPartners(res.data.item);
        } else {
          setPartners(null);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  React.useEffect(() => {
    getApi();
  }, [propLocation, cate1, ca_id]);

  console.log('partners:', partners);

  const renderRow = ({item, index}) => {
    return <List item={item} index={index} navigation={navigation} />;
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />

      <View
        style={{
          position: 'relative',
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
          backgroundColor: '#fff',
        }}>
        <PartnersNav navigation={navigation} routeName={routeName} />
        <CategoryNav
          navigation={navigation}
          cateName={cateName}
          routeName={routeName}
          getApi={getApi}
          location={propLocation}
        />
        <FlatList
          data={partners}
          renderItem={renderRow}
          keyExtractor={(list, index) => index.toString()}
          numColumns={2}
          persistentScrollbar={true}
          showsVerticalScrollIndicator={false}
          progressViewOffset={true}
          refreshing={true}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text style={{fontFamily: 'SCDream4'}}>
                해당 업체가 없습니다.
              </Text>
            </View>
          }
        />
      </View>

      {/* <Footer navigation={navigation} /> */}
      {/* </ScrollView> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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

export default Packages;
