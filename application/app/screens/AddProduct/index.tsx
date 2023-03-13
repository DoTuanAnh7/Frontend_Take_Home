import {ListItem} from '@rneui/themed';
import Icon from '../../components/Icon';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Loading';
import NavHeader from '../../components/navigation/NavHeader/NavHeader';
import {getUserInfomation} from '../../helper/common';
import styles from './styles';
import Navigation from '../../navigation';
import {addProduct} from '../../redux/product/actions';
import ImagePicker from '../../components/ImagePicker';
import theme from '../../includes/styles/theme.style';
import * as commonStyle from '../../includes/main-style';
interface Props {
  onAddProduct: (name: string, description: string, image: string) => void;
}

const AddProduct: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);
  
  const addProduction = (name: string, description: string, image: object) => {
    const onResponse = async (res: any) => {
      navigation.navigate('Dashboard');
    };

    const onError = async (err: any) => {
      console.log('register error herr', err);
    };

    dispatch(
      addProduct({
        data: [
          {
            name: name,
            description: description,
            image: image[0].uri,
          },
        ],
        onResponse,
        onError,
      }),
    );
  };

  const handleAddProduct = async () => {
    addProduction(name, description, image);
    setName('');
    setDescription('');
    setImage([]);
  };

  return (
    <ScrollView style={[styles.background, styles.container]}>
      <NavHeader showBack type="light">
        AddProduct
      </NavHeader>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Product name"
          placeholderTextColor="white"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholderTextColor="white"
          style={styles.input}
          placeholder="Product description"
          value={description}
          onChangeText={setDescription}
        />
        <ImagePicker image={image} setImage={setImage}/>
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
          onPress={() => handleAddProduct()}>
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
              Add product
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddProduct;
