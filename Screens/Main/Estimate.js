import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Dash from 'react-native-dash';
import Header from '../Common/Header';

const Estimate = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <Header title={routeName} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, marginBottom: 100 }}>
          {/* 실시간 견적현황 리스트(list) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(54, 109, 229, 0.07)',
                  borderRadius: 5,
                  marginRight: 15,
                }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>
                    입찰중
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>12건</Text>
                </View>
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}
                    numberOfLines={1}>
                    중소기업 선물용 쇼핑백 제작요청
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, color: '#979797' }]}
                  numberOfLines={1}>
                  단상자, 선물세트 / 견적 3건
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text
                style={[styles.normalText, { fontSize: 13, color: '#979797', marginBottom: 5 }]}>
                홍**
              </Text>
              <Text style={[styles.normalText, { fontSize: 13, color: '#979797' }]}>
                2021.01.25
              </Text>
            </View>
          </View>
          <Dash
            style={{ width: '100%', height: 0.25 }}
            dashLength={1}
            dashColor="#ccc"
            dashGap={2}
            dashThickness={1}
          />
          {/* // 실시간 견적현황 리스트(list) */}
          {/* 실시간 견적현황 리스트(list) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(54, 109, 229, 0.07)',
                  borderRadius: 5,
                  marginRight: 15,
                }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>
                    입찰중
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>12건</Text>
                </View>
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}
                    numberOfLines={1}>
                    중소기업 선물용 쇼핑백 제작요청
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, color: '#979797' }]}
                  numberOfLines={1}>
                  단상자, 선물세트 / 견적 3건
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text
                style={[styles.normalText, { fontSize: 13, color: '#979797', marginBottom: 5 }]}>
                홍**
              </Text>
              <Text style={[styles.normalText, { fontSize: 13, color: '#979797' }]}>
                2021.01.25
              </Text>
            </View>
          </View>
          <Dash
            style={{ width: '100%', height: 0.25 }}
            dashLength={1}
            dashColor="#ccc"
            dashGap={2}
            dashThickness={1}
          />
          {/* // 실시간 견적현황 리스트(list) */}
          {/* 실시간 견적현황 리스트(list) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(54, 109, 229, 0.07)',
                  borderRadius: 5,
                  marginRight: 15,
                }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>
                    입찰중
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>12건</Text>
                </View>
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}
                    numberOfLines={1}>
                    중소기업 선물용 쇼핑백 제작요청
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, color: '#979797' }]}
                  numberOfLines={1}>
                  단상자, 선물세트 / 견적 3건
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text
                style={[styles.normalText, { fontSize: 13, color: '#979797', marginBottom: 5 }]}>
                홍**
              </Text>
              <Text style={[styles.normalText, { fontSize: 13, color: '#979797' }]}>
                2021.01.25
              </Text>
            </View>
          </View>
          <Dash
            style={{ width: '100%', height: 0.25 }}
            dashLength={1}
            dashColor="#ccc"
            dashGap={2}
            dashThickness={1}
          />
          {/* // 실시간 견적현황 리스트(list) */}
          {/* 실시간 견적현황 리스트(list) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(54, 109, 229, 0.07)',
                  borderRadius: 5,
                  marginRight: 15,
                }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>
                    입찰중
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>12건</Text>
                </View>
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}
                    numberOfLines={1}>
                    중소기업 선물용 쇼핑백 제작요청
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, color: '#979797' }]}
                  numberOfLines={1}>
                  단상자, 선물세트 / 견적 3건
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text
                style={[styles.normalText, { fontSize: 13, color: '#979797', marginBottom: 5 }]}>
                홍**
              </Text>
              <Text style={[styles.normalText, { fontSize: 13, color: '#979797' }]}>
                2021.01.25
              </Text>
            </View>
          </View>
          <Dash
            style={{ width: '100%', height: 0.25 }}
            dashLength={1}
            dashColor="#ccc"
            dashGap={2}
            dashThickness={1}
          />
          {/* // 실시간 견적현황 리스트(list) */}
          {/* 실시간 견적현황 리스트(list) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(54, 109, 229, 0.07)',
                  borderRadius: 5,
                  marginRight: 15,
                }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>
                    입찰중
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>12건</Text>
                </View>
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}
                    numberOfLines={1}>
                    중소기업 선물용 쇼핑백 제작요청
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, color: '#979797' }]}
                  numberOfLines={1}>
                  단상자, 선물세트 / 견적 3건
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text
                style={[styles.normalText, { fontSize: 13, color: '#979797', marginBottom: 5 }]}>
                홍**
              </Text>
              <Text style={[styles.normalText, { fontSize: 13, color: '#979797' }]}>
                2021.01.25
              </Text>
            </View>
          </View>
          <Dash
            style={{ width: '100%', height: 0.25 }}
            dashLength={1}
            dashColor="#ccc"
            dashGap={2}
            dashThickness={1}
          />
          {/* // 실시간 견적현황 리스트(list) */}
          {/* 실시간 견적현황 리스트(list) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(54, 109, 229, 0.07)',
                  borderRadius: 5,
                  marginRight: 15,
                }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>
                    입찰중
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>12건</Text>
                </View>
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}
                    numberOfLines={1}>
                    중소기업 선물용 쇼핑백 제작요청
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, color: '#979797' }]}
                  numberOfLines={1}>
                  단상자, 선물세트 / 견적 3건
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text
                style={[styles.normalText, { fontSize: 13, color: '#979797', marginBottom: 5 }]}>
                홍**
              </Text>
              <Text style={[styles.normalText, { fontSize: 13, color: '#979797' }]}>
                2021.01.25
              </Text>
            </View>
          </View>
          <Dash
            style={{ width: '100%', height: 0.25 }}
            dashLength={1}
            dashColor="#ccc"
            dashGap={2}
            dashThickness={1}
          />
          {/* // 실시간 견적현황 리스트(list) */}
          {/* 실시간 견적현황 리스트(list) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(54, 109, 229, 0.07)',
                  borderRadius: 5,
                  marginRight: 15,
                }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>
                    입찰중
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>12건</Text>
                </View>
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}
                    numberOfLines={1}>
                    중소기업 선물용 쇼핑백 제작요청
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, color: '#979797' }]}
                  numberOfLines={1}>
                  단상자, 선물세트 / 견적 3건
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text
                style={[styles.normalText, { fontSize: 13, color: '#979797', marginBottom: 5 }]}>
                홍**
              </Text>
              <Text style={[styles.normalText, { fontSize: 13, color: '#979797' }]}>
                2021.01.25
              </Text>
            </View>
          </View>
          <Dash
            style={{ width: '100%', height: 0.25 }}
            dashLength={1}
            dashColor="#ccc"
            dashGap={2}
            dashThickness={1}
          />
          {/* // 실시간 견적현황 리스트(list) */}
          {/* 실시간 견적현황 리스트(list) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(54, 109, 229, 0.07)',
                  borderRadius: 5,
                  marginRight: 15,
                }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>
                    입찰중
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>12건</Text>
                </View>
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}
                    numberOfLines={1}>
                    중소기업 선물용 쇼핑백 제작요청
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, color: '#979797' }]}
                  numberOfLines={1}>
                  단상자, 선물세트 / 견적 3건
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text
                style={[styles.normalText, { fontSize: 13, color: '#979797', marginBottom: 5 }]}>
                홍**
              </Text>
              <Text style={[styles.normalText, { fontSize: 13, color: '#979797' }]}>
                2021.01.25
              </Text>
            </View>
          </View>
          <Dash
            style={{ width: '100%', height: 0.25 }}
            dashLength={1}
            dashColor="#ccc"
            dashGap={2}
            dashThickness={1}
          />
          {/* // 실시간 견적현황 리스트(list) */}
          {/* 실시간 견적현황 리스트(list) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(54, 109, 229, 0.07)',
                  borderRadius: 5,
                  marginRight: 15,
                }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>
                    입찰중
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>12건</Text>
                </View>
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}
                    numberOfLines={1}>
                    중소기업 선물용 쇼핑백 제작요청
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, color: '#979797' }]}
                  numberOfLines={1}>
                  단상자, 선물세트 / 견적 3건
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text
                style={[styles.normalText, { fontSize: 13, color: '#979797', marginBottom: 5 }]}>
                홍**
              </Text>
              <Text style={[styles.normalText, { fontSize: 13, color: '#979797' }]}>
                2021.01.25
              </Text>
            </View>
          </View>
          <Dash
            style={{ width: '100%', height: 0.25 }}
            dashLength={1}
            dashColor="#ccc"
            dashGap={2}
            dashThickness={1}
          />
          {/* // 실시간 견적현황 리스트(list) */}
          {/* 실시간 견적현황 리스트(list) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFF',
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(54, 109, 229, 0.07)',
                  borderRadius: 5,
                  marginRight: 15,
                }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>
                    입찰중
                  </Text>
                  <Text style={[styles.normalText, { fontSize: 12, color: '#366DE5' }]}>12건</Text>
                </View>
              </View>
              <View
                style={{
                  flexShrink: 2,
                  marginRight: 35,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.mediumText,
                      {
                        color: '#000',
                        fontSize: 14,
                      },
                    ]}
                    numberOfLines={1}>
                    중소기업 선물용 쇼핑백 제작요청
                  </Text>
                </View>
                <Text
                  style={[styles.normalText, { fontSize: 13, color: '#979797' }]}
                  numberOfLines={1}>
                  단상자, 선물세트 / 견적 3건
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text
                style={[styles.normalText, { fontSize: 13, color: '#979797', marginBottom: 5 }]}>
                홍**
              </Text>
              <Text style={[styles.normalText, { fontSize: 13, color: '#979797' }]}>
                2021.01.25
              </Text>
            </View>
          </View>
          <Dash
            style={{ width: '100%', height: 0.25 }}
            dashLength={1}
            dashColor="#ccc"
            dashGap={2}
            dashThickness={1}
          />
          {/* // 실시간 견적현황 리스트(list) */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Order')}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#275696',
              marginTop: 40,
              borderRadius: 5,
            }}>
            <Text
              style={[
                styles.mediumText,
                { textAlign: 'center', fontSize: 16, color: '#fff', paddingVertical: 15 },
              ]}>
              견적 신청하기
            </Text>
          </TouchableOpacity>
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

export default Estimate;
