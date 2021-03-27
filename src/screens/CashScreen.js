import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Icon, BottomSheet, Divider} from 'react-native-elements';
import {PieChart} from 'react-native-chart-kit';
import {DataTable} from 'react-native-paper';
import {CashFlowContext} from '../context/context';
const {height, width} = Dimensions.get('window');

export default function CashScreen(props) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [displayChart, setDisplayChart] = React.useState(true);
  const {state, setState} = React.useContext(CashFlowContext);
  const [categorySelect, setCategorySelect] = React.useState('Income');
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);

  const data = {
    incomeData: state.transactions
      .filter(e => e.category === 'income')
      .map(e => {
        return {...e, price: JSON.parse(e.price)};
      }),
    expenditureData: state.transactions
      .filter(e => e.category === 'expenditure')
      .map(e => {
        return {...e, price: JSON.parse(e.price)};
      }),
  };
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, 0.5)`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, 0.5)`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '7',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  React.useEffect(() => {
    showChart();
  }, []);

  const showChart = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <ImageBackground
      source={require('../assets/bg5.jpg')}
      style={{height, width, paddingTop: height * 0.05}}>
      <View
        style={{
          height: height * 0.1,
          width: width,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: height * 0.08,
            width: width * 0.97,
            borderRadius: height * 0.03,
            alignSelf: 'center',
            backgroundColor: '#5BF8FD',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Icon
            name="menu"
            type="entypo"
            color="#000"
            onPress={() => setShowBottomSheet(true)}
          />
          <Text
            style={{
              fontSize: height * 0.03,
              color: '#343',
              fontWeight: 'bold',
            }}>
            {categorySelect}
          </Text>

          <Icon
            name="graph-pie"
            type="foundation"
            color="#000"
            onPress={() => {
              setDisplayChart(!displayChart);
              showChart();
            }}
          />
        </View>
      </View>
      <ScrollView>
        {displayChart ? (
          categorySelect === 'Income' && data.incomeData.length ? (
            <Animated.View
              style={{
                height: 'auto',
                width: width * 0.97,
                alignItems: 'center',
                borderRadius: height * 0.03,
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.5,
                shadowRadius: 5,
                alignSelf: 'center',
                paddingVertical: 10,
                opacity: fadeAnim,
                backgroundColor: 'rgba(0,0,0,0.8)',
              }}>
              {/* {categorySelect === 'Income' ? ( */}
              <PieChart
                data={data.incomeData}
                width={width}
                height={220}
                chartConfig={chartConfig}
                accessor={'price'}
                backgroundColor={'transparent'}
                paddingLeft={'0'}
                center={[0, 0]}
                absolute
              />
            </Animated.View>
          ) : categorySelect === 'Expenditure' &&
            data.expenditureData.length ? (
            <Animated.View
              style={{
                height: 'auto',
                width: width * 0.97,
                alignItems: 'center',
                borderRadius: height * 0.03,
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.5,
                shadowRadius: 5,
                alignSelf: 'center',
                paddingVertical: 10,
                opacity: fadeAnim,
                backgroundColor: 'rgba(0,0,0,0.8)',
              }}>
              <PieChart
                data={data.expenditureData}
                width={width}
                height={220}
                chartConfig={chartConfig}
                accessor={'price'}
                backgroundColor={'transparent'}
                paddingLeft={'0'}
                center={[0, 0]}
                absolute
              />
            </Animated.View>
          ) : null
        ) : null}

        {categorySelect === 'Income' && data.incomeData.length ? (
          <View
            style={{
              height: height * 0.2,
              width: width,
              marginVertical: 5,
              width: width * 0.97,
              borderRadius: height * 0.03,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.5,
              shadowRadius: 5,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,244,255, 0.8)',
            }}>
            <Text
              style={{
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#343',
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}>
              Total Income
            </Text>
            <View>
              <Text
                style={{
                  fontSize: height * 0.03,
                  fontWeight: 'bold',
                  color: 'darkgreen',
                }}>
                {data.incomeData.length
                  ? '$' +
                    data.incomeData.reduce((acc, val) => {
                      return acc + val.price;
                    }, 0)
                  : null}
              </Text>
            </View>
          </View>
        ) : categorySelect === 'Expenditure' && data.expenditureData.length ? (
          <View
            style={{
              height: height * 0.2,
              width: width,
              marginVertical: 5,
              width: width * 0.97,
              borderRadius: height * 0.03,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.5,
              shadowRadius: 5,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,244,255, 0.8)',
            }}>
            <Text
              style={{
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: 'darkred',
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}>
              Total Expenditure
            </Text>
            <View>
              <Text
                style={{
                  fontSize: height * 0.03,
                  fontWeight: 'bold',
                  color: 'darkred',
                }}>
                {data.expenditureData.length
                  ? '$' +
                    data.expenditureData.reduce((acc, val) => {
                      return acc + val.price;
                    }, 0)
                  : null}
              </Text>
            </View>
          </View>
        ) : null}

        {/* table */}

        {categorySelect === 'Income' && data.incomeData.length ? (
          <View
            style={{
              height: 'auto',
              width: width,
              marginVertical: 5,
              width: width * 0.97,
              borderRadius: height * 0.03,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.5,
              shadowRadius: 5,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,244,255, 0.8)',
            }}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Income Category</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
                <DataTable.Title numeric>actions</DataTable.Title>
              </DataTable.Header>

              {data.incomeData.map((e, idx) => {
                return (
                  <DataTable.Row key={idx}>
                    <DataTable.Cell>{e.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{e.price}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {/* sdfk */}
                      <TouchableOpacity
                        onPress={() =>
                          setState({
                            ...state,
                            transactions: state.transactions.filter(
                              each => each.id !== e.id,
                            ),
                          })
                        }>
                        <Icon name="close" type="ionicon" color="red" />
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}

              <DataTable.Pagination
                page={0}
                numberOfPages={2}
                onPageChange={page => {
                  console.log(page);
                }}
                label="1-2 of 6"
              />
            </DataTable>
          </View>
        ) : categorySelect === 'Expenditure' && data.expenditureData.length ? (
          <View
            style={{
              height: 'auto',
              width: width,
              marginVertical: 5,
              width: width * 0.97,
              borderRadius: height * 0.03,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.5,
              shadowRadius: 5,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,244,255, 0.8)',
            }}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Income Category</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
                <DataTable.Title numeric>actions</DataTable.Title>
              </DataTable.Header>

              {data.expenditureData.map((e, idx) => {
                return (
                  <DataTable.Row key={idx}>
                    <DataTable.Cell>{e.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{e.price}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {/* sdfk */}
                      <TouchableOpacity
                        onPress={() =>
                          setState({
                            ...state,
                            transactions: state.transactions.filter(
                              each => each.id !== e.id,
                            ),
                          })
                        }>
                        <Icon name="close" type="ionicon" color="red" />
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}

              <DataTable.Pagination
                page={0}
                numberOfPages={2}
                onPageChange={page => {
                  console.log(page);
                }}
                label="1-2 of 6"
              />
            </DataTable>
          </View>
        ) : null}
        {categorySelect === 'Expenditure' && !data.expenditureData.length ? (
          <View
            style={{
              height: height * 0.6,
              width: width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: height * 0.3,
                width: width * 0.8,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: height * 0.03,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: height * 0.04,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                No record found {'\n'}
                Please click on add transaction
              </Text>
            </View>
          </View>
        ) : categorySelect === 'Income' && !data.incomeData.length ? (
          <View
            style={{
              height: height * 0.6,
              width: width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: height * 0.3,
                width: width * 0.8,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: height * 0.03,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: height * 0.04,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                No record found {'\n'}
                Please click on add transaction
              </Text>
            </View>
          </View>
        ) : null}

        <View
          style={{
            height: height * 0.1,
            width: width,
            marginVertical: 5,
            width: width * 0.97,
            borderRadius: height * 0.03,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.5,
            shadowRadius: 5,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,244,255, 0.8)',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AddDataScreen')}
            style={{
              backgroundColor: '#958',
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Add Transaction
            </Text>
          </TouchableOpacity>
        </View>
        {/* This is BottomTab sheet */}
        <BottomSheet
          isVisible={showBottomSheet}
          containerStyle={{
            backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
          }}>
          <TouchableOpacity
            onPress={() => {
              setShowBottomSheet(false);
              setCategorySelect('Income');
            }}
            style={{
              backgroundColor: '#fff',
              width: width,
              height: height * 0.1,
              alignItems: 'center',
              borderTopRightRadius: height * 0.1,
              borderTopLeftRadius: height * 0.1,

              justifyContent: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: height * 0.03,
                  fontWeight: 'bold',
                  color: 'darkblue',
                }}>
                Income
              </Text>
            </View>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            onPress={() => {
              setShowBottomSheet(false);
              setCategorySelect('Expenditure');
            }}
            style={{
              backgroundColor: '#fff',
              width: width,
              height: height * 0.1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: height * 0.03,
                  fontWeight: 'bold',
                  color: 'darkblue',
                }}>
                Expenditure
              </Text>
            </View>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            onPress={() => {
              setShowBottomSheet(false);
              setState({
                ...state,
                users: {
                  ...state.users,
                  isLogin: true,
                },
              });
              props.navigation.navigate('Login');
            }}
            style={{
              backgroundColor: '#fff',
              width: width,
              height: height * 0.1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: height * 0.03,
                  fontWeight: 'bold',
                  color: 'darkred',
                }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </BottomSheet>
      </ScrollView>
    </ImageBackground>
  );
}
