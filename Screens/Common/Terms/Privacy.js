import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Privacy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>개인정보 처리방침</Text>
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

export default Privacy;
