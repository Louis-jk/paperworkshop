import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';

import List from '../List';

const General = (props) => {
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
            <Text style={{fontFamily: 'SCDream4'}}>해당 업체가 없습니다.</Text>
          </View>
        }
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

export default General;
