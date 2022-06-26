import React, { useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import Camera from '../../components/Camera';
import { AvatarContext } from '../../store/Context';

export default function ProfileScreen() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const { profileAvatar } = useContext(AvatarContext);

  const onCameraOpen = () => {
    setCameraOpen(!cameraOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarWrapper} onPress={onCameraOpen}>
        <Image style={styles.avatar} source={profileAvatar} />
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
