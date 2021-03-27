import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Input, Icon} from 'react-native-elements';
import {CashFlowContext} from '../context/context';
const {height, width} = Dimensions.get('window');
export default function Login(props) {
  const {state, setState} = React.useContext(CashFlowContext);
  const [loginPressed, setLoginPressed] = React.useState(true);
  const [credentials, setCredentials] = React.useState({
    userId: '',
    password: '',
  });
  const [signUp, setSignUp] = React.useState({
    name: '',
    userId: '',
    password: '',
    confirmPassword: '',
  });
  const [secure, setSecure] = React.useState(true);
  const handleLogin = () => {
    // console.log(credentials, 'credentials');
    const regUsers =
      state.users.registeredUsers.length &&
      state.users.registeredUsers.map(e => {
        return {userId: e.userId, password: e.password};
      });
    console.log(regUsers);
    if (
      regUsers.length &&
      regUsers[0].userId === credentials.userId &&
      regUsers.length &&
      regUsers[0].password === credentials.password
    ) {
      setState({
        ...state,
        users: {
          ...state.users,
          isLogin: true,
        },
      });
      setCredentials({
        userId: '',
        password: '',
      });
      props.navigation.navigate('CashScreen');
    } else {
      alert('invalid credentials');
    }
  };
  console.log(state);
  const handleSignup = () => {
    const {password, confirmPassword, name, userId} = signUp;
    if (!name || !userId || !password || !confirmPassword) {
      alert('please fill all details');
    } else if (password !== confirmPassword) {
      alert('password not match');
    } else {
      setState({
        ...state,
        users: {
          ...state.users,
          registeredUsers: [...state.users.registeredUsers, signUp],
        },
      });
      alert('successsfully registered');
      setSignUp({
        userId: '',
        password: '',
        name: '',
        confirmPassword: '',
      });
    }
  };
  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        style={{height, width, paddingTop: height * 0.05}}
        source={require('../assets/bg6.jpg')}>
        <View
          style={{
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
            height: height * 0.2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: width * 0.95,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setLoginPressed(true);
              }}
              style={{
                backgroundColor: loginPressed ? 'cyan' : 'gray',
                width: width * 0.4,
                alignItems: 'center',
                height: loginPressed ? height * 0.05 : height * 0.04,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: loginPressed ? '#000' : '#fff',
                  fontSize: height * 0.03,
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLoginPressed(false);
              }}
              style={{
                backgroundColor: !loginPressed ? 'cyan' : 'gray',
                width: width * 0.4,
                alignItems: 'center',
                height: !loginPressed ? height * 0.05 : height * 0.04,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: !loginPressed ? '#000' : '#fff',
                  fontSize: height * 0.03,
                }}>
                SignUp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: height * 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {loginPressed ? (
            <View
              style={{
                height: height * 0.4,
                width: width * 0.8,
                backgroundColor: '#fff',
                borderRadius: height * 0.03,
                borderWidth: 5,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Input
                placeholder="User Id"
                value={credentials.userId}
                onChangeText={text => {
                  setCredentials({...credentials, userId: text});
                }}
                leftIcon={
                  <Icon
                    name="user"
                    size={24}
                    color="black"
                    type="font-awesome"
                  />
                }
              />
              <Input
                placeholder="Password"
                secureTextEntry={secure}
                value={credentials.password}
                onChangeText={text => {
                  setCredentials({...credentials, password: text});
                }}
                leftIcon={
                  <Icon
                    name="form-textbox-password"
                    size={24}
                    color="black"
                    type="material-community"
                  />
                }
                rightIcon={
                  secure ? (
                    <Icon
                      type="entypo"
                      size={20}
                      color="black"
                      name="eye"
                      onPress={() => setSecure(false)}
                    />
                  ) : (
                    <Icon
                      type="entypo"
                      size={20}
                      color="black"
                      name="eye-with-line"
                      onPress={() => setSecure(true)}
                    />
                  )
                }
              />
              <TouchableOpacity
                onPress={handleLogin}
                style={{
                  width: width * 0.6,
                  height: height * 0.05,
                  backgroundColor: 'darkgreen',
                  justifyContent: 'center',
                  borderRadius: 10,
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>Login</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: width * 0.6,
                  height: height * 0.05,
                  justifyContent: 'center',
                  borderRadius: 10,
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text>Don't have an account yet? </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setCredentials({
                        userId: '',
                        password: '',
                      });
                      setLoginPressed(false);
                    }}>
                    <Text style={{fontWeight: 'bold', color: '#11f'}}>
                      create
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                minHeight: height * 0.4,
                height: 'auto',
                width: width * 0.8,
                padding: 10,
                backgroundColor: '#fff',
                borderRadius: height * 0.03,
                borderWidth: 5,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Input
                placeholder="Name"
                value={signUp.name}
                onChangeText={text => {
                  setSignUp({...signUp, name: text});
                }}
              />
              <Input
                placeholder="Email"
                value={signUp.userId}
                onChangeText={text => {
                  setSignUp({...signUp, userId: text});
                }}
              />
              <Input
                placeholder="Password"
                value={signUp.password}
                onChangeText={text => {
                  setSignUp({...signUp, password: text});
                }}
              />
              <Input
                placeholder="Confirm Password"
                value={signUp.confirmPassword}
                onChangeText={text => {
                  setSignUp({...signUp, confirmPassword: text});
                }}
              />
              <TouchableOpacity
                onPress={handleSignup}
                style={{
                  width: width * 0.6,
                  height: height * 0.05,
                  backgroundColor: 'darkblue',
                  justifyContent: 'center',
                  borderRadius: 10,
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>
                  Create now
                </Text>
              </TouchableOpacity>

              <View style={{flexDirection: 'row', padding: 5}}>
                <Text>continue to login? </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSignUp({
                      name: '',
                      userId: '',
                      password: '',
                      confirmPassword: '',
                    });
                    setLoginPressed(true);
                  }}>
                  <Text style={{fontWeight: 'bold', color: '#11f'}}>
                    signin
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}
