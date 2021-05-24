import * as React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions, TextInput, TouchableOpacity, Image, Alert} from 'react-native';

import List from '../List';
import {SCDream4, SCDream5, SCDream6} from '../../../../src/font';

const Etc = (props) => {
  const {navigation, partners, searchHandler, hiddenLocationHandler} = props;

  const [keyword, setKeyword] = React.useState('');

  const renderRow = ({item, index}) => {
    return <List item={item} index={index} navigation={navigation} />;
  };

  return (
    <View style={{paddingHorizontal: 16, marginBottom: 50}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          borderWidth: 1,
          borderColor: '#DEDEDE',
          borderRadius: 5,
          paddingHorizontal: 10,
        }}>
        <TextInput
          value={keyword}
          placeholder="업체명을 입력하세요."
          placeholderTextColor="#BEBEBE"
          autoFocus={false}
          onFocus={() => hiddenLocationHandler()}
          onChangeText={(text) => setKeyword(text)}
          style={[styles.normalText, {width: '80%', height:50}]}
          onSubmitEditing={() => searchHandler(keyword)}
          autoCapitalize="none"
        />
        {keyword ? 
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setKeyword(null);
            searchHandler(null);
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 23,
              height: 23,
              borderRadius: 23,
              backgroundColor: '#EFEFEF',
            }}>
            <Image
              source={require('../../../../src/assets/icon_close02.png')}
              resizeMode="cover"
              style={{
                width: 15,
                height: 15,
              }}
              fadeDuration={1000}
            />
          </View>
        </TouchableOpacity>
        : null}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => searchHandler(keyword)}
        >
          <Image
            source={require('../../../../src/assets/top_seach.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
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
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              height: Dimensions.get('window').height - 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontFamily: SCDream4}}>해당 업체가 없습니다.</Text>
          </View>
        }
        // onEndReached={handleLoadMore}
      />
    </View>
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

export default Etc;
