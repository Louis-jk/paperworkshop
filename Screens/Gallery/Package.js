import React from 'react';
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
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import qs from 'qs';

import Header from '../Common/Header';
import Footer from '../Common/Footer';
import GalleryNav from './GalleryNav';
import List from './Components/List';

const Package = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const cate1 = props.route.params.cate1;
  const ca_id = props.route.params.ca_id;

  console.log('Galley package props', props);

  const [galleries, setGalleries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getApi = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: 'http://dmonster1506.cafe24.com/json/proc_json.php',
      data: qs.stringify({
        method: 'proc_gallery_list',
        cate1,
        ca_id: ca_id ? ca_id : null,
      }),
    })
      .then((res) => {
        console.log('gallery res', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setGalleries(res.data.item);
          setIsLoading(false);
        } else if (res.data.result === '1' && res.data.count === 0) {
          setIsLoading(false);
          setGalleries(null);
        } else {
          setGalleries(null);
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getApi();
  }, [ca_id]);

  const renderRow = ({item, index}) => {
    return <List item={item} index={index} navigation={navigation} />;
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            flex: 1,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            elevation: 0,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <ActivityIndicator size="large" color="#275696" />
        </View>
      )}
      <View
        style={{
          position: 'relative',
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
          backgroundColor: '#fff',
          // paddingBottom: 10,
        }}>
        <GalleryNav navigation={navigation} routeName={routeName} />

        {galleries ? (
          <FlatList
            data={galleries}
            renderItem={renderRow}
            keyExtractor={(list, index) => index.toString()}
            numColumns={2}
            // pagingEnabled={true}
            persistentScrollbar={true}
            showsVerticalScrollIndicator={false}
            progressViewOffset={true}
            refreshing={true}
            // contentContainerStyle={{paddingBottom: 20}}
            // onEndReached={handleLoadMore}
          />
        ) : (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontFamily: 'SCDream4'}}>
              해당 갤러리가 없습니다.
            </Text>
          </View>
        )}
      </View>
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

export default Package;
