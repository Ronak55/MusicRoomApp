// src/navigation/AppStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/screens/App/HomeScreen';
import CourseDetailsScreen from '@/screens/App/CourseDetailsScreen';
import BookingsScreen from '@/screens/App/BookingsScreen';
import SuccessScreen from '@/screens/App/SuccessScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
    <Stack.Screen name="Booking" component={BookingsScreen} />
    <Stack.Screen name="Success" component={SuccessScreen} />
  </Stack.Navigator>
);

export default AppStack;
