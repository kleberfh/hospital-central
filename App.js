import React from 'react';
import {RecoilRoot} from 'recoil';
import {NativeBaseProvider} from "native-base";
import OnBoarding from "./screens/OnBoarding/OnBoarding";

export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <OnBoarding />
      </NativeBaseProvider>
    </RecoilRoot>
  );
}