import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {styles} from './style.js';

import {
  Dimensions,
  ImageBackground,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../redux/auth/actions';
import InputEmail from '../../components/forms/InputEmail';
import InputPassword from '../../components/forms/InputPassword';
import Loading from '../../components/Loading';
import ImagePicker from '../../components/ImagePicker';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function index({navigation, route}) {
  const {email, password} = route.params;

  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: email,
    password: password,
    name: '',
    address: '',
    postcode: '',
    city: '',
    country: '',
    image: '',
  });
  const [image, setImage] = useState([]);
  console.log(12312312, image[0]);
  

  const onRegister = () => {
    const onResponse = async (res: any) => {
      Alert.alert(res.message);
      navigation.navigate('LoginScreen');
    };

    const onError = async (err: any) => {
      console.log('register error herr', err);
    };

    dispatch(
      register({
        data: {
          email: state.email,
          password: state.password,
          name: state.name,
          address: state.address,
          postcode: state.postcode,
          city: state.city,
          country: state.country,
          image: image[0].uri,
        },
        onResponse,
        onError,
      }),
    );
  };

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: '#FFFFFF',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          flex: 1,
          height: HEIGHT * 1.5,
        }}>
        <StatusBar backgroundColor="#082E31" barStyle="light-content" />

        <ImageBackground
          source={require('../../../assets/images_assets/Finalshape.png')}
          style={styles.Image}>
          <Text style={styles.BrandText}>FE Take Home</Text>

          <Text style={styles.SingupText}>Create an Account now</Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: -HEIGHT * 0.02,
              height: styles.GFicons.height / 2,
            }}></View>

          <View>
            <DropShadow
              style={{
                ...Platform.select({
                  android: {
                    backgroundColor: '#FFFFFF',
                    color: 'black',
                    shadowColor: '#D8D8D8',
                    shadowOpacity: 2,
                    shadowRadius: 5,
                    shadowOffset: {width: 0, height: -3},
                  },
                }),
              }}>
              <InputEmail
                value={state.name}
                autoCapitalize="none"
                placeholder="Type in your name"
                onChangeText={value =>
                  setState(state => ({
                    ...state,
                    name: value,
                  }))
                }
              />
              <InputEmail
                value={state.postcode}
                autoCapitalize="none"
                placeholder="Type in your postcode"
                onChangeText={value =>
                  setState(state => ({
                    ...state,
                    postcode: value,
                  }))
                }
              />
              <InputEmail
                value={state.city}
                autoCapitalize="none"
                placeholder="Type in your city"
                onChangeText={value =>
                  setState(state => ({
                    ...state,
                    city: value,
                  }))
                }
              />
              <InputEmail
                value={state.address}
                autoCapitalize="none"
                placeholder="Type in your address"
                onChangeText={value =>
                  setState(state => ({
                    ...state,
                    address: value,
                  }))
                }
              />
              <InputEmail
                value={state.country}
                autoCapitalize="none"
                placeholder="Type in your city"
                onChangeText={value =>
                  setState(state => ({
                    ...state,
                    country: value,
                  }))
                }
              />
              <ImagePicker image={image} setImage={setImage} register />
            </DropShadow>

            <View style={{}}>
              <TouchableOpacity
                onPress={onRegister}
                style={styles.TouchableButton}>
                <Text style={styles.RegisterButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: HEIGHT * 0.025,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={styles.footertext}>
                Already have an account?{'  '}
              </Text>
              <Text
                style={styles.footertext2}
                onPress={() => navigation.navigate('LoginScreen')}>
                Sign In
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>
  );
}
