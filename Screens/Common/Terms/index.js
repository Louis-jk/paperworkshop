import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>이용약관</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default index;
