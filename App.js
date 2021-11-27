import React from 'react';
import {NativeBaseProvider} from "native-base";
import OnBoarding from "./screens/OnBoarding";

export default function App() {
  return (
    <NativeBaseProvider>
      <OnBoarding />
    </NativeBaseProvider>
  );
}