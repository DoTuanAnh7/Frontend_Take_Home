import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import {getProducts} from '../../redux/product/actions';
import {useDispatch, useSelector} from 'react-redux';
import theme from '../../includes/styles/theme.style';
import * as commonStyle from '../../includes/main-style';
import Avatar from '../../components/Avatar';
import {styles} from './style';
import HelpModal from '../../components/HelpModal';
import Body from '../../components/typography/Body';
import Headline from '../../components/typography/Headline';
import ProductItem from './components/ProductItem';

const HEIGHT = Dimensions.get('window').height;

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

const Dashboard: React.FC = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [showBalance, setShowBalance] = useState(true);

  const productItems = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  const navigateToMyAccount = () => navigation.navigate('MyAccount');

  const doGetProducts = () => {
    const onResponse = async (res: any) => {
      setProducts(res);
      console.log(res);
    };

    const onError = async (err: any) => {
      console.log('register error herr', err);
    };

    dispatch(
      getProducts({
        data: {},
        onResponse,
        onError,
      }),
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      doGetProducts();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        backgroundColor: theme.COLOR_BINANCE_1ST_BLACK,
        flex: 1,
        marginBottom: -theme.SPACING_S,
        height: HEIGHT * 0.06,
        paddingLeft: theme.SPACING_S,
        paddingRight: theme.SPACING_S,
      }}>
      <View
        style={{
          backgroundColor: theme.COLOR_BINANCE_1ST_BLACK,
          flexDirection: 'row',
          marginBottom: commonStyle.getResponsiveScreenHeight(2),
          marginTop:
            Platform.OS === 'ios'
              ? commonStyle.getResponsiveScreenHeight(6)
              : commonStyle.getResponsiveScreenHeight(2.5),
          paddingLeft: theme.SPACING_S,
          paddingRight: theme.SPACING_S,
        }}>
        <TouchableOpacity
          style={{
            paddingRight: 20,
            paddingTop: 8,
          }}
          onPress={navigateToMyAccount}>
          <Avatar
            style={{
              justifyContent: 'center',
              marginLeft: commonStyle.getResponsiveScreenFontSize(1.2),
            }}
            dashboard
            type="small"
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: theme.COLOR_BINANCE_BLACK,
            borderColor: theme.COLOR_GOLDEN_YELLOW,
            borderRadius: 30,
            borderWidth: 0.8,
            height: 25,
            justifyContent: 'center',
            width: commonStyle.getResponsiveScreenWidth(40),
          }}
          onPress={() => navigation.navigate('AddProduct')}>
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
      <View
        style={{
          alignItems: 'center',
        }}>
        <StatusBar backgroundColor="#F7F7F9" barStyle="dark-content" />

        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            {products.map((product, index) => (
              <View style={styles.itemContainer} key={index}>
                <ProductItem
                  name={product.name}
                  description={product.description}
                  image={product.image}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;
