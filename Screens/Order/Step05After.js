import * as React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import DetailHeader from '../Common/DetailHeader';
import BoxTypeAPI from '../../src/api/BoxType';

import {
    setUserFrequency,
    setUserPrinting,
    setUserPrintSup,
    setUserFrequency2,
    setUserPrinting2,
    setUserPrintSup2,
  } from '../../Modules/OrderReducer';

import DropDownPicker from 'react-native-dropdown-picker';

const Step05After = (props) => {

    const {navigation} = props;
    const routeName = props.route.name;
    const propsScreenName = props.route.params.screen;

    console.log("props", props);

    const {cate1, ca_id} = useSelector((state) => state.OrderReducer);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = React.useState(false);

    const [getPrtFrequency, setGetPrtFrequency] = React.useState([]); //  인쇄도수 API 가져온 값 - 경우에 따라 표지용
    const [getPrtFrequencyInner, setGetPrtFrequencyInner] = React.useState([]); //  인쇄도수 - 내지용
  
    const [getProofPrinting, setGetProofPrinting] = React.useState(null); //  인쇄교정 API 가져온 값 - 경우에 따라 표지용 
    const [getProofPrintingInner, setGetProofPrintingInner] = React.useState(null); //  인쇄교정 - 내지용 
  
    const [getPrtSupervision, setGetPrtSupervision] = React.useState(null); //  인쇄감리 API 가져온 값 - 경우에 따라 표지용
    const [getPrtSupervisionInner, setGetPrtSupervisionInner] = React.useState(null); //  인쇄감리 - 내지용

    const [printColor, setPrintColor] = React.useState(null); //  인쇄도수 - 경우에 따라 표지용
    const [correction, setCorrection] = React.useState('Y'); //  인쇄교정 - 경우에 따라 표지용
    const [inspection, setInspection] = React.useState('Y'); //  인쇄감리 - 경우에 따라 표지용
  
    const [innerPrintColor, setInnerPrintColor] = React.useState(null); //  인쇄도수 - 내지용
    const [innerCorrection, setInnerCorrection] = React.useState('Y'); //  인쇄교정 - 내지용
    const [innerInspection, setInnerInspection] = React.useState('Y'); //  인쇄감리 - 내지용

    const [printError, setPrintError] = React.useState(false); // 인쇄도수 선택 안했을 경우 - 경우에 따라 표지용
    const [printInnerError, setPrintInnerError] = React.useState(false); // 인쇄도수 선택 안했을 경우 - 내지용

    

    /*
    에러 정의
    */
    const [printColorError, setPrintColorError] = React.useState(false); //  에러 : 인쇄도수 - 경우에 따라 표지용
    const [correctionError, setCorrectionError] = React.useState(false); //  에러 : 인쇄교정 - 경우에 따라 표지용
    const [inspectionError, setInspectionError] = React.useState(false); //  에러 : 인쇄감리 - 경우에 따라 표지용
  
    const [innerPrintColorError, setInnerPrintColorError] = React.useState(false); //  에러 : 인쇄도수 - 내지용
    const [innerCorrectionError, setInnerCorrectionError] = React.useState(false); //  에러 : 인쇄교정 - 내지용
    const [innerInspectionError, setInnerInspectionError] = React.useState(false); //  에러 : 인쇄감리 - 내지용


    // 인쇄도수/교정/감리 가져오기
    const getCheckPrintAPIHandler = () => {
        setIsLoading(true);
    
        BoxTypeAPI.getCheckPrint(cate1, ca_id)
          .then(res => {
            console.log("checked", res)
            setGetPrtFrequency(res.data.item[0].print_frequency); // 상세 지종 인쇄도수 API 가져온 값 담기
            setGetProofPrinting(res.data.item[0].proof_printing); // 상세 지종 인쇄교정 API 가져온 값 담기
            setGetPrtSupervision(res.data.item[0].print_supervision); // 상세 지종 인쇄감리 API 가져온 값 담기
            
            if(cate1 === '0' && (ca_id === '1' || ca_id === '4')) {
              setGetPrtFrequencyInner(res.data.item[0].print_frequency2); // 상세 지종 내지용 인쇄도수 API 가져온 값 담기
              setGetProofPrintingInner(res.data.item[0].proof_printing2); // 상세 지종 내지용 인쇄교정 API 가져온 값 담기
              setGetPrtSupervisionInner(res.data.item[0].print_supervision2); // 상세 지종 내지용 인쇄감리 API 가져온 값 담기
            }
    
            setIsLoading(false);
          })
          .catch((err) => {
            Alert.alert(err, '관리자에게 문의하세요', [
              {
                text: '확인',
              },
            ]);
            setIsLoading(false);
        });
    }

    React.useEffect(() => {
        getCheckPrintAPIHandler();
    },[cate1, ca_id])


    const nextBtn = () => {
        
        if(printColor === null || printColor === '') {
            setPrintColorError(true);
        } else if(cate1 === '0' && (ca_id === '1' || ca_id === '4') && (innerPrintColor === null || innerPrintColor === '')) {
            setInnerPrintColorError(true);
        } else {
            dispatch(setUserFrequency(printColor));
            dispatch(setUserFrequency2(innerPrintColor));
            dispatch(setUserPrinting(correction));
            dispatch(setUserPrinting2(innerCorrection));
            dispatch(setUserPrintSup(inspection));
            dispatch(setUserPrintSup2(innerInspection));

            navigation.navigate('OrderStep06', {
                screen: propsScreenName === 'DirectOrder' ? propsScreenName : null,
              });
        }
    }

    return (
        <>
        {isLoading && (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 100,
                    elevation: 0,
                    backgroundColor: 'transparent',
                }}>
            <ActivityIndicator size="large" color="#275696" />
            </View>
        )}
        
        <DetailHeader
            title={propsScreenName === 'DirectOrder' ? propsScreenName : routeName}
            navigation={navigation}
        />
        <View style={{flex:1, paddingHorizontal:20, paddingTop:20, backgroundColor: '#fff'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrap}>
                {/* 인쇄 도수  */}
                <View style={{marginBottom: 20}}>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                    }}>
                    <Text
                    style={[
                        styles.boldText,
                        {fontSize: 16, color: '#275696', marginBottom: 10},
                    ]}>
                    인쇄도수/교정/감리 선택 {cate1 === '0' && (ca_id === '1' || ca_id === '4') ? '(표지)' : null}
                    </Text>
                </View>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10,
                    }}>
                    <Text style={[styles.profileTitle, {marginRight: 5}]}>
                    인쇄도수
                    </Text>
                    {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
                {getPrtFrequency.length > 0 ? (
                    <DropDownPicker
                    placeholder={'도수 선택'}
                    placeholderStyle={{
                        fontSize: 14,
                        color: '#A2A2A2',
                        fontWeight: '400',
                    }}
                    activeLabelStyle={{color: '#000'}}
                    activeItemStyle={{color: '#000'}}
                    selectedLabelStyle={{color: '#000'}}
                    value={printColor}
                    items={getPrtFrequency.map((v, _i) => {
                        return {value: v, label: v};
                    })}
                    dropDownMaxHeight={200}
                    containerStyle={{height: 50}}
                    style={{
                        backgroundColor: '#fff',
                        borderTopRightRadius: 4,
                        borderTopLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        borderBottomLeftRadius: 4,
                    }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                    }}
                    labelStyle={{fontFamily: 'SCDream4', color: '#A2A2A2'}}
                    dropDownStyle={{backgroundColor: '#fff'}}
                    onChangeItem={(item) => {
                        setPrintColorError(false);
                        setPrintColor(item.value);
                    }}
                    customArrowDown={() => (
                        <Image
                        source={require('../../src/assets/arr01.png')}
                        style={{width: 25, height: 25}}
                        resizeMode="contain"
                        />
                    )}
                    customArrowUp={() => (
                        <Image
                        source={require('../../src/assets/arr01_top.png')}
                        style={{width: 25, height: 25}}
                        resizeMode="contain"
                        />
                    )}
                    />
                ) : (
                    <View>
                    <Text style={{fontFamily: 'SCDream4'}}>없음</Text>
                    </View>
                )}
                {printColorError ? (
                    <Text
                    style={{
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        color: '#366DE5',
                        marginVertical: 5,
                    }}>
                    인쇄도수를 선택해주세요.
                    </Text>
                ) : null}
                </View>
                {/* // 인쇄 도수  */}

                {/* 인쇄 교정  */}
                <View style={{marginBottom: 20}}>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    }}>
                    <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                        인쇄교정
                    </Text>
                    </View>

                    {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
                <View>
                    {getProofPrinting !== null && getProofPrinting.length > 0 ? (
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        }}>
                        {getProofPrinting.map((t, idx) => (
                        <TouchableOpacity
                            key={idx}
                            activeOpacity={1}
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            onPress={() => setCorrection(t)}
                            style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginRight: 20,
                            marginBottom: 10,
                            }}>
                            <Image
                            source={
                                correction === t
                                ? require('../../src/assets/radio_on.png')
                                : require('../../src/assets/radio_off.png')
                            }
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 5}}
                            />
                            <Text style={[styles.normalText, {fontSize: 14}]}>
                            {t === 'Y' ? '있음' : '없음'}
                            </Text>
                        </TouchableOpacity>
                        ))}
                    </View>
                    ) : (
                    <View>
                        <Text style={{fontFamily: 'SCDream4'}}>없음</Text>
                    </View>
                    )}
                </View>
                </View>
                {/* // 인쇄 교정  */}

                {/* 인쇄 감리  */}
                <View style={{marginBottom: 25}}>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    }}>
                    <View>
                    <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                        인쇄감리
                    </Text>
                    </View>

                    {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                </View>
                <View>
                    {getPrtSupervision !== null && getPrtSupervision.length > 0 ? (
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        }}>
                        {getPrtSupervision.map((t, idx) => (
                        <TouchableOpacity
                            key={idx}
                            activeOpacity={1}
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            onPress={() => setInspection(t)}
                            style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginRight: 20,
                            marginBottom: 10,
                            }}>
                            <Image
                            source={
                                inspection === t
                                ? require('../../src/assets/radio_on.png')
                                : require('../../src/assets/radio_off.png')
                            }
                            resizeMode="contain"
                            style={{width: 20, height: 20, marginRight: 5}}
                            />
                            <Text style={[styles.normalText, {fontSize: 14}]}>
                            {t === 'Y' ? '있음' : '없음'}
                            </Text>
                        </TouchableOpacity>
                        ))}
                    </View>
                    ) : (
                    <View>
                        <Text style={{fontFamily: 'SCDream4'}}>없음</Text>
                    </View>
                    )}
                </View>
                </View>
                {/* // 인쇄 감리  */}
            </View>
            
                {/* 인쇄도수/교정/감리 내지용 */}
                {cate1 === '0' && (ca_id === '1' || ca_id === '4') ?
                    (
                    <View style={styles.wrap}>
                    {/* 인쇄 도수  */}
                    <View style={{marginBottom: 20}}>
                        <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}>
                        <Text
                            style={[
                            styles.boldText,
                            {fontSize: 16, color: '#275696', marginBottom: 10},
                            ]}>
                            인쇄도수/교정/감리 선택 (내지)
                        </Text>
                        </View>
                        <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}>
                        <Text style={[styles.profileTitle, {marginRight: 5}]}>
                            인쇄도수
                        </Text>
                        {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                        </View>
                        {getPrtFrequencyInner.length > 0 ? (
                        <DropDownPicker
                            placeholder={'도수 선택'}
                            placeholderStyle={{
                            fontSize: 14,
                            color: '#A2A2A2',
                            fontWeight: '400',
                            }}
                            activeLabelStyle={{color: '#000'}}
                            activeItemStyle={{color: '#000'}}
                            selectedLabelStyle={{color: '#000'}}
                            value={innerPrintColor}
                            items={getPrtFrequencyInner.map((v, _i) => {
                            return {value: v, label: v};
                            })}
                            dropDownMaxHeight={200}
                            containerStyle={{height: 50}}
                            style={{
                            backgroundColor: '#fff',
                            borderTopRightRadius: 4,
                            borderTopLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            borderBottomLeftRadius: 4,
                            }}
                            itemStyle={{
                            justifyContent: 'flex-start',
                            paddingVertical: 10,
                            }}
                            labelStyle={{fontFamily: 'SCDream4', color: '#A2A2A2'}}
                            dropDownStyle={{backgroundColor: '#fff'}}
                            onChangeItem={(item) => {
                            setInnerPrintColorError(false);
                            setInnerPrintColor(item.value);
                            }}
                            customArrowDown={() => (
                            <Image
                                source={require('../../src/assets/arr01.png')}
                                style={{width: 25, height: 25}}
                                resizeMode="contain"
                            />
                            )}
                            customArrowUp={() => (
                            <Image
                                source={require('../../src/assets/arr01_top.png')}
                                style={{width: 25, height: 25}}
                                resizeMode="contain"
                            />
                            )}
                        />
                        ) : (
                        <View>
                            <Text style={{fontFamily: 'SCDream4'}}>없음</Text>
                        </View>
                        )}
                        {innerPrintColorError ? (
                        <Text
                            style={{
                            fontFamily: 'SCDream4',
                            fontSize: 12,
                            color: '#366DE5',
                            marginVertical: 5,
                            }}>
                            인쇄도수를 선택해주세요.
                        </Text>
                        ) : null}
                    </View>
                    {/* // 인쇄 도수  */}

                    {/* 인쇄 교정  */}
                    <View style={{marginBottom: 20}}>
                        <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                        <View>
                            <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                            인쇄교정
                            </Text>
                        </View>

                        {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                        </View>
                        <View>
                        {getProofPrintingInner !== null && getProofPrintingInner.length > 0 ? (
                            <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                            {getProofPrintingInner.map((t, idx) => (
                                <TouchableOpacity
                                key={idx}
                                activeOpacity={1}
                                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                                onPress={() => setInnerCorrection(t)}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginRight: 20,
                                    marginBottom: 10,
                                }}>
                                <Image
                                    source={
                                    innerCorrection === t
                                        ? require('../../src/assets/radio_on.png')
                                        : require('../../src/assets/radio_off.png')
                                    }
                                    resizeMode="contain"
                                    style={{width: 20, height: 20, marginRight: 5}}
                                />
                                <Text style={[styles.normalText, {fontSize: 14}]}>
                                    {t === 'Y' ? '있음' : '없음'}
                                </Text>
                                </TouchableOpacity>
                            ))}
                            </View>
                        ) : (
                            <View>
                            <Text style={{fontFamily: 'SCDream4'}}>없음</Text>
                            </View>
                        )}
                        </View>
                    </View>
                    {/* // 인쇄 교정  */}

                    {/* 인쇄 감리  */}
                    <View style={{marginBottom: 25}}>
                        <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                        <View>
                            <Text style={[styles.profileTitle, {marginBottom: 5}]}>
                            인쇄감리
                            </Text>
                        </View>

                        {/* <Text style={[styles.profileRequired]}>(필수)</Text> */}
                        </View>
                        <View>
                        {getPrtSupervisionInner !== null && getPrtSupervisionInner.length > 0 ? (
                            <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                            {getPrtSupervisionInner.map((t, idx) => (
                                <TouchableOpacity
                                key={idx}
                                activeOpacity={1}
                                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                                onPress={() => setInnerInspection(t)}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginRight: 20,
                                    marginBottom: 10,
                                }}>
                                <Image
                                    source={
                                    innerInspection === t
                                        ? require('../../src/assets/radio_on.png')
                                        : require('../../src/assets/radio_off.png')
                                    }
                                    resizeMode="contain"
                                    style={{width: 20, height: 20, marginRight: 5}}
                                />
                                <Text style={[styles.normalText, {fontSize: 14}]}>
                                    {t === 'Y' ? '있음' : '없음'}
                                </Text>
                                </TouchableOpacity>
                            ))}
                            </View>
                        ) : (
                            <View>
                            <Text style={{fontFamily: 'SCDream4'}}>없음</Text>
                            </View>
                        )}
                        </View>
                    </View>
                    {/* // 인쇄 감리  */}
                    </View>
                    )  
                    : null
                }
            {/* // 인쇄도수/교정/감리 내지용 */}
            </ScrollView>
            <View style={{width: '100%', marginBottom: 20}}>
                {/* 이전, 다음 버튼 부분 (Prev, Next) */}
                <View>
                    <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        marginBottom: 0,
                    }}>
                    <View
                        style={{
                        borderWidth: 0.5,
                        height: '100%',
                        borderColor: '#E3E3E3',
                        }}
                    />
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 15,
                        }}>
                        <Image
                            source={require('../../src/assets/prevUnActiveArrow.png')}
                            resizeMode="contain"
                            style={{width: 16, height: 16, marginRight: 7}}
                        />
                        <Text
                            style={[
                            styles.normalText,
                            {
                                fontSize: 14,
                                color: '#707070',
                                letterSpacing: -1,
                            },
                            ]}>
                            이전
                        </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View
                        style={{
                        borderWidth: 0.5,
                        height: '100%',
                        borderColor: '#E3E3E3',
                        }}
                    />
                    <TouchableWithoutFeedback onPress={() => nextBtn()}>
                        <View
                        style={{
                            flex: 1,
                            flexDirection: 'row-reverse',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 15,
                        }}>
                        <Image
                            source={require('../../src/assets/nextActiveArrow.png')}
                            resizeMode="contain"
                            style={{width: 16, height: 16, marginLeft: 7}}
                        />
                        <Text
                            style={[
                            styles.normalText,
                            {
                                fontSize: 14,
                                letterSpacing: -1,
                            },
                            ]}>
                            다음
                        </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    </View>
                </View>
                {/* // 이전, 다음 버튼 부분 (Prev, Next) */}
            </View>      
          </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    flexRowCenter: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    wrap: {
      paddingVertical: 10,
      backgroundColor: '#fff',
    },
    profileBox: {
      marginBottom: 10,
    },
    profileTitle: {
      fontFamily: 'SCDream5',
      fontSize: 15,
      color: '#111',
    },
    profileRequired: {
      fontFamily: 'SCDream4',
      fontSize: 14,
      color: '#366DE5',
    },
    profileDesc: {
      fontSize: 15,
      lineHeight: 16,
      color: '#111',
    },
    prevNextBtn: {
      borderWidth: 1,
      borderColor: '#E3E3E3',
      borderRadius: 4,
      backgroundColor: '#fff',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    prevNextBtnText: {
      fontSize: 16,
      color: '#111',
      textAlign: 'center',
    },
    submitBtn: {
      borderRadius: 4,
      backgroundColor: '#275696',
      width: '100%',
      paddingVertical: 15,
    },
    submitBtnText: {
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    cancelBtn: {
      borderRadius: 4,
      backgroundColor: '#F5F5F5',
      width: '100%',
      paddingVertical: 15,
    },
    cancelBtnText: {
      fontSize: 16,
      color: '#111',
      textAlign: 'center',
    },
    picker: {
      width: 180,
    },
    listWrap: {
      paddingVertical: 20,
    },
    listTitle: {
      fontSize: 14,
      lineHeight: 19,
      marginBottom: 5,
    },
    listDesc: {
      fontSize: 12,
      lineHeight: 16,
      color: '#A2A2A2',
    },
    listStep: {
      fontSize: 14,
      color: '#275696',
    },
    listDday: {
      alignSelf: 'flex-end',
      fontSize: 14,
      color: '#A2A2A2',
    },
    line: {
      width: '100%',
      height: 1,
      backgroundColor: '#E3E3E3',
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
  
export default Step05After;
