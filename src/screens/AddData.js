import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CashFlowContext} from '../context/context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
const {height, width} = Dimensions.get('window');
export default function AddData(props) {
  const [formState, setFormState] = React.useState({
    name: '',
    price: '',
    category: 'income',
    color: Math.floor(Math.random() * 16777215).toString(16),
  });

  const {state, setState} = React.useContext(CashFlowContext);

  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require('../assets/bg4.jpg')}
        style={{height, width, justifyContent: 'center'}}>
        <View
          style={{
            height: height * 0.5,
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
              color: '#010',
              shadowColor: '#fff',
              shadowOffset: {height: 1, width: 1},
              shadowOpacity: 0.5,
              shadowRadius: 6,
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}>
            Add Transaction
          </Text>
          <View
            style={{
              width: width * 0.8,
              height: height * 0.06,
              justifyContent: 'center',
              marginVertical: 4,
              backgroundColor: '#fff',
              borderRadius: height * 0.04,
              borderWidth: 2,
            }}>
            <TextInput
              placeholder="description"
              onChangeText={text =>
                setFormState({
                  ...formState,
                  name: text,
                })
              }
              value={formState.name}
            />
          </View>
          <View
            style={{
              width: width * 0.8,
              height: height * 0.06,
              marginVertical: 4,
              backgroundColor: '#fff',
              justifyContent: 'center',
              borderRadius: height * 0.04,
              borderWidth: 2,
            }}>
            <TextInput
              placeholder="price"
              value={formState.price}
              keyboardType="numeric"
              onChangeText={text =>
                setFormState({
                  ...formState,
                  price: text,
                })
              }
            />
          </View>

          <View
            style={{
              width: width * 0.8,
              height: height * 0.06,
              marginVertical: 4,
              backgroundColor: '#fff',
              borderRadius: height * 0.04,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
            }}>
            <RNPickerSelect
              value={formState.category}
              useNativeAndroidPickerStyle={false}
              onValueChange={value =>
                setFormState({
                  ...formState,
                  category: value,
                })
              }
              items={[
                {label: 'Income', value: 'income'},
                {label: 'Expenses', value: 'expenditure'},
              ]}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
              setState({
                ...state,
                transactions: [
                  ...state.transactions,
                  {
                    ...formState,
                    color:
                      '#' + Math.floor(Math.random() * 16777215).toString(16),
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                    id: Date.now(),
                  },
                ],
              });
            }}>
            <Text
              style={{
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: '#fff',
                width: width * 0.7,
                textAlign: 'center',
                backgroundColor: '#05384B',
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Text
              style={{
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: '#fff',
                width: width * 0.7,
                textAlign: 'center',
                backgroundColor: 'darkred',
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}>
              cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}
