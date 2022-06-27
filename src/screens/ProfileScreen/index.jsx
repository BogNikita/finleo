import React, { useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import Camera from '../../components/Camera';
import { AuthContext } from '../../store/Context';

import defaultAvatar from '../../../assets/avatar.png';

export default function ProfileScreen() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const { auth } = useContext(AuthContext);

  const onCameraOpen = () => {
    setCameraOpen(!cameraOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarWrapper} onPress={onCameraOpen}>
        <Image
          style={styles.avatar}
          source={auth?.photoURL ? { uri: auth?.photoURL } : defaultAvatar}
        />
      </TouchableOpacity>
      <Camera isCameraOpened={cameraOpen} setIsCameraOpened={setCameraOpen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'relative',
  },

  avatarWrapper: {
    justifySelf: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 250,
  },
});
