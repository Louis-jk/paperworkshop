import * as React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

const Check = (props) => {
  const navigation = props.navigation;

  const {fcmToken} = useSelector((state) => state.InfoReducer);
  const {mb_id} = useSelector((state) => state.UserInfoReducer);

  React.useEffect(() => {
    if (fcmToken && mb_id !== null) {
      navigation.navigate('Stack');
    }
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Check;
