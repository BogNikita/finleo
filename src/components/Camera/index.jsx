import React, { useState, useEffect, useRef, useContext } from 'react';
import { Modal, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Error from '../Error';
import Loader from '../Loader';
import { AvatarContext } from '../../store/Context';

export default function CameraModal({ isCameraOpened, setIsCameraOpened }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [error, setError] = useState('');
  const [type, setType] = useState(CameraType.front);

  const cameraRef = useRef();
  const { setProfileAvatar } = useContext(AvatarContext);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setError('No access to camera');
        return;
      }
      setHasPermission(true);
    })();
  }, []);

  const onSwitchCamera = () => {
    setType(type === CameraType.front ? CameraType.back : CameraType.front);
  };

  const onTakePhoto = async () => {
    if (!cameraRef) return;

    try {
      const photo = await cameraRef.current.takePictureAsync();
      setProfileAvatar({ uri: photo.uri });
      setIsCameraOpened(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const onCloseCamera = () => {
    setIsCameraOpened(false);
    setError('');
  };

  const content = () => {
    if (hasPermission === null) {
      return <Loader loading={true} />;
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Error error={error} />
        </View>
      );
    }

    return (
      <Camera ref={cameraRef} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.takePhotoButton} onPress={onTakePhoto} />
          <TouchableOpacity style={styles.switchButton} onPress={onSwitchCamera}>
            <MaterialCommunityIcons name="camera-flip" size={48} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isCameraOpened}
      onRequestClose={onCloseCamera}>
      {content()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    position: 'relative',
  },
  switchButton: {
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 30,
  },
  takePhotoButton: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 70,
    alignSelf: 'center',
  },
});
