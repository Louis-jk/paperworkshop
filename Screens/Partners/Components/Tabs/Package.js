import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';

import List from '../List';

const Package = (props) => {
  const navigation = props.navigation;
  const partners = props.partners;

  const renderRow = ({item, index}) => {
    return <List item={item} index={index} navigation={navigation} />;
  };

  return (
    <View style={{paddingHorizontal: 16}}>
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
            <Text style={{fontFamily: 'SCDream4'}}>해당 업체가 없습니다.</Text>
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
