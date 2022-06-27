import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import { AuthContext } from '../../store/Context';
import { LOCATION_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from '../../navigation/routes';

import defaultAvatar from '../../../assets/avatar.png';

export default function DrawerContent(props) {
  const { auth, setAuth } = useContext(AuthContext);

  const onLogout = () => {
    setAuth(null);
    props.navigation.navigate(LOGIN_ROUTE);
  };

  const isActiveRoute = (routeName) => {
    const { index, routes } = props.navigation.getState();

    return routes[index].name === routeName;
  };

  const onNavigate = (routeName) => () => props.navigation.navigate(routeName);

  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userAvatarSection}>
          <Image
            source={auth?.photoURL ? { uri: auth?.photoURL } : defaultAvatar}
            style={styles.userAvatar}
          />
        </View>

        <DrawerItem
          icon={({ color, size }) => <Entypo name="map" size={size} color={color} />}
          label="Местоположение"
          onPress={onNavigate(LOCATION_ROUTE)}
          focused={isActiveRoute(LOCATION_ROUTE)}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="face-man-profile" size={size} color={color} />
          )}
          label="Профиль"
          onPress={onNavigate(PROFILE_ROUTE)}
          focused={isActiveRoute(PROFILE_ROUTE)}
        />
        <DrawerItem
          icon={({ color, size }) => <Entypo name="login" size={size} color={color} />}
          label="Выйти"
          onPress={onLogout}
        />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userAvatarSection: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  userAvatar: {
    paddingLeft: 20,
    width: 100,
    height: 100,
    borderRadius: 100,
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});
