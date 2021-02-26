import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';

import axios from 'axios';
import qs from 'qs';

import GalleryApi from '../../src/api/Gallery';

const GalleryNav = (props) => {
  const navigation = props.navigation;
  const routeName = props.routeName;

  const [isLoading, setIsLoading] = React.useState(false);
  const [packagesInfo, setPackagesInfo] = React.useState([]);
  const [generalInfo, setGeneralInfo] = React.useState([]);
  const [etcInfo, setEtcInfo] = React.useState([]);

  const [isActivePackages, setIsActivePackages] = React.useState(false);
  const togglePackages = () => {
    setIsActivePackages(!isActivePackages);
    setIsActiveGeneral(false);
    setIsActiveEtc(false);
  };

  const [isActiveGeneral, setIsActiveGeneral] = React.useState(false);
  const toggleGenerals = () => {
    setIsActiveGeneral(!isActiveGeneral);
    setIsActivePackages(false);
    setIsActiveEtc(false);
  };

  const [isActiveEtc, setIsActiveEtc] = React.useState(false);
  const toggleEtc = () => {
    setIsActiveEtc(!isActiveEtc);
    setIsActivePackages(false);
    setIsActiveGeneral(false);
  };

  const getPackages = () => {
    setIsLoading(true);
    GalleryApi.getPartner('proc_cate_list', '1')
      .then((res) => {
        console.log('package: ', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setPackagesInfo(res.data.item);
          setIsLoading(false);
        } else {
          setPackagesInfo(null);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const getGenerals = () => {
    setIsLoading(true);
    GalleryApi.getPartner('proc_cate_list', '0')
      .then((res) => {
        console.log('general: ', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setGeneralInfo(res.data.item);
          setIsLoading(false);
        } else {
          setGeneralInfo(null);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const getEtc = () => {
    setIsLoading(true);
    GalleryApi.getPartner('proc_cate_list', '2')
      .then((res) => {
        console.log('etc: ', res);
        if (res.data.result === '1' && res.data.count > 0) {
          setEtcInfo(res.data.item);
          setIsLoading(false);
        } else {
          setEtcInfo(null);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getPackages();
    getGenerals();
    getEtc();
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        {routeName === 'Gallery' ? (
          <View style={{position: 'relative'}}>
            <Text
              style={[
                styles.mediumText,
                {
                  fontSize: 15,
                  marginBottom: 5,
                  marginRight: 20,
                },
              ]}>
              전체
            </Text>
            <View
              style={{
                position: 'absolute',
                top: -1,
                right: 13,
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#275696',
              }}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Gallery', {
                screen: 'Gallery',
                name: 'All',
              });
              setIsActivePackages(false);
              setIsActiveGeneral(false);
              setIsActiveEtc(false);
            }}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
                  marginBottom: 5,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              전체
            </Text>
          </TouchableOpacity>
        )}

        {routeName === 'GalleryPackage' ? (
          <View style={{position: 'relative'}}>
            <TouchableOpacity onPress={togglePackages} activeOpacity={0.8}>
              <Text
                style={[
                  styles.mediumText,
                  {
                    fontSize: 15,
                    marginBottom: 5,
                    marginRight: 20,
                  },
                ]}>
                패키지
              </Text>
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                top: -1,
                right: 13,
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#275696',
              }}
            />
          </View>
        ) : (
          <TouchableOpacity onPress={togglePackages} activeOpacity={0.8}>
            <Text
              style={[
                isActivePackages ? styles.mediumText : styles.normalText,
                {
                  fontSize: 15,
                  marginBottom: 5,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              패키지
            </Text>
          </TouchableOpacity>
        )}
        {isActivePackages && (
          <View
            style={{
              position: 'absolute',
              top: 25,
              left: 20,
              backgroundColor: '#fff',
              zIndex: 100,
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              style={{paddingVertical: 10, paddingHorizontal: 10}}
              onPress={() => {
                navigation.navigate('GalleryPackage', {
                  screen: 'GalleryPackage',
                  name: 'Packages',
                  routeName: routeName,
                  cate1: '1',
                  ca_id: null,
                });
                setIsActivePackages(false);
                setIsActiveGeneral(false);
                setIsActiveEtc(false);
              }}>
              <Text style={{fontFamily: 'SCDream4', fontSize: 12}}>전체</Text>
            </TouchableOpacity>
            {packagesInfo.map((v, idx) => (
              <TouchableOpacity
                key={v.ca_id}
                style={{paddingVertical: 10, paddingHorizontal: 10}}
                onPress={() => {
                  navigation.navigate('GalleryPackage', {
                    screen: 'GalleryPackage',
                    name: 'Packages',
                    routeName: routeName,
                    cate1: '1',
                    ca_id: v.ca_id,
                  });
                  setIsActivePackages(false);
                  setIsActiveGeneral(false);
                  setIsActiveEtc(false);
                }}>
                <Text style={{fontFamily: 'SCDream4', fontSize: 12}}>
                  {v.ca_id === v.ca_id && v.ca_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {routeName === 'GalleryGeneral' ? (
          <View style={{position: 'relative'}}>
            <TouchableOpacity onPress={toggleGenerals} activeOpacity={0.8}>
              <Text
                style={[
                  styles.mediumText,
                  {
                    fontSize: 15,
                    marginBottom: 5,
                    marginRight: 20,
                  },
                ]}>
                일반인쇄
              </Text>
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                top: -1,
                right: 13,
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#275696',
              }}
            />
          </View>
        ) : (
          <TouchableOpacity onPress={toggleGenerals} activeOpacity={0.8}>
            <Text
              style={[
                isActiveGeneral ? styles.mediumText : styles.normalText,
                {
                  fontSize: 15,
                  marginBottom: 5,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              일반인쇄
            </Text>
          </TouchableOpacity>
        )}
        {isActiveGeneral && (
          <View
            style={{
              position: 'absolute',
              top: 25,
              left: 65,
              backgroundColor: '#fff',
              zIndex: 100,
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              style={{paddingVertical: 10, paddingHorizontal: 10}}
              onPress={() => {
                navigation.navigate('GalleryGeneral', {
                  screen: 'GalleryGeneral',
                  name: 'General',
                  routeName: routeName,
                  cate1: '0',
                  ca_id: null,
                });
                setIsActivePackages(false);
                setIsActiveGeneral(false);
                setIsActiveEtc(false);
              }}>
              <Text style={{fontFamily: 'SCDream4', fontSize: 12}}>전체</Text>
            </TouchableOpacity>
            {generalInfo.map((v, idx) => (
              <TouchableOpacity
                key={v.ca_id}
                style={{paddingVertical: 10, paddingHorizontal: 10}}
                onPress={() => {
                  navigation.navigate('GalleryGeneral', {
                    screen: 'GalleryGeneral',
                    name: 'General',
                    routeName: routeName,
                    cate1: '0',
                    ca_id: v.ca_id,
                  });
                  setIsActivePackages(false);
                  setIsActiveGeneral(false);
                  setIsActiveEtc(false);
                }}>
                <Text style={{fontFamily: 'SCDream4', fontSize: 12}}>
                  {v.ca_id === v.ca_id && v.ca_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {routeName === 'GalleryEtc' ? (
          <View style={{position: 'relative'}}>
            <TouchableOpacity onPress={toggleEtc} activeOpacity={0.8}>
              <Text
                style={[
                  styles.mediumText,
                  {
                    fontSize: 15,
                    marginBottom: 5,
                    marginRight: 20,
                  },
                ]}>
                기타 인쇄물
              </Text>
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                top: -1,
                right: 13,
                width: 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: '#275696',
              }}
            />
          </View>
        ) : (
          <TouchableOpacity onPress={toggleEtc} activeOpacity={0.8}>
            <Text
              style={[
                isActiveEtc ? styles.mediumText : styles.normalText,
                {
                  fontSize: 15,
                  marginBottom: 5,
                  marginRight: 20,
                  color: '#707070',
                },
              ]}>
              기타 인쇄물
            </Text>
          </TouchableOpacity>
        )}
        {isActiveEtc && (
          <View
            style={{
              position: 'absolute',
              top: 25,
              left: 187,
              backgroundColor: '#fff',
              zIndex: 100,
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              style={{paddingVertical: 10, paddingHorizontal: 10}}
              onPress={() => {
                navigation.navigate('GalleryEtc', {
                  screen: 'GalleryEtc',
                  name: 'Etc',
                  routeName: routeName,
                  cate1: '2',
                  ca_id: null,
                });
                setIsActivePackages(false);
                setIsActiveGeneral(false);
                setIsActiveEtc(false);
              }}>
              <Text style={{fontFamily: 'SCDream4', fontSize: 12}}>전체</Text>
            </TouchableOpacity>
            {etcInfo.map((v, idx) => (
              <TouchableOpacity
                key={v.ca_id}
                style={{paddingVertical: 10, paddingHorizontal: 10}}
                onPress={() => {
                  navigation.navigate('GalleryEtc', {
                    screen: 'GalleryEtc',
                    name: 'All',
                    routeName: routeName,
                    cate1: '2',
                    ca_id: v.ca_id,
                  });
                  setIsActivePackages(false);
                  setIsActiveGeneral(false);
                  setIsActiveEtc(false);
                }}>
                <Text style={{fontFamily: 'SCDream4', fontSize: 12}}>
                  {v.ca_id === v.ca_id && v.ca_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 5,
          borderWidth: 1,
          borderColor: '#DEDEDE',
          borderRadius: 5,
          paddingHorizontal: 10,
        }}>
        <TextInput
          placeholder="키워드를 입력하세요."
          placeholderTextColor="#BEBEBE"
          autoFocus={false}
          style={[styles.normalText, {width: '80%'}]}
        />
        <TouchableOpacity>
          <Image
            source={require('../../src/assets/top_seach.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </>
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

export default GalleryNav;
