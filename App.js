import {View, Text, Button} from 'react-native';
import React from 'react';
import ImagePicker, {openCamera} from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

const App = () => {
  const saveData = image => {
    const Filepath = image.path;
    const filename = Filepath.substring(Filepath.lastIndexOf('/'));
    const newFilePath = RNFS.PicturesDirectoryPath + filename;
    RNFS.copyFile(Filepath, newFilePath);
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropperToolbarTitle: 'hello',
      freeStyleCropEnabled: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    })
      .then(image => {
        console.log(image);
        saveData(image);
      })
      .catch(error => {});
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        console.log(image);
        saveData(image);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const openVideo = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      saveData(image);
    });
  };

  const openGalleryVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then(video => {})
      .catch(error => {});
  };

  return (
    <View>
      <Button title="open gallery" onPress={openGallery} />
      <Button title="open Camera" onPress={openCamera} />
      <Button title="open Video" onPress={openVideo} />
      <Button title="open gallery video" onPress={openGalleryVideo} />
    </View>
  );
};

export default App;
