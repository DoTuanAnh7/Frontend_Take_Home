import React, {useState} from 'react';
import {Button, Image, View} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

import * as ImagePicker from 'react-native-image-picker';

interface Props {
  image: any;
  setImage: any;
  register: boolean;
}
const ImagePickerComponent: React.FC<Props> = ({image, setImage, register}) => {
  console.log('image', image);

  const chooseImage = async () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 0,
    };
    // const result = await launchPreviewInfo({
    //   saveToPhotos: true,
    //   mediaType: 'photo',
    // });
    const result = await ImagePicker.launchImageLibrary(options);
    console.log(result);
    if (result.assets) {
      setImage(result.assets);
      return;
    }
    if (result.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
    }
  };

  return (
    <View>
      <Button
        title={register ? 'Choose ID Card ' : 'Choose Image'}
        onPress={chooseImage}
      />
      {image && (
        <Image
          source={image}
          style={{
            width: 250,
            height: 250,
            alignSelf: 'center',
            borderRadius: 20,
          }}
        />
      )}
    </View>
  );
};

export default ImagePickerComponent;
