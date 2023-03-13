import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Loading';
import NavHeader from '../../components/navigation/NavHeader/NavHeader';
import styles from './styles';
import {updateUser, getUser} from '../../redux/auth/actions';
import theme from '../../includes/styles/theme.style';

import * as commonStyle from '../../includes/main-style';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface UserInfo {
  _id: string;
  address: string;
  city: string;
  country: string;
  email: string;
  name: string;
  postcode: string;
}

const UpdateUser: React.FC<Props> = ({navigation, route}) => {
  const getUserInfomation = route.params.userInfo;
  const {_id, address, city, country, email, name, postcode}: UserInfo =
    getUserInfomation;

  const [state, setState] = useState({
    email: email,
    name: name,
    address: address,
    postcode: postcode,
    city: city,
    country: country,
  });
  console.log('state', state);

  const dispatch = useDispatch();

  const getUserData = () => {
    const onResponse = async (res: any) => {
      const userDataUpdated = res;
      const {address, city, country, email, name, postcode} = userDataUpdated;

      setState(state => ({
        ...state,
        email: email,
        name: name,
        address: address,
        postcode: postcode,
        city: city,
        country: country,
      }));


      const userInfo = JSON.stringify(res);
      await AsyncStorage.multiSet([
        ['userInfo', userInfo],
      ]);
    };

    const onError = async (err: any) => {
      console.log('register error herr', err);
    };

    dispatch(
      getUser({
        data: {
          id: _id,
        },
        onResponse,
        onError,
      }),
    );
  };
  const doUpdateUser = () => {
    const onResponse = async (res: any) => {
      console.log('res', res);
      Alert.alert('user infomation successfully updated');
      getUserData();
    };

    const onError = async (err: any) => {
      console.log('register error herr', err);
    };

    dispatch(
      updateUser({
        data: {
          id: _id,
          email: state.email,
          name: state.name,
          address: state.address,
          postcode: state.postcode,
          city: state.city,
          country: state.country,
        },
        onResponse,
        onError,
      }),
    );
  };

  return (
    <ScrollView style={[styles.background, styles.container]}>
      <NavHeader showBack type="light">
        Update User
      </NavHeader>

      <View style={styles.container}>
        <View>
          <Text
            style={{color: theme.COLOR_WHITE, paddingBottom: theme.SPACING_14}}>
            Name
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Product name"
            placeholderTextColor="white"
            value={state.name}
            onChangeText={value =>
              setState(state => ({
                ...state,
                name: value,
              }))
            }
          />
        </View>

        <View>
          <Text
            style={{color: theme.COLOR_WHITE, paddingBottom: theme.SPACING_14}}>
            Address
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Product name"
            placeholderTextColor="white"
            value={state.address}
            onChangeText={value =>
              setState(state => ({
                ...state,
                address: value,
              }))
            }
          />
        </View>

        <View>
          <Text
            style={{color: theme.COLOR_WHITE, paddingBottom: theme.SPACING_14}}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Product name"
            placeholderTextColor="white"
            value={state.email}
            onChangeText={value =>
              setState(state => ({
                ...state,
                email: value,
              }))
            }
          />
        </View>

        <View>
          <Text
            style={{color: theme.COLOR_WHITE, paddingBottom: theme.SPACING_14}}>
            Postcode
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Product name"
            placeholderTextColor="white"
            value={state.postcode}
            onChangeText={value =>
              setState(state => ({
                ...state,
                postcode: value,
              }))
            }
          />
        </View>

        <View>
          <Text
            style={{color: theme.COLOR_WHITE, paddingBottom: theme.SPACING_14}}>
            City
          </Text>
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="Product description"
            value={state.city}
            onChangeText={value =>
              setState(state => ({
                ...state,
                city: value,
              }))
            }
          />
        </View>
        <View>
          <Text
            style={{color: theme.COLOR_WHITE, paddingBottom: theme.SPACING_14}}>
            Country
          </Text>
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="Product description"
            value={state.country}
            onChangeText={value =>
              setState(state => ({
                ...state,
                country: value,
              }))
            }
          />
        </View>
      </View>
      <View style={{alignItems: 'center', paddingTop: theme.SPACING_L}}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.COLOR_BINANCE_BLACK,
            borderColor: theme.COLOR_GOLDEN_YELLOW,
            borderRadius: 30,
            borderWidth: 0.8,
            height: theme.SPACING_L,
            justifyContent: 'center',
            width: commonStyle.getResponsiveScreenWidth(40),
            alignContent: 'center',
          }}
          onPress={doUpdateUser}>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: theme.COLOR_GOLDEN_YELLOW,
                fontSize: theme.FONT_SIZE_BASE,
                marginRight: 5,
              }}>
              Update User
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateUser;
