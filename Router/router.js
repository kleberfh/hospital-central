import React, {useState} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from "../screens/OnBoarding/OnBoarding";
import Home from "../screens/Home/Home";

const Router = () => {
  const Stack = createNativeStackNavigator();

  const [registered, setRegistered] = useState(false);

  if (!registered) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="onBoarding" component={OnBoarding} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )

}

export default Router;