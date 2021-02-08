import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native';
import Header from '../Common/Header';

const Price = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={routeName} navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.normalText}>지류고시가</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    height: Dimensions.get('window').height - 300,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Price;
