import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const HomeVC = ({navigation}) => {
  const [userData, setUserData] = useState('');
  

  useEffect(() => {
    const retrieveSavedUserData = async () => {
      try {
        const fetchedValue = await AsyncStorage.getItem('USER_DATA');
        const parsedUserData = JSON.parse(fetchedValue);
        console.log(parsedUserData);
        setUserData(parsedUserData);
      } catch (e) {
        console.log(`Error caught -> `, e);
      }
    };
    retrieveSavedUserData();
  }, []);

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
      global.is_LOGIN = false;
      navigation.navigate('LoginVC');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 15,
          fontWeight: '400',
        }}>
        Email :- {JSON.stringify(userData.email)}
      </Text>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 15,
          fontWeight: '400',
        }}>
        Password :- {JSON.stringify(userData.password)}
      </Text>
      <View
        style={{
          marginTop: 50,
          height: 40,
          backgroundColor: 'gray',
          width: 200,
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={clearAllData}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
            }}>
            LOG OUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeVC;
