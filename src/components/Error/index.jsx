import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Error({ error }) {
  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: '#c90c27',
    padding: 10,
    width: '80%',
    textAlign: 'center',
  },
});
