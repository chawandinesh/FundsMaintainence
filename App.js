import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import CashScreen from './src/screens/CashScreen';
import AddData from './src/screens/AddData';
import Routes from './src/routes/routes';
import {CashFlowContext, Context} from './src/context/context';

export default function App() {
  return (
    <Context>
      <StatusBar barStyle="light-content" />
      <Routes />
    </Context>
  );
}
