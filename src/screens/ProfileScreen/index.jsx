import React, { useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import Camera from '../../components/Camera';
import { AvatarContext } from '../../components/Context';

export default function ProfileScreen() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const { profileAvatar } = useContext(AvatarContext);

  const foo = () => {
    setCameraOpen(!cameraOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarWrapper} onPress={foo}>
        <Image style={styles.avatar} source={profileAvatar} />
      </TouchableOpacity>
      <Camera cameraOpen={cameraOpen} setCameraOpen={setCameraOpen} />
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
