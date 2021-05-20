import * as React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const EntryBefore = (props) => {
  const navigation = props.navigation;

  const {login_yn} = useSelector((state) => state.UserInfoReducer);

  const loginTrueFalse = () => {
    if (login_yn === 'Y') {
      navigation.reset({routes: [{name: 'Stack'}]});
    } else {
      navigation.reset({routes: [{name: 'Login'}]});
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loginTrueFalse();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#275696',
      }}>
      <Text style={{fontFamily: SCDream4, color: '#fff', marginBottom: 10}}>
        로그인 확인중...
      </Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default EntryBefore;
