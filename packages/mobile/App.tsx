import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { PatientListScreen } from './src/screens/PatientListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f8f9fa' }
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen
          name="PatientList"
          component={PatientListScreen}
          options={{
            headerShown: true,
            title: 'Patients',
            headerStyle: { backgroundColor: '#ffffff' },
            headerTintColor: '#212529',
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: 'bold' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
