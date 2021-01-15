import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import Header from '../Common/Header';

const Estimate = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <SafeAreaView>
      <Header title={routeName} navigation={navigation} />
      <ScrollView>
        <View>
          <Text>견적</Text>
        </View>
      </ScrollView>
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
});

export default Estimate;
