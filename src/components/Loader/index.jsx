import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

export default function Loader({ loading }) {
  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }
  return null;
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 2,
  },
});
