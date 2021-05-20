import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import qs from 'qs';

import Header from '../Common/Header';
import GalleryNav from './GalleryNav';
import List from './Components/List';
import GalleryApi from '../../src/api/Gallery';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [galleries, setGalleries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getApi = () => {
    setIsLoading(true);

    GalleryApi.getPartner('proc_gallery_list', '')
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setGalleries(res.data.item);
          setIsLoading(false);
        } else {
          setGalleries(null);
          setIsLoading(false);
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
  }, []);

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
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                height: Dimensions.get('window').height - 300,
              }}>
              <Text style={{fontFamily: SCDream4}}>
                해당 갤러리가 없습니다.
              </Text>
            </View>
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  normalText: {
    fontFamily: SCDream4,
  },
  mediumText: {
    fontFamily: SCDream5,
  },
  boldText: {
    fontFamily: SCDream6,
  },
});

export default index;
