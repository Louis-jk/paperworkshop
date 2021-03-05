import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';

import List from '../List';

const All = (props) => {
  const navigation = props.navigation;
  const partners = props.partners;

  const renderRow = ({item, index}) => {
    return <List item={item} index={index} navigation={navigation} />;
  };

  return partners ? (
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
        // onEndReached={handleLoadMore}
      />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.normalText}>해당 업체가 없습니다.</Text>
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

export default All;
