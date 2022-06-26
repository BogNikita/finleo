import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Error from '../../components/Error';
import { PROFILE_ROUTE } from '../../navigation/routes';

export default function PositionScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const onNavigate = () => {
    navigation.navigate(PROFILE_ROUTE);
  };

  const content = () => {
    if (!location && !errorMsg) {
      return <Loader loading={true} />;
    }

    if (errorMsg) {
      return <Error error={errorMsg} />;
    }

    return (
      <>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}>
          <Circle
            radius={500}
            center={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
            }}
          />
        </MapView>
        <View style={styles.btnWrapper}>
          <Button title="Перейти к профилю" onPress={onNavigate} />
        </View>
      </>
    );
  };

  return <View style={styles.container}>{content()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  btnWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
