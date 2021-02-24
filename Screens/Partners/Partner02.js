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

const Partner02 = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const cateName = props.route.params.name;

  const [partners, setPartners] = React.useState([]);

  const getApi = () => {
    axios({
      method: 'post',
      url: 'http://dmonster1506.cafe24.com/json/proc_json.php',
      data: qs.stringify({
        method: 'proc_partner_list',
        ptype: 'popular',
        popular: 'y',
      }),
    })
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setPartners(res.data.item);
        } else {
          setPartners(null);
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getApi();
  }, []);

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
          routeName={routeName}
          cateName={cateName}
        />

        {partners ? (
          <FlatList
            data={partners}
            renderItem={renderRow}
            keyExtractor={(list, index) => index.toString()}
            numColumns={2}
            // pagingEnabled={true}
            persistentScrollbar={true}
            showsVerticalScrollIndicator={false}
            progressViewOffset={true}
            refreshing={true}
            // onEndReached={handleLoadMore}
          />
        ) : (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontFamily: 'SCDream4'}}>해당 업체가 없습니다.</Text>
          </View>
        )}
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

export default Partner02;
