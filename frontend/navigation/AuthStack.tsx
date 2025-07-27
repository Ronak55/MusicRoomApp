// navigation/AuthStack.tsx
import { SignInScreen, SignUpScreen } from '@/screens/Auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
