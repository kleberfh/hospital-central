import React from 'react';
import {RecoilRoot} from 'recoil';
import Router from "./Router/router";
import { LogBox } from 'react-native';
import {NativeBaseProvider} from "native-base";
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}