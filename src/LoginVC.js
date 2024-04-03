import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const LoginVC = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [allUserData, setAllUserData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  global.is_LOGIN = false;

  const handleInputChange = (field, value) => {
    const updatedUser = {...user, [field]: value};
    setUser(updatedUser);
  };

  const saveInputData = async () => {
    try {
      if (user.email == '' && user.password == '') {
        Alert.alert('please enter all details');
      } else if (user.email == '') {
        Alert.alert('email should not be empty');
      } else if (user.password == '') {
        Alert.alert('password should not be empty');
      } else {
        const jsonData = JSON.stringify(user);
        await AsyncStorage.setItem('USER_DATA', jsonData);
        const newDataObject = JSON.parse(jsonData);
        setAllUserData([...allUserData, newDataObject]);
        console.log(newDataObject);
        global.is_LOGIN = true;
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeVC'}],
        });
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Image
        style={{
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: hp('9%'),
          width: wp('80%'),
          height: wp('13%'),
          resizeMode: 'contain',
        }}
        source={require('/Users/mac/Documents/Darshan/RN/loginDEMO/carret.png')}
      />
      <Text
        style={{
          fontSize: RFValue(27),
          marginTop: hp('5%'),
          marginLeft: 16,
          marginRight: 16,
          fontFamily: 'Gilroy-Medium',
        }}>
        Loging
      </Text>
      <Text
        style={{
          fontSize: RFValue(16),
          fontWeight: '500',
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
          color: 'gray',
          fontFamily: 'Gilroy',
        }}>
        Enter your email and password
      </Text>
      <Text
        style={{
          fontSize: RFValue(15),
          fontWeight: '400',
          marginTop: hp('6%'),
          marginLeft: 16,
          marginRight: 16,
          color: 'black',
          fontFamily: 'Gilroy',
        }}>
        Email
      </Text>
      <TextInput
        style={{
          fontSize: RFValue(16),
          height: 40,
          marginTop: 10,
          marginLeft: 16,
          marginRight: 16,
          fontFamily: 'Gilroy',
        }}
        placeholder="Enter your email"
        placeholderTextColor={'darkgray'}
        value={user.email}
        onChangeText={text => handleInputChange('email', text)}></TextInput>
      <View
        style={{
          height: 1,
          backgroundColor: 'lightgray',
          marginTop: 5,
          marginLeft: 16,
          marginRight: 16,
          fontFamily: 'Gilroy',
        }}></View>
      <Text
        style={{
          fontSize: RFValue(15),
          fontWeight: '400',
          marginTop: 40,
          marginLeft: 16,
          marginRight: 16,
          color: 'black',
          fontFamily: 'Gilroy',
        }}>
        Password
      </Text>
      <View
        style={{
          height: 40,
          marginTop: 10,
          marginLeft: 16,
          marginRight: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextInput
          style={{
            fontSize: RFValue(16),
            alignContent: 'center',
            fontFamily: 'Gilroy',
          }}
          placeholder="Enter your password"
          placeholderTextColor={'darkgray'}
          secureTextEntry={!showPassword}
          value={user.password}
          onChangeText={text =>
            handleInputChange('password', text)
          }></TextInput>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={18}
            style={{
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'lightgray',
          marginTop: 5,
          marginLeft: 16,
          marginRight: 16,
        }}></View>
      <TouchableOpacity>
        <Text
          style={{
            fontSize: RFValue(14),
            fontWeight: '400',
            marginTop: 15,
            alignSelf: 'flex-end',
            marginRight: 16,
            fontFamily: 'Gilroy',
          }}>
          Forgot Password ?
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: 62,
          backgroundColor: '#53B175',
          marginLeft: 16,
          marginRight: 16,
          marginTop: hp('4%'),
          borderRadius: 13,
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={saveInputData}>
          <Text
            style={{
              fontSize: RFValue(19),
              fontFamily: 'Gilroy-Bold',
              color: 'white',
              alignSelf: 'center',
            }}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 20,
          marginTop: hp(3),
          marginLeft: 18,
          marginRight: 18,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: RFValue(15),
              fontWeight: '500',
              fontFamily: 'Gilroy',
            }}>
            Don't have an account? signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginVC;
