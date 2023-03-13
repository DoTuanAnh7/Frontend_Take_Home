import {ListItem} from '@rneui/themed';
import Icon from '../../components/Icon';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Loading';
import NavHeader from '../../components/navigation/NavHeader/NavHeader';
import styles from './styles';
import {getUserInfomation} from '../../helper/common';
import theme from '../../includes/styles/theme.style';
import * as commonStyle from '../../includes/main-style';
import Navigation from '../../navigation';
interface UserInfo {
  address: string;
  city: string;
  country: string;
  email: string;
  name: string;
  postcode: string;
}

const MyAccount: React.FC = ({navigation}) => {
  const [personalInformation, setPersonalInformation] = useState({});
  const [userInfo, setUserInfo] = useState([]);
  console.log('userInfo', userInfo);

  const {address, city, country, email, name, postcode}: UserInfo = userInfo;

  const [financialState, setFinancialState] = useState({});
  const [expanded, setExpanded] = useState(-1);

  const accordions = [
    {
      icon: 'account',
      title: 'Personal information',
      content: personalInformation,
    },
  ];
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserInfomation().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getUserInfomation().then(userInfo => {
      setUserInfo(userInfo);
    });
  }, []);

  return (
    <ScrollView style={[styles.background, styles.container]}>
      <NavHeader setting isMyAccount showBack type="light">
        My Account
      </NavHeader>
      {accordions.map(({icon, title, content}, i) => (
        <ListItem.Accordion
          key={`accordion-${i}`}
          bottomDivider
          containerStyle={styles.background}
          content={
            <ListItem.Content style={[styles.accordion, styles.row]}>
              <ListItem.Title style={styles.textWhite}>{title}</ListItem.Title>
            </ListItem.Content>
          }
          expandIcon={
            <Icon source={require('../../../assets/icons/Plus.png')} />
          }
          icon={
            <Icon
              color="white"
              name="chevron-right"
              type="material-community"
            />
          }
          isExpanded={i === expanded}
          leftRotate
          onPress={() => setExpanded(i === expanded ? -1 : i)}>
          <ListItem
            bottomDivider
            containerStyle={[styles.background, styles.padding0]}>
            <ListItem.Content>
              <ListItem bottomDivider containerStyle={styles.background}>
                <View style={styles.row}>
                  <ListItem.Title style={[styles.container, styles.textWhite]}>
                    Email
                  </ListItem.Title>
                  <ListItem.Title
                    style={[
                      styles.container,
                      styles.textRight,
                      styles.textYellow,
                    ]}>
                    {email}
                  </ListItem.Title>
                </View>
              </ListItem>
              <ListItem bottomDivider containerStyle={styles.background}>
                <View style={styles.row}>
                  <ListItem.Title style={[styles.container, styles.textWhite]}>
                    Name
                  </ListItem.Title>
                  <ListItem.Title
                    style={[
                      styles.container,
                      styles.textRight,
                      styles.textYellow,
                    ]}>
                    {name}
                  </ListItem.Title>
                </View>
              </ListItem>
              <ListItem bottomDivider containerStyle={styles.background}>
                <View style={styles.row}>
                  <ListItem.Title style={[styles.container, styles.textWhite]}>
                    Address
                  </ListItem.Title>
                  <ListItem.Title
                    style={[
                      styles.container,
                      styles.textRight,
                      styles.textYellow,
                    ]}>
                    {address}
                  </ListItem.Title>
                </View>
              </ListItem>
              <ListItem bottomDivider containerStyle={styles.background}>
                <View style={styles.row}>
                  <ListItem.Title style={[styles.container, styles.textWhite]}>
                    Postcode
                  </ListItem.Title>
                  <ListItem.Title
                    style={[
                      styles.container,
                      styles.textRight,
                      styles.textYellow,
                    ]}>
                    {postcode}
                  </ListItem.Title>
                </View>
              </ListItem>
              <ListItem bottomDivider containerStyle={styles.background}>
                <View style={styles.row}>
                  <ListItem.Title style={[styles.container, styles.textWhite]}>
                    City
                  </ListItem.Title>
                  <ListItem.Title
                    style={[
                      styles.container,
                      styles.textRight,
                      styles.textYellow,
                    ]}>
                    {city}
                  </ListItem.Title>
                </View>
              </ListItem>
              <ListItem bottomDivider containerStyle={styles.background}>
                <View style={styles.row}>
                  <ListItem.Title style={[styles.container, styles.textWhite]}>
                    Country
                  </ListItem.Title>
                  <ListItem.Title
                    style={[
                      styles.container,
                      styles.textRight,
                      styles.textYellow,
                    ]}>
                    {country}
                  </ListItem.Title>
                </View>
              </ListItem>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      ))}
      <View style={{alignItems: 'center', paddingTop: theme.SPACING_S}}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.COLOR_BINANCE_BLACK,
            borderColor: theme.COLOR_GOLDEN_YELLOW,
            borderRadius: 30,
            borderWidth: 0.8,
            height: theme.SPACING_L,
            justifyContent: 'center',
            width: commonStyle.getResponsiveScreenWidth(60),
            alignContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('UpdateUser', {userInfo: userInfo});
          }}>
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
              Update user information
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MyAccount;
