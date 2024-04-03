import React, { useEffect, useState } from 'react';
import LoginVC from './src/LoginVC';
import HomeVC from './src/HomeVC';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  const [screen, setScreen] = useState('');
  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('USER_DATA');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData && userData.email && userData.password) {
          console.log("Navigate to HomeVC");
          setScreen("HomeVC");
        } else {
          console.log("Navigate to LoginVC");
          setScreen("LoginVC");
        }
      } else {
        console.log("No user data found. Navigate to LoginVC");
        setScreen("LoginVC");
      }
    } catch (error) {
      console.error("Error while fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!screen) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screen}>
        <Stack.Screen name="LoginVC" component={LoginVC} options={{ title: '', headerShown: false }} />
        <Stack.Screen name="HomeVC" component={HomeVC} options={{ title: '', headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

