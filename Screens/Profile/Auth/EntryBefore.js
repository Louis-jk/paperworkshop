import * as React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

const EntryBefore = (props) => {
  const navigation = props.navigation;

  const {login_yn} = useSelector((state) => state.UserInfoReducer);

  const loginTrueFalse = () => {
    if (login_yn === 'Y') {
      navigation.navigate('Stack');
    } else {
      navigation.navigate('Login');
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
      <Text style={{fontFamily: 'SCDream4', color: '#fff', marginBottom: 10}}>
        로그인 확인중...
      </Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default EntryBefore;
